import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ads } from "../ads/Ads";
import { Admincontest } from "../contests/Admincontest";
import { user_profile } from "./user_profile";



export enum RoleTypes {
    Admin = 'admin',
    User = 'user'
    }


@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable: false,
        default:''
         })
    name: string

    @Column({
        unique:true,
        nullable:false,
        default:''
    })
    email: string
    
  
    @Column({
        nullable:false,
        default:''
    })
    @Exclude()
    password: string
    
    @Column({
        nullable:false,
        type:'text'
    })
    role: RoleTypes
    
    @Column({
        nullable:false,
        default:0})
    Wallet: number

    // @OneToOne(() => user_profile)
    // @JoinColumn()
    // userProfile: user_profile

    @OneToOne(() => user_profile, (profile) => profile.user, {
        onDelete: "CASCADE", 
      }) // specify inverse side as a second parameter
    @JoinColumn()
    userProfile: user_profile

  
    @OneToMany(() => Admincontest, savedcontest => savedcontest.user)
    savedcontests: Admincontest[];

    @OneToMany(() => Ads, ad => ad.user)
    ads: Ads[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}