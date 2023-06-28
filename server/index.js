import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import { register } from './controllers/auth.js'
import {createPost} from "./controllers/posts.js"
import { verifyToken } from './middleware/auth.js'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
// MIDDLEWARE
// import.meta.url url of the current module fileURLToPath url to file path 
const __filename = fileURLToPath(import.meta.url)
const __direname = path.dirname(__filename) //gives directory name of current file path
dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__direname, 'public/assets')))

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

//routes with files
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost)

// Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts',postRoutes)

// MONGOOSE SETUP

const PORT = process.env.PORT || 3001
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port : ${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect...`))
