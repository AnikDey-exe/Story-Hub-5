import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Header1 from "./Header";
import firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories: [],
            lastVisibleStory: null,
            search: ''
        }
    }

    fetchMoreStory = async() => {
        var text = this.state.search.toUpperCase();
        var enteredText = text.split("")
  
        
        if (enteredText[0].toUpperCase() ==='B'){
        const query = await db.collection("Book").where('bookName','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStory: doc
          })
        })
      }
        else if(enteredText[0].toUpperCase() === 'A'){
          const query = await db.collection("Book").where('author','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
          query.docs.map((doc)=>{
            this.setState({
              allStories: [...this.state.allStories, doc.data()],
              lastVisibleStory: doc
            })
          })
        }
    }

    searchStory = async(text) =>{
        var enteredText = text.split(""); 

        if (enteredText[0].toUpperCase() ==='B'){
          const story =  await db.collection("Book").where('bookName','==',text).get()
          console.log(story);
          story.docs.map((doc)=>{
            this.setState({
              allStories:[...this.state.allStories,doc.data()],
              lastVisibleStory: doc
            })
          })
        }
        else if(enteredText[0].toUpperCase() === 'A'){
          const story = await db.collection("Book").where('author','==',text).get()
          story.docs.map((doc)=>{
            this.setState({
              allStories:[...this.state.allStories,doc.data()],
              lastVisibleStory: doc
            })
          })
        }


    }

    componentDidMount = async() => {
        const query = await db.collection("Book").get();
        query.docs.map((doc)=>{
            this.setState({
                allStories: [],
                lastVisibleStory: doc
            })
        });
    }

    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}> 
            <Header1/>
                <View style={styles.searchBar}>
                    <TextInput
                    style={styles.bar}
                    placeholder="Enter Book or Student ID"
                    onChangeText={(text)=>{this.setState({
                        search: text
                    })}}
                    value={this.state.search}
                    />
                    <TouchableOpacity
                     style={styles.searchButton} 
                     onPress={()=>{
                         this.searchStory(this.state.search)
                    }}>
                        <Text> Search </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                data={this.state.allStories}
                renderItem={({item})=>(
                    <View style={{borderBottomWidth:1}}>
                        <Text> {"Title: "+item.bookName} </Text>
                        <Text> {"Author: "+item.author} </Text>
                        <Text> {"Story: "+item.story} </Text>
                    </View>
                )}
                keyExtractor={(item,index)=> index.toString()}
                onEndReached={this.fetchMoreStory}
                onEndReachedThreshold={0.7}
                />

            </View>
        )
    }    
}

const styles = StyleSheet.create({
    searchButton:{
        borderWidth:1,
        height:30,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',
    },
    container: {
        flex: 1,
        marginTop: 0
      },
      searchBar:{
        flexDirection:'row',
        height:40,
        width: 'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor:'grey',
      },
      bar:{
        borderWidth:2,
        height:30,
        width:300,
        paddingLeft:10,
      },
});