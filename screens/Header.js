import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Header} from "react-native";

export default class Header1 extends React.Component{
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor: 'red',marginTop: 0,width: 1500,height: 50}}> 
                <Text style={{textAlign: 'center',fontSize: 25}}> Story Hub </Text>
            </View>
        )
    }    
}