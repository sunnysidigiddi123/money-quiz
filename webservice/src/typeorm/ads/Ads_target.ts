import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm"

@Entity()
export class Ads_target {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        type:'simple-array'
    })
    ageGroup: number[]

    @Column({
        nullable:false,
        default:''
    })
    location: string

    
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}
