import { AxiosResponse } from 'axios';
import { Entity } from '../../entities';
import api from '../../api';

abstract class BaseRepository<T extends Entity> {
  protected abstract _collectionName: string;

  public async getAll(): Promise<T[]> {
    const { data: entities } = await api.get<T[]>(`/${this._collectionName}`);
    return entities;
  }

  public async getById(id: string): Promise<T> {
    const { data: entity } = await api.get<T>(`/${this._collectionName}/${id}`);
    return entity;
  }

  public async create(data: T): Promise<T> {
    const { data: createdEntity } = await api.post<T, AxiosResponse<T>, T>(
      `/${this._collectionName}`,
      data
    );

    return createdEntity;
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const { data: updatedEntity } = await api.put<
      T,
      AxiosResponse<T>,
      Partial<T>
    >(`/${this._collectionName}/${id}`, data);

    return updatedEntity;
  }

  public async deleteById(id: string): Promise<T> {
    const { data: deletedEntity } = await api.delete<T, AxiosResponse<T>>(
      `/${this._collectionName}/${id}`
    );

    return deletedEntity;
  }
}

export default BaseRepository;
