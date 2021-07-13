import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

const Detail = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Detail</Text>
    </SafeAreaView>
  );
};

export default Detail;
