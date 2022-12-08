import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Length,
  AllowNull,
  AutoIncrement,
  BeforeUpdate,
  BeforeCreate,
  BelongsTo,
  ForeignKey,
  IsIn,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({ timestamps: true })
export class Event extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Length({ max: 50, min: 5 })
  @Column({ allowNull: false })
  title: string;

  @Column({ type: 'double' })
  locLongitude: number;

  @Column({ type: 'double' })
  locLatitude: number;

  @Column({ type: 'text' })
  description: string;

  @IsIn([['public', 'private']])
  @Column({ type: 'varchar(8)' })
  type: string;

  @Column({ type: 'timestamp', allowNull: false })
  startingAt: Date;

  @Column({ type: 'timestamp', allowNull: false })
  finishedAt: Date;

  @BeforeCreate
  static changeCreatedAtValue(instance: User) {
    instance.createdAt = new Date();
  }

  @BeforeUpdate
  static changeUpdatedAtValue(instance: User) {
    instance.updatedAt = new Date();
  }
}
