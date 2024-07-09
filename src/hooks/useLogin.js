import { useState } from "react";
// import useSocket from "./useSocket";
import useUser from "./useUser";

export default function useLogin(){
    const {setUser} = useUser()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    // const socket = useSocket()

    async function login(userSignIn){
        setLoading(true)
        try {
            const response = await fetch('https://chat-app-backend-1-v7ey.onrender.com/api/user/login',{
                method:'POST',
                body:JSON.stringify(userSignIn),
                headers:{
                    'content-type':'application/json'
                }
            })
            const data = await response.json()
            console.log(data);
            if(response.ok){
                setError(null)
                console.log('user after login ',data.data);
                setUser(data.data)
                window.localStorage.setItem('token',`Bearer ${data.data.token}`)
                // socket.emit('online',data.data._doc._id) // send from backend user information
                location.pathname = '/chatDM'
                console.log('gg');
            }else setError(data.message)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    return {loading,error,login}
}