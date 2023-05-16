export interface News {
  id: number;
  title: string;
  content: string;
  type: string;
  create_time: number;
}

export interface QueryType {
  page: number;
  pageSize: number;
}

export interface ResposeType<T> {
  code: number;
  msg?: string;
  data: T | null;
}
