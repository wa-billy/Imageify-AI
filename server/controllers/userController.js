import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isExists = await userModel.findOne({ email })

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: `Please Enter Your Data`
            })
        }

        if (isExists) {
            return res.json({
                success: false,
                message: `This email has been used! `,
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: `Invalid Email`
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({
                success: false,
                message: `Need more strong password`
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, email, password: hashPassword
        }

        const newUser = new userModel(userData)
        const user = newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            success: true,
            token,
            user: { name: user.name }
        })

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: `User is not exists!`
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({
                success: false,
                message: 'Invalid Password!'
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({
            success: true,
            token,
            user: { name: user.name }
        })

    } catch (error) {
        console.error(error);
        res.json({
            success: true,
            message: error.message
        })
        
    }
}


const userCredits = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({
            success: true,
            credits: user.creaditBalance,
            user: { name: user.name }
        })
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export {
    loginUser,
    registerUser,
    userCredits
}