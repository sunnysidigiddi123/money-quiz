import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AdminContestsModule } from './admincontests/admincontests.module';
import { QuestionsModule } from './questions/questions.module';
import { PublishedcontestModule } from './publishedcontests/publishedcontest.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import * as dotenv from "dotenv";
import entities from './typeorm';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type :'mysql',
    host:'localhost',
    port:parseInt(process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: true,
  }), UsersModule, AdminContestsModule, QuestionsModule, PublishedcontestModule, BroadcastModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
