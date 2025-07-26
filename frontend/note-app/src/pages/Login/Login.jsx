import React from "react";
import Navbarv2 from "../../components/Navbarv2";
import PasswordInput from "../../components/Input/PasswordInput";
import { useRef } from "react";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import { Room6Model } from '../../components/3D models/Room6Model.jsx';
import { RainbowDragonModel } from '../../components/3D models/RainbowDragonModel.jsx';

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei"

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

    const AVATAR_MODELS = { 
      8: {
            "model": RainbowDragonModel, 
            "position": [-1, -0.5, 0], 
            "rotation": [0.4, 2.5, 0.2], 
            "scale": [0.95, 1, 1]
          },
    }

    const UserAvatar = ({ avatarId }) => { 
        const avatarRef = useRef(); 
        const avatar = avatarId ? AVATAR_MODELS[avatarId] : AVATAR_MODELS[2];
        const AvatarModel = avatar.model || AVATAR_MODELS[1].model; //fallback to default if not specified
        return ( 
          <group ref = {avatarRef} position = {avatar.position} rotation = {avatar.rotation}> 
            <AvatarModel scale={avatar.scale}/>
          </group>
        )
      }

    return (
  <>
    <Navbarv2 />
    
    <div className="flex md:flex-row bg-yellow-50 h-screen">
  {/* Dragon - 5/8 width */}
  <div className="w-full md:w-5/8 h-full">
    {/* Dragon - fills entire space */}
      
      <Canvas camera={{ fov: 8, position: [0, 2, 70]}}>
          <ambientLight intensity={0.5} />
          <OrbitControls
            enableZoom={true}
            minAzimuthAngle={-Math.PI}
            // maxAzimuthAngle={Math.PI}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI}
          />
          
            <UserAvatar 
            key = {new Date()}
            avatarId = {8}
          />
          
          <Environment preset="sunset" />
          
        </Canvas>
      </div>

      {/* Right Side - Login Form (50% width) */}
      {/* <div className="right-6 bottom-6 w-3/8 flex items-center justify-center p-6"> */}
       <div className="w-full md:w-3/8 flex items-center justify-center p-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full max-w-md">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-bold mb-6 text-gray-800">Login</h4>
            {/* <h4 className="text-xl mb-6 text-gray-800">Email: bob@gmail.com, Pwd: bob</h4> */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <PasswordInput 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Login
            </button>

            <p className="text-sm text-center mt-6 text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="font-medium text-red-500 hover:text-red-600 underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    
  </>
);
} 

export default Login