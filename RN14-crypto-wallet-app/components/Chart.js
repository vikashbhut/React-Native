import React from "react";
import { View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from "../constants";
import moment from "moment";

export default function Chart({ containerStyle, chartPrice }) {
  //Points
  let startUnixTimestamp = moment().subtract(7, "day").unix();
  let data = chartPrice
    ? chartPrice?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });
  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }
    return `$${Number(value).toFixed(2)}`;
  };
  const formatDateTime = (value) => {
    "worklet";
    if (value === "") return "";

    let selectedDate = new Date(value * 1000);
    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    return `${date}/${month}`;
  };
  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };
  const getYAxisLableValues = () => {
    if (chartPrice) {
      let minValue = Math.min(...chartPrice);
      let maxValue = Math.max(...chartPrice);

      let midValue = (minValue + maxValue) / 2;

      let highMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (minValue + midValue) / 2;

      let roundingPoint = 2;
      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(highMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };
  return (
    <View style={{ ...containerStyle }}>
      {/* Y Axis Lable */}
      <View
        style={{
          position: "absolute",
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: "space-between",
        }}
      >
        {getYAxisLableValues().map((item, index) => {
          return (
            <Text
              key={index}
              style={{ color: COLORS.lightGray3, ...FONTS.body4 }}
            >
              {item}
            </Text>
          );
        })}
      </View>
      {/* chart */}
      {data?.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: "bezier",
          }}
        >
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                alignItems: "center",
                position: "absolute",
                backgroundColor: COLORS.transparentBlack1,
                width: 80,
                left: -35,
              }}
            >
              {/* Dot */}
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                />
              </View>
              {/* Y-lable */}
              <ChartYLabel
                format={formatUSD}
                style={{ color: COLORS.white, ...FONTS.body5 }}
              />
              {/* X-Lable */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
}
