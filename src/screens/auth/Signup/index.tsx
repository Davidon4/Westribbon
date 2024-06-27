import React from 'react';
import { Text, View, Alert, ImageBackground} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {styles} from './styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from '../../../schema';
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data: any) => {
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
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: data.password
    };

    const response = await graphqlNoAuthRequest(queryString, variable);
    console.log("RESPONSE=>", response)

    if (response.error) {
    Alert.alert('Signup Failed', response.error);
      console.log(JSON.parse(response.error));
    } else {
      Alert.alert('Signup Successful', 'User created successfully!');
        navigation.navigate('Signin');
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
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: {onChange, onBlur, value} }) => (
          <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
            label="First Name"
          />
        )}
        name="firstname"
      />
      <Text style={styles.errorMessage}>{errors.firstname?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: {onChange, onBlur, value} }) => (
          <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
            label="Last Name"
          />
        )}
        name="lastname"
      />
        <Text style={styles.errorMessage}>{errors.lastname?.message}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: {onChange, onBlur, value} }) => (
          <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
            label="Email"
          />
        )}
        name="email"
      />
        <Text style={styles.errorMessage}>{errors.email?.message}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: {onChange, onBlur, value} }) => (
          <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          keyboardType='phone-pad'
          value={value}
            label="Phone Number"
          />
        )}
        name="phone"
      />
        <Text style={styles.errorMessage}>{errors.phone?.message}</Text>
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: {onChange, onBlur, value} }) => (
          <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          isPassword
            label="Password"
          />
        )}
        name="password"
      />
        <Text style={styles.errorMessage}>{errors.password?.message}</Text>
        </View>
      <AppButton containerStyle={{alignItems:'center', justifyContent: 'center', marginVertical: 15}} title="Signup" onPress={handleSubmit(onSubmit)}/>
      <Text style={styles.bottomText}>Already have an account? <Text style={styles.agreeTextBold} onPress={() => navigation.navigate('Signin')}>Log in</Text></Text>
      </KeyboardAwareScrollView>
      </ImageBackground>
      </>
    )
  }

export default React.memo(SignUp);