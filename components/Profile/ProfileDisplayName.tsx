import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconWithText, IconWithTextParams } from '../BasicComponents/IconWithText';
import { LocalIcon } from '../Types/LocalIcon';
import { usePatchDisplayName, patchDisplayNameParams } from '../../apiCalls/profile';
import { MAX_DISPLAY_NAME_LENGHT } from '../../constants/constants';

type ProfileDisplayNameParams = {
  displayName: string,
  editable: boolean
}

export const ProfileDisplayName = (params: ProfileDisplayNameParams) => {
  const [editing, setEditing] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(params.displayName);
  const {patchDisplayName} = usePatchDisplayName();

  const onSuccessPatchDisplayName = (response: any) => {
    console.log("[onsuccess]", response.data)
    setDisplayName(response.data.displayName)
  }

  const onPressRigthIcon = () => {
    if (editing) {
      setEditing(false);
      setDisplayName(params.displayName);
    }
    else {
      setEditing(true);
    }
  }

  const onEndEditing = () => {
    onChangeDisplayName(displayName);
    setEditing(false);
  }

  const displayNameParams: IconWithTextParams = {
    text: displayName,
    textSize: "big",
    textStyle: styles.displayName,
    textType: "title"
  }

  const onChangeDisplayName = (newDisplayName: string) => {
    console.log("[onchange]", newDisplayName)

    const patchDisplayNameParams: patchDisplayNameParams = {
        displayName: newDisplayName
    }
    patchDisplayName(patchDisplayNameParams, onSuccessPatchDisplayName)
  }

  const textInputParams = {
    value: displayName,
    onChangeText: (text: string) => { setDisplayName(text) },
    maxLength: MAX_DISPLAY_NAME_LENGHT,
    multiline: true,
    placeholder: "¿Cuál es tu nombre?",
    onEndEditing: onEndEditing,
    returnKeyType: "send",
    blurOnSubmit: true,
}

  const editableDisplayNameParams: IconWithTextParams = {
    rightIcon: editing? LocalIcon.undo : LocalIcon.edit,
    text: displayName,
    textSize: "big",
    textStyle: styles.displayName,
    textInputParams: textInputParams,
    canEdit: editing,
    textType: "title",
    iconStyle: styles.iconStyle,
    onPressIcon: onPressRigthIcon,
    iconContainerStyle: styles.iconContainerStyle,
  }

  return(
    <View style={{width: "95%", alignSelf: 'center'}}>
      <IconWithText {... params.editable? editableDisplayNameParams : displayNameParams}/>
      <View style={styles.horizontalLine}/>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalLine: {
    width: "100%", 
    alignSelf: 'center', 
    height: 1, 
    backgroundColor: "black", 
    borderRadius: 100,
    marginTop: 4,
  },
  displayName: {
    fontWeight: "bold",
    marginLeft: 3,
    flexGrow: 1,
    width: "85%",
  },
  iconStyle: {
    height: 25,
    aspectRatio: 1,
    marginRight: 3,
  },
  iconContainerStyle: {
    alignSelf: "flex-end",
  },
})
