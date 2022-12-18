import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
