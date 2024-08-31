import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import { useGetStatistics } from '../../apiCalls/statistics';
import { colors } from '../../assets';
import { getScreenSize } from '../../utils/screenUtils';

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

  const onSuccess = (response: any) => {
    setStats(response.data);
  }

  useEffect(() => {
    getStatistics('1', onSuccess);
  }, [])

  const topValues = stats.top;
  const chartHeight = 200;
  const barWidth = 50;
  const spacing = 20;
  const { width: chartWidth } = getScreenSize();
  const maxValue = Math.max(...topValues.map(item => item.timeWatched));

  return(
    <View style={styles.container}>
      <Svg height={chartHeight + 50} width={chartWidth}>
        {topValues.map((item, index) => (
          <React.Fragment key={index}>
            <Rect
              x={index * (barWidth + spacing)}
              y={chartHeight - (item.timeWatched / maxValue) * chartHeight}
              width={barWidth}
              height={(item.timeWatched / maxValue) * chartHeight}
              fill={colors.primaryBlue}
              rx={10} // Rounded corners
            />
            <SvgText
              x={index * (barWidth + spacing) + barWidth / 2}
              y={chartHeight + 20}
              fontSize="12"
              fill="black"
              textAnchor="middle">
                {item.providerName}
            </SvgText>
            <SvgText
              x={index * (barWidth + spacing) + barWidth / 2}
              y={chartHeight - (item.timeWatched / maxValue) * chartHeight - 10}
              fontSize="12"
              fill="black"
              textAnchor="middle">
                {item.timeWatched.toFixed(1)}h
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 20,
      backgroundColor: '#F1F4F9',
      borderRadius: 10
  }
});

