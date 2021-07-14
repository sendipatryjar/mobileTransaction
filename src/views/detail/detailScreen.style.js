import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f1f1'},
  containerComponent: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  headerComponent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineThin: {
    borderWidth: 0.5,
    borderColor: '#f1f1f1',
  },
  lineWeight: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  containerTextDetail: {
    padding: 20,
    flexDirection: 'row',
  },
  containerTextRow: {
    padding: 20,
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  flexOne: {
    flex: 1,
  },
});
export default styles;
