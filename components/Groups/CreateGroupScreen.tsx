import React from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { colors } from '../../assets';
import { TitleText } from '../BasicComponents/TitleText';
import { router } from 'expo-router';
import { BodyText } from '../BasicComponents/BodyText';
import { FriendsSelector } from './FriendsSelector';
import { Input } from 'react-native-elements';
import { CustomButton } from '../BasicComponents/CustomButton';
import { FriendType } from '../Profile/Friends/FriendEntry';
import { useCreateGroup } from '../../apiCalls/groups';

const screenWidth = Dimensions.get('window').width

export const CreateGroupScreen = () => {
    const [groupName, setGroupName] = React.useState<string>('')
    const [members, setMembers] = React.useState<FriendType[]>([])
    const createGroup = useCreateGroup()

    const onSuccessCreateGroup = () => {
        console.log('Group created successfully')
        router.back()
    }

    const onClickCreateGroup = () => {
        const membersIds = members.map(member => member.id)
        console.log('sending Create Group request', groupName, membersIds)
        createGroup.createGroup(groupName, membersIds, onSuccessCreateGroup)
    }

    const onGroupNameChange = (newGroupName: string) => {
        setGroupName(newGroupName)
    }

    const onMembersChange = (newMembers: FriendType[]) => {
        setMembers(newMembers)
    }

    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={
                <>
                    <View style={{ margin: 10 }}>
                        <BodyText body="Recibe recomendaciones para ti y tus amigos." size='medium' />
                        <BodyText body="estarán disponibles en 24hs" size='medium' />

                        <Input
                            placeholder="Nombre del grupo"
                            leftIcon={{ type: 'Entypo', name: 'group' }}
                            containerStyle={styles.inputContainer}
                            onChangeText={onGroupNameChange}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />

                    </View>

                    <TitleText body="Miembros" style={styles.titleText} size='medium' />
                    <View style={styles.horizontalLine} />
                    <FriendsSelector onChange={onMembersChange} />
                </>
            }
            ListFooterComponent={
                <CustomButton
                    buttonText='Crear Grupo'
                    fontSize='small'
                    type='primary'
                    onPress={onClickCreateGroup}
                    buttonSize='medium'
                    style={{ marginVertical: 5, alignSelf: 'center' }}
                    disabled={groupName.length === 0 || members.length === 0}
                />
            }
            data={[]}
            renderItem={() => null}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    titleText: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    inputContainer: {
        height: 40,
        width: '80%',
        marginVertical: 20,
        alignSelf: 'center',
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
    horizontalLine: {
        width: "100%",
        alignSelf: 'center',
        height: 1,
        backgroundColor: "black",
        borderRadius: 100,
        marginTop: 4,
        marginBottom: 4
    },
});

const seenContentStyles = StyleSheet.create({
    contentPoster: {
        height: (screenWidth / 1.7),
        aspectRatio: 2 / 3,
        borderRadius: 5,
        margin: 0,
        marginHorizontal: 10,
        borderWidth: 1,
    },
});