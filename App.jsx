import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet,
   StatusBar, 
   TouchableOpacity, 
   Image} from 'react-native';

import {useState} from 'react';

//Data import
import {choices} from './src/data/mockData.js';

//Util import
import { COLORS } from './src/util/constant.js';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

const resetGame = () => {
  setUserChoice(null);
  setComputerChoice(null);
  setResult(null);
}; 

  const handleButtonClick =  userChoice =>{
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };
  
  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };
  
  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a tie!");
    } else if (
      (user?.name === 'Rock' && computer?.name === 'Scissors') ||
      (user?.name === 'Paper' && computer?.name === 'Rock') ||
      (user?.name === 'Scissors' && computer?.name === 'Paper')
    ) {
      setResult('You win!!');
    } else {
      setResult('You lost!');
    }
  };
  
  return (

    <SafeAreaView style = {styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <View style = {styles.container}> 
      <Text style = {styles.title}>Rock Paper Scissors Game</Text>
      <Text style= {styles.choiceContainer}>User's Choice:</Text>
      <View style={styles.choices}> 
      {choices?.map(choice =>(
<TouchableOpacity key ={ `${choice.id}-choice`} 
style ={ choice.name === userChoice?.name ? [styles.button, styles.active] : styles.button }
 onPress={()=> handleButtonClick(choice)} >
  <Image source={choice.image} style={styles.image} />
</TouchableOpacity>
      ))}
      </View>
      <Text style ={ styles.resultText}> {result}</Text>
  {computerChoice && ( 
       <>
       <Text style ={styles.choiceContainer}>Computer's Choice: </Text> 
       <View style = {[styles.button, styles.active]}>
        <Image source={computerChoice?.image} style ={styles.image}></Image>
       </View>
       </>
      )}
     <TouchableOpacity style ={[styles.resetButton, !userChoice && {opacity: 0}]} 
     onPress={resetGame} disabled={!userChoice}>
      <Text style = {styles.resetButtonText}>Reset </Text>
     </TouchableOpacity> 
      </View>
    </SafeAreaView>
  
  );

  };
export default App;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems:'center',
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:20,
    color: COLORS.white,
  },
  choiceContainer:{
    marginVertical:20,
    fontSize:20,
    color:COLORS.white,
  },
  choices:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:10,
  },
  image:{
    width:90,
    height:90,
  },
  button:{
    padding:10,
    borderRadius:10,
    backgroundColor: COLORS.white,
  },
  active:{
    borderWidth: 4,
    borderColor: 'black',
  },
  resultText:{
    fontSize:20,
    fontWeight:'bold',
    marginTop: 10,
    color: COLORS.white,
  },
  resetButton:{
    marginTop:30,
    borderRadius:10,
    backgroundColor: COLORS.resetButton,
    paddingHorizontal: 20,
    paddingVertical:10,
  },
  resetButtonText:{
    color:COLORS.white,
    fontSize:20,
  }
});