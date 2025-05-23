import React from "react";
import Navbarv2 from "../../components/Navbarv2";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault(); 
        // Handle signup logic here
        if (!name) { 
            setError("Please enter your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter your email");
            return;
        }
        if (!password) {
            setError("Please enter your password");
            return; 
        }
        setError("");

        //Login API call
        try { 
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email, 
                password: password,
            })
            //handle successful 
            if (response.data && response.data.error) { 
                setError(response.data.message);
                return;
            }
            if (response.data && response.data.accessToken) { 
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) { 
            //handle uncessfull 
            if (error.response && error.response.data && error.response.data.message) { 
                setError(error.response.data.message);
            } else { 
                setError("beep boop error time")
            }
        }
    }

    return (
        <>
        <Navbarv2 />

        <div className = "backgrocund-[#06d6a0] flex items-center justify-center h-screen bg-gray-100" 
            style = {{background: "#06d6a0"}}> 
            <div className = "bg-white p-8 rounded shadow-md w-96"> 
                <form onSubmit = {handleSignUp}> 
                    <h4 className = "text-2xl mb-7"> SignUp </h4>

                    
                    <input 
                        type = "text" 
                        placeholder = "Name" 
                        className = "input-box" 
                        value = {name} 
                        onChange = {(e) => setName(e.target.value)}
                    />

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

                    <button type = "submit" className = "btn-primary"> Create Account </button>

                    <p className = "text-sm text-center mt-4"> 
                        Already have an account? {" "} 
                        <Link to = "/login" className = "font-medium text-[#ef476f] underline"> 
                            Login </Link> 
                    </p>

                </form>
            </div> 
        </div>  

        </>
    )
} 

export default Signup