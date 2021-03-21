import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;


export const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.30)',
    justifyContent: 'center',
  },
  quizMain: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  quixTxt: {
    fontSize: '40@ms',
    fontWeight: 'bold'
  },
  buttonBox: { 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 0,
    left: 0 
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@ms',
    backgroundColor: 'transparent',
  },
  txt: {
    fontSize: '16@ms',
    color: 'black'
  },
});
