import {Router, Request, Response} from 'express'
import { createImovel, getImoveis, getImovel, removeImovel, updateImovel } from './app/controllers/Imoveiscontroller'
import { createUser,  getUser,  getUsers, removeUser, updateUser, verifyToken, verifyUser } from './app/controllers/Usercontroller'
import { authMiddleware } from './app/middleware/authMiddleware'




const router = Router()



router.post('/user', createUser)
router.get('/user', getUsers)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', removeUser)
router.post('/session', verifyUser)


router.get('/session', authMiddleware, verifyToken)
router.post('/imoveis', createImovel)
router.get('/imoveis', getImoveis)
router.get('imoveis/:id', getImovel)
router.put('/imoveis/:id', updateImovel)
router.delete('/imoveis/:id', removeImovel)

export default router