import { Document } from 'mongoose';

export interface UserInterface extends Document {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  fullName: string | undefined | null;
  email: string | null;
  password: string | undefined;
  username: string | undefined;
  phone: string | undefined | null;
  dob: string | undefined | null;
  gender: string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  occupation: string | undefined;
  refreshToken: string[] | undefined;
  online: {
    status: boolean | undefined;
    lastSeen: Date;
  };
  roles: {
    User: number | string | undefined;
    Admin?: number | string | undefined;
    Dev?: number | string | undefined;
    Staff?: number | string | undefined;
  };
  socialHandles: {
    facebook: string;
    twitter: string;
    instagram: string;
    github: string;
    behance: string;
    // whatsapp: string;
    // whatsapp: string;
    // whatsapp: string;
  };
  bio: string | undefined;
  userImage: string | undefined;
  accountStatus: undefined | string | number | null;
  verificationStatus: string | number | boolean;
  accountSecurity_2FA: boolean | string | null;
}
