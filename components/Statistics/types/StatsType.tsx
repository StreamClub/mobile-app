import { ProviderStatsType } from "./ProviderStatsType"

export type StatsType = {
  top: Array<ProviderStatsType>,
  timeInPlatforms: Number,
  others: Number,
  timeOutsidePlatforms: Number,
  unsubscribeRecommendations: Array<String>
}