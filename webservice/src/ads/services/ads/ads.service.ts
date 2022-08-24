import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateAdsDto } from 'src/dtos/Ads/CreateAds.dto';
import { User, Ads, Ads_question, Ads_target } from 'src/typeorm';
import { IGetUserAuthInfoRequest } from 'src/users/middlewares/validate-user.middleware';
import { CreateAdsQuestionDto } from 'src/dtos/Ads/CreateAdsQuestion.dto';



@Injectable()
export class AdsService {

    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        @InjectRepository(Ads)
        private readonly adsRepository: Repository<Ads>,
        @InjectRepository(Ads_question)
        private readonly questionRepository: Repository<Ads_question>,
        @InjectRepository(Ads_target)
        private readonly adsTargetRepository: Repository<Ads_target>,

    ) { }


    async createAd(adsDto: CreateAdsDto, user: User, request: IGetUserAuthInfoRequest) {

        try {
            const users = await this.UserRepository.findOne({ where: { id: request.userId } })
            console.log(users, "Sfsdfds")
            const newAd = this.adsRepository.create({
                adName: adsDto.adName,
                adDetails: adsDto.adDetails,
                adTime: adsDto.adTime,
                adImage: adsDto.adImage,
                winningAmount: adsDto.winningAmount,
                publish: adsDto.publish,
                user: users
            });

            const newAdTarget = this.adsTargetRepository.create({

                ageGroup: adsDto.ageGroup,
                location: adsDto.location
            })
            newAd.Ads_target = newAdTarget 
            console.log(newAd, "Sfsdsfsddfgddfds", user.ads)
            user.ads = [...user.ads, newAd]
            console.log("kjhjk", user.ads)

            await this.adsTargetRepository.save(newAdTarget)
            await this.UserRepository.save(user)
            await this.adsRepository.save(newAd)

            return { message: "Ad Created Succssfully", Ad: newAd }

        } catch (e) {

            throw new HttpException(e, HttpStatus.BAD_REQUEST)

        }
    }

   
    getAdsById(id:number){
    
        try{
  
        return this.adsRepository.findOne({where: { id }, relations: ['questions']})
       
       }catch(e){
        
              throw new HttpException(e, HttpStatus.BAD_REQUEST) 
        }
  }


  async createAdsQuestion(questionDto: CreateAdsQuestionDto, ads: Ads) {

    const newQuestion = this.questionRepository.create(questionDto);
    ads.questions = [...ads.questions, newQuestion]
    console.log("qqqqq", ads.questions)
    await this.questionRepository.save(newQuestion)
    await this.adsRepository.save(ads);
    return newQuestion;


}

}
