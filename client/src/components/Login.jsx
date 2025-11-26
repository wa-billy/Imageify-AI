import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Login = () => {

    const [state, setState] = useState('register')
    const { setShowLogin } = useContext(AppContext)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0
    bottom-0 z-10 backdrop-blur-sm bg-black/30
    flex justify-center items-center'>

            <motion.form
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 
    rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700
        font-medium'>{state === 'register' ? 'Register' : 'Login'}</h1>
                <p className='text-sm text-center'>Welcome!
                    {state === 'register' ? 'Register' : 'Login'} and continue</p>

                {state === 'register' &&
                    <div className='border px-6 py-2 flex items-center gap-2
            rounded-full mt-5'>
                        <img src={assets.user_icon} alt="" />
                        <input type="text" placeholder='Full Name' required
                            className='outline-none text-sm' />
                    </div>
                }

                <div className='border px-6 py-2 flex items-center gap-2
        rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" />
                    <input type="email" placeholder='Email' required
                        className='outline-none text-sm' />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2
        rounded-full mt-5'>
                    <img src={assets.lock_icon} alt="" />
                    <input type="password" placeholder='Password' required
                        className='outline-none text-sm' />
                </div>

                <p className='text-sm text-blue-600 my-4
        cursor-pointer'>Forgot Password</p>

                <button className='bg-blue-600 w-full text-white py-2
        rounded-full'>{state === 'register' ? 'Register' : 'Login'}</button>

                <div className='text-center mt-3 transition-all duration-500'>
                    {state === 'login'
                        ? <p>Create a new account?<span
                            className='text-blue-600 cursor-pointer ml-2'
                            onClick={() => setState('register')}> Register</span></p>
                        : <p>Already have an account?<span
                            className='text-blue-600 cursor-pointer ml-2'
                            onClick={() => setState('login')}> Login</span></p>
                    }
                </div>

                <img onClick={() => setShowLogin(false)} on src={assets.cross_icon}
                    className='absolute top-5 right-5 cursor-pointer' />
            </motion.form>

        </div>
    )
}

export default Login
