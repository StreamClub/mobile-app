import React from 'react'
import { FlatList, View } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { GroupType } from '../Types/Groups'
import { TitleText } from '../BasicComponents/TitleText'
import { Icon } from 'react-native-elements'

type GroupsListParams = {
    groups: GroupType[]
}

export const GroupsList = (params: GroupsListParams) => {

    return (
        <FlatList
            style={{ width: '100%' }}
            data={params.groups}
            renderItem={({ item, index }) =>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TitleText body={'Para ver con '} size='medium' />
                        <TitleText body={item.name} style={{ fontWeight: 'bold' }} size='medium' />
                    </View>
                    <Icon
                        name={"edit"}
                        type="font-awesome"
                        color="black"
                        onPress={() => console.log('Edit group', item)}
                    />
                </View>

            }
            ListFooterComponent={
                <BodyText 
                    body={"Estamos calculando las recomendaciones, vuelve a intentarlo en 24hs."} 
                    size='big'
                    style={{alignSelf: 'center', textAlign: 'center', fontStyle:'italic', color: colors.primaryDarkRed}}
                />
            }
            keyExtractor={(item, index) => index.toString()}

        />
    )
}
