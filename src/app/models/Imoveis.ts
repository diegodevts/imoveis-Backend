import {Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {User} from './User'


@Entity('imoveis')
export class Imoveis{

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    cep: number

    @Column()
    numero: number

    @Column()
    complemento: string
    
    @Column("decimal", { precision: 5, scale: 2 })
    aluguel: number
    
    @Column()
    quartos: number

    @Column()
    imovel: boolean

    @ManyToOne(() => User, users => users.imoveis, {eager: true})
    @JoinColumn({name: 'userId'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    
}

