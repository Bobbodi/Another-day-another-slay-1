import React from 'react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const PasswordInput = ({ value, onChange, placeholder }) => { 

    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    };

    return (
        <div className = "flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 border-red focus-within:border-yellow transition-colors" > 
        
            <input 
            value = {value} 
            onChange = {onChange} 
            type = {isShowPassword ? "text" : "password"} 
            placeholder = {placeholder || "Password"} 
            className = "w-full text-sm rounded py-3 mr-3 bg-transparent outline-none" />
        
            {isShowPassword ? <AiFillEye
                onClick = {toggleShowPassword} 
                className = "text-red cursor-pointer" 
                size = {40} 
            /> : <AiFillEyeInvisible
                onClick = {toggleShowPassword} 
                className = "text-yellow cursor-pointer" 
                size = {40}
            />}

        
        </div>
    )
}

export default PasswordInput