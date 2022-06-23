import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm"
import { Question } from "../questions/questions"
import { User } from "../Users/User"

@Entity()
export class Admincontest {
  
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

    @ManyToOne(() => User, user => user.savedcontests)
    @JoinColumn({ name: "user_id" })
    user: User;
    

    @OneToMany(() => Question, question => question.contest)
    questions: Question[];
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}
