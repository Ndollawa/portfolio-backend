/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Any } from "../google/protobuf/any";
import { Timestamp } from "../google/protobuf/timestamp";
import { FindAllDto, FindOneDto, UpdateDto } from "./utils";

export const protobufPackage = "auth";

export interface SaveUserTokenDto {
  id: string;
  refreshToken: string[];
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserDto {
  user: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OnlineStatus {
  status: boolean;
  lastSeen: string;
}

export interface Links {
  title: string;
  url: string;
}

export interface OtherLinks {
  links: Links[];
}

export interface SocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  github: string;
  behance: string;
  whatsapp: string;
  thread: string;
  otherLinks: OtherLinks | undefined;
}

export interface ActiveEnum {
}

export enum ActiveEnum_ActiveStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  DELETED = 2,
  UNRECOGNIZED = -1,
}

export interface ContentEnum {
}

export enum ContentEnum_ContentStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  DELETED = 2,
  UNRECOGNIZED = -1,
}

export interface WalletEnum {
}

export enum WalletEnum_WalletType {
  FIAT = 0,
  CRYPTO = 1,
  CREDIT = 2,
  TOKEN = 3,
  UNRECOGNIZED = -1,
}

export interface MessageEnum {
}

export enum MessageEnum_MessageState {
  READ = 0,
  UNREAD = 1,
  REMOVED = 2,
  DELETED = 3,
  UNRECOGNIZED = -1,
}

export interface ProfileEnum {
}

export enum ProfileEnum_ProfileStatus {
  DISABLED = 0,
  BANNED = 1,
  DIACTIVATED = 2,
  PAUSED = 3,
  ACTIVE = 4,
  DELETED = 5,
  UNRECOGNIZED = -1,
}

export interface ProjectEnum {
}

export enum ProjectEnum_ProjectStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  PUBLISHED = 3,
  UNRECOGNIZED = -1,
}

export interface User {
  id: string;
  email: string;
  username: string;
  password?: string | undefined;
  profile: Profile | undefined;
  roles: Role[];
  registeredApps: RegisteredApp[];
  refreshTokens: RefreshToken[];
  posts: Post[];
  comments: Comment[];
  conversations: Conversation[];
  messages: Message[];
  rooms: Room[];
  wallets: Wallet[];
  portfolio: Portfolio | undefined;
  verificationStatus: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface RefreshToken {
  id: string;
  user: User | undefined;
  userId: string;
  refreshToken: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Profile {
  id: string;
  user?: User | undefined;
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  bio: string;
  for: string;
  image: string;
  status: ProfileEnum_ProfileStatus;
  authentication2FA: boolean;
  socialHandles: SocialMedia | undefined;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface App {
  id: string;
  name: string;
  appId: string;
  registeredApp: RegisteredApp[];
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface RegisteredApp {
  id: string;
  app: App | undefined;
  authorized: boolean;
  authorizedDate: Timestamp | undefined;
  user: User | undefined;
  userId: string;
  appId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Role {
  id: string;
  role: string;
  code: string;
  user: User | undefined;
  userId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  description: string;
  image: string;
  tags: string;
  status: ContentEnum_ContentStatus;
  categories: Category[];
  comments: Comment[];
  attachments: Attachment[];
  readCount: number;
  readingTime: string;
  author: User | undefined;
  authorId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Comment {
  id: string;
  subject: string;
  status: ContentEnum_ContentStatus;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  for: string;
  parent: Comment | undefined;
  parentId: string;
  children: Comment[];
  author: User | undefined;
  authorId: string;
  authorType: string;
  post: Post | undefined;
  postId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Category {
  id: string;
  name: string;
  status: ContentEnum_ContentStatus;
  type: string;
  parent: Category | undefined;
  parentId: string;
  children: Category[];
  post: Post | undefined;
  postId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  for: string;
  post: Post | undefined;
  project: Project | undefined;
  service: Service | undefined;
  message: Message | undefined;
  postId: string;
  serviceId: string;
  projectId: string;
  messageId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Portfolio {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  bio: string;
  image: string;
  user: User | undefined;
  userId: string;
  educations: Education[];
  experiences: Experience[];
  certifications: Certification[];
  testimonials: Testimonial[];
  projects: Project[];
  services: Service[];
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Education {
  id: string;
  institution: string;
  award: string;
  overview: string;
  currentlyActive: boolean;
  startDate: Timestamp | undefined;
  endDate: Timestamp | undefined;
  portfolio: Portfolio | undefined;
  portfolioId: string;
  status: ActiveEnum_ActiveStatus;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Experience {
  id: string;
  position: string;
  overview: string;
  currentlyActive: boolean;
  startDate: Timestamp | undefined;
  endDate: Timestamp | undefined;
  status: ActiveEnum_ActiveStatus;
  portfolio: Portfolio | undefined;
  portfolioId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Certification {
  id: string;
  image: string;
  issuedBy: string;
  validThrough: string;
  refNo: string;
  status: ActiveEnum_ActiveStatus;
  portfolio: Portfolio | undefined;
  portfolioId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Testimonial {
  id: string;
  author: string;
  subject: string;
  body: string;
  for: string;
  status: ActiveEnum_ActiveStatus;
  portfolio: Portfolio | undefined;
  portfolioId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Project {
  id: string;
  title: string;
  body: string;
  description: string;
  image: string;
  tags: string;
  status: ProjectEnum_ProjectStatus;
  attachments: Attachment[];
  portfolio: Portfolio | undefined;
  portfolioId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Service {
  id: string;
  title: string;
  body: string;
  description: string;
  icon: string;
  image: string;
  tags: string;
  for: string;
  status: ContentEnum_ContentStatus;
  attachments: Attachment[];
  portfolio: Portfolio | undefined;
  portfolioId: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Faq {
  id: string;
  for: string;
  title: string;
  body: string;
  status: ActiveEnum_ActiveStatus;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Message {
  id: string;
  conversation: Conversation | undefined;
  conversationId: string;
  sender: User | undefined;
  senderId: string;
  message: string;
  state: MessageEnum_MessageState;
  status: ActiveEnum_ActiveStatus;
  attachments: Attachment[];
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Conversation {
  id: string;
  members: User[];
  messages: Message[];
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Room {
  id: string;
  members: User[];
  title: string;
  description: string;
  image: string;
  status: ActiveEnum_ActiveStatus;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Wallet {
  id: string;
  user: User | undefined;
  userId: string;
  balance: number;
  type: WalletEnum_WalletType;
  currency: Any | undefined;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: FindAllDto): Observable<Users>;

  findUser(request: FindOneDto): Observable<User>;

  updateUser(request: UpdateDto): Observable<User>;

  removeUser(request: FindOneDto): Observable<User>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: FindAllDto): Promise<Users> | Observable<Users> | Users;

  findUser(request: FindOneDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUsers", "findUser", "updateUser", "removeUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

export interface AuthServiceClient {
  login(request: LoginUserDto): Observable<AccessToken>;

  register(request: RegisterUserDto): Observable<User>;

  refreshToken(request: User): Observable<AccessToken>;

  logout(request: User): Observable<User>;
}

export interface AuthServiceController {
  login(request: LoginUserDto): Promise<AccessToken> | Observable<AccessToken> | AccessToken;

  register(request: RegisterUserDto): Promise<User> | Observable<User> | User;

  refreshToken(request: User): Promise<AccessToken> | Observable<AccessToken> | AccessToken;

  logout(request: User): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "register", "refreshToken", "logout"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
