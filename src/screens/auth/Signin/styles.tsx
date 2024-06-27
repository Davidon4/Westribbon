import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

 export const styles = StyleSheet.create({
    container: {
        padding: 24,
        marginTop: 50
    },
    background:{
        flex: 1,
    },
    title:{
      fontSize: 24,
      color: COLORS.secondary,
      fontWeight: "700"
    },
    errorMessage:{
        color:COLORS.red,
        marginTop: 3,
      },
      bottomText:{
        alignSelf: 'center',
        marginTop: 10,
        color: COLORS.secondary
      },
      titleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      textStyle:{
        color: COLORS.secondary,
        marginHorizontal: 5,
        alignSelf: 'center'
      },
      textMainContainer:{
        flexDirection: 'row',
      },
      textStyleContainer:{
        backgroundColor: COLORS.primary,
        borderRadius: 24,
        justifyContent: 'center',
        marginLeft: 5,
        height: hp('2.3%'),
        width: wp('5%')
      },
      agreeTextBold:{
        fontWeight: "bold",
        color: COLORS.primary,
        textDecorationLine: "underline"
      }
 })