import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    profile:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      profilePicture:{
        width: 150,
        height: 150,
        backgroundColor: 'red',
        borderRadius: 45,
        borderWidth: 5,
        borderColor: '#df2222',
      },
      modalContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        opacity: 1
      },
      modal:{
        position: 'relative',
        top: 40,
        width: '90%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(190, 190, 190, 0.5)',
        flexDirection: 'row'
      },
      imageOption:{
        flexDirection: 'column'
      },
      camView:{
        width: '100%', 
        height: 600, 
        alignItems: 'center', 
        zIndex: 20, 
        opacity: 1
      },
      camButton:{
        width: 60, 
        height: 60, 
        backgroundColor: '#dfdfdf', 
        borderRadius: 60, 
        borderWidth: 10, 
        borderColor: '#cdcdcd', 
        position: 'absolute', 
        bottom: 20, 
        zIndex: 30
    }
      
})

export default styles