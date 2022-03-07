export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  count: number;
}
