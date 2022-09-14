import { Controller, HttpException, HttpStatus, Inject, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BroadcastService, IGetUserAuthInfoRequest } from 'src/broadcast/services/broadcast/broadcast.service';
import { Response } from 'express';

@Controller('broadcast')
export class BroadcastController {
  tokensRepository: any;

    constructor(@Inject('BROADCAST_SERVICE') private readonly broadcastService: BroadcastService,
   
){}


@Post('answerCheck')
@UsePipes(ValidationPipe)   
 async answerCheck(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const answercheck = await this.broadcastService.answerCheck(request);
  
  if(answercheck){
    response.status(201).send(answercheck)
  }
}

@Post('cashout')
@UsePipes(ValidationPipe)   
 async cashout(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const cashout = await this.broadcastService.cashout(request);
  if(cashout){
    response.status(201).send(cashout)
  }
}

@Post('quit')
@UsePipes(ValidationPipe)   
 async quit(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const quit = await this.broadcastService.quit(request);
  if(quit){
    response.status(201).send(quit)
  }
}

@Post('reenter')
@UsePipes(ValidationPipe)   
 async reenter(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const reenter = await this.broadcastService.reenter(request);
  if(reenter){
    response.status(201).send(reenter)
  }
}

@Post('getpollvalues')
@UsePipes(ValidationPipe)   
 async getpollvalues(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const getpollvalues = await this.broadcastService.getpollvalues(request);
  if(getpollvalues){
    response.status(201).send(getpollvalues)
  }
}

@Post('getInitialUsers')
@UsePipes(ValidationPipe)   
 async getInitialUsers(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const getInitialUsers = await this.broadcastService.getInitialUsers(request);
  if(getInitialUsers){
    response.status(201).send(getInitialUsers)
  }
}



@Post('creditwinningamount')
@UsePipes(ValidationPipe)   
 async creditwinningamount(@Req() request: IGetUserAuthInfoRequest,@Res() response: Response){

  const creditwinningamount = await this.broadcastService.creditwinningamount(request);
  if(creditwinningamount){
    response.status(201).send(creditwinningamount)
  }
}


}


