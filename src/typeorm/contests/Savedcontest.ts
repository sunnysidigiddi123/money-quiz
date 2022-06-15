import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Question } from "../questions/questions"
import { User } from "../Users/User"

@Entity()
export class Savedcontest {
  
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
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => User, user => user.savedcontests)
    user: User;

    @OneToMany(() => Question, question => question.contest)
    questions: Question[];

}
