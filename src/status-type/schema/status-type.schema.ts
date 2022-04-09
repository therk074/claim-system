import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusTypeDocument = StatusType & Document;

@Schema({ timestamps: true })
export class StatusType {

    @Prop()
    status_id: number;

    @Prop({ required: true })
    title: string;
}

export const StatusTypeSchema = SchemaFactory.createForClass(StatusType);