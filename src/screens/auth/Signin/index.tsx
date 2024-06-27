import React from 'react';
import { Text, View, ImageBackground} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {styles} from './styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from '../../../schema';
import { AppInput, AppButton } from '../../../components';
import { COLORS } from '../../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, "Signup">;

type Props = {
  navigation: SignUpNavigationProp;
} 

const Signin: React.FC<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = (data: any) => {
    navigation.navigate("Signin", data);
  }

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
        <Text style={{marginTop: 10, fontSize: 18, fontWeight: "500", color: COLORS.secondary}}>
           Kindly fill the signin form!
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
          value={value}
          isPassword
            label="Password"
          />
        )}
        name="password"
      />
        <Text style={styles.errorMessage}>{errors.password?.message}</Text>
        </View>
      <AppButton containerStyle={{alignItems:'center', justifyContent: 'center', marginVertical: 15}} title="Signin" onPress={handleSubmit(onSubmit)}/>
      <Text style={styles.bottomText}>Don't have an account? <Text style={styles.agreeTextBold} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
      </KeyboardAwareScrollView>
      </ImageBackground>
      </>
    )
  }

export default React.memo(Signin);