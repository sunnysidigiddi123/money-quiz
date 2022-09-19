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


    @Column({
        nullable:false,
        default:''
    })
    state: string

    @Column({
        nullable:false,
        default:''
    })
    gender: string

    @Column({
        nullable:false,
        default:''
    })
    income: string

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}
