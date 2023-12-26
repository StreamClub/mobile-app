import React from 'react';
import { useStorageState } from './useStorageState';
import { Buffer } from "buffer"

const AuthContext = React.createContext<{ 
    signIn: (accessToken: string, refreshToken: string) => void; 
    signOut: () => void; 
    processTokens: (accessToken: string, refreshToken: string) => void,
    accessToken?: string | null,
    refreshToken?: string | null,
    isLoading: boolean,
    
    // Context data is declared here
    // ---------- ---------- ---------- ---------- ----------
    username: string,
    email: string,
    // ---------- ---------- ---------- ---------- ----------
} | null> (null);


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

    // Context data seters are declared here
    // ---------- ---------- ---------- ---------- ----------
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    // ---------- ---------- ---------- ---------- ----------

    const processTokens = (accessToken: string, refreshToken: string) => {
        const parts = accessToken.split('.').map(
            part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
        );
        const payload = JSON.parse(parts[1]);

        // Context data is initialized here
        // ---------- ---------- ---------- ---------- ----------
        setUsername(payload.username);
        setEmail(payload.email);
        // ---------- ---------- ---------- ---------- ----------
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

        // Context data is shared from here
        // ---------- ---------- ---------- ---------- ----------
        username, 
        email,
        // ---------- ---------- ---------- ---------- ----------
    }

    return (
        <AuthContext.Provider
            value={values}>
            {props.children}
        </AuthContext.Provider>
    );
}