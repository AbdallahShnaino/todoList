import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  IsIn,
  PrimaryKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Event } from './event.entity';

@Table({ timestamps: false })
export class EventGroup extends Model {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ allowNull: false })
  userId: number;

  @IsIn([['admin', 'member', 'assistant']])
  @Column({ allowNull: false })
  role: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Event)
  @PrimaryKey
  @Column({ allowNull: false })
  eventId: number;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ allowNull: false })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
