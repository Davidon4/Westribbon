import {StyleProp, TextStyle, NativeSyntheticEvent, ViewStyle, TouchableOpacityProps, TextInputFocusEventData, PressableProps, ImageSourcePropType, KeyboardTypeOptions} from "react-native";

export interface AppButtonProps extends TouchableOpacityProps {
    title?: string;
    buttonStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
  }

 export interface PlusIconProps extends PressableProps{
    style?: ViewStyle;
}

export interface AppHeaderProps {}

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

  export interface CountryInputProps {
    label?: string;
    value?: string;
    onChange: (text: string) => void;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  }

 export  interface CheckboxProps extends TouchableOpacityProps{
    checked: boolean;
    onCheck: (checked: boolean) => void;
  } 

export interface ItemMeasure {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }

 export  interface Country {
   flag: ImageSourcePropType;
    name: string;
    alpha2Code: string;
  }

  export interface FlagProps {
    flag?: ImageSourcePropType;
  }

  export interface PickerItemProps {
    country: Country;
    onCountrySelect: (selectedCountry: Country) => void;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
  }

  export interface PickerTogglerProps {
    flag?: any;
    isPickerOpen: boolean;
    onPickerToggle: (state: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    onLayout: (measure: ItemMeasure) => void;
    isFlagVisible?: boolean;
    name?: string;
  }
  
  export interface SearchProps {
    value?: string;
    onChangeText: (text: string) => void;
    onClearInput: () => void;
    inputStyle?: StyleProp<TextStyle>;
  }

  export interface CallingCodePickerProps {
    initialCountryCode?: string;
    onValueChange: (alpha2Code?: string) => void;
    togglerContainerStyle?: StyleProp<ViewStyle>;
    togglerLabelStyle?: StyleProp<TextStyle>;
    listContainerStyle?: StyleProp<ViewStyle>;
    searchInputStyle?: StyleProp<TextStyle>;
    listStyle?: StyleProp<ViewStyle>;
    pickerItemContainerStyle?: StyleProp<ViewStyle>;
    pickerItemLabelStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    isFlagVisible?: boolean;
  }