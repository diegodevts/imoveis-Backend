import { getRepository } from "typeorm";
import {  Request, Response } from "express";
import {User} from "../models/User";
import * as jwt from 'jsonwebtoken'
import authConfig from '../config/authConfig'
import * as bcrypt from 'bcryptjs'


function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}


//adicionar usuário

export const createUser = async (req: Request, res: Response) =>{
    const repository = getRepository(User)
    const user = repository.create(req.body)
    const userToken = req.body.id

    await repository.save(user)

    return res.json({ user, token: gerarToken({ id: userToken }) })

}



//listar todos os usuários

export const getUsers = async (req: Request, res: Response)=> {
    
    const repository = getRepository(User)
    const user = await repository.find()

    await repository.save(user)
    
    return res.json(user)


    
    


}

//listar um só

export const getUser = async (req: Request, res: Response) =>{

    const { id } = req.params
    const repository = getRepository(User)
    const user = await repository.findOne(id)
    return res.json(user)

}

//atualizar usuário

export const updateUser = async (req: Request, res: Response)=>{

    const { id } = req.params
    const repository = getRepository(User)
    const user = await repository.update(id, req.body)

    if(user.affected == 1){
        const userUpdate = await repository.findOne(id)
        return res.json({ message: 'Usuario atualizado' })

    }

    return res.status(400).json({message: 'Erro! Usuario nao encontrado'})
}

//deletar usuário

export const removeUser = async (req: Request, res: Response)=>{

    const { id } = req.params
    const repository = getRepository(User)
    const user = await repository.delete(id)

    if (user.affected == 1) {

        const userUpdated = await getRepository(User).findOne(id)

        return res.json({ message: 'Usuario excluido!' })
    }

    return res.status(404).json({ message: 'Usuario nao encontrado' })
    
}

//verificar usuário


export const verifyUser = async (req: Request, res: Response) => {
    const { email, senha} = req.body
    const repository = getRepository(User)
    const user = await repository.findOne({where: {email}})
    
    
    if(!user){
        return res.status(401).send({error: 'email inválido'})
    }


    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {

        return res.status(401).send({ error: 'Senha invalida' })

    }

     const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: '1d' })
        delete user.senha
    

    
       
      return res.json({ user, token, message: "Logado"})
       


}

//verificar token
 export const verifyToken = async (req: Request, res: Response) =>{

    const user_id = req.user_id

    if(!user_id){
        return res.json({message: "Usuario nao autorizado"})
    }


    return res.json({message: "Usuario verificado! Por favor, adicione imoveis"})
 }