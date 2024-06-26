import { Model, ModelStatic } from "sequelize";

export abstract class BaseController<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(data: T["_creationAttributes"]): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string | number, data: Partial<T>): Promise<[number, T[]]> {
    return this.model.update(data, { where: { id } as any, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } as any });
  }

  async getByName(name: string): Promise<T | null> {
    return this.model.findOne({ where: { name } as any });
  }

  async updateByName(name: string, data: Partial<T>): Promise<[number, T[]]> {
    return this.model.update(data, { where: { name } as any, returning: true });
  }

  async deleteByName(name: string): Promise<number> {
    return this.model.destroy({ where: { name } as any });
  }
}
