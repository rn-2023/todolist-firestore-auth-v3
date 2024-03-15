import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, USERS_REF, TODOS_REF } from '../firebase/Config';
import { auth } from '../firebase/Config';
import styles from '../style/style';

const UNCHECKED_TODO_BACKGROUND_COLOR = "lightblue";
const CHECKED_TODO_BACKGROUND_COLOR = "lightgreen";

export const TodoItem = ({ 
  todoItem: todoItem, done: done, todoId: todoId }) => {

  const [doneState, setDone] = useState(done);

  const onCheck = async () => {
    try {
      setDone(!doneState);
      const subColRef = 
        collection(
          db, USERS_REF, auth.currentUser.uid, TODOS_REF);
      await updateDoc(doc(subColRef, todoId), {
        done: !doneState
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const onRemove = async() => {
    try {
      const subColRef = 
        collection(
          db, USERS_REF, auth.currentUser.uid, TODOS_REF);
      await deleteDoc(doc(subColRef, todoId));
    }
    catch(error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.todoItem}>
      <Pressable onPress={onCheck}>
        {doneState 
          ? <MaterialIcons name={'check-box'} size={32} />
          : <MaterialIcons name={'check-box-outline-blank'} size={32} />
        }
      </Pressable>
      <Text 
        onPress={onCheck} 
        style={
          [styles.todoText,
          {backgroundColor: done 
            ? CHECKED_TODO_BACKGROUND_COLOR
            : UNCHECKED_TODO_BACKGROUND_COLOR
          }]}>
        {todoItem}
      </Text>
      {done && 
        <Pressable>
          <Entypo name={'trash'} size={32} onPress={onRemove} />
        </Pressable>
      }
    </View>
  );
}