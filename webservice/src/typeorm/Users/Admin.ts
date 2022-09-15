import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ads } from "../ads/Ads";
import { Admincontest } from "../contests/Admincontest";




@Entity()
export class Admin {

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
    
 
    @OneToMany(() => Admincontest, savedcontest => savedcontest.admin)
    savedcontests: Admincontest[];

    @OneToMany(() => Ads, ad => ad.admin)
    ads: Ads[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}