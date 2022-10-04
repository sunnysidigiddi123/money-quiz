import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Req, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Serializeduser } from 'src/types';
import { LoginUserDto } from 'src/dtos/Users/LoginUser.dto';
import { IGetUserAuthInfoRequest } from 'src/users/middlewares/validate-user.middleware';
import { Response } from 'express';
import { CreateUserProfileDto } from 'src/dtos/Users/CreateUserProfile.dto';
import { CreateAdminDto } from 'src/dtos/Users/CreateAdmin.dto';



@Controller('users')
export class UsersController {

  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService 
              
  ){}

    @Get('')
    getUsers() {
        return this.usersService.findUsers();
    }

    @Get('/getuserwallet')
    async getuserwallet(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const getuserwallet = await this.usersService.getuserwallet(request);
        if (getuserwallet) {

            response.status(201).send(getuserwallet)
        }

    }


    @Get('/getenumvalues')
    async getenumvalues(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const getenumvalues = await this.usersService.getenumvalues(request);
        if (getenumvalues) {

            response.status(201).send(getenumvalues)
        }

    }

    @Get('/getuserid')
    async home(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {

        const user = await this.usersService.home(request);

        if (user) {

            response.status(201).send(user)
        }


    }

    @Get('admin/getuserid')
    async adminhome(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {

        const user = await this.usersService.adminhome(request);

        if (user) {

            response.status(201).send(user)
        }


    }

    @Get('/profileinfo')
    async profileinfo(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const user = await this.usersService.profileinfo(request);
        if (user) {

            response.status(201).send(user)
        }

    }

    @Get('/getdetails')
    async getdetails(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const user = await this.usersService.getdetails(request);
        if (user) {

            response.status(201).send(user)
        }

    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    async getContestById(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const contest = await this.usersService.getUserById(id);

        if (contest) {
            response.status(201).send(contest)
        }


    }

    @Post('signup')
    @UsePipes(ValidationPipe)      //for class-validator to import
    async signupUsers(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
        console.log(createUserDto)
        const user = await this.usersService.signupUser(createUserDto);
        if (user) {
            response.status(201).send(user)
        }
    }

    @Post('/admin/signup')
    @UsePipes(ValidationPipe)      //for class-validator to import
    async signupAdmin(@Body() createAdminDto: CreateAdminDto, @Res() response: Response) {
        console.log(createAdminDto)
        const admin = await this.usersService.signupAdmin(createAdminDto);
        if (admin) {
            response.status(201).send(admin)
        }
    }

    @Post('login')
    @UsePipes(ValidationPipe)      //for class-validator to import
    async loginUsers(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
        const user = await this.usersService.loginUser(loginUserDto);
        if (user) {
            response.status(202).send(user)
        } else
            throw new HttpException("You have entered an invalid username or password", HttpStatus.BAD_REQUEST)
    }

    @Post('admin/login')
    @UsePipes(ValidationPipe)      //for class-validator to import
    async loginAdmin(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
        const admin = await this.usersService.loginAdmin(loginUserDto);
        if (admin) {
            response.status(202).send(admin)
        } else
            throw new HttpException("You have entered an invalid username or password", HttpStatus.BAD_REQUEST)
    }


    @UseInterceptors(ClassSerializerInterceptor) // to import class serialized restrict password interceptors
    @Get('/:name')
    async getUsersbyname(@Param('name') name: string) {
        const user = await this.usersService.getUserByName(name);
        console.log(user, "hhhhh")
        if (user)
            return new Serializeduser(user); // if we dont want to use plaintoclass then user this .
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    @Post('refresh-token')
    @UsePipes(ValidationPipe)      //for class-validator to import
    async refreshtoken(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const refreshtoken = await this.usersService.refreshtoken(request);

        if (refreshtoken) {
            response.status(202).send(refreshtoken)
        }
    }

    @Post('forgotPassword')
    @UsePipes(ValidationPipe)
    async forgotPassword(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const forgotpassword = await this.usersService.forgotPassword(request, response);

        if (forgotpassword) {
            response.status(201).send(forgotpassword)
        }
    }

    @Post('otp-verification')
    @UsePipes(ValidationPipe)
    async otpVerification(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const otpverified = await this.usersService.otpVerification(request);

        if (otpverified) {

            response.status(200).send(otpverified)

        }
    }

    @Post('reset-password')
    @UsePipes(ValidationPipe)
    async resetPassword(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const resetpassword = await this.usersService.resetPassword(request);

        if (resetpassword) {

            response.status(201).send(resetpassword)
        }
    }

    @Post('update-profile')
    @UsePipes(ValidationPipe)
    async updateprofile(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response, @Body() userprofileDto: CreateUserProfileDto) {
        const updateprofile = await this.usersService.updateprofile(request, userprofileDto);

        if (updateprofile) {

            response.status(201).send(updateprofile)
        }
    }

    @Post('getpincodedata')
    @UsePipes(ValidationPipe)
    async getpincodedata(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const getpincodedata = await this.usersService.getpincodedata(request);

        if (getpincodedata) {

            response.status(201).send(getpincodedata)
        }
    }


    @Post('getpincodedataadmin')
    @UsePipes(ValidationPipe)
    async getpincodedataadmin(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const getpincodedataadmin = await this.usersService.getpincodedataadmin(request);

        if (getpincodedataadmin) {

            response.status(201).send(getpincodedataadmin)
        }
    }

    @Post('addmoneywallet')
    @UsePipes(ValidationPipe)
    async addmoneywallet(@Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
        const addmoneywallet = await this.usersService.addmoneywallet(request);

        if (addmoneywallet) {

            response.status(201).send(addmoneywallet)
        }
    }
   




}