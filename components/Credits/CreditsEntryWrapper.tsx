import React from 'react'
import { View, StyleSheet } from 'react-native';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';
import { CreditsEntry, CastEntry, CrewEntry } from '../Types/Credits';

export type CreditsEntryWrapperProps = {
    textSize: "big" | "small" | "medium";
}

const renderRole = (credit: CreditsEntry, props: CreditsEntryWrapperProps) => {
    let role = ''
    if ('character' in credit) {
        role = credit.character as string
    } else if ('department' in credit) {
        role = credit.department as string
    } else {
        throw new Error('Tipo de entrada de créditos no reconocido');
    }

    return (
        <BodyText
            size={props.textSize}
            body={role} 
            numberOfLines={2} 
            style={{marginLeft: 2, fontWeight: 'bold'}}
            color={colors.primaryGrey}
        />
    )
}

export const CreditsEntryWrapper = (itemObject: CreditsEntry, itemComponent: React.ReactElement, props: CreditsEntryWrapperProps) => {
    const name = itemObject.name? itemObject.name : ''
    let credit
    if ('character' in itemObject) {
        credit = itemObject as CastEntry
    } else if ('department' in itemObject) {
        credit = itemObject as CrewEntry
    } else {
        throw new Error('Tipo de entrada de créditos no reconocido');
    }

    return (
        <View>
            {itemComponent}
            <BodyText 
                body={name} 
                size={props.textSize} 
                numberOfLines={2} 
                style={{marginLeft: 2, fontWeight: 'bold'}}
            />
            {renderRole(credit, props)}
        </View>
    )
}

const styles = StyleSheet.create({
});
