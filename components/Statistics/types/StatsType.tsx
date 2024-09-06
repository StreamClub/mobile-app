import { ProviderStatsType } from "./ProviderStatsType"

export type StatsType = {
  top: Array<ProviderStatsType>,
  timeInPlatforms: number,
  others: number,
  timeOutsidePlatforms: number,
  unsubscribeRecommendations: Array<ProviderStatsType>
}

export const emptyStats: StatsType = {
  top: [],
  timeInPlatforms: 0,
  others: 0,
  timeOutsidePlatforms: 0,
  unsubscribeRecommendations: []
}
