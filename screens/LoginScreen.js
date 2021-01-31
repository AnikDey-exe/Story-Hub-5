import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import firebase from "firebase";
import Header1 from './Header';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            password: ''
        }
    }

    login = async(email,password) => {
        if(email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response){
                    this.props.navigation.navigate('Write');
                }
            }
            catch(error) {
                switch(error.code) {
                    case 'auth/user-not-found':
                        Alert.alert("User does not exist.");
                        break;
                    case 'auth/invalid-email':
                        Alert.alert("Incorrect email or password.");
                        break;
                }
            }
        }
        else {
            Alert.alert("Enter email and password.");
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View>
                    <Header1/>
                </View>
                <View>
                    <TextInput
                    style={styles.loginBox}
                    placeholder="Email"
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                            emailID: text
                        })
                    }}/>

                    <TextInput
                    style={styles.passwordBox}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text)=>{
                        this.setState({
                            password: text
                        })
                    }}/>
                </View>

                <View>
                    <TouchableOpacity
                    style={{height: 30, width: 90, borderWidth: 1, marginTop: 60, paddingTop: 2.5, borderRadius: 7}}
                    onPress={()=>{
                        this.login(this.state.emailID,this.state.password)
                    }}>
                        <Text style={{textAlign: 'center'}}> Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
} 

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        marginTop: 70,
        paddingLeft: 10
    },
    passwordBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        marginTop: 50,
        paddingLeft: 10
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
})