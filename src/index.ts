import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser'
import { userRouter } from './router/user.router';
import { tokenGuard } from './middleware/token-guard'
import { parlorRouter } from './router/parlor.router';
import { itemRouter } from './router/item.router';


const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', userRouter)
app.use('/parlor', parlorRouter)
app.use('/parlor/items', itemRouter)

// Unprotected Get
app.get('/some-resource', (req, res, next) => {
    res.json('Hello World')
})

// app.use(tokenGuard())

// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Hello World')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})