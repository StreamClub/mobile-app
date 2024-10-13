import { StyleSheet } from 'react-native';
import { colors } from '../../../../assets';

export const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: 300,
  },
  textInput: {
    margin: 10,
    padding: 10,
    height: 160,
    backgroundColor: colors.primaryWhite,
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 10
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'flex-end',
  },
  picture: {
    borderRadius: 80,
    width: 60,
    height: 60,
  }
});
