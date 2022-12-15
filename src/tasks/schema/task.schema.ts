import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  userId: String;

  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop({ required: false })
  status: Boolean;

  @Prop({ required: true })
  determinedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
