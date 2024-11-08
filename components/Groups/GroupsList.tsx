import React, { useEffect } from 'react'
import { FlatList, View, StyleSheet, Dimensions } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { GroupType } from '../Types/Groups'
import { TitleText } from '../BasicComponents/TitleText'
import { Icon, Overlay } from 'react-native-elements'
import { GroupDetails } from './GroupDetails'
import { useDeleteGroup } from '../../apiCalls/groups'
import { Carousel } from '../BasicComponents/Carousel'
import { TmdbImageType } from '../BasicComponents/TmdbImage'
import { CarouselEntry } from '../BasicComponents/Types/CarouselParams'
import { router } from 'expo-router'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'

const screenWidth = Dimensions.get('window').width

type GroupsListParams = {
    groups: GroupType[],
    setGroups: (groups: GroupType[]) => void
}

export const GroupsList = (params: GroupsListParams) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [groupId, setGroupId] = React.useState(0);
    const [groupsWithRecos, setGroupsWithRecos] = React.useState<GroupType[]>([])
    const [groupsWithoutRecos, setGroupsWithoutRecos] = React.useState<GroupType[]>([])

    const { deleteGroup } = useDeleteGroup()

    const onSuccessDeleteGroup = (response: any) => {
        console.log('Group deleted successfully')
    }

    const onDelete = (groupId: number) => {
        console.log('Begining group delete', groupId)
        deleteGroup(groupId.toString(), onSuccessDeleteGroup)
        
        const newGroups = params.groups.filter(group => group.id !== groupId)
        params.setGroups(newGroups)

        setGroupId(0)
        setOpenModal(false)
    }

    const onCancel = () => {
        setGroupId(0)
        setOpenModal(false)
    }

    const formatToCarouselEntryArray = (movies: any[]) => {
        const carouselEntries: CarouselEntry[] = []
        movies.forEach((movie: any) => {
            const carouselEntry: CarouselEntry = {
                tmdbResource: movie.poster,
                itemData: movie,
            }
            carouselEntries.push(carouselEntry)
        })
        return carouselEntries
    }

    const onMoviePressed = (movie: any) => {
        const params: ContentDetailsParams = {
            id: movie.id.toString(),
        }
        router.push({ pathname: '/movie', params })
    }

    useEffect(() => {
        if (groupId) {
            console.log('Selected groupId', groupId)
            setOpenModal(true)
        }
    }, [groupId])

    useEffect(() => {
        const groupsWithRecos = params.groups.filter(group => group.movies.length > 0)
        const groupsWithoutRecos = params.groups.filter(group => group.movies.length === 0)

        setGroupsWithRecos(groupsWithRecos)
        setGroupsWithoutRecos(groupsWithoutRecos)
    }, [params.groups])

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

        {/* Groups with recos */}
        <FlatList
            style={{ width: '100%' }}
            data={groupsWithRecos}
            renderItem={({ item, index }) =>
                <>
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
                <Carousel
                    type={TmdbImageType.Cover}
                    items={formatToCarouselEntryArray(item.movies)}
                    containerStyle={styles.carousel}
                    itemStyle={seenContentStyles.contentPoster}
                    onItemPressed={onMoviePressed}
                />
                </>
            }
            keyExtractor={(item, index) => index.toString()}
        />

        {/* Groups without recos */}
        {groupsWithoutRecos.length > 0 && <FlatList
            style={{ width: '100%' }}
            data={groupsWithoutRecos}
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
        />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    carousel: {
        width: screenWidth,
        marginVertical: 20,
    },
    serviceLogo: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
        borderWidth: 1,
    },
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 8,
        textDecorationLine: 'underline',
    },
    titleText: {
        fontWeight:'bold', 
        marginLeft: 10
    },
});

const seenContentStyles = StyleSheet.create({
    contentPoster: {
        height: (screenWidth/1.7),
        aspectRatio: 2/3,
        borderRadius: 5,
        margin: 0,
        marginHorizontal: 10,
        borderWidth: 1,
    },
});
