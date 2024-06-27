import React from 'react';
import { Text, View, ImageBackground, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from './styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from '@/src/schema';
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: any) => {
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
      email: data.email,
      password: data.password
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
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
              render={({ field: { onChange, onBlur, value } }) => (
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
          <AppButton containerStyle={{ alignItems: 'center', justifyContent: 'center', marginVertical: 15 }} title="Signin" onPress={handleSubmit(onSubmit)} />
          <Text style={styles.bottomText}>Don't have an account? <Text style={styles.agreeTextBold} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
};

export default React.memo(Signin);
