import express from 'express'
import passport from 'passport'

import router from './routes'
import errorHandler from './middlewares/errorHandler'

import './passport'

const app = express()

app.use(express.json())

app.use(passport.initialize())

app.use('/api', router)
app.use(errorHandler)

export default app
