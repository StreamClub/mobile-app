import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
      <View style={styles.container}>
        <TextInput
          label="Fecha de nacimiento"
          value={date.toLocaleDateString()} // Format the date for display in the TextInput
          onTouchStart={showDatepicker}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </View>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

export default DatePicker;
