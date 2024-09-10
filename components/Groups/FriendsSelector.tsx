import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { LoadingComponent } from '../BasicComponents/LoadingComponent'
import { FriendEntry, FriendType } from '../Profile/Friends/FriendEntry'
import { useGetFriends } from '../../hooks/friends/useGetFriendsList'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { useSession } from '../../context/ctx'

type FriendsSelectorParams = {
    onChange: (selectedFriends: FriendType[]) => void
}

export const FriendsSelector = (params: FriendsSelectorParams) => {
    const [friends, setFriends] = useState<FriendType[]>([]);
    const {getFriends, onFriendsReachedEnd, loading} = useGetFriends(setFriends);
    const [ loadingFirstPage, setLoadingFirstPage ] = useState(true);
    const session = useSession();

    const onCheckBoxPress = (friend: FriendType) => {
        const newFriends = friends.map(f => {
            if (f.id === friend.id) {
                f.selected = !f.selected;
            }
            return f;
        })
        setFriends(newFriends);
        params.onChange(newFriends.filter(f => f.selected));
    }

    useEffect(() => {
        getFriends();
    }, [])

    useEffect(() => {
    if (loadingFirstPage && !loading) {
        console.log('[loadingFirstPage]', loadingFirstPage)
        setLoadingFirstPage(false);
    }
    }, [loading])

    if (loadingFirstPage) {
        return <LoadingComponent />
    }

    const myself: FriendType = {
        userId: session?.userId || 0,
        id: session?.userId || 0,
        email: session?.email || '',
        userName: "Eres tu",
        displayName: "Eres tu",
        showCheckBox: true,
        onCheckBoxPress: (friend: FriendType) => {},
        selected: true,
        disabledCheckBox: true,
        disabledRedirect: true
    }

    return (
        friends.length > 0 ?
            <>
            <View style={{margin: 10, width: '100%' }}>
                <FriendEntry {...myself} showCheckBox={true} />
            </View>
            
            <FlatList
                style={{ margin: 10, width: '100%' }}
                data={friends}
                renderItem={({ item, index }) => 
                    <FriendEntry {...item} key={index} showCheckBox={true} onCheckBoxPress={onCheckBoxPress} selected={item.selected} disabledRedirect={true}/>
            }
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={onFriendsReachedEnd}
            />
            </>
            :
            <BodyText
                body='Todavía no tienes amigos'
                size='big'
                color={colors.primaryBlue} />
    )
}
