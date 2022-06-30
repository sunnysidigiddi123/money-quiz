import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Question } from "../questions/questions"


@Entity()
export class Publishedcontest {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        default:''
    })
    contestName: string

    @Column({
        nullable:false,
        default:''
    })
    contestDetails: string

    @Column({
        nullable:false
    })
    contestTime: Date

   
    @Column({
        nullable:false,
        default:0
    })
    EntryAmount: number

    @Column({
        nullable:false,
        default:0
    })
    ParticularPoll: number

    @Column('simple-array',{nullable: true})
    BroadcastingValues: number[]
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Question, question => question.publishedcontest)
    questions: Question[];

}
