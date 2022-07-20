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

@Post('reenter')
@UsePipes(ValidationPipe)   
 async reenter(@Req() request: IGetUserAuthInfoRequest){

  const reenter = await this.broadcastService.reenter(request);
  if(reenter){
    throw new HttpException(reenter,HttpStatus.CREATED)
  }
}

@Post('getpollvalues')
@UsePipes(ValidationPipe)   
 async getpollvalues(@Req() request: IGetUserAuthInfoRequest){

  const getpollvalues = await this.broadcastService.getpollvalues(request);
  if(getpollvalues){
    throw new HttpException(getpollvalues,HttpStatus.CREATED)
  }
}

@Post('getInitialUsers')
@UsePipes(ValidationPipe)   
 async getInitialUsers(@Req() request: IGetUserAuthInfoRequest){

  const getInitialUsers = await this.broadcastService.getInitialUsers(request);
  if(getInitialUsers){
    throw new HttpException(getInitialUsers,HttpStatus.CREATED)
  }
}



@Post('creditwinningamount')
@UsePipes(ValidationPipe)   
 async creditwinningamount(@Req() request: IGetUserAuthInfoRequest){

  const creditwinningamount = await this.broadcastService.creditwinningamount(request);
  if(creditwinningamount){
    throw new HttpException(creditwinningamount,HttpStatus.CREATED)
  }
}



}
