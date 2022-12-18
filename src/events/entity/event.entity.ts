import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

import { User } from '../../users/entity/user.entity';
@Entity()
export class Event {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  locLongitude: number;
  @Column()
  locLatitude: number;
  @Column()
  type: string;
  @Column()
  startingAt: Date;
  @Column()
  finishedAt: Date;
  @Column((type) => User)
  owner: User;
  @Column((type) => User)
  users: User[];
}
