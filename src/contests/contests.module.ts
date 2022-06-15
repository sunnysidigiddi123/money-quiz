import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applieduser, Livecontest, Savedcontest, User } from 'src/typeorm';
import { Auditcontest } from 'src/typeorm/contests/Auditcontest';
import { ContestController } from './controllers/contest/contest.controller';
import { ContestService } from './services/contest/contest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Savedcontest,Livecontest,Auditcontest,User,Applieduser])],
  controllers: [ContestController],
  providers: [
    {
      provide: 'CONTEST_SERVICE',
      useClass: ContestService, 
    }
    ]
})
export class ContestsModule {}
