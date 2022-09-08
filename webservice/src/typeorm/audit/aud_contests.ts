import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class aud_contests {
  
    @PrimaryGeneratedColumn('increment')
    id: number
 

    @Column({
        nullable:false,
       
    })
    contestId: number

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
    remainingUsers: number

    @Column({
        nullable:false,
        default:0
    })
    winningAmount: number

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
