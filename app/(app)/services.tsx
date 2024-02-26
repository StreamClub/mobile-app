import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { getUserServices, getUserServicesParams } from '../../apiCalls/services'

export default function Services() {
    const session = useSession()
    const userId = session?.userId

    const [loading, setLoading] = useState(true)
    // const [services, setServices] = useState<Service[]>([])

    const onSuccess = (response: any) => {
        // const services:ServiceEntry[] = response.data.results
        
        // setServices(watchlist)
        setLoading(false)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        const params: getUserServicesParams = {
            userId: userId? userId : 0,
        }
        getUserServices(session, params, onSuccess, onFailure)
    }, [])

    return (
        <View style={styles.container}>
            {loading ? 
                <LoadingComponent />
            :
                <Text>Pantalla de servicios</Text>
                // <ServicesScreen {...profileParams}/>   
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
})
