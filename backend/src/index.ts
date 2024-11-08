import express from 'express'
import passport from 'passport'

import router from './routes'
import errorHandler from './middlewares/errorHandler'
import revalidateToken from './middlewares/revalidateToken'

import './passport'

const app = express()

app.use(express.json())

app.use(passport.initialize())

// access token revalidation middleware
app.use(revalidateToken)

// set up routes
app.use('/api', router)

// error handler middleware
app.use(errorHandler)

export default app
