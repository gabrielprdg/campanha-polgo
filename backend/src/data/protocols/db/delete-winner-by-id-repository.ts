export interface DeleteWinnerByIdRepository {
  deleteById: (id: string) => Promise<void>
}