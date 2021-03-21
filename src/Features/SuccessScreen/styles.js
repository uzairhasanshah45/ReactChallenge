import {ScaledSheet} from 'react-native-size-matters';
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  mainView: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    flex:1
  },
  animation1: {
    height: '200@ms',
    width: '200@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation2: {
    height: '150@ms',
    width: '100@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationBox: {
    marginVertical: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '20%',
    right: 0,
    left: 0
  },
  buttonBox: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0
   },
  button: {
    height: '40@ms',
    width: '140@ms',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: '10@ms',
    borderWidth: '1@ms',
    borderColor: '#a3a2a2',
    backgroundColor: 'transparent',
    marginVertical: '3@ms',
  },
  txt: {
    fontSize: '18@ms',
    color: '#e3e3e3'
  },
  successHeader: {
    alignItems: 'center',
    marginTop: '30@ms'
  },
  headerText: {
    color: '#e3e3e3',
    fontSize: '50@ms',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
});
