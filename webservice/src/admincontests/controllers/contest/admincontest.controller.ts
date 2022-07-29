import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AdminContestService, IGetUserAuthInfoRequest } from 'src/admincontests/services/contest/admincontest.service';
import { CreateAdminContestDto } from 'src/dtos/contests/CreateAdminContest.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('admincontest')
export class AdminContestController {

    constructor(@Inject('ADMINCONTEST_SERVICE') private readonly admincontestService: AdminContestService,
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) { }


    @Get('getContest')
    @UseInterceptors(ClassSerializerInterceptor)
    async getContest(@Res() response: Response) {

        const savedcontest = await this.admincontestService.getSavedContest();

        if(savedcontest){
            response.status(201).send(savedcontest)
        }

    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    async getContestById(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const contest = await this.admincontestService.getSavedContestById(id);
        if(contest){
            response.status(201).send(contest)
        }
    }


    @Post('createContest')
    @UsePipes(ValidationPipe)
    async createContest(@Body() adminContestDto: CreateAdminContestDto, @Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const user = await this.userService.getUserById(request.userId)
        console.log(adminContestDto)
        const newContest = await this.admincontestService.createContest(adminContestDto, user, request);
        if (newContest)
            response.status(201).send(newContest)
        else throw new HttpException("COntest Not Created", HttpStatus.BAD_REQUEST)

    }


    @Post('getSegment')
    @UsePipes(ValidationPipe)
    async getSegment(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {

   
        const segment = await this.admincontestService.getSegment(request);
        if(segment){
            response.status(201).send(segment)
        }

    }



}
