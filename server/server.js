import express, { urlencoded } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import imageRouter from './routes/imageRoute.js'

const port = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true  }))
await connectDB()

app.get('/', (req, res) => {
    res.send('API Working')
})

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    
})