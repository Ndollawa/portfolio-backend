/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Any } from "../google/protobuf/any";
import { Empty } from "./utils";

const protobufPackage = "communication";

export interface MailAttachment {
  type: string;
  name: string;
  url: string;
}

export interface MailContext {
  template: string;
  data: Any | undefined;
}

export interface CreateMailerDto {
  name: string;
  content: string;
  context: string;
  template?: string | undefined;
}

export interface ToMultipleList {
  toMultiple: string[];
}

export interface MultipleAttachment {
  multipleAttachment: MailAttachment[];
}

export interface SendMailDto {
  from: string;
  toSingle?: string | undefined;
  toMultipleList?: ToMultipleList | undefined;
  subject: string;
  html: string;
  template: string;
  oneAttachment?: MailAttachment | undefined;
  multipleAttachment?: MultipleAttachment | undefined;
}

export const COMMUNICATION_PACKAGE_NAME = "communication";

export interface MailerServiceClient {
  createTemplate(request: SendMailDto): Observable<Empty>;

  sendMail(request: SendMailDto): Observable<Empty>;

  findTemplate(request: Empty): Observable<Empty>;

  findAllTemplates(request: Empty): Observable<Empty>;

  updateTemplate(request: Empty): Observable<Empty>;

  removeTemplate(request: Empty): Observable<Empty>;
}

export interface MailerServiceController {
  createTemplate(request: SendMailDto): Promise<Empty> | Observable<Empty> | Empty;

  sendMail(request: SendMailDto): Promise<Empty> | Observable<Empty> | Empty;

  findTemplate(request: Empty): Promise<Empty> | Observable<Empty> | Empty;

  findAllTemplates(request: Empty): Promise<Empty> | Observable<Empty> | Empty;

  updateTemplate(request: Empty): Promise<Empty> | Observable<Empty> | Empty;

  removeTemplate(request: Empty): Promise<Empty> | Observable<Empty> | Empty;
}

export function MailerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createTemplate",
      "sendMail",
      "findTemplate",
      "findAllTemplates",
      "updateTemplate",
      "removeTemplate",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MailerService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MailerService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MAILER_SERVICE_NAME = "MailerService";
