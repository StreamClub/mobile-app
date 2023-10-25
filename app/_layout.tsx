import { Stack } from 'expo-router';

// export default function Layout() {
//     return (
//         <Stack
//             screenOptions={{
//                 headerStyle: {
//                     backgroundColor: '#f4511e',
//                 },
//                 headerTintColor: '#fff',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                 },
//                 headerShown: false,
//             }}
//         />
//     );
// }





import { Slot } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import { useSession } from '../context/ctx';

export default function RootLayout() {
    // Set up the auth context and render our layout inside of it.

    return (
        <SessionProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }}
            />
        </SessionProvider>
    );
}