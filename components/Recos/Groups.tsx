import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { colors } from '../../assets';
import { TitleText } from '../BasicComponents/TitleText';
import { router } from 'expo-router';
import { Icon } from 'react-native-elements';
import { CustomButton } from '../BasicComponents/CustomButton';
import { useGetGroups } from '../../apiCalls/groups';
import { GroupType } from '../Types/Groups';
import { GroupsList } from '../Groups/GroupsList';
import { useOnFocus } from '../../hooks/useOnFocus';

const screenWidth = Dimensions.get('window').width

export const Groups = () => {
    const { getGroups } = useGetGroups();
    const [groups, setGroups] = React.useState<GroupType[]>([]);

    const onSuccessGetGroups = (response: any) => {
        setGroups(response.data.groups)
    }

    useOnFocus(() => {
        getGroups(onSuccessGetGroups)
    })

    return (
        <>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10

            }}>
                <TitleText body="Grupos" style={styles.titleText} size='medium' />
                <Icon
                    name={"plus"}
                    type="font-awesome"
                    color="black"
                    onPress={() => router.push('/createGroup')}
                />
            </View>
            <View style={styles.horizontalLine} />

            {groups.length > 0 ?
                <GroupsList groups={groups} setGroups={setGroups}/>
                :
                <CustomButton
                    buttonText='Crea tu primer grupo'
                    fontSize='small'
                    type='primary'
                    onPress={() => router.push('/createGroup')}
                    buttonSize='medium'
                    style={{ marginVertical: 5, alignSelf: 'center' }}
                />
            }
            <View style={styles.horizontalLine} />
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
        fontWeight: 'bold',
        marginLeft: 0
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