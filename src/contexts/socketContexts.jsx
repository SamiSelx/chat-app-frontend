import { createContext } from "react";
import io from 'socket.io-client'

const socket = io("https://chat-app-backend-authentication.onrender.com");

export const SocketContexts = createContext({})

export function SocketProvider({children}){

    return(
        <SocketContexts.Provider value={socket}>
            {children}
        </SocketContexts.Provider>
    )
}

