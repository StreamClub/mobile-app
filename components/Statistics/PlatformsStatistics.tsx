import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useGetStatistics } from '../../apiCalls/statistics';
import { getScreenSize } from '../../utils/screenUtils';
import { BodyText } from '../BasicComponents/BodyText';
import { LoadingComponent } from '../BasicComponents/LoadingComponent';
import { TitleText } from '../BasicComponents/TitleText';
import { MonthFilterButtons } from './MonthFilterButtons';
import { emptyStats, StatsType } from './types/StatsType';
import { barColors } from './types/BarColors';
import { BarChart } from './BarChart';
import { colors } from '../../assets';
import { UnsubscribeRecommendations } from './UnsubscribeRecommendations';
import { SubscribeRecommendations } from './SubscribeRecommendations';

const { width: chartWidth } = getScreenSize();

export const PlatformsStatistics = () => {
  const {getStatistics, loading} = useGetStatistics();
  const [stats, setStats] = useState<StatsType>(emptyStats);
  const [maxValue, setMaxValue] = useState(0);

  const onSuccess = (response: any) => {
    console.log(response.data);
    setStats(response.data);
    setMaxValue(Math.max(...response.data.top.map((item: { timeWatched: number; }) => (item.timeWatched + 1))));
  }

  const updateStats = (month: string) => {
    getStatistics(month, onSuccess);
  }

  useEffect(() => {
    getStatistics('1', onSuccess);
  }, [])

  return(
    <View style={styles.container}>
      <View style={styles.card}>
          <MonthFilterButtons updateStats={updateStats} />
          <View style={{margin: 10}}>
            {loading?
              <LoadingComponent /> :
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <BarChart
                  stats={stats.top}
                  maxValue={maxValue} />
                <View style={{flexDirection: 'row'}}>
                  {stats.top.map((item, index) => (
                    <BodyText 
                      key={index}
                      body={item.providerName}
                      color={barColors[index % barColors.length]}
                      style={{margin: 5}} />
                  ))}
                </View>
              </View>
            }
        </View>
      </View>
      <BodyText
        body={'Viste ' + 
          stats.timeInPlatforms.toFixed(1) + 
          'hs de contenido. \n ' + 
          stats.timeOutsidePlatforms.toFixed(1) + 
          'hs no fueron vistas en tus plataformas.'}
        size='big'
        style={{marginTop: 5}} />
      <UnsubscribeRecommendations 
        recommendations={stats.unsubscribeRecommendations}
        totalViewed={stats.timeInPlatforms + stats.timeOutsidePlatforms} />
      <SubscribeRecommendations />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 5
  },
  card: {
    backgroundColor: colors.primaryWhite, 
    borderRadius: 10,
    width: chartWidth - 40
  }
});

