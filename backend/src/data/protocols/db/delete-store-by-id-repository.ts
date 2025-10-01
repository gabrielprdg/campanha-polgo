export interface DeleteStoreByIdRepository {
  deleteById: (id: string) => Promise<void>
}
