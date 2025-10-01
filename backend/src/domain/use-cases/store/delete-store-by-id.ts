export interface DeleteStoreById {
  deleteById: (id: string) => Promise<void>
}
