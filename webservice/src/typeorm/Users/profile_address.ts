import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admincontest } from "../contests/Admincontest";
import { User } from "./User";
import { user_profile } from "./user_profile";


@Entity()
export class profile_address {

    @PrimaryGeneratedColumn('increment')
    id: number


    @Column({
        nullable: false,
        default:''
   
         })
    address1: string

    @Column({
        nullable: false,
        default:''
   
         })
    address2: string

    @Column({
        nullable: false,
        default:''

         })
    pin: string

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


    @OneToOne(() => user_profile, (user) => user.address) // specify inverse side as a second parameter
    user_profile: user_profile

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}