import { createContext } from "react";
import io from 'socket.io-client'

const socket = io("https://chat-app-backend-1-v7ey.onrender.com");

export const SocketContexts = createContext({})

export function SocketProvider({children}){

    return(
        <SocketContexts.Provider value={socket}>
            {children}
        </SocketContexts.Provider>
    )
}

