import React from "react";
import Navbarv2 from "../../components/Navbarv2";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


const Login = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault(); 

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter your password");
            return;
        }

        setError("");

        //Login API call
        try { 
            const response = await axiosInstance.post("/login", {
                email: email, 
                password: password,
            })
            //handle successful 
            if (response.data && response.data.accessToken) { 
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
            }
        } catch (error) { 
            //handle uncessfull 
            if (error.response && error.response.data && error.response.data.message) { 
                setError(error.response.data.message);
            } else { 
                setError("beep boop error time")
            }
        }





    };

    return <>
        <Navbarv2 />

        <div className = "flex items-center justify-center h-screen bg-gray-100" 
            style = {{background: "#06d6a0"}}> 
            <div className = "bg-white p-8 rounded shadow-md w-96"> 
                <form onSubmit = {handleLogin}> 
                    <h4 className = "text-2xl mb-7"> Login </h4>

                    <input 
                        type = "text" 
                        placeholder = "Email" 
                        className = "input-box" 
                        value = {email} 
                        onChange = {(e) => setEmail(e.target.value)}
                    />


                    <PasswordInput value = {password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className = "text-[#ef476f] text-sm mb-3"> {error} </p>}

                    <button type = "submit" className = "btn-primary"> Login </button>

                    <p className = "text-sm text-center mt-4"> 
                        New here? {" "} 
                        <Link to = "/signup" className = "font-medium text-[#ef476f] underline"> 
                            Create an Account </Link> 
                    </p>
                </form>
            </div>
        </div>
    </>
} 

export default Login