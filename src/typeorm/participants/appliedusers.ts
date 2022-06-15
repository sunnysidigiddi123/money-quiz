import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Applieduser {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        default:''
    })
    contestid: string

    @Column({
        nullable:false,
        default:''
    })
    userid: string

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
