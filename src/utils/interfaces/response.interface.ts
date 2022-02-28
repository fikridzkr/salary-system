export interface HandleResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  pagination: object;
  error: boolean;
}
