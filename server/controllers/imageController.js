import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";


export const generateImage = async (req, res) => {
    try {

        const { userId, prompt } = req.body
        const user = await userModel.findById(userId)
        if (!user || !prompt) {
            return req.json({
                success: false,
                message: `Missing Details!`
            })
        }

        if (user.creaditBalance === 0 || userModel.creaditBalance < 0) {
            return res.json({
                success: false,
                message: `No Credits`,
                creaditBalance: suer.creaditBalance
            })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer'
            }
        )

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creaditBalance: user.creaditBalance - 1})
        res.json({
            success: true,
            message: `Image Generated!`,
            creaditBalance: user.creaditBalance - 1,
            resultImage
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}
