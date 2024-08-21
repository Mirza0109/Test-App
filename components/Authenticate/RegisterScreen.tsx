import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import styles from './styles'; // Import the styles
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBearStore } from '../zustandStores/Accounts'; 


const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [notMatching, setNotMatching] = useState(false)
    const [isTaken, setIsTaken] = useState(false)

    const register = useBearStore((state) => state.register)

    const handleRegister = () => {
        if (password === confirm){ 
            setNotMatching(false)
            setIsTaken(false)
            if(register(email, password)) navigation.navigate('YouTube')
            else setIsTaken(true)
           } else{
            setNotMatching(true)
           }
    }

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text>Register!</Text>
      <TextInput style={styles.input} placeholder={'email'} inputMode='email' onChangeText={
        text => setEmail(text)
      } />
      <TextInput style={styles.input} secureTextEntry={true} placeholder='password' onChangeText={
        text => setPassword(text)
      } />
      <TextInput style={styles.input} secureTextEntry={true} placeholder='Confirm password' onChangeText={
        text => setConfirm(text)
      } />
      <Button title='Confirm' onPress={handleRegister} />
        {notMatching && <Text style={{color: 'red'}}>Passwords do not match.</Text>}
        {isTaken && <Text style={{color: 'red'}}>Email already taken.</Text>}
      <Text style={{marginTop: '3%'}}>Already have an account?</Text>
      <Button title='Log in' onPress={()=>navigation.navigate('Login')} />
    </SafeAreaView>
  );
};

export default Register;