import { TextStyle, NativeSyntheticEvent, ViewStyle, TouchableOpacityProps, TextInputFocusEventData, KeyboardTypeOptions} from "react-native";

export interface AppButtonProps extends TouchableOpacityProps {
    title?: string;
    buttonStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
  }

export interface AppCardProps extends TouchableOpacityProps {
    title?: string,
    icon?: React.ReactNode,
}

export interface InfoCardProps extends TouchableOpacityProps {
    title?: string,
    icon?: React.ReactNode
}

export interface AppInputProps {
    label?: string;
    isPassword?: boolean;
    value?: string;
    keyboardType?: KeyboardTypeOptions;
    onChangeText: (text: string) => void;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  }