import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { GroupType } from '../Types/Groups'
import { TitleText } from '../BasicComponents/TitleText'
import { Icon, Overlay } from 'react-native-elements'
import { GroupDetails } from './GroupDetails'
import { useDeleteGroup } from '../../apiCalls/groups'

type GroupsListParams = {
    groups: GroupType[]
}

export const GroupsList = (params: GroupsListParams) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [groupId, setGroupId] = React.useState(0);

    const { deleteGroup } = useDeleteGroup()

    const onSuccessDeleteGroup = (response: any) => {
        console.log('Group deleted', response)
        // TODO: Redux delete logic
    }

    const onDelete = (groupId: number) => {
        console.log('Group delete', groupId)
        deleteGroup(groupId.toString(), onSuccessDeleteGroup)
        
        setGroupId(0)
        setOpenModal(false)
    }

    const onCancel = () => {
        setGroupId(0)
        setOpenModal(false)
    }

    useEffect(() => {
        if (groupId) {
            setOpenModal(true)
        }
    }, [groupId])

    return (
        <>
        <Overlay
            isVisible={openModal}
            onBackdropPress={() => setOpenModal(false)}
            overlayStyle={{
                backgroundColor: colors.primarySkyBlue,
                width: '80%',
                height: '60%',
                borderRadius: 20,
            }} >
            <GroupDetails groupId={groupId} onDelete={onDelete} onCancel={onCancel}/>
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
                        onPress={() => setGroupId(item.id)}
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
