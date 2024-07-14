import { useState } from "react"
import useUser from "./useUser"
export default function useVerify(){
    const {setUser} = useUser()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    async function verify(userInfo){
        setLoading(true)
        try {
            const response = await fetch('https://chat-app-backend-authentication.onrender.com/api/user/verifyOtp',{
                method:'POST',
                body:JSON.stringify(userInfo),
                headers:{
                    'content-type':'application/json'
                }
            })
            const data = await response.json()
            console.log(data);
            if(response.ok){
                setError(null)
                console.log('user after login ',data);
                setUser(data.data)
                window.localStorage.setItem('token',`Bearer ${data.data.token}`)
                // socket.emit('online',data.data._doc._id) // send from backend user information
                location.pathname = '/chatDM'
            }else {
                setError(data.message)
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return {loading,error,verify}
}
