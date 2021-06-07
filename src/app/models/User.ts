import { BeforeInsert,  BeforeUpdate, 
         Column, CreateDateColumn,
         Entity, JoinColumn, OneToMany,
         PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import {Imoveis} from './Imoveis'

@Entity('user')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(() => Imoveis, imovel => imovel.user)
    imoveis: Imoveis[];
    
    @BeforeInsert()
    @BeforeUpdate()
        hashSenha(){
        const hash = bcrypt.hashSync(this.senha, 8)
        this.senha = hash
        }

    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

