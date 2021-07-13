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
} from 'react-native';
import {connect} from 'react-redux';
import {GetList} from './../../actions/actions';
import * as Utils from './../../utils/convert';
import Icon from 'react-native-vector-icons/AntDesign';

const LandingScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [listTransaction, setList] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState(0);
  const [filterName, setFilterName] = useState('URUTKAN');
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
      console.log(value);
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
      console.log(JSON.stringify(array))
      setList(array);
    } else if (value === 'Tanggal Terlama') {
      const array = myData.sort((a, b) => {
        var dateA = a.created_at;
        var dateB = b.created_at;
        if (dateA < dateB) {
          return -1;
        }
      });
      console.log(JSON.stringify(array))
      setList(array);
    } else {
      setList(myData);
    }
    setFilterName(value);
    setModalVisible(false);
  };

  const _renderList = data => {
    if (data != null) {
      return (
        <FlatList
          data={listTransaction}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                margin: 10,
                borderRadius: 5,
                paddingRight: 10,
              }}
              onPress={() => props.navigation.navigate('DetailScreen')}>
              <View
                style={{
                  backgroundColor:
                    item.status === 'SUCCESS' ? '#148F0F' : '#e35c19',
                  flex: 0,
                  width: 10,
                  height: 120,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  marginRight: 5,
                }}
              />
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>
                  {item.sender_bank.toUpperCase()} ➔{' '}
                  {item.beneficiary_bank.toUpperCase()}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {item.beneficiary_name.toUpperCase()}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {Utils.currencyFormat(item.amount)} ●{' '}
                  {Utils.convertYears(item.completed_at)}
                </Text>
              </View>

              <View
                style={{
                  flex: 0,
                  borderColor:
                    item.status === 'SUCCESS' ? '#148F0F' : '#e35c19',
                  borderWidth: 3,
                  borderRadius: 5,
                  backgroundColor:
                    item.status === 'SUCCESS' ? '#148F0F' : '#ffffff',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    padding: 5,
                    color: item.status === 'SUCCESS' ? '#ffffff' : '#000000',
                  }}>
                  {item.status === 'SUCCESS'
                    ? 'BERHASIL'
                    : item.status === 'PENDING'
                    ? 'PENGECEKAN'
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {sorting.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{flexDirection: 'row', margin: 10}}
                  onPress={() => _setFilter(item.name)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: '#e35c19',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 0,
                    }}>
                    <View
                      style={
                        filterName === item.name
                          ? {
                              width: 15,
                              height: 15,
                              backgroundColor: '#e35c19',
                              borderRadius: 10,
                            }
                          : {
                              width: 15,
                              height: 15,
                              backgroundColor: '#ffffff',
                              borderRadius: 10,
                            }
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          margin: 10,
          borderRadius: 5,
        }}>
        <Icon color={'#000000'} name={'search1'} size={20} style={{}} />
        <TextInput
          placeholder={'Cari nama, bank, atau nominal'}
          style={{padding: 15}}
          value={keyword}
          onChangeText={text => _onChangeText(text)}
        />
        <Text
          style={{
            fontWeight: 'bold',
            padding: 5,
            color: '#e35c19',
          }}>
          {filterName}
        </Text>
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
