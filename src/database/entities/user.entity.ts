import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Length,
  AllowNull,
  Default,
  Sequelize,
  IsEmail,
  BeforeUpdate,
  BeforeCreate,
  BeforeDestroy,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Length({ min: 4, max: 50 })
  @AllowNull(false)
  @Column
  fullName: string;

  @AllowNull(false)
  @Length({ min: 4, max: 50 })
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Length({ min: 4, max: 50 })
  @Column
  password: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @CreatedAt
  @Column
  creationDate: Date;

  @UpdatedAt
  @Column
  updatedOn: Date;

  @DeletedAt
  @Column
  deletionDate: Date;

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateAndUpdate(record: User) {
    console.log('new create or update');
  }
}

/* 

INSERT INTO Users (fullName,email,password) VALUES ('ali ahmed','ali@gmail.com','12654321' );
UPDATE Users SET email = 'hi@google.com' WHERE fullName = 'ali ahmed';

*/
