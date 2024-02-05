import {
  Prisma
} from '@prisma/client';

// Enums
enum PostStatus {
  DRAFT,
  PUBLISHED,
}

enum ActiveStatus {
  ACTIVE,
  INACTIVE,
  DELETED,
}

enum CommentStatus {
  DRAFT,
  PUBLISHED,
  DELETED,
}

enum WalletType {
  FIAT,
  CRYPTO,
  CREDIT,
  TOKEN,
}

enum MessageState {
  READ,
  UNREAD,
  REMOVED,
  DELETED,
}

enum ProfileStatus {
  DISABLED,
  BANNED,
  DIACTIVATED,
  PAUSED,
  ACTIVE,
  DELETED,
}

enum ProjectStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  PUBLISHED,
}

// export Interfaces

// Main User 
export interface BaseUser {
  id: string;
  email: string;
  username: string;
  password: string;
  verificationStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseUser {
  refreshTokens?: RefreshToken[];
  profile?: Profile;
  registeredApps?: RegisteredApp[];
  roles?: Role[];
  posts?: Post[];
  comments?: Comment[];
  conversations?: Conversation[];
  messages?: Message[];
  rooms?: Room[];
  wallets?: Wallet[];
  portfolio?: Portfolio;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshToken {
  id: string;
  user: User;
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

interface  SocialMedia {
    facebook :string;
    twitter :string;
    instagram:string;
    github :string;
    behance:string;
    whatsapp:string;
    thread :string;
    otherLinks:unknown;
}

export interface Profile {
  id: string;
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
  online: unknown;
  bio: string;
  for: string;
  image: string;
  status: ProfileStatus;
  accountSecurity_2FA: boolean;
  createdAt: Date;
  updatedAt: Date;
 socialHandles:SocialMedia
}

export interface App {
  id: string;
  name: string;
  appId: string;
  registeredApp: RegisteredApp[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisteredApp {
  id: string;
  app: App;
  authorized: boolean;
  authorizedDate: Date;
  user: User;
  userId: string;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  role: string;
  code: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  description: string;
  image: string;
  tags: string;
  status: PostStatus;
  categories: Category[];
  comments: Comment[];
  attachments: Attachment[];
  readCount: bigint;
  readingTime: string;
  author: User;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  subject: string;
  status: CommentStatus;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  for: string;
  parent: Comment;
  parentId: string;
  children: Comment[];
  author: User;
  authorId: string;
  authorType: string;
  post: Post;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  status: PostStatus;
  type: string;
  parent: Category;
  parentId: string;
  children: Category[];
  post: Post;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  for: string;
  post: Post;
  project: Project;
  service: Service;
  message: Message;
  postId: string;
  serviceId: string;
  projectId: string;
  messageId: string;
  createdAt: Date;
  updatedAt: Date;
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
  user: User;
  userId: string;
  educations: Education[];
  experiences: Experience[];
  certifications: Certification[];
  testimonial: Testimonial[];
  projects: Project[];
  services: Service[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  institution: string;
  award: string;
  overview: string;
  currentlyActive: boolean;
  startDate: Date;
  endDate: Date;
  portfolio: Portfolio;
  portfolioId: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  position: string;
  overview: string;
  currentlyActive: boolean;
  startDate: Date;
  endDate: Date;
  status: ActiveStatus;
  portfolio: Portfolio;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  image: string;
  issuedBy: string;
  validThrough: string;
  refNo: string;
  status: ActiveStatus;
  portfolio: Portfolio;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  author: string;
  subject: string;
  body: string;
  for: string;
  status: ActiveStatus;
  portfolio: Portfolio;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  body: string;
  description: string;
  image: string;
  tags: string;
  status: ProjectStatus;
  attachments: Attachment[];
  portfolio: Portfolio;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
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
  status: PostStatus;
  attachments: Attachment[];
  portfolio: Portfolio;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Faq {
  id: string;
  for: string;
  title: string;
  body: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversation: Conversation;
  conversationId: string;
  sender: User;
  senderId: string;
  message: string;
  state: MessageState;
  status: ActiveStatus;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  members: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  members: User[];
  title: string;
  description: string;
  image: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  user: User;
  userId: string;
  balance: number;
  type: WalletType;
  currency: unknown;
  createdAt: Date;
  updatedAt: Date;
}
