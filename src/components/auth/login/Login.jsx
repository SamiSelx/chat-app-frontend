import { useEffect, useState } from "react"
import useLogin from "../../../hooks/useLogin"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import useVerify from "../../../hooks/useVerify"

export default function Login(){
    const [userSignIn,setUserSignIn] = useState({email:'',password:''})
    const {loading,error,success,login} = useLogin()
    const [code,setCode] = useState("")
    const {loading:loadingOtp,error:errorOtp,verify} = useVerify()
    useEffect(()=>{
      if(success){
        toast.success(success)
      }
    },[success])
    const handleLogin = (e)=>{
        setUserSignIn({...userSignIn,[e.target.name]:e.target.value})
    }
    const onSubmit = async (e)=>{
        e.preventDefault()
        login(userSignIn)
    }

    const VerifyCode = async (e)=>{
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('user'))
      
      verify({code,email:user.email})
    }

    return(
        <div>
        {!success ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={userSignIn.email}
            onChange={handleLogin}
            className="px-4 py-2 rounded-md border focus:ring outline-none border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={userSignIn.password}
            onChange={handleLogin}
            className="px-4 py-2 rounded-md border focus:ring outline-none border-blue-500"
          />
          <input
            type="submit"
            value={loading ? "Login..." : "Login"}
            disabled={loading}
            className="bg-blue-500 py-2 text-white font-semibold text-xl rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-500 uppercase"
          />
        </form>
        ): <form onSubmit={VerifyCode} className="flex flex-col gap-4">
            <input type="text"  placeholder="OTP..." value={code} onChange={e=>setCode(e.target.value)} className="px-4 py-2 rounded-md border focus:ring outline-none border-blue-500"/>
            <input disabled={loadingOtp} type="submit" value={loading ? "Send..." : "Send"}  className="bg-blue-500 py-2 text-white font-semibold text-xl rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-500 uppercase"/>
          </form>}
        {error && (
          <div className="text-red-500 text-2xl font-semibold">{error}</div>
        )}
        <p className="mt-4 text-end">
        <Link to={'/register'} className="px-3 py-1 text-blue-500 font-semibold text-lg">Register</Link>
      </p>
      </div>
    )
}