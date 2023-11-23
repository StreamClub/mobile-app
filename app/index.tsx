import { Redirect} from 'expo-router';
import { useSession } from '../context/ctx';
import { useEffect } from 'react';
import { InitialScreen } from '../screens/InitialScreen';

export default function Index() {
    const session = useSession();
    const accessToken = session?.accessToken
    const processAccessToken = session?.processAccessToken

    useEffect(() => {
        if (accessToken) {
            processAccessToken?.(accessToken);
        }
    }, [accessToken, processAccessToken]);

    if (accessToken) {
        return <Redirect href="/home" />;
    } else {
        return (
            <InitialScreen />
        );
    }
}
