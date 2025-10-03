export type WinnerAggregationByState = {
  state: string
  count: number
}

export interface LoadWinnersAggregation {
  loadByState: () => Promise<WinnerAggregationByState[]>
}
