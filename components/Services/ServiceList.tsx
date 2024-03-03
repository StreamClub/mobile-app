import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { colors } from '../../assets'
import { ServiceEntry } from '../Types/Services'
import {
    TmdbImage,
    TmdbImageParams,
    TmdbImageType,
} from '../BasicComponents/TmdbImage'
import { TitleText } from '../BasicComponents/TitleText'
import { CheckBox } from '@rneui/themed'

const isServiceSelected = (
    service: ServiceEntry,
    userServices: ServiceEntry[]
) => {
    return userServices.some(
        (userService) => userService.providerId === service.providerId
    )
}

const renderServiceEntry = (
    service: ServiceEntry,
    index: number,
    params: ServiceListParams
) => {
    const [checked, setChecked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)

    useEffect(() => {
        setChecked(isServiceSelected(service, params.userServices))
        setDisabled(false)
    }, [params.userServices])

    const _params: TmdbImageParams = {
        resource: service.logoPath,
        type: TmdbImageType.Cover,
        style: styles.logo,
    }

    const toggleCheckbox = () => {
        params.onServicePressed(service, !checked)
        setDisabled(true)
        setChecked(!checked)
    }

    return (
        <View key={index} style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.3 }}>
                <TmdbImage {..._params} />
            </View>
            <TitleText
                body={service.providerName}
                size="small"
                style={styles.title}
            />
            <View
                style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CheckBox
                    checked={checked}
                    disabled={disabled}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    size={30}
                    checkedColor={colors.primaryBlack}
                    uncheckedColor={colors.primaryGrey}
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    containerStyle={{ backgroundColor: 'trasparent' }}
                />
            </View>
        </View>
    )
}

export type ServiceListParams = {
    userServices: ServiceEntry[]
    allServices: ServiceEntry[]
    onServicePressed: (service: ServiceEntry, checked: Boolean) => void
}

export const ServiceList = (params: ServiceListParams) => {
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {params.allServices.map((service, index) =>
                renderServiceEntry(service, index, params)
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
    },
    logo: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 0.5,
    },
})
