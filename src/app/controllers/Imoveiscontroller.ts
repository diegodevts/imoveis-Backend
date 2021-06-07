import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {Imoveis} from "../models/Imoveis";







//adicionar imovel

export const createImovel = async (req: Request, res: Response) => {
    
    const repository = getRepository(Imoveis)
    const imoveis = repository.create(req.body)

    if(!imoveis){
        res.status(400).json({message: "Erro ao adicionar imovel"})
    }

    await repository.save(imoveis)

    return res.json({imoveis, message: "Imovel adicionado"})

}



//listar todos os imoveis

export const getImoveis = async (req: Request, res: Response) => {

    const repository = getRepository(Imoveis)
    const imoveis = await repository.find()


    return res.json(imoveis)



}

//listar um só

export const getImovel = async (req: Request, res: Response) => {

    const { id } = req.params
    const repository = getRepository(Imoveis)
    const imovel = await repository.findOne(id)
    return res.json(imovel)

}

//atualizar imovel

export const updateImovel = async (req: Request, res: Response) => {

    const { id } = req.params
    const repository = getRepository(Imoveis)
    const imovel = await repository.update(id, req.body)

    if (imovel.affected == 1) {
        const imovelUpdate = await repository.findOne(id)
        return res.json({ message: 'Imovel atualizado' })

    }

    return res.status(400).json({ message: 'Erro! Imovel nao encontrado' })
}

//deletar imovel

export const removeImovel = async (req: Request, res: Response) => {

    const { id } = req.params
    const repository = getRepository(Imoveis)
    const imovel = await repository.delete(id)

    if (imovel.affected == 1) {

        const imovelUpdated = await getRepository(Imoveis).findOne(id)

        return res.json({ message: 'Imovel excluido!' })
    }

    return res.status(404).json({ message: 'Imovel nao encontrado' })

}