import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {formatIndianNumber, useIsMountedRef} from '../utils/utils';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Entry from '../models/Entry';
import Card from '../components/Card';
import {fetchEntry} from '../store/actions/khatabook';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import 'moment/locale/gu';
import {getLocalizedText} from '../localization/config';
moment.locale('gu');
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/EvilIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PERMISSIONS} from 'react-native-permissions';
import {checkMultiplePermissions} from '../utils/permissions';
import FileViewer from 'react-native-file-viewer';
import LoadingIndicator from '../components/LoadingIndicator';

const CardContainer = ({items, navigation}) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EntryDetailsScreen', {
            khatabook: navigation.getParam('khatabook'),
            customer: navigation.getParam('title'),
            items: items,
          });
        }}>
        <View>
          <Text
            style={{
              ...styles.text,
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              marginBottom: 5,
            }}>
            {items.details}
          </Text>
        </View>
        <View style={styles.date}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              color: colors.grey,
              fontSize: 16,
            }}>
            {moment(items.date).format('L')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.ruppeContainer}>
            <Text style={{color: colors.red}}>{getLocalizedText('gave')}</Text>
            <Text style={{color: colors.grey}}>
              {items.isGave ? formatIndianNumber(items.amount) : 0}
            </Text>
          </View>
          <View style={styles.ruppeContainer}>
            <Text style={{color: colors.green}}>{getLocalizedText('got')}</Text>
            <Text style={{color: colors.grey}}>
              {items.isGot ? formatIndianNumber(items.amount) : 0}
            </Text>
          </View>
          <View style={styles.ruppeContainer}>
            <Text style={{color: colors.headerColor}}>
              {Number(items.got) > 0
                ? `${getLocalizedText('willget')}`
                : `${getLocalizedText('willpay')}`}
            </Text>
            <Text style={{color: colors.grey}}>
              {Number(items.got) > 0
                ? `${formatIndianNumber(Number(items.got))}`
                : `${formatIndianNumber(Number(items.gave))}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
const CustomerScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useIsMountedRef();
  const name = props.navigation.getParam('title');
  const khatabookname = props.navigation.getParam('khatabook');
  const [totalGot, setTotalGot] = useState(0);
  const [totalGave, setTotalGave] = useState(0);
  const entries = useSelector(state => state.khatabook.entries);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState('');
  const [isPDFDownload, setIsPdfDownload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willFocus', () => {
      setStartDate('');
      setEndDate();
      setDateType();
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const filterArray = data => {
    if (startDate && endDate) {
      return (
        moment(data.date).isSameOrAfter(startDate, 'day') &&
        moment(data.date).isSameOrBefore(endDate, 'day')
      );
    } else if (startDate) {
      return moment(data.date).isSameOrAfter(startDate, 'day');
    } else if (endDate) {
      return moment(data.date).isSameOrBefore(endDate, 'day');
    }

    return true;
  };
  const createPDF = async () => {
    if (
      !entries ||
      entries?.length === 0 ||
      entries?.filter(filterArray)?.length === 0
    ) {
      Alert.alert('KhataDairy', 'પસંદ થયેલ તારીખે કોઈ રેકોર્ડ મળ્યો નથી');
      return;
    }
    let options = {
      //Content to print
      html: `
             <table style="width: 100%;">
      <caption style="font-style: italic;font-size:30px">
            ${name}
      </caption>
      <tr>
          <td style="text-align: center;width:100%">
              ગ્રાહક વ્યવહાર ઇતિહાસ${
                entries
                  ? '(' +
                    moment(
                      startDate ? startDate : entries[entries.length - 1].date,
                    ).format('DD/MM/YYYY') +
                    '-' +
                    moment(endDate ? endDate : entries[0].date).format(
                      'DD/MM/YYYY',
                    ) +
                    ')'
                  : ''
              } (${props.navigation.getParam('khatabook')})
          </td>
      </tr>
       
      <tr>
        ${
          entries
            ? `
        <table   style="font-family: Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;border: 1px solid black;">
                <tr>
                  <th style="border: 1px solid black;">S.No</th>
                  <th style="border: 1px solid black;">તારીખ</th>
                  <th style="border: 1px solid black;">વિગત</th>
                  <th style="border: 1px solid black;">તમને મળયા(+)</th>
                  <th style="border: 1px solid black;">તમે આપ્યા(-)</th>
                  <th style="border: 1px solid black;">કુલ(લેવાના/ચુકવશો)</th>
                </tr>
                ${entries
                  .filter(filterArray)
                  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                  .map((entry, index) => {
                    return `
                        <tr>
                          <td style="border: 1px solid black;text-align: center">${
                            index + 1
                          }</td>
                           <td style="border: 1px solid black;text-align: center">${moment(
                             entry.date,
                           ).format('DD/MM/YYYY')}</td>
                           <td style="border: 1px solid black;text-align:left">${
                             entry['details'] ? entry['details'] : ''
                           }</td>
                            <td style="border: 1px solid black;text-align:right;color: green;"> ${
                              entry.isGot && entry.amount
                                ? formatIndianNumber(entry.amount)
                                : ''
                            }</td>
                            <td style="border: 1px solid black;text-align:right; color: red;">  ${
                              entry.isGave && entry.amount
                                ? formatIndianNumber(entry.amount)
                                : ''
                            } </td>
                            <td style="border: 1px solid black;text-align:right"> ${
                              entry.gave > 0
                                ? formatIndianNumber(entry.gave) + ` ચુકવશો`
                                : formatIndianNumber(entry.got) + ` લેવાના`
                            }</td>
                        </tr>
                    
                    `;
                  })
                  .join('')}
              <tr>
                  <td style="border: 1px solid black;text-align: center"></td>
                  <td style="border: 1px solid black;text-align: center"></td>
                  <td style="border: 1px solid black;text-align: center">Total</td>
                  <td style="border: 1px solid black;text-align:right;color:green"> ${formatIndianNumber(
                    entries
                      .filter(filterArray)
                      .map(value => {
                        if (value.isGot && !isNaN(value.amount)) {
                          return Number(value.amount);
                        }
                        return 0;
                      })
                      .reduce((acc, curr) => acc + curr),
                  )}</td>
                  <td style="border: 1px solid black;text-align:right;color:red">
                     ${formatIndianNumber(
                       entries
                         .filter(filterArray)
                         .map(value => {
                           if (value.isGave && !isNaN(value.amount)) {
                             return Number(value.amount);
                           }
                           return 0;
                         })
                         .reduce((acc, curr) => acc + curr),
                     )}
                  </td>
                  <td style="border: 1px solid black;text-align:right">
                        ${
                          totalGot > 0
                            ? formatIndianNumber(totalGot) + `  લેવાના`
                            : formatIndianNumber(totalGave) + ` ચુકવશો`
                        }
                  </td>
              </tr>
                
          </table>
           `
            : ''
        }
      </tr>
    
  </table>`,
      //File Name

      fileName: 'khataDairy-mini-statement' + new Date().getTime(),
      //File directory
      directory: `Documents`,
    };
    setIsPdfDownload(true);
    let file = await RNHTMLtoPDF.convert(options).finally(() =>
      setIsPdfDownload(false),
    );
    FileViewer.open(file.filePath);

    // const android = RNFetchBlob.android;
    // android.actionViewIntent(file.filePath, 'application/pdf');
  };

  const onPdfCreate = async () => {
    const permissions = [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
    const isPermissionGranted = await checkMultiplePermissions(permissions);
    if (!isPermissionGranted) {
      Alert.alert(
        'Permission Request',
        'Please allow permission to access External Storage.',
        [
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      createPDF();
    }
  };

  useEffect(() => {
    const fetchData = () => {
      let loadedEntries = [];
      setIsLoading(true);
      setError(null);

      database()
        .ref()
        .child(auth().currentUser.uid.toString())
        .child(`customers/${khatabookname}/${name}`)
        .once('value', snapshot => {
          let resData = snapshot.toJSON();
          setTotalGot(resData.totalGot);
          setTotalGave(resData.totalGave);
        });

      database()
        .ref()
        .child(auth().currentUser.uid.toString())
        .child(`customers/${khatabookname}/${name}/entries`)
        .once('value', snapshot => {
          let resData = snapshot.toJSON();
          for (let key in resData) {
            loadedEntries.push(
              new Entry(
                key,
                resData[key].amount,
                resData[key].details,
                resData[key].date,
                resData[key].imagePath,
                resData[key].isGave,
                resData[key].isGot,
                resData[key].gave,
                resData[key].got,
                resData[key].timestamp,
              ),
            );
          }
        })
        .then(() => {
          if (isMountedRef.current) {
            loadedEntries.sort((a, b) => b.date - a.date);
            dispatch(fetchEntry(loadedEntries));
            setIsLoading(false);
          }
        })
        .catch(err => {
          if (isMountedRef.current) {
            setIsLoading(false);
            setError(err.message);
          }
        });
    };
    fetchData();
    const willFocuSubscription = props.navigation.addListener(
      'willFocus',
      fetchData,
    );
    return () => {
      willFocuSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (error) {
      ToastAndroid.showWithGravityAndOffset(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, [error]);

  const customerDeleteHandler = () => {
    Alert.alert('Are You Sure?', `${getLocalizedText('deletecust')}`, [
      {text: `${getLocalizedText('no')}`, style: 'default'},
      {
        text: `${getLocalizedText('yes')}`,
        onPress: () => {
          setIsLoading(true);
          setError(null);
          database()
            .ref()
            .child(auth().currentUser.uid.toString())
            .child(`customers/${khatabookname}/${name}`)
            .remove()
            .then(() => {
              if (isMountedRef.current) {
                setIsLoading(false);
                props.navigation.goBack();
              }
            })
            .catch(err => {
              if (isMountedRef.current) {
                setIsLoading(false);
                setError(err.message);
              }
            });
        },
      },
    ]);
  };

  useEffect(() => {
    props.navigation.setParams({delete: customerDeleteHandler});
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateType('');
    setStartDate(currentDate);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateType('');
    setEndDate(currentDate);
  };
  if (isLoading) {
    return <LoadingIndicator visible={true} />;
  } else {
    return (
      <>
        <LoadingIndicator visible={isPDFDownload} />
        <View style={styles.screen}>
          <View style={styles.reportRootContainer}>
            <View style={styles.reportContainer}>
              <Text style={styles.text}>
                {totalGot > 0
                  ? `${getLocalizedText('youwillget')}`
                  : `${getLocalizedText('youwillpay')}`}
              </Text>
              <Text
                style={{
                  ...styles.text,
                  color: totalGot > 0 ? colors.green : colors.red,
                }}>
                {totalGot > 0
                  ? `${formatIndianNumber(totalGot)}`
                  : `${formatIndianNumber(totalGave)}`}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setShow(true);
                  setDateType('start');
                }}>
                <Icon name="calendar" size={30} color={colors.headerColor} />
                <Text style={{color: colors.headerColor}}>
                  {startDate ? moment(startDate).format('LL') : 'પ્રારંભ તારીખ'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.4,
                  borderColor: colors.grey,
                  height: '100%',
                }}
              />
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setShow(true);
                  setDateType('end');
                }}>
                <Icon name="calendar" size={30} color={colors.headerColor} />
                <Text style={{color: colors.headerColor}}>
                  {endDate ? moment(endDate).format('LL') : 'અંતિમ તારીખ'}
                </Text>
              </TouchableOpacity>
              {show && dateType === 'start' && (
                <DateTimePicker
                  value={startDate || new Date()}
                  maximumDate={endDate ?? new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              {show && dateType === 'end' && (
                <DateTimePicker
                  value={endDate || new Date()}
                  maximumDate={new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onEndChange}
                  {...(startDate && {minimumDate: startDate})}
                />
              )}
            </View>
          </View>

          {entries.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              style={{marginBottom: 90}}>
              {entries
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((items, index) => {
                  return (
                    <CardContainer
                      key={index}
                      items={items}
                      index={index}
                      navigation={props.navigation}
                    />
                  );
                })}
            </ScrollView>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{getLocalizedText('addnewentry')}</Text>
            </View>
          )}

          <View style={styles.bottom}>
            <AppButton
              title={getLocalizedText('gave')}
              style={{backgroundColor: colors.red, ...styles.button}}
              onPress={() =>
                props.navigation.navigate('CreditDebitScreen', {
                  data: {
                    title: `${props.navigation.getParam('title')}`,
                    color: colors.red,
                    profile: props.navigation.getParam('title'),
                    customerId: props.navigation.getParam('customerId'),
                    khatabookname: khatabookname,
                  },
                })
              }
            />
            <AppButton
              title={getLocalizedText('got')}
              style={{backgroundColor: colors.green, ...styles.button}}
              onPress={() =>
                props.navigation.navigate('CreditDebitScreen', {
                  data: {
                    title: `${props.navigation.getParam('title')}`,
                    color: colors.green,
                    profile: props.navigation.getParam('title'),
                    customerId: props.navigation.getParam('customerId'),
                    khatabookname: khatabookname,
                  },
                })
              }
            />
            <AppButton
              title="PDF"
              style={{backgroundColor: colors.headerColor, ...styles.button}}
              onPress={() => onPdfCreate()}
            />
          </View>
        </View>
      </>
    );
  }
};

CustomerScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title'),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <HeaderButton
          iconName="edit"
          onPress={() => {
            navigation.navigate('AddNewCustomer', {
              edit: navigation.getParam('title'),
              khatabookname: navigation.getParam('khatabook'),
            });
          }}
        />
        <HeaderButton
          iconName="remove-user"
          onPress={navigation.getParam('delete')}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  text: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
  },
  reportRootContainer: {
    backgroundColor: colors.headerColor,
  },
  reportContainer: {
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
  card: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.whiteColor,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  date: {
    borderBottomColor: '#EFF0F2',
    borderBottomWidth: 1,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 5,
    marginBottom: 10,
  },
  ruppeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    height: 50,
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default CustomerScreen;
