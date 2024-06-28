import React, {useState} from 'react';
import { Text, View, Alert, ImageBackground} from "react-native";
import {styles} from './styles';
import { AppInput, AppButton } from '../../../components';
import { COLORS } from '../../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { graphqlNoAuthRequest } from '@/src/utils/client';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, "Signin">;

type Props = {
  navigation: SignUpNavigationProp;
} 

const SignUp: React.FC<Props> = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstnameError, setFirstnameError] = useState(''); 
  const [lastnameError, setLastnameError] = useState(''); 
  const [emailError, setEmailError] = useState(''); 
  const [phoneError, setPhoneError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');

  function reset() {
    setEmail('')
    setPassword('')
    setLastname('')
    setFirstname('')
    setPhone('')
    setFirstnameError('')
    setLastnameError('')
    setPhoneError('')
    setPasswordError('')
    setEmailError('')
  }

  const validateInput = () => {
    let valid = true;
    if(!firstname) {
      setFirstnameError("First Name is required")
      valid = false;
    } else {
      setFirstnameError("")
    }
    if(!lastname) {
      setLastnameError("Last Name is required")
      valid = false;
    } else {
      setLastnameError("")
    }
    if(!phone) {
      setPhoneError("Phone is required")
      valid = false;
    } else {
      setPhoneError("")
    }
    if(!email){
      setEmailError("Email is required")
      valid = false;
    } else {
      setEmailError("")
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one number, and one special character');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  }

  const onSubmit = async () => {
    if (!validateInput()){
      return;
    }

    const queryString = `mutation CreateUser( $firstname: String!, $lastname: String!, $email: String!, $phone: String!, $password: String! ){
      createUser( firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, password: $password){
          id
          firstname
          lastname
          email
          phone
      }
    }`;

    const variable = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password
    };

    const response = await graphqlNoAuthRequest(queryString, variable);

    if (response.error) {
    Alert.alert('Signup Failed', response.error);
      console.log(JSON.parse(response.error));
    } else {
      Alert.alert('Signup Successful', 'User created successfully!');
        navigation.navigate('Signin');
        reset();
    }
  };

    return (
      <>
    <ImageBackground style={styles.background} source={require("../../../../assets/background.png")} resizeMode='cover'>
      <KeyboardAwareScrollView
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 18, fontWeight: "500", color: COLORS.secondary}}>
            Fill the form to sign up!
        </Text>
        <View style={{marginVertical: 15}}>
          <AppInput
          onChangeText={(val) => setFirstname(val)}
          value={firstname}
          label="First Name"
          />
      {firstnameError ? <Text style={styles.errorMessage}>{firstnameError}</Text> : null}
          <AppInput
          onChangeText={(val) => setLastname(val)}
          value={lastname}
          label="Last Name"
          />
        {lastnameError ? <Text style={styles.errorMessage}>{lastnameError}</Text> : null}
          <AppInput
          onChangeText={(val) => setEmail(val)}
          value={email}
            label="Email"
          />
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null }
          <AppInput
          onChangeText={(val) => setPhone(val)}
          keyboardType='phone-pad'
          value={phone}
            label="Phone Number"
          />
      {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
          <AppInput
          onChangeText={(val) => setPassword(val)}
          value={password}
          isPassword
          label="Password"
          />
        {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
        </View>
      <AppButton containerStyle={{alignItems:'center', justifyContent: 'center', marginVertical: 15}} title="Signup" onPress={onSubmit}/>
      <Text style={styles.bottomText}>Already have an account? <Text style={styles.agreeTextBold} onPress={() => navigation.navigate('Signin')}>Log in</Text></Text>
      </KeyboardAwareScrollView>
      </ImageBackground>
      </>
    )
  }

export default React.memo(SignUp);