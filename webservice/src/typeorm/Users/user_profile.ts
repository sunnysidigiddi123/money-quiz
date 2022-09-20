import { GenderTypes, IncomeTypes } from "src/utils/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admincontest } from "../contests/Admincontest";
import { profile_address } from "./profile_address";
import { User } from "./User";



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