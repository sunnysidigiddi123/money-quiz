import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class aud_liveusers {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
    })
    userId: number
   
    @Column({
        nullable:false,
    })
    contestId: number

    @Column({
        nullable:false,
    })
    questionId: number


    @Column({
        nullable:false,
    })
    flag: string


    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
 

}