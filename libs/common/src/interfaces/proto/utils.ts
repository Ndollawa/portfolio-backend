/* eslint-disable */
import { Any } from "../google/protobuf/any";

export const protobufPackage = "utils";

export interface Empty {
}

export interface UpdateDto<T> {
  id: string;
  data:Partial<T>| any  | Any | undefined;
}

export interface FindAllDto {
  empty?: Empty | undefined;
  query?: Any | undefined;
  projection?: Any | undefined;
}

export interface FindOneDto {
  id?: string | undefined;
  entity?: Any | undefined;
  projection?: Any | undefined;
}

export interface Response {
  status: string;
  message: string;
  data: Any | undefined;
  statusCode: number;
}

export interface Boolean {
  success: boolean;
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export const UTILS_PACKAGE_NAME = "utils";
