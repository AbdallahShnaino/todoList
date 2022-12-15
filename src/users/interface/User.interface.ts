import { Event } from '../../events/interface/Event.interface';
import { Task } from '../../tasks/interface/Task.interface';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}
