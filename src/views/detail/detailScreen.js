import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as Utils from './../../utils/convert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import styles from '../detail/detailScreen.style';

const Detail = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [detailTransaction, setDetailTransaction] = useState(
    !props.navigation.state.params.data
      ? null
      : props.navigation.state.params.data,
  );
  const _copyToClipboard = () => {
    Clipboard.setString(detailTransaction.id);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Copy to Clipboard ${detailTransaction.id}`, 1000);
    } else {
      alert('Copy to Clipboard');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.containerComponent}>
        <View style={styles.headerComponent}>
          <Text style={styles.fontBold}>
            ID TRANSAKSI : #{detailTransaction.id}
          </Text>
          <Icon
            color={'#e35c19'}
            name={'content-copy'}
            size={15}
            style={{marginLeft: 5}}
            onPress={() => _copyToClipboard()}
          />
        </View>

        <View style={styles.lineThin} />
        <View style={styles.containerTextDetail}>
          <Text style={{fontWeight: 'bold', flex: 1}}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={{fontWeight: 'bold', color: '#e35c19'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineWeight} />
        <View style={styles.containerTextRow}>
          <Text style={styles.fontBold}>
            {detailTransaction.sender_bank.toUpperCase()} ➔{' '}
            {detailTransaction.beneficiary_bank.toUpperCase()}
          </Text>
          <View style={styles.flexRow}>
            <View style={styles.flexOne}>
              <Text style={styles.fontBold}>
                {detailTransaction.beneficiary_name.toUpperCase()}
              </Text>
              <Text>{detailTransaction.account_number.toUpperCase()}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.fontBold}>NOMINAL</Text>
              <Text>{Utils.currencyFormat(detailTransaction.amount)}</Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexOne}>
              <Text style={styles.fontBold}>BERITA TRANSFER</Text>
              <Text>{detailTransaction.remark.toUpperCase()}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.fontBold}>KODE UNIK</Text>
              <Text>{detailTransaction.unique_code}</Text>
            </View>
          </View>
          <View style={{flex: 0, marginTop: 15}}>
            <Text style={styles.fontBold}>WAKTU DIBUAT</Text>
            <Text>{Utils.convertYears(detailTransaction.created_at)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
