export type WinnerAggregationByState = {
  state: string
  count: number
}

export interface LoadWinnersAggregationRepository {
  loadAggregationByState: () => Promise<WinnerAggregationByState[]>
}
