import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm"


export enum GenderTypes {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others'
    }


    export enum IncomeTypes {
        BELOW_18 = 'below 18',
        BETWEEN18_22 = '18-22',
        BETWEEN22_26 = '22-26',
        BETWEEN26_32 = '26-32',
        BETWEEN32_58 = '32-58',
        ABOVE_58 = 'above 58',
        }    

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
        nullable: false,
        default:0

         })
    pin: number

    @Column({
        nullable:false,
        default:''
       
    })
    state: string

    @Column({
        nullable:false,
        default:''
       
    })
    district: string
    
    @Column({
        nullable:false,
        default:''
       
    })
    location: string

    @Column({
        nullable:false,
        default:''
       
    })
    country: string

    @Column({
        nullable:false,
        type:'text'
    })
    gender: GenderTypes

    @Column({
        nullable:false,
        type:'text'
    })
    incomegroup: IncomeTypes

    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}
