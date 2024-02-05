/* eslint-disable */
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "utils";

export interface Empty {
}

export interface UpdateDto {
  id: string;
  data: Any | any | undefined;
}

export interface FindAllDto {
  empty?: Empty | undefined;
  query?: Any | any | undefined;
  projection?: Any | any | undefined;
}

export interface FindOneDto {
  id?: string | undefined;
  entity?: Any | any | undefined;
  projection?: Any | any | undefined;
}

export interface Response {
  status: string;
  message: string;
  data: Any | any | undefined;
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
