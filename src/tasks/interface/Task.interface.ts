export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: boolean;
  determinedAt: Date;
}
