import { Expose, Type } from 'class-transformer';
import { User } from '../../users/entity/user.entity';

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
  owner: User;

  /* 

  @Expose({ toPlainOnly: true })
  users: User[];
*/
}
