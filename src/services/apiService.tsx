import $api from "../http";
import { AxiosResponse } from "axios";
import { ItemType } from "../types";

export default class ApiService {
  static async getIds(): Promise<AxiosResponse<{ result: string[] }>> {
    return $api.post('', { 
      action: 'get_ids',
    });
  }

  static async getFields(): Promise<AxiosResponse<{ result: string[] }>> {
    return $api.post('', {
      action: 'get_fields',
      params: { 
        field: 'brand', 
        offset: 0 ,
      },
    });
  }

  static async getItems(ids: string[]): Promise<AxiosResponse<{ result: ItemType[] }>> {
    return $api.post('', {
      action: 'get_items',
      params: { ids },
    });
  }

  static async getFilteredItems(params: Record<string, string | number>): Promise<AxiosResponse<{ result: string[] }>> {
    return $api.post('', {
      action: 'filter',
      params,
    });
  }
}