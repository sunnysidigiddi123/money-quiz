import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm"
import { Admincontest } from "../contests/Admincontest"
import { Publishedcontest } from "../contests/Publishedcontests"
import { Ads } from "./Ads"

export enum QuestionTypes {
  Video = 'video',
  Photo = 'image',
  Audio = 'audio',
  MCQ = 'mcq',
  }

@Entity()
export class Ads_question {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        default:''
    })
    question: string

    @Column({
        nullable:false,
        type:'text'
    })
    type: QuestionTypes

    @Column('simple-array')
    options: string[]

    @Column({
        nullable:false,
        default:''
    })
    @Exclude({ toPlainOnly: true })
    correctanswer: string

    @Column({
        nullable:false,
        default:''
    })
    videolink: string

    @Column({
        nullable:false,
        default:''
    })
    imagepath: string

    @Column({
        nullable:false,
        default:0
    })
    totalVideoTime: number
    
    @Column({
        nullable:false,
        default:0
    })
    totalQuestionTime: number


    @ManyToOne(() => Ads, ads => ads.questions)
    @JoinColumn({ name: "ads_id" })
    ads: Ads;

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
