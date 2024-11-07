import React from "react";
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import { ProviderStatsType } from "./types/ProviderStatsType";
import { barColors } from "./types/BarColors";
import { View } from "react-native";

export type BarChartType = {
  stats: Array<ProviderStatsType>,
  maxValue: number
}

export const BarChart = (params: BarChartType) => {
  const chartHeight = 200;
  const barWidth = 50;
  const spacing = 50;
  const maxValue = params.maxValue;

  return (
    <View>
      <Svg height={chartHeight + 40} width={3 * (barWidth + spacing)}>
        {params.stats.map((item, index) => (
          <React.Fragment key={index}>
            <SvgText
              x={index * (barWidth + spacing) + 30 + barWidth / 2}
              y={chartHeight + 20}
              fontSize="14"
              fill={barColors[index % barColors.length]}
              textAnchor="end">
                {item.timeWatched.toFixed(1) + ' h'}
            </SvgText>
            <Rect
              x={index * (barWidth + spacing) + 15}
              y={chartHeight - (item.timeWatched / maxValue) * chartHeight}
              width={barWidth}
              height={(item.timeWatched / maxValue) * chartHeight}
              fill={barColors[index % barColors.length]}
              rx={10}
            />
          </React.Fragment>
        ))}
      </Svg>
    </View>
  )
}
