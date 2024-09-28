import { AxiosInstance, AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IEntity } from '../entities';
import { taskListsMockData, tasksMockData } from './data';

export interface MockAdapterOptions {
  delayResponse?: number;
  onNoMatch?: 'passthrough' | 'throwException';
}

class ApiMockAdapter extends MockAdapter {
  public constructor(
    axiosInstance: AxiosInstance,
    options?: MockAdapterOptions
  ) {
    super(axiosInstance, options);
  }

  public onCollectionEndpoints<T extends IEntity>(
    collectionName: string,
    initialData: T[],
    afterUpdateCallback?: (prevVal: T, newVal: T) => void
  ) {
    const defaultEndpoint = `/${collectionName}`;
    const idEndpoint = new RegExp(`/${collectionName}/\\d+`);
    const getRequestId = (cfg: AxiosRequestConfig) => {
      return cfg.url?.match(new RegExp(`/${collectionName}/(\\d+)`))?.[1];
    };

    // Mock getAll request
    this.onGet(defaultEndpoint).reply(200, initialData);

    // Mock getById request
    this.onGet(idEndpoint).reply((cfg) => {
      const id = getRequestId(cfg);
      const entity = initialData.find((e) => e.id === id);

      if (entity) {
        return [200, entity];
      }

      return [
        404,
        `Not found entity. Collection: ${collectionName}, id: ${id}`
      ];
    });

    // Mock create request
    this.onPost(defaultEndpoint).reply((cfg) => {
      const newEntity = JSON.parse(cfg.data);
      initialData.push(newEntity);
      return [200, newEntity];
    });

    // Mock update request
    this.onPut(idEndpoint).reply((cfg) => {
      const id = getRequestId(cfg);
      const newData = JSON.parse(cfg.data);
      const entity = initialData.find((e) => e.id === id);

      if (entity) {
        const prevVal = { ...entity };
        delete newData.id;

        Object.assign(entity, newData);

        afterUpdateCallback?.(prevVal, entity);
        return [200, prevVal];
      }

      return [
        404,
        `Not found entity. Collection: ${collectionName}, id: ${id}`
      ];
    });

    // Mock delete request
    this.onDelete(idEndpoint).reply((cfg) => {
      const id = getRequestId(cfg);
      const entityIdx = initialData.findIndex((e) => e.id === id);

      if (entityIdx !== -1) {
        const deletedEntity = initialData[entityIdx];
        initialData.splice(entityIdx, 1);
        return [200, deletedEntity];
      }

      return [
        404,
        `Not found entity. Collection: ${collectionName}, id: ${id}`
      ];
    });
  }

  public mock(): void {
    this.onCollectionEndpoints('task-lists', taskListsMockData);

    this.onCollectionEndpoints('tasks', tasksMockData, (prevVal, newVal) => {
      if (prevVal.taskListId !== newVal.taskListId) {
        const prevList = taskListsMockData.find(
          (tl) => tl.id === prevVal.taskListId
        );
        const newList = taskListsMockData.find(
          (tl) => tl.id === newVal.taskListId
        );

        if (prevList && newList) {
          prevList.tasks = prevList.tasks.filter((t) => t.id !== prevVal.id);
          newList.tasks.push(newVal);
        }
      }
    });
  }
}

export default ApiMockAdapter;
