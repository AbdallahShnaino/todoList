export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status?: boolean;
  determinedAt?: Date;
}
