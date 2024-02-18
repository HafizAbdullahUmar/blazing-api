import { ObjectId } from 'mongodb';
import { Role } from '../orm/entities/users/types';

export type JwtPayload = {
  id: ObjectId;
  name: string;
  email: string;
  role: Role;
  created_at: Date;
};
