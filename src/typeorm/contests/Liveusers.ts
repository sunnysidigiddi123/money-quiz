import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Liveuser {
  
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

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
