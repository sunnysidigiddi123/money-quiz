import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Segment {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        
    })
    contestId: number

    @Column({
        nullable:false,
        
    })
    segmentName: string
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
