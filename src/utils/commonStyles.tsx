import {StyleSheet} from 'react-native';

const CommonStyles = StyleSheet.create({
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mt2: {
    marginTop: 2,
  },
  mt4: {
    marginTop: 4,
  },
  ml10: {
    marginLeft: 10,
  },
  ml5: {
    marginLeft: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  container: {
    margin: 16,
  },
  mt16: {
    marginTop: 16,
  },
  mx16: {
    marginHorizontal: 16,
  },
  my16: {
    marginVertical: 16,
  },
  m16: {
    margin: 16,
  },
  mt8: {
    marginTop: 8,
  },
  mx8: {
    marginHorizontal: 8,
  },
  my8: {
    marginVertical: 8,
  },
  m8: {
    margin: 8,
  },
  vwButton: {
    width: '90%',
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
});

export default CommonStyles;
