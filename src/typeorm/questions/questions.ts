import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Savedcontest } from "../contests/Savedcontest"


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
        default:''
    })
    type: string

    @Column('simple-array')
    options: string[]

    @Column({
        nullable:false,
        default:''
    })
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

    @ManyToOne(() => Savedcontest, contest => contest.questions)
    contest: Savedcontest;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
