import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native'
import { colors } from "../../assets";
import { TitleText } from "../BasicComponents/TitleText";
import { TmdbImage, TmdbImageType } from "../BasicComponents/TmdbImage";
import { CustomButton } from "../BasicComponents/CustomButton";
import { Overlay } from "react-native-elements";
import { useGetGroupDetails } from "../../apiCalls/groups";
import { FlatList } from "react-native-gesture-handler";

type MemberType = {
    id: number,
    userName: string,
}

type GroupDetailsParams = {
    groupId: number,
}

export const GroupDetails = (params: GroupDetailsParams) => {
    const { getGroupDetails } = useGetGroupDetails();

    const [members, setMembers] = useState<MemberType[]>([]);
    const [name, setName] = useState('');

    const onSuccessGetGroupDetails = (response: any) => {
        const name: string = response.data.name;
        setName(response.data.name)
        
        const members: MemberType[] = response.data.members;
        setMembers(members)
    }

    useEffect(() => {
        getGroupDetails(params.groupId, onSuccessGetGroupDetails)
    }, []);

    return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <TitleText body={'Grupo '} />
                    <TitleText body={name} style={{fontWeight: 'bold'}}/>
                </View>
                <View
                    style={{ width:'95%', height: '70%', alignSelf: 'center', backgroundColor: 'white', margin: 10, borderRadius: 20, marginBottom: 30 }}    
                >
                    <FlatList
                        data={members}
                        renderItem={({ item }) => 
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                                <TitleText body={item.userName} />
                            </View>
                        }
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        buttonText="Eliminar"
                        type="primary"
                        fontSize="small"
                        buttonSize="medium"
                        onPress={() => console.log("Pressed") } 
                    />
                    <CustomButton
                        buttonText="Cancelar"
                        type="secondary"
                        fontSize="small"
                        buttonSize="medium"
                        onPress={() => console.log("Pressed") } 
                    />
                </View>
            </View>
    )
}

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primaryBlue,
        margin: 10,
        borderRadius: 20,
    },
    
    buttonContainer: {
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
    }
})
