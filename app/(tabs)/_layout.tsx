import React from 'react';
import { Redirect } from 'expo-router';
import { Image, View } from 'react-native';
import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { Tabs } from 'expo-router';
import { LocalIcon } from '../../components/Types/LocalIcon';
import { LogOutButton } from '../../components/LogOutButton';
import { RequestsListButton } from '../../components/Profile/Friends/RequestsListButton';
export default function AppLayout() {
    const session = useSession()

    const accessToken = session?.accessToken
    const refreshToken = session?.refreshToken
    const isLoading = session?.isLoading

    if (!(accessToken) && !(refreshToken) && !(isLoading)) {
        return <Redirect href="/" />;
    }

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'black',
            headerShown: false,
            tabBarStyle: {
                
                borderWidth: 1,
                borderTopColor: "black",
                backgroundColor: colors.primaryRed,
                },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            },
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
        }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Image
                            source={focused ? LocalIcon.account : LocalIcon.account_unselected}
                            style={{
                                aspectRatio: 1,
                                height: focused? 24 : 20,
                            }}
                        />,
                    headerStyle: {
                        backgroundColor: colors.primaryRed
                    },
                    headerTitle: "Mi Perfil",
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerRight: () => 
                    <View style={{flexDirection: 'row'}} >
                        <RequestsListButton />
                        <LogOutButton/>
                    </View>
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Image
                            source={focused? LocalIcon.search : LocalIcon.search_unselected }
                            style={{
                                aspectRatio: 469 / 512,
                                height: focused? 24 : 20,
                            }}
                        />,
                    headerStyle: {
                        backgroundColor: colors.primaryRed
                    },
                    headerTitle: "Busqueda",
                    headerTintColor: '#fff',
                    headerShown: true,
                }}
            />
            {/* <Tabs.Screen
                name="home"
                options={{
                    href: null,
                }}
            /> */}
        </Tabs>
    );
}