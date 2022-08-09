import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { request, Response } from 'express';
import { diskStorage } from 'multer';
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

    @Post('upload')
    @UseInterceptors(
        FileInterceptor("file",{
          storage: diskStorage({
            destination: './uploads',
            filename:(req,file,cb)=>{
              const name = file.originalname.split('.')[0];
              const fileExtension = file.originalname.split('.')[1];
              const newFileName = name.split(" ").join('_')+'_'+Date.now()+'.'+fileExtension;

              cb(null,newFileName);
            }
          }),
          fileFilter: (req,file,cb) => {
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                 return cb(null,false);
            }
            cb(null,true);
          }

        })
    )
    uploadPhoto(@UploadedFile() file:Express.Multer.File ){

       console.log(file)
       if(!file){
         throw new BadRequestException('File is not an image');
       }else{
         const response = {
            filePath: `http://localhost:4000/admincontest/pictures/${file.filename}`
         }
       }
    }


   @Get('pictures/:filename')
   async getPicture(@Param('filename') filename, @Res() res:Response){
      
      res.sendFile(filename,{root:'./uploads'})


   }

}
