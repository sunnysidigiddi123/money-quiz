import { AgeGroupTypes, GenderTypes, IncomeTypes } from "src/utils/enums"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm"


// export enum GenderTypes {
//     "MALE" = 'male',
//     "FEMALE" = 'female',
//     "OTHERS" = 'others'
//     }


//     export enum IncomeTypes {
//         "1 to 10 lakhs" = '1-10',
//         "10 to 20 lakhs" = '10-20',
//         "20 to 30 lakhs" = '20-30',
//         "30 to 40 lakhs" = '30-40',
//         "Above 58 lakhs" = 'above 40',
    
//         } 
//         export enum AgeGroupTypes {
//             "Below 18 years" = 'below 18',
//             "18 to 22 years" = '18-22',
//             "22 to 26 years" = '22-26',
//             "26 to 32 years" = '26-32',
//             "32 to 58 years" = '32-58',
//             "Above 58 years" = 'above 58',
//             }    
    

@Entity()
export class Ads_target {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        type:'text'
    })
    ageGroup: AgeGroupTypes

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
