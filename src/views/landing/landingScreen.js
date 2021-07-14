import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {GetList} from './../../actions/actions';
import * as Utils from './../../utils/convert';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './landingScreen.style';

const LandingScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listTransaction, setList] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState(0);
  const [filterName, setFilterName] = useState('URUTKAN');
  const [isFetching, setFetching] = useState(false);
  const [sorting, setSorting] = useState([
    {
      name: 'URUTKAN',
    },
    {
      name: 'Nama A-Z',
    },
    {
      name: 'Nama Z-A',
    },
    {
      name: 'Tanggal Terbaru',
    },
    {
      name: 'Tanggal Terlama',
    },
  ]);
  const [visibleModal, setModalVisible] = useState(false);
  useEffect(() => {
    props.GetList();
  }, []);

  useEffect(() => {
    if (listTransaction != null) {
      const array = listTransaction;
      const data = array.filter(item => {
        return item.beneficiary_name.match(keyword);
      });
      if (data.length > 0) {
        setList(data);
      }
    }
  }, [keyword]);

  useEffect(() => {
    if (props.listTransaction != null) {
      var myData = Object.keys(props.listTransaction).map(key => {
        return props.listTransaction[key];
      });
      setList(myData);
    }
  }, [props.listTransaction]);

  const _onChangeText = value => {
    setKeyword(value);
    if (value.length === 0) {
      var myData = Object.keys(props.listTransaction).map(key => {
        return props.listTransaction[key];
      });
      setList(myData);
    } else if (value.length > 0 && listTransaction != null) {
      const array = listTransaction;
      const data = array.filter(item => {
        return item.beneficiary_bank.match(value);
      });
      if (data.length > 0) {
        setList(data);
      }
    }
  };

  const _setFilter = value => {
    var myData = Object.keys(props.listTransaction).map(key => {
      return props.listTransaction[key];
    });
    if (value === 'Nama A-Z') {
      const array = myData.sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name),
      );
      setList(array);
    } else if (value === 'Nama Z-A') {
      const array = myData.sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name),
      );
      setList(array);
    } else if (value === 'Tanggal Terbaru') {
      const array = myData.sort((a, b) => {
        var dateA = a.created_at;
        var dateB = b.created_at;
        if (dateA > dateB) {
          return -1;
        }
      });
      setList(array);
    } else if (value === 'Tanggal Terlama') {
      const array = myData.sort((a, b) => {
        var dateA = a.created_at;
        var dateB = b.created_at;
        if (dateA < dateB) {
          return -1;
        }
      });
      setList(array);
    } else {
      setList(myData);
    }
    setFilterName(value);
    setModalVisible(false);
  };
  const onRefresh = () => {
    setFetching(true);
    function refreshPage() {
      props.GetList();
      setFetching(false);
    }
    refreshPage();
  };
  const _renderList = data => {
    if (data != null) {
      return (
        <FlatList
          data={listTransaction}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
            />
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.containerList}
              onPress={() =>
                props.navigation.navigate('DetailScreen', {data: item})
              }>
              <View
                style={
                  item.status === 'SUCCESS'
                    ? styles.containerLabelLeftGreen
                    : styles.containerLabelLeftOrange
                }
              />
              <View style={styles.flexOne}>
                <Text style={{fontWeight: 'bold'}}>
                  {item.sender_bank.toUpperCase()} ➔{' '}
                  {item.beneficiary_bank.toUpperCase()}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {item.beneficiary_name.toUpperCase()}
                </Text>
                <Text style={{fontWeight: '400'}}>
                  {Utils.currencyFormat(item.amount)} ●{' '}
                  {Utils.convertYears(item.completed_at)}
                </Text>
              </View>

              <View
                style={
                  item.status === 'SUCCESS'
                    ? styles.borderGreen
                    : styles.borderOrange
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    padding: 5,
                    color: item.status === 'SUCCESS' ? '#ffffff' : '#000000',
                  }}>
                  {item.status === 'SUCCESS'
                    ? 'Berhasil'
                    : item.status === 'PENDING'
                    ? 'Pengecekan'
                    : item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          key={'_'}
          numColumns={1}
          keyExtractor={(item, index) => '_' + index.toString()}
        />
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onBackButtonPress
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.containerModal}>
          <View style={styles.componentModal}>
            {sorting.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{flexDirection: 'row', margin: 10}}
                  onPress={() => _setFilter(item.name)}>
                  <View style={styles.radioCircle}>
                    <View
                      style={
                        filterName === item.name
                          ? styles.radioCircleActive
                          : styles.radioCircleNull
                      }
                    />
                  </View>

                  <Text style={{flex: 1, fontSize: 12, marginLeft: 10}}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
      <View style={styles.containerSearch}>
        <Icon color={'gray'} name={'search1'} size={20} />
        <TextInput
          placeholderTextColor={'gray'}
          placeholder={'Cari nama, bank, atau nominal'}
          style={{padding: 10, fontSize: 12, color: 'gray'}}
          value={keyword}
          onChangeText={text => _onChangeText(text)}
        />
        <Text style={styles.textFilter}>{filterName}</Text>
        {filter === 0 ? (
          <Icon
            color={'#e35c19'}
            name={'down'}
            size={20}
            onPress={() => setModalVisible(true)}
          />
        ) : null}
      </View>
      {_renderList(props.listTransaction)}
    </SafeAreaView>
  );
};
const mapStateToProps = ({LandingReducer}) => {
  const {listTransaction} = LandingReducer;
  return {
    listTransaction,
  };
};

export default connect(mapStateToProps, {GetList})(LandingScreen);
