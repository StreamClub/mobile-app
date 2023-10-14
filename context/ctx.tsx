import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{ 
    signIn: (accessToken: string) => void; 
    signOut: () => void; 
    accessToken?: string | null, 
    isLoading: boolean,
    
    processAccessToken: (token: string) => void,
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

// export function processAccessToken(token: string) {
//     
//     console.log('TODO: Procesar access token')
// }

type SessionProviderProps = {
    children: React.ReactNode;
};

export function SessionProvider(props: SessionProviderProps) {
    const [[isLoading, accessToken], setAccessToken] = useStorageState('session');

    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    const processAccessToken = (token: string) => {
        //TODO: procesar payload y guardarlo en el contexto (username, etc)
        const separator = "-";
        const parts = token.split(separator);
        setUsername(parts[0]);
        setEmail(parts[1]);
    }

    const values = {
        signIn: (accessToken: string) => {
            setAccessToken(accessToken);
        },
        signOut: () => {
            setAccessToken(null);
        },

        accessToken,
        isLoading,

        processAccessToken,
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