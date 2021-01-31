import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Header, KeyboardAvoidingView, ToastAndroid} from "react-native";
import Header1 from "./Header";
import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            bookName: '',
            author: '',
            story: ''
        }
    }

    submitStory = () => {
        db.collection("Book").add({
            'bookName': this.state.bookName,
            'author': this.state.author,
            'story': this.state.story
        })
    }

    showAlert = () => {
        ToastAndroid.show("Story submitted, congratulations!",ToastAndroid.SHORT);
    }

    render(){
        return(
            <KeyboardAvoidingView style={{justifyContent:'center',alignItems:'center'}}> 
                <Header1/>
                <TextInput
                style={styles.inputBox}
                placeholder="Book Name"
                value={this.state.bookName}
                onChangeText={text => this.setState({
                    bookName: text
                })}
                />
                <TextInput
                style={styles.inputBox}
                placeholder="Author"
                value={this.state.author}
                onChangeText={text => this.setState({
                    author: text
                })}
                />
                <TextInput
                style={styles.inputBox2}
                placeholder="Write Story Here"
                multiline={true}
                numberOfLines={5}
                value={this.state.story}
                onChangeText={text => this.setState({
                    story: text
                })}
                />
                <TouchableOpacity 
                 style={styles.submitButton}
                 onPress={()=>{
                    db.collection("Book").add({
                        'bookName': this.state.bookName,
                        'author': this.state.author,
                        'story': this.state.story
                    }),
                     ToastAndroid.show("Story submitted, congratulations!",ToastAndroid.SHORT);
                }}> 
                    <Text style={{textAlign: 'center'}}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }    
}

const styles = StyleSheet.create({
    inputBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        marginTop: 30,
        marginLeft: 0
    },
    inputBox2: {
        width: 300,
        height: 200,
        borderWidth: 1.5,
        fontSize: 20,
        marginTop: 30,
        marginLeft: 0
    },
    submitButton: {
        backgroundColor: 'cyan',
        height: 30,
        width: 90,
        borderWidth: 1.5,
        marginTop: 50
    }
});