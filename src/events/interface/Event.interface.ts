import { User } from 'src/users/interface/User.interface';

export interface Event {
  id: number;
  title: string;
  ownerId: string;
  description: string;
  locLongitude?: number;
  locLatitude?: number;
  type?: string;
  startingAt: Date;
  finishedAt: Date;
  users: [User];
}
