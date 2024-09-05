import React, { useState } from "react";
import { ButtonGroup } from '@rneui/themed'
import { colors } from "../../assets";
import { AxiosResponse } from "axios";

type MonthFilterButtonsType = {
  updateStats: (month: string) => void;
}

export const MonthFilterButtons = (params: MonthFilterButtonsType) => {
  const [index, setIndex] = useState(0);

  const onPress = (value: number) => {
    setIndex(value);
    if(value == 0) {
      params.updateStats('1');
    } else if (value == 1) {
      params.updateStats('3');
    } else {
      params.updateStats('6');
    }
  }
 
  return(
    <ButtonGroup
      buttons={['1 mes', '3 meses', '6 meses']}
      selectedIndex={index}
      onPress={onPress}
      containerStyle={{
        marginTop: 20,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderRadius: 20,
      }}
      buttonContainerStyle={{
        borderColor: 'black',
      }}
      selectedButtonStyle={{
        backgroundColor: colors.primaryRed,
      }}
      textStyle={{
        color: 'black',
        fontSize: 14,
      }} />
  )
}
