import { Expose } from 'class-transformer';

export class ShowTaskDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: boolean;

  @Expose()
  determinedAt: Date;
}
