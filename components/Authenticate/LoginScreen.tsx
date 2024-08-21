
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import styles from './styles'; // Import the styles
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBearStore } from '../zustandStores/Accounts';

const Login = ({navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [flag, setFlag] = useState(false)
  const login = useBearStore((state) => state.login)

  const handleLogin = () => {
    setFlag(false)
    console.log("This", login(email,password))
    if(login(email, password)) navigation.navigate('YouTube')
    
   else setFlag(true)
  }

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text>Log in to your account!</Text>
      <TextInput style={styles.input} placeholder={'email'} inputMode='email' onChangeText={text => setEmail(text)} />
      <TextInput style={styles.input} secureTextEntry={true} placeholder='password' onChangeText={text => setPassword(text)} />
      <Button title='Confirm' onPress={handleLogin} />
      {flag && <Text style={{color: 'red'}}>Incorrect email or password.</Text>}
      <Text style={{marginTop: '3%'}}>Don't have an account?</Text>
      <Button title='Register' onPress={()=>navigation.navigate('Register')} />
    </SafeAreaView>
  );
};

export default Login;
