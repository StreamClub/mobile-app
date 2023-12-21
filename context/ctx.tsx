import React from 'react';
import { useStorageState } from './useStorageState';
import { isLoading } from 'expo-font';
import { Buffer } from "buffer"

// Context values are declare here
const AuthContext = React.createContext<{ 
    signIn: (accessToken: string, refreshToken: string) => void; 
    signOut: () => void; 
    accessToken?: string | null,
    refreshToken?: string | null,
    isLoading: boolean,
    
    processTokens: (accessToken: string, refreshToken: string) => void,
    username: string,
    email: string,
    
} | null> (null);

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

type SessionProviderProps = {
    children: React.ReactNode;
};

export function SessionProvider(props: SessionProviderProps) {
    const [[isLoading_AT, accessToken], setAccessToken] = useStorageState('accessToken');
    const [[isLoading_RT, refreshToken], setRefreshToken] = useStorageState('refreshToken');

    const isLoading = isLoading_AT && isLoading_RT

    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    // Tokens are received and saved in the context. 
    // The relevant information from their payloads are alse saved in the context 
    const processTokens = (accessToken: string, refreshToken: string) => {
        const parts = accessToken.split('.').map(
            part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
        );
        const payload = JSON.parse(parts[1]);

        setUsername("PENDIENTE");
        setEmail(payload.email);
    }

    const values = {
        signIn: (accessToken: string, refreshToken: string) => {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            
            processTokens(accessToken, refreshToken);
        },
        signOut: () => {
            setAccessToken(null);
            setRefreshToken(null);
        },

        accessToken,
        refreshToken,
        isLoading,

        processTokens,
        username, 
        email
    }

    return (
        <AuthContext.Provider
            value={values}>
            {props.children}
        </AuthContext.Provider>
    );
}