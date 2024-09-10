import React from 'react'
import { FlatList, View } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { GroupType } from '../Types/Groups'
import { TitleText } from '../BasicComponents/TitleText'
import { Icon, Overlay } from 'react-native-elements'

type GroupsListParams = {
    groups: GroupType[]
}

export const GroupsList = (params: GroupsListParams) => {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <>
        <Overlay
            isVisible={openModal}
            onBackdropPress={() => setOpenModal(false)}
            overlayStyle={{
                backgroundColor: colors.primarySkyBlue,
                margin: 20,
                borderRadius: 20,
            }} >
            <TitleText body={'Para ver con '} size='medium' />
        </Overlay>

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
                        onPress={() => setOpenModal(true)}
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
        </>
    )
}
