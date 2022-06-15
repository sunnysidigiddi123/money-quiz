import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Savedcontest } from "../contests/Savedcontest";

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
        default:''
    })
    role: string
    
    @Column({
        nullable:false,
        default:0})
    Wallet: number

   
    @OneToMany(() => Savedcontest, savedcontest => savedcontest.user)
    savedcontests: Savedcontest[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}