import { Expose } from 'class-transformer';
import { User } from 'src/users/interface/User.interface';

export class ShowEventDto {
  @Expose()
  id: string;

  @Expose()
  ownerId: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  locLongitude: number;

  @Expose()
  locLatitude: number;

  @Expose()
  type: string;

  @Expose()
  startingAt: Date;

  @Expose()
  finishedAt: Date;
  @Expose()
  users: User[];
}
