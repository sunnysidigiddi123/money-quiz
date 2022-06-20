import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admincontest } from "../contests/Admincontest";



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

   
    @OneToMany(() => Admincontest, savedcontest => savedcontest.user)
    savedcontests: Admincontest[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}