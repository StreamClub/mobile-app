import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import {
    deleteUserServiceParams,
    putUserServiceParams,
    useModifyServices,
    useUserServices,
} from '../../apiCalls/services'
import { ServiceEntry } from '../../components/Types/Services'
import {
    ServicesScreen,
    ServicesScreenParams,
} from '../../components/Services/ServicesScreen'
import { ServicesScreenCallbacks } from '../../components/Services/ServicesScreen'

export default function Services() {
    const session = useSession()
    const userId = session?.userId? session?.userId : 0; 
    const {getUserServices, getAllServices, loading} = useUserServices(userId);
    const {deleteUserService, putUserService} = useModifyServices();
    let serviceSelected: ServiceEntry = {} as ServiceEntry
    const [userServices, setUserServices] = useState<ServiceEntry[]>([])
    const [allServices, setAllServices] = useState<ServiceEntry[]>([])

    const onSuccess = (response: any) => {
        const _userServices: ServiceEntry[] = response.data.results

        setUserServices(_userServices)
    }

    const onSuccessGetAllServices = (response: any) => {
        console.log('All services loaded')
        const _allServices: ServiceEntry[] = response.data.streamServices
        setAllServices(_allServices)
    }

    useEffect(() => {
        getUserServices(onSuccess)
        getAllServices(onSuccessGetAllServices)
    }, [])

    const onSuccessDelete = (response: any) => {
        console.log('Item deleted')
    }

    const onUserServicePressed = (service: ServiceEntry) => {
        console.log(service.providerName + ' pressed')
        const params: deleteUserServiceParams = {
            providerId: service.providerId,
        }
        serviceSelected = service

        const _userServices = userServices.filter(
            (service) => service.providerId !== serviceSelected.providerId
        )
        setUserServices(_userServices)
        deleteUserService(params, onSuccessDelete)
    }

    const onSuccessPut = (response: any) => {
        console.log('Item added')
    }

    const onCheckService = (service: ServiceEntry, checked: Boolean) => {
        console.log(service.providerName + ' checked')

        if (checked) {
            setUserServices([service, ...userServices])
            const params: putUserServiceParams = {
                providerId: service.providerId,
            }
            putUserService(params, onSuccessPut)
        } else {
            onUserServicePressed(service)
        }
    }

    const callbacks: ServicesScreenCallbacks = {
        onUserServicePressed: onUserServicePressed,
        onCheckService: onCheckService,
    }

    const serviceScreenParams: ServicesScreenParams = {
        userServices: userServices,
        allServices: allServices,
        callbacks: callbacks,
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingComponent />
            ) : (
                <ServicesScreen {...serviceScreenParams} />
            )}
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
