import 'reflect-metadata'
import * as express from 'express'
import routes from './routes'
import './database/connect'
import *as bodyParser from 'body-parser'
const app = express()



app.use(bodyParser.json())
app.use(routes)



app.listen(3000, ()=> console.log('server funfando') )