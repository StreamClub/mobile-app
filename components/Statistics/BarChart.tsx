import React from "react";
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import { ProviderStatsType } from "./types/ProviderStatsType";
import { getScreenSize } from "../../utils/screenUtils";
import { barColors } from "./types/BarColors";

export type BarChartType = {
  stats: Array<ProviderStatsType>,
  maxValue: number
}

export const BarChart = (params: BarChartType) => {
  const chartHeight = 200;
  const barWidth = 50;
  const spacing = 30;
  const { width: chartWidth } = getScreenSize();
  const maxValue = params.maxValue;

  return (
    <Svg height={chartHeight + 50} width={chartWidth - 100}>
      {params.stats.map((item, index) => (
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
  )
}
