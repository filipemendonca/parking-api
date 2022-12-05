export interface IRepositoryBase<TEntity> {
  getAll(): Promise<TEntity[]>;
  create(model: TEntity): Promise<TEntity>;
  update(id: number, model: TEntity): Promise<TEntity>;
  delete(id: number): Promise<void>;
}
