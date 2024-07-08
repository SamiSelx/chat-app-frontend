import { useState } from "react";
import useUser from "./useUser";

export default function useLogin(){
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const {setUser} = useUser()

    async function login(userSignIn){
        setLoading(true)
        try {
            const response = await fetch('https://chat-app-backend-575t.onrender.com/api/user/login',{
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
                setUser(data.data)
                window.localStorage.setItem('token',`Bearer ${data.data.token}`)
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