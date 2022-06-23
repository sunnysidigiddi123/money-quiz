import { Controller, HttpException, HttpStatus, Inject, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { BroadcastService, IGetUserAuthInfoRequest } from 'src/broadcast/services/broadcast/broadcast.service';


@Controller('broadcast')
export class BroadcastController {

    constructor(@Inject('BROADCAST_SERVICE') private readonly broadcastService: BroadcastService,
   
){}


@Post('answerCheck')
@UsePipes(ValidationPipe)   
 answerCheck(@Req() request: IGetUserAuthInfoRequest){

  return this.broadcastService.answerCheck(request);

}

@Post('cashout')
@UsePipes(ValidationPipe)   
 async cashout(@Req() request: IGetUserAuthInfoRequest){

  const cashout = await this.broadcastService.cashout(request);
  if(cashout){
    throw new HttpException(cashout,HttpStatus.CREATED)
  }
}

@Post('quit')
@UsePipes(ValidationPipe)   
 async quit(@Req() request: IGetUserAuthInfoRequest){

  const quit = await this.broadcastService.quit(request);
  if(quit){
    throw new HttpException(quit,HttpStatus.CREATED)
  }
}


}
