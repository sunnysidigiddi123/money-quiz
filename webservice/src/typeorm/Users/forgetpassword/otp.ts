import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Otp {
  
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        nullable:false,
    })
    email: string
   
    @Column({
        nullable:false,
    })
    code: number

    @Column({
        type:'bigint',
        nullable:false,
    })
    expireIn:BigInt

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

 

}
