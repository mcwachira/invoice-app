import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'



const app =  express()

const PORT = 8000 || process.env.PORT
if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())




app.get('/api', (req, res) => {
    res.json("hello world")
})

app.listen(PORT, ()=> {

     console.log(`${chalk.green.bold('app is running in ')} ${chalk.green.yellow(process.env.NODE_ENV)}mode on port ${chalk.blue.bold(PORT)}`
     )
})