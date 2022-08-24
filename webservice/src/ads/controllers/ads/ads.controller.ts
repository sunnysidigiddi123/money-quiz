import { AdsService } from 'src/ads/services/ads/ads.service';
import { UsersService } from 'src/users/services/users/users.service';
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Query, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { request, Response } from 'express';
import { CreateAdsDto } from 'src/dtos/Ads/CreateAds.dto';
import { IGetUserAuthInfoRequest } from 'src/users/middlewares/validate-user.middleware';
import { CreateAdsQuestionDto } from 'src/dtos/Ads/CreateAdsQuestion.dto';
import { Serializedquestion } from 'src/types';
@Controller('ads')
export class AdsController {


    constructor(@Inject('ADS_SERVICE') private readonly adsService: AdsService,
    @Inject('USER_SERVICE') private readonly userService: UsersService
   ) { }

   @Get('getAds')
   @UseInterceptors(ClassSerializerInterceptor)
   async getAds(@Res() response: Response) {

       const savedcontest = await this.adsService.getAds();

       if(savedcontest){
           response.status(201).send(savedcontest)
       }

   }

   @Post('createAd')
   @UsePipes(ValidationPipe)
   async createAd(@Body() adsDto:CreateAdsDto, @Req() request: IGetUserAuthInfoRequest, @Res() response: Response) {
       const user = await this.userService.getUserById(request.userId)
  
       const newAd = await this.adsService.createAd(adsDto, user, request);
       if (newAd)
           response.status(201).send(newAd)
       else throw new HttpException("Ad Not Created", HttpStatus.BAD_REQUEST)

   }

   @Get('/:id')
   @UseInterceptors(ClassSerializerInterceptor)
   async getAdsById(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

       const ads = await this.adsService.getAdsById(id);
       if(ads){
           response.status(201).send(ads)
       }
   }


   @Post('createAdsQuestion')
   @UseInterceptors(ClassSerializerInterceptor)
   @UsePipes(ValidationPipe)   
   async createAdsQuestion(@Body() createAdsQuestionDto:CreateAdsQuestionDto){
      const Ads = await this.adsService.getAdsById(createAdsQuestionDto.adsId)
      const question = await this.adsService.createAdsQuestion(createAdsQuestionDto,Ads);
      if(question)
      return new Serializedquestion(question);
      else throw new HttpException("Question Not Created",HttpStatus.BAD_REQUEST)
   }



}
