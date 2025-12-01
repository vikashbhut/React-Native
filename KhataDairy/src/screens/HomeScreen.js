import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {removeKhataBook, fetchKhataBook} from '../store/actions/khatabook';
import colors from '../constants/colors';
import AppButton from '../components/AppButton';
import {formatIndianNumber, useIsMountedRef} from '../utils/utils';
import KhataBook from '../models/KhataBook';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {getLocalizedText} from '../localization/config';
import HeaderButton from '../components/HeaderButton';
import {checkMultiplePermissions} from '../utils/permissions';
import {PERMISSIONS} from 'react-native-permissions';
import moment from 'moment';
import 'moment/locale/gu';
moment.locale('gu');
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconDate from 'react-native-vector-icons/EvilIcons';
import LoadingIndicator from '../components/LoadingIndicator';

const Items = ({itemData, removeHandler, navigation}) => {
  const {id, name} = itemData;

  return (
    <TouchableOpacity
      style={styles.items}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('KhataBook', {title: name})}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={{...styles.text, fontFamily: 'OpenSans-Regular'}}>
          {name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddKhataBook', {
              edit: name,
              title: 'Edit Khatabookname',
            });
          }}>
          <Icon name="edit" size={24} style={{marginRight: 16}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(`Are You Sure?`, `${getLocalizedText('deletekhata')}`, [
              {text: `${getLocalizedText('no')}`},
              {
                text: `${getLocalizedText('yes')}`,
                onPress: removeHandler.bind(this, id, name),
              },
            ])
          }>
          <Icon name="delete" size={24} style={{marginRight: 16}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = props => {
  const khatabook = useSelector(state => state.khatabook);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateType, setDateType] = useState('');
  const [show, setShow] = useState(false);
  const isMountedRef = useIsMountedRef();
  const [isPDFDownload, setIsPdfDownload] = useState(false);

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

  const filterArray = data => {
    let result = true;
    if (startDate && endDate) {
      result =
        new Date(data.date).toISOString().split('T')[0] >=
          new Date(startDate).toISOString().split('T')[0] &&
        new Date(data.date).toISOString().split('T')[0] <=
          new Date(endDate).toISOString().split('T')[0];
    } else if (startDate) {
      result =
        new Date(data.date).toISOString().split('T')[0] >=
        new Date(startDate).toISOString().split('T')[0];
    } else if (endDate) {
      result =
        new Date(data.date).toISOString().split('T')[0] <=
        new Date(endDate).toISOString().split('T')[0];
    }
    return result;
  };

  const flatten = arr => {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
      );
    }, []);
  };
  const createPDF = async () => {
    if (
      !customers.length ||
      !customers.filter(customer => customer['entries']).length ||
      !flatten(
        customers
          .filter(customer => customer['entries'])
          .map(customer => Object.values(customer['entries'])),
      ).filter(filterArray).length
    ) {
      Alert.alert('KhataDairy', 'પસંદ થયેલ તારીખે કોઈ રેકોર્ડ મળ્યો નથી');
      return;
    }
    let options = {
      //Content to print
      html: customers
        .filter(customer => customer['entries'])
        .filter(customer =>
          Boolean(
            flatten(Object.values(customer?.entries)).filter(filterArray)
              .length,
          ),
        )
        .map((customer, index) => {
          return flatten(Object.values(customer?.entries)).filter(filterArray)
            .length > 0
            ? ` <table style="width: 100%;">
      <caption style="font-style: italic;font-size:30px">
            ${customer.name}
      </caption>
      <tr>
          <td style="text-align: center;width:100%">
              ગ્રાહક વ્યવહાર ઇતિહાસ${
                customer['entries'] &&
                flatten(Object.values(customer.entries)).filter(filterArray)
                  .length > 0
                  ? '(' +
                    moment(
                      startDate
                        ? startDate
                        : Object.values(customer.entries)[
                            Object.values(customer.entries).length - 1
                          ].date,
                    ).format('DD/MM/YYYY') +
                    '-' +
                    moment(
                      endDate
                        ? endDate
                        : Object.values(customer.entries)[0].date,
                    ).format('DD/MM/YYYY') +
                    ')'
                  : ''
              } (${customer.mainKey ?? ''})
          </td>
      </tr> 
      <tr>
        ${
          customer['entries'] &&
          flatten(Object.values(customer.entries)).filter(filterArray).length >
            0
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
                ${flatten(Object.values(customer.entries))
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
                    flatten(Object.values(customer.entries))
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
                       flatten(Object.values(customer.entries))
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
                          customer.totalGot > 0
                            ? formatIndianNumber(customer.totalGot) + `  લેવાના`
                            : formatIndianNumber(customer.totalGave) + ` ચુકવશો`
                        }
                  </td>
              </tr>
                
          </table>
           `
            : ''
        }
      </tr>
    
  </table>`
            : '';
        })
        .join('<br/><br/><br/>'),
      //File Name

      fileName: 'khataDairy-mini-statement' + new Date().getTime(),
      //File directory

      directory: 'Documents',
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
      let loadedKhataBooks = [];
      setIsLoading(true);
      setError(null);
      database()
        .ref()
        .child(auth().currentUser.uid.toString())
        .once('value', snapshot => {
          const resData = snapshot.toJSON();
          if (resData?.customers) {
            let newCustomers = [];
            let customersList = resData?.customers;
            for (let customersKey in customersList) {
              let customer = customersList[customersKey];
              for (let customerKey in customer) {
                newCustomers.push({
                  mainKey: customersKey,
                  ...customer[customerKey],
                });
              }
            }
            setCustomers(newCustomers);
          }
          if (resData?.khatabooks) {
            for (let key in resData?.khatabooks) {
              if (resData?.khatabooks[key]) {
                loadedKhataBooks.push(
                  new KhataBook(
                    resData?.khatabooks[key]?.id,
                    resData?.khatabooks[key]?.name,
                  ),
                );
              }
            }
          }
        })
        .then(() => {
          if (isMountedRef.current) {
            dispatch(fetchKhataBook(loadedKhataBooks));
            setIsLoading(false);
          }
        })
        .catch(err => {
          if (isMountedRef.current) {
            setError(err.message);
            setIsLoading(false);
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

  const removeHandler = (id, name) => {
    setIsLoading(true);
    setError(null);
    database()
      .ref()
      .child(auth().currentUser.uid.toString())
      .child(`khatabooks/${name}`)
      .remove()
      .then(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
          dispatch(removeKhataBook(id));
        }
      })
      .catch(err => {
        if (isMountedRef.current) {
          setError(err.message);
          setIsLoading(false);
        }
      });
    database()
      .ref()
      .child(auth().currentUser.uid.toString())
      .child(`customers/${name}`)
      .remove()
      .catch(err => {
        if (isMountedRef.current) {
          setError(err.message);
        }
      });
  };

  const HeaderComponent = props => {
    return (
      <>
        <View style={styles.reportRootContainer}>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                props.setShow(true);
                props.setDateType('start');
              }}>
              <IconDate name="calendar" size={30} color={colors.headerColor} />
              <Text style={{color: colors.headerColor}}>
                {props.startDate
                  ? moment(props.startDate).format('LL')
                  : 'પ્રારંભ તારીખ'}
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
                props.setShow(true);
                props.setDateType('end');
              }}>
              <IconDate name="calendar" size={30} color={colors.headerColor} />
              <Text style={{color: colors.headerColor}}>
                {props.endDate
                  ? moment(props.endDate).format('LL')
                  : 'અંતિમ તારીખ'}
              </Text>
            </TouchableOpacity>
            {props.show && props.dateType === 'start' && (
              <DateTimePicker
                value={props.startDate || new Date()}
                maximumDate={props.endDate ?? new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={props.onChange}
              />
            )}
            {props.show && props.dateType === 'end' && (
              <DateTimePicker
                value={props.endDate || new Date()}
                maximumDate={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                {...(props.startDate && {minimumDate: props.startDate})}
                onChange={props.onEndChange}
              />
            )}
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.headerColor}
      />
      <LoadingIndicator visible={isPDFDownload} />
      <View style={styles.screen}>
        {khatabook.khatabooks.length > 0 ? (
          isLoading ? (
            <LoadingIndicator visible={isLoading} />
          ) : (
            <>
              <HeaderComponent
                show={show}
                onChange={onChange}
                onEndChange={onEndChange}
                setShow={setShow}
                setDateType={setDateType}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                dateType={dateType}
                startDate={startDate}
                endDate={endDate}
              />
              <FlatList
                data={khatabook.khatabooks}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                ListFooterComponent={<View style={{paddingBottom: 200}}></View>}
                renderItem={itemData => (
                  <Items
                    itemData={itemData.item}
                    dispatch={dispatch}
                    navigation={props.navigation}
                    removeHandler={removeHandler}
                  />
                )}
              />
            </>
          )
        ) : isLoading ? (
          <LoadingIndicator visible={isLoading} />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{getLocalizedText('addkhatabook')}</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {!isLoading && (
            <>
              <AppButton
                title={getLocalizedText('addkhatabook')}
                onPress={() => props.navigation.navigate('AddKhataBook')}
              />
              <AppButton
                style={{marginLeft: 20}}
                title={'પીડીએફ ડાઉનલોડ કરો'}
                onPress={() => {
                  if (customers.length) {
                    onPdfCreate();
                  }
                }}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

HomeScreen.navigationOptions = ({navigate}) => {
  return {
    title: 'KhataBooks',
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: 150,
    height: 60,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  items: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: colors.grey,
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
  list: {
    width: '100%',
    height: '70%',
    padding: 10,
  },
  buttonContainer: {
    padding: 20,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportRootContainer: {
    backgroundColor: colors.headerColor,
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

HomeScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <HeaderButton
        title="logout"
        iconName="log-out"
        onPress={() =>
          Alert.alert('Are You Sure?', 'શું તમે લૉગઆઉટ થવાની ખાતરી કરો છો', [
            {text: `${getLocalizedText('no')}`},
            {
              text: `${getLocalizedText('yes')}`,
              onPress: () =>
                auth()
                  .signOut()
                  .then(() => navigation.navigate('Splash')),
            },
          ])
        }
      />
    ),
  };
};
export default HomeScreen;
