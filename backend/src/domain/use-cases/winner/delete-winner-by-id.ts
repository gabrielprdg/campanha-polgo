export interface DeleteWinnerById {
  deleteById: (id: string) => Promise<void>
}