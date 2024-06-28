import React, {useState} from 'react';
import { Text, View, ImageBackground, Alert } from "react-native";
import { styles } from './styles';
import { AppInput, AppButton } from '@/src/components';
import { COLORS } from '../../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '@/src/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {graphqlNoAuthRequest} from '@/src/utils/client';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, "Signup">;

type Props = {
  navigation: SignUpNavigationProp;
};

const Signin: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function reset() {
    setEmail('')
    setPassword('')
    setPasswordError('')
    setEmailError('')
  }

  const validateInput = () => {
    let valid = true;
    if(!email){
      setEmailError("Email is required")
      valid = false;
    } else {
      setEmailError("")
    }
    if (!password){
      setPasswordError("Password is required")
      valid = false;
    } else {
      setPasswordError("")
    }
    return valid;
  }


  const onSubmit = async () => {
    if (!validateInput()) {
      return;
    }

    const queryString = `mutation LoginUser( $email: String!, $password: String! ){
      loginUser( email: $email, password:$password){
        token
        user{
          id
          firstname
          lastname
          email
          phone
        }
      }
    }`;

    const variable = {
      email: email,
      password: password
    };

    const response = await graphqlNoAuthRequest(queryString, variable);

    if (response.error) {
    Alert.alert('Login Failed', response.error);
      console.log(JSON.parse(response.error));
    } else {
        const { token, user } = response.data.loginUser;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Dashboard');
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
            <Text style={styles.title}>Sign In</Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500", color: COLORS.secondary }}>
            Kindly fill the signin form!
          </Text>
          <View style={{ marginVertical: 15 }}>
                <AppInput
                  onChangeText={(val) => setEmail(val)}
                  value={email}
                  label="Email"
                />
                {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                <AppInput
                  onChangeText={(val) => setPassword(val)}
                  value={password}
                  isPassword
                  label="Password"
                />
                 {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
          </View>
          <AppButton containerStyle={{ alignItems: 'center', justifyContent: 'center', marginVertical: 15 }} title="Signin" onPress={onSubmit} />
          <Text style={styles.bottomText}>Don't have an account? <Text style={styles.agreeTextBold} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
};

export default React.memo(Signin);
