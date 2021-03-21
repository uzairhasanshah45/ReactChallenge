import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { questions } from '../../shared/questions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

const windowWidth = Dimensions.get('window').width;

const Quiz = (props) => {

  const Items = questions;
  const totalProblems = Items.length - 1;

  const myIcon1 = <Icon name="heart" style={[styles.fontIcon,{ fontSize: 40, color: 'white'}]} />;
  const myIcon2 = <Icon name="heart-half-full" style={[styles.fontIcon, { fontSize: 40, color: 'white'}]} />;
  const myIcon3 = <Icon name="heart-outline" style={[styles.fontIcon, { fontSize: 40, color: 'white'}]} />;


  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [life, setLife] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { navigation } = props;

  useEffect(() => {
    itemShuffle();
  }, [props.route.params]);


  useEffect(() => {
    if (question.length > 0) {
      randomOptions();
      setLoading(true);
    }
  }, [question]);


  useEffect(() => {
    if (currentQuestion > 0) {
      randomOptions();
    }
  }, [currentQuestion]);


  useEffect(() => {
    if (life === 0) {
      failedScreen();
    }
  }, [life]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setCurrentQuestion(0);
      setLife(3);
      setScore(0);
    });

    return unsubscribe;
  }, [props.navigation]);



  const iconLoop = () => {

    const category = question[currentQuestion].difficulty

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Icon name="star" style={[styles.fontIcon, { color: 'yellow' }]} />
        <Icon name="star" style={[styles.fontIcon, { color: category == 'medium' ? 'yellow' : category == 'hard' ? 'yellow' : 'gray' }]} />
        <Icon name="star" style={[styles.fontIcon, { color: question[currentQuestion].difficulty == 'hard' ? 'yellow' : 'gray' }]} />
        <Icon name="star" style={styles.fontIcon} />
        <Icon name="star" style={styles.fontIcon} />
      </View>
    )
  };


  const lifeLoop = () => {
    let array = [];
    for (let i = life; i <= life; i++) {
      if (i == 1) {
        array.push(<View key={i}>{myIcon3}</View>);
      } else if (i == 2) {
        array.push(<View key={i}>{myIcon2}</View>);
      } else if (i == 3) {
        array.push(<View key={i}>{myIcon1}</View>);
      }
    }
    return array;
  };



  const randomOptions = () => {

    let names = [];
    let arr = [...question];
    let i = arr.length - 1;

    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    const slice = arr.slice(0, 1);

    /*======================================== shuffle names ======================================*/

    Array.prototype.shuffle = function () {
      for (var i = 0; i < this.length; i++) {
        var a = this[i];
        var b = Math.floor(Math.random() * this.length);
        this[i] = this[b];
        this[b] = a;
      }
    }

    var slice1 = shuffleProperties(slice);
    function shuffleProperties(obj) {
      var new_obj = {};
      var keys = getKeys(obj);
      keys.shuffle();
      for (var key in keys) {
        if (key == "shuffle") continue;
        new_obj[keys[key]] = obj[keys[key]];
      }
      return new_obj;
    }

    function getKeys(slice) {
      var arr = new Array();
      for (var key in slice)
        arr.push(key);
      return arr;
    }

    /*======================================== Push shuffle code ======================================*/

    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        names.push(slice1[0].incorrect_answers[0]);
      }
      else if (i == 1) {
        names.push(slice1[0].incorrect_answers[1]);
      }
      else if (i == 2) {
        names.push(slice1[0].incorrect_answers[2]);
      }
      else {
        names.push(slice1[0].correct_answer);
      }
    }


    let exists = false;
    for (let i = 0; i < names.length; i++) {
      if (names[i] === question[currentQuestion].correct_answer) {
        exists = true;
      }
    }

    /*======================================== if doesn't exist let them exist ======================================*/

    if (exists === false) {
      let num, already = new Object;
      let n1 = true;
      let n2, n3, n4 = false
      let start = 0, end = 4;

      for (let i = 0; i < 4;) {
        num = (Math.random() * (end - start) + start) ^ 0;
        if (!(num in already)) {
          if (n1 == true) {
            already[num] = num;
            i++;
            names.splice(num, 1, question[currentQuestion].incorrect_answers[0]);
            n1 = false
            n2 = true
          }
          else if (n2 == true) {
            already[num] = num;
            i++;
            names.splice(num, 1, question[currentQuestion].incorrect_answers[1]);
            n2 = false
            n3 = true
          }
          else if (n3 == true) {
            already[num] = num;
            i++;
            names.splice(num, 1, question[currentQuestion].correct_answer);
            n3 = false
            n4 = true
          }
          else if (n4 == true) {
            already[num] = num;
            i++;
            names.splice(num, 1, question[currentQuestion].incorrect_answers[2]);
          }
        }
      }
    }
    setOptions(names);
  };



  const itemShuffle = () => {
    const array = []
    array.push(...Items)
    let i = array.length - 1;

    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setQuestion(array);
  };



  const failedScreen = () => {
    return navigation.navigate('FailedScreen', { quiz: 1 });
  };


  const checkAnswer = (input) => {
    let lyf;
    if (input == question[currentQuestion].correct_answer) {
      setScore(score + 1);
    } else {
      setLife(life - 1);
    }
    if (currentQuestion === totalProblems) {
      return navigation.navigate('SuccessScreen', { quiz: 1 });
    }
    setCurrentQuestion(currentQuestion + 1);
  };


  const renderImages = () => {
    return (
      <View style={{ flex: 1 }}>


        <View style={styles.questionContainer1}>
          <Text style={styles.question}>{question[currentQuestion].question}</Text>
        </View>

        <View style={styles.difficulty}>
          {iconLoop()}
        </View>


        <View style={styles.optionsBox}>
          <View style={styles.individualOptions}>
            <TouchableOpacity
              onPress={() => {
                checkAnswer(options[0]);
              }}>
              <Text style={styles.options}>{options[0]}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.optionsBox}>
          <View style={styles.individualOptions}>
            <TouchableOpacity
              onPress={() => {
                checkAnswer(options[1]);
              }}>
              <Text style={styles.options}>{options[1]}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.optionsBox}>
          <View style={styles.individualOptions}>
            <TouchableOpacity
              onPress={() => {
                checkAnswer(options[2]);
              }}>
              <Text style={styles.options}>{options[2]}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.optionsBox}>
          <View style={styles.individualOptions}>
            <TouchableOpacity
              onPress={() => {
                checkAnswer(options[3]);
              }}>
              <Text style={styles.options}>{options[3]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView backgroundColor={'#023e8a'} opacity={0.95} />

      <View style={styles.quizheader}>
        <TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={() => props.navigation.goBack()}>
          <BackIcon name="arrow-back" size={20} color='white' />
        </TouchableOpacity>
        <Text style={styles.headrtxt}>Quiz</Text>
      </View>


      <Progress.Bar progress={currentQuestion / 100} width={windowWidth} height={10} color={'rgba(255, 255, 255, 1)'} />


      <View style={styles.scoreContainer}>
        <View style={styles.individualScore1}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
        <View style={styles.individualScore}>
          <View style={styles.iconContainer}>{lifeLoop()}</View>
        </View>
      </View>


      <View style={styles.problemContainer}>
        <View style={styles.problemView}>
          <Text style={styles.scoreText}>Question </Text>
          <Text style={styles.scoreText}>
            {currentQuestion} of {totalProblems}
          </Text>
        </View>
        <Text style={[styles.scoreText, { fontSize: 16 }]}>Entertainment: Board Games</Text>
      </View>
      {loading ? renderImages() : null}
    </View>
  );
};

export default Quiz;
