import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import { useGetStatistics } from '../../apiCalls/statistics';
import { colors } from '../../assets';
import { getScreenSize } from '../../utils/screenUtils';
import { BodyText } from '../BasicComponents/BodyText';
import { LoadingComponent } from '../BasicComponents/LoadingComponent';

type ProviderStatsType = {
  providerId: number,
  timeWatched: number,
  logoPath: string,
  providerName: string,
  displayPriority: number
}

type StatsType = {
  top: Array<ProviderStatsType>,
  timeInPlatforms: Number,
  others: Number,
  timeOutsidePlatforms: Number,
  unsubscribeRecommendations: Array<String>
}

const emptyStats: StatsType = {
  top: [],
  timeInPlatforms: 0,
  others: 0,
  timeOutsidePlatforms: 0,
  unsubscribeRecommendations: []
}

export const PlatformsBarChart = () => {
  const {getStatistics, loading} = useGetStatistics();
  const [stats, setStats] = useState<StatsType>(emptyStats);
  const [maxValue, setMaxValue] = useState(0);

  const onSuccess = (response: any) => {
    setStats(response.data);
    setMaxValue(Math.max(...response.data.top.map((item: { timeWatched: Number; }) => item.timeWatched)));
    console.log(response.data.top)
  }

  useEffect(() => {
    getStatistics('1', onSuccess);
  }, [])

  const chartHeight = 200;
  const barWidth = 50;
  const spacing = 30;
  const { width: chartWidth } = getScreenSize();
  const barColors = [colors.primaryBlue, colors.primaryRed, colors.primaryGrey, colors.secondarySkyBlue, colors.primaryBlack];

  return(
    <View style={styles.container}>
      {loading?
        null : 
        <View style={{flexDirection: 'row'}}>
          {stats.top.map((item, index) => (
            <BodyText 
              key={index}
              body={item.providerName}
              color={barColors[index % barColors.length]}
              style={{margin: 5}} />
          ))}
        </View>
      }
      {loading?
        <LoadingComponent /> :
        <Svg height={chartHeight + 50} width={chartWidth - 100}>
          {stats.top.map((item, index) => (
            <React.Fragment key={index}>
              <Rect
                x={index * (barWidth + spacing)}
                y={chartHeight - (item.timeWatched / maxValue) * chartHeight}
                width={barWidth}
                height={(item.timeWatched / maxValue) * chartHeight}
                fill={barColors[index % barColors.length]}
                rx={10}
              />
              <SvgText
                x={index * (barWidth + spacing) + barWidth / 2}
                y={chartHeight + 20}
                fontSize="14"
                fill={barColors[index % barColors.length]}
                textAnchor="end">
                  {item.timeWatched.toFixed(1)}h
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 20,
      backgroundColor: '#F1F4F9',
      borderRadius: 10,
      margin: 10
  }
});

