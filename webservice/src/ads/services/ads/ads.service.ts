import { All, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, IsNull, Not, Repository } from 'typeorm';
import { Request } from 'express';
import { CreateAdsDto } from 'src/dtos/Ads/CreateAds.dto';
import { User, Ads, Ads_question, Ads_target, Ads_played_users, Admin, user_profile, profile_address} from 'src/typeorm';
import { IGetUserAuthInfoRequest } from 'src/users/middlewares/validate-user.middleware';
import { CreateAdsQuestionDto } from 'src/dtos/Ads/CreateAdsQuestion.dto';
import { GenderTypes } from 'src/utils/enums';
import { skip } from 'rxjs';
import { count } from 'console';




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
        @InjectRepository(Ads_played_users)
        private readonly adsPlayedUserRepository: Repository<Ads_played_users>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(profile_address)
        private readonly profileaddressRepository: Repository<profile_address>,

    ) { }


    async createAd(adsDto: CreateAdsDto, admin: Admin, request: IGetUserAuthInfoRequest) {

        try {
            console.log(request.userId, "aaa")
            const users = await this.adminRepository.findOne({ where: { id: request.userId } })
            console.log(users, "Sfsdfds")
            const newAd = this.adsRepository.create({
                adName: adsDto.adName,
                adDetails: adsDto.adDetails,
                adTime: adsDto.adTime,
                adImage: adsDto.adImage,
                winningAmount: adsDto.winningAmount,
                publish: adsDto.publish,
                admin: users
            });

            const newAdTarget = this.adsTargetRepository.create({

                ageGroup: adsDto.ageGroup,
                location: adsDto.location,
                pin: adsDto.pin,
                district:adsDto.district,
                state: adsDto.state,
                gender: adsDto.gender,
                incomegroup: adsDto.income,
                country:adsDto.country
            })
            newAd.Ads_target = newAdTarget
            console.log(newAd, "Sfsdsfsddfgddfds", admin.ads)
            admin.ads = [...admin.ads, newAd]
            console.log("kjhjk", admin.ads)

            await this.adsTargetRepository.save(newAdTarget)
            await this.adminRepository.save(admin)
            await this.adsRepository.save(newAd)

            return { message: "Ad Created Succssfully", Ad: newAd }

        } catch (e) {

            throw new HttpException(e, HttpStatus.BAD_REQUEST)

        }
    }


    getAdsById(id: number) {

        try {

            return this.adsRepository.findOne({ where: { id }, relations: ['questions'] })

        } catch (e) {

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

    async getAds(request: IGetUserAuthInfoRequest) {
        try {
            console.log("id", request.userId);
            const user = await this.UserRepository.findOne({
                where: {
                    id: request.userId,
                },
                relations: ['userProfile']
            });
            console.log("users", user);
            const address = await this.profileaddressRepository.findOne({ relations: { user_profile: true }, where: { user_profile: { user: { id: request.userId } } } })
            console.log(address)
            const [adss, count] = await this.adsRepository.findAndCount({
                relations: {
                    Ads_target: true

                },

            })
            if (user.userProfile == null) {


                const ads = await this.adsRepository.find({
                    relations: {
                        Ads_target: true

                    },
                    where:
                    {
                        Ads_target: {
                            gender: '',
                            country: '',
                            state: '',
                            incomegroup: '',
                            ageGroup: ''

                        }


                    },
                })

                console.log("ppp", ads, address)
                return { ads: ads }

            }
            if (user.userProfile != null) {
                const objj = []
                const adsss = []
                var sum = 0
                for (let i = 0; i < count; i++) {
                    console.log("ggg", sum)
                    if (adss[sum].Ads_target.gender == '' && adss[sum].Ads_target.country == '' && adss[sum].Ads_target.state == '' && adss[sum].Ads_target.incomegroup == ''
                        && adss[sum].Ads_target.ageGroup == '') {

                        const obj = {
                            gender: '',
                            country: '',
                            state: '',
                            incomegroup: '',
                            ageGroup: '',


                        };
                        objj.push(obj)
                    } else {

                        const obj = {
                            ...(adss[sum].Ads_target.gender != '') && { gender: user.userProfile.gender },
                            ...(adss[sum].Ads_target.country != '') && { country: address.country },
                            ...(adss[sum].Ads_target.state != '') && { state: address.state },
                            ...(adss[sum].Ads_target.incomegroup != '') && { incomegroup: user.userProfile.incomegroup },
                            ...(adss[sum].Ads_target.ageGroup != '') && { ageGroup: user.userProfile.ageGroup },


                        };
                        objj.push(obj)



                    }

                    console.log("ggg", objj[0])
                    const ads = await this.adsRepository.find({
                        relations: {
                            Ads_target: true
                        },
                        where:
                        {
                            Ads_target: objj
                        },
                    })
                    // console.log("ppp", sum, ads)
                    console.log(ads)
                    adsss.push(ads)
                    // console.log("nnnnn", ads)
                    objj.splice(0, 1)
                    sum = sum + (1)
                    continue


                }
                console.log("nnnnn", adsss.flat())
                const data = adsss.flat().filter(function (element) {
                    return element !== undefined;
                });

                var result = data.reduce((unique, o) => {
                    if (!unique.some(obj => obj.id === o.id && obj.value === o.value)) {
                        unique.push(o);
                    }
                    return unique;
                }, []);
                // console.log("fff", result)
                
                //filter user ads which already played


                const PlayedAds = await this.adsPlayedUserRepository.find({where:{userId:request.userId}}) 
                
                const filteredAds = result.filter((elem) => !PlayedAds.find(({ adId }) => elem.id === adId));
                 console.log("kk",filteredAds,"ADsada")
                return { ads: filteredAds }
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }


    async getAdsAdmin() {

        try {

            const ads = await this.adsRepository.find({ relations: ['admin', 'questions', 'Ads_target'] });
            console.log('sssss')

            return { ads: ads }
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async getAdsQuestions(request: IGetUserAuthInfoRequest) {

        try {

            const ads_question = await this.questionRepository.find({

                where: {
                    ads: {
                        id: request.body.adsId,
                    },
                },
            });
            console.log(request.body.adsId)

            return { message: "Ads questions", adsQuestion: ads_question }
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async answerCheck(request: IGetUserAuthInfoRequest) {

        const user = await this.UserRepository.findOne({ where: { id: request.userId } })
        const ad = await this.adsRepository.findOne({ where: { id: request.body.adId }, relations: ['questions'] })

        try {
            if (user) {

                const playedList = this.adsPlayedUserRepository.create({
                    userId: request.userId,
                    adId: request.body.adId,
                    ansList: JSON.stringify(request.body.ansList)
                })
                await this.adsPlayedUserRepository.save(playedList)

                // console.log(JSON.parse(playedList.ansList))

                const userAnswered = JSON.parse(playedList.ansList)

                let aaa = []
                 console.log(JSON.parse(playedList.ansList).length ,ad.questions.length )
                for (let i = 0; i < ad.questions.length; i++) {


                    if (JSON.parse(playedList.ansList).length == ad.questions.length && userAnswered[i].quesId == ad.questions[i].id && userAnswered[i].ans == ad.questions[i].correctanswer   ) {

                        aaa.push(true)
                    } else

                        aaa.push(false)


                }



                if (aaa.includes(false)) {

                    return { message: "Oops! You Gave Wrong Answer", status: 0 }

                } else {

                    user.Wallet = user.Wallet + ad.winningAmount
                    await this.UserRepository.save(user)
                    return { message: "Congrats! You Gave Correct Answer ", status: 1, winningamount: ad.winningAmount }
                }






            }
        } catch (e) {

            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }

    }






}
