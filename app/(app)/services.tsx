import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { getUserServices, getUserServicesParams, deleteUserService, deleteUserServiceParams, getAllServices, putUserService, putUserServiceParams } from '../../apiCalls/services'
import { ServiceEntry } from '../../components/Types/Services'
import { ServicesScreen, ServicesScreenParams } from '../../components/Services/ServicesScreen'
import { ServicesScreenCallbacks } from '../../components/Services/ServicesScreen'

export default function Services() {
    const session = useSession()
    const userId = session?.userId

    let serviceSelected: ServiceEntry = {} as ServiceEntry

    const [loading, setLoading] = useState(true)
    const [userServices, setUserServices] = useState<ServiceEntry[]>([])
    const [allServices, setAllServices] = useState<ServiceEntry[]>([])

    const onSuccess = (response: any) => {
        const _userServices:ServiceEntry[] = response.data.results
        
        setUserServices(_userServices)
        setLoading(false)
    }

    const onFailure = (error: any) => {
        console.log({error})
    }

    const onSuccessGetAllServices = (response: any) => {
        console.log("All services loaded")
        const _allServices:ServiceEntry[] = response.data.streamServices
        console.log(_allServices)
        setAllServices(_allServices)
        setLoading(false)
    }

    useEffect(() => {
        const params: getUserServicesParams = {
            userId: userId? userId : 0,
        }
        getUserServices(session, params, onSuccess, onFailure)
        getAllServices(session, onSuccessGetAllServices, onFailure)
    }, [])

    const onFailureDelete = (error: any) => {
        console.log(error)
        const _userServices = userServices.concat(serviceSelected)
        setUserServices(_userServices)
    }

    const onSuccessDelete = (response: any) => {
        console.log("Item deleted")
    }

    const onUserServicePressed = (service: ServiceEntry) => {
        console.log(service.providerName + " pressed")
        const params: deleteUserServiceParams = {
            providerId: service.providerId
        }
        serviceSelected = service

        const _userServices = userServices.filter(service => service.providerId !== serviceSelected.providerId)
        setUserServices(_userServices)
        deleteUserService(session, params, onSuccessDelete, onFailureDelete)
    }

    const onSuccessPut = (response: any) => {
        console.log("Item added")
        const params: getUserServicesParams = {
            userId: userId? userId : 0,
        }
        getUserServices(session, params, onSuccess, onFailure)
    }

    const onCheckService = (service: ServiceEntry, checked: Boolean) => {
        console.log(service.providerName + " checked")

        if (checked) {
            const params: putUserServiceParams = {
                providerId: service.providerId
            }
            putUserService(session, params, onSuccessPut, onFailure)
        } else {
            onUserServicePressed(service)
        }
    }

    const callbacks: ServicesScreenCallbacks = {
        onUserServicePressed: onUserServicePressed,
        onCheckService: onCheckService
    }

    const serviceScreenParams: ServicesScreenParams = {
        userServices: userServices,
        allServices: allServices,
        callbacks: callbacks
    }

    return (
        <View style={styles.container}>
            {loading ? 
                <LoadingComponent />
            :
                <ServicesScreen {...serviceScreenParams}/>   
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
