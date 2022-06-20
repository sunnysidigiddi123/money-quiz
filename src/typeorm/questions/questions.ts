import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm"
import { Admincontest } from "../contests/Admincontest"
import { Publishedcontest } from "../contests/Publishedcontests"

export enum QuestionTypes {
  Video = 'video',
  Photo = 'photo',
  Audio = 'audio',
  Yes_No = 'yes/no',
  }

@Entity()
export class Question {
  
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
        default:0
    })
    totalVideoTime: number
    
    @Column({
        nullable:false,
        default:0
    })
    totalQuestionTime: number

    @ManyToOne(() => Admincontest, contest => contest.questions)
    @JoinColumn({ name: "contest_id" })
    contest: Admincontest;

    @ManyToOne(() => Publishedcontest, contest => contest.questions)
    @JoinColumn({ name: "publishedcontest_id" })
    publishedcontest: Publishedcontest;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
