import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admincontest } from "../contests/Admincontest";
import { profile_address } from "./profile_address";
import { User } from "./User";



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
export class user_profile {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable: false,
        type:'date'

         })
    dob: Date

    @Column({
        nullable:false,
        type:'text'
    })
    gender: GenderTypes

    @Column({
        nullable:false,
        default:0
    })
    age: number


    @Column({
        nullable:false,
        type:'text'
       
    })
    incomegroup: IncomeTypes
    

    @OneToOne(() => User, (user) => user.userProfile) // specify inverse side as a second parameter
    user: User

    @OneToOne(() => profile_address, (address) => address.user_profile) // specify inverse side as a second parameter
    @JoinColumn()
    address: profile_address


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}