import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons'

const StartScreen = (props) => {
  const { navigation } = props;
  return (

    <View style={styles.mainView}>
      <SafeAreaView backgroundColor={'#023e8a'} opacity={0.95} />

      <View style={styles.quizMain}> 
        <Text style={styles.quixTxt}>QUIZ</Text>
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.txt}>START</Text>
        </TouchableOpacity>
        <Icon name={'keyboard-arrow-up'} color={'black'} size={25} />
      </View>
    </View>
  );
};

export default StartScreen;
