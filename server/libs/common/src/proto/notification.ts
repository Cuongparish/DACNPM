/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "notification";

export enum status {
  UNREAD = 0,
  READ = 1,
  UNRECOGNIZED = -1,
}

/** The request message containing the users id. */
export interface User {
  id: string;
}

export interface PaginationRequest {
  page: number;
  limit: number;
}

export interface PaginaionResponse {
  total: number;
  page: number;
  limit: number;
}

export interface SendNotificationRequest {
  title: string;
  content: string;
  link: string;
  users: User[];
}

/** The response message containing the greetings */
export interface SendNotificationResponse {
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  link: string;
  status: status;
  createdAt: Timestamp | undefined;
}

export interface GetUserNotificationsRequest {
  user: User | undefined;
  paginationRequest?: PaginationRequest | undefined;
}

export interface GetUserNotificationsResponse {
  pagination: PaginaionResponse | undefined;
  data: Notification[];
}

export interface UpdateNotificationStatusRequest {
  user: User | undefined;
  notificationId: number;
  status: status;
}

export interface UpdateNotificationStatusResponse {
  status: status;
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

/** The job application service definition. */

export interface NotificationServiceClient {
  sendNotification(request: SendNotificationRequest): Observable<SendNotificationResponse>;

  getNotifications(request: GetUserNotificationsRequest): Observable<GetUserNotificationsResponse>;

  updateNotificationStatus(request: UpdateNotificationStatusRequest): Observable<UpdateNotificationStatusResponse>;
}

/** The job application service definition. */

export interface NotificationServiceController {
  sendNotification(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> | Observable<SendNotificationResponse> | SendNotificationResponse;

  getNotifications(
    request: GetUserNotificationsRequest,
  ): Promise<GetUserNotificationsResponse> | Observable<GetUserNotificationsResponse> | GetUserNotificationsResponse;

  updateNotificationStatus(
    request: UpdateNotificationStatusRequest,
  ):
    | Promise<UpdateNotificationStatusResponse>
    | Observable<UpdateNotificationStatusResponse>
    | UpdateNotificationStatusResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendNotification", "getNotifications", "updateNotificationStatus"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
