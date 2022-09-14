import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Admin } from "../Users/Admin"
import { User } from "../Users/User"
import { Ads_question } from "./Ads_question"
import { Ads_target } from "./Ads_target"

@Entity()
export class Ads {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
        default:''
    })
    adName: string

    @Column({
        nullable:false,
        default:''
    })
    adDetails: string

    @Column({
        nullable:false
    })
    adTime: Date

    @Column({
        nullable:false,
        default:''
    })
    adImage: string

    @Column({
        nullable:false,
        default:0
    })
    winningAmount: number

    @Column({
        nullable:false,
        default:false
    })
    publish: boolean

    @ManyToOne(() => Admin, admin => admin.ads)
    @JoinColumn({ name: "admin_id" })
    admin: Admin;
    
    @OneToOne(() => Ads_target)
    @JoinColumn()
    Ads_target: Ads_target

    @OneToMany(() => Ads_question, question => question.ads)
    questions: Ads_question[];


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}
