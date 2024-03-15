import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db, TODOS_REF, USERS_REF } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../components/Auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoItem } from './TodoItem';
import styles from '../style/style';

export default function Todos({ navigation }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const subColRef = collection(
          db, USERS_REF, auth.currentUser.uid, TODOS_REF);
        unsubscribe = onSnapshot(subColRef, (querySnapshot) => {
          setTodos(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })))
        })
      }
      else {
        setIsLoggedIn(false);
        unsubscribe();
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const addNewTodo = async () => {
    try {
      if (newTodo.trim() !== "") {
        const subColRef = 
        collection(
          db, USERS_REF, auth.currentUser.uid, TODOS_REF);
          await addDoc(subColRef, { 
            done: false,
            todoItem: newTodo
          })
        setNewTodo('');
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const removeTodo = async (id) => {
    try {
      const subColRef = 
        collection(db, USERS_REF, auth.currentUser.uid, TODOS_REF);
      await deleteDoc(doc(subColRef, id));
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const removeTodos = async() => {
    try {
      todos.forEach((todo) => {
        removeTodo(todo.id);
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const filterTodos = (done) => {
    return todos.filter((obj) => obj.done === done).length;
  }

  const createTwoButtonAlert = () => Alert.alert(
    "Todolist", "Remove all items?", [{
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { 
      text: "OK", onPress: () => removeTodos()
    }],
    { cancelable: false }
  );

  const handlePressLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  let todosKeys = Object.keys(todos);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todos: My todos</Text>
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')} />
        </Pressable>
        <Text style={styles.infoText}>Not having account yet?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')} />
        </Pressable>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todos: My todos ({todosKeys.length})</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>
        </View>
        <View style={styles.newItem}>
          <TextInput
            placeholder='Add new todo'
            value={newTodo}
            style={styles.textInput}
            onChangeText={setNewTodo}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button 
            title="Add new Todo item"
            onPress={() => addNewTodo()}
          />
        </View>
        <Text style={styles.subheader}>
          Unchecked ({filterTodos(false)})
        </Text>
        <View style={styles.todosContainer} >
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {todosKeys.length > 0 ? (
              todosKeys.map((key, i) => (
                !todos[i].done &&
                  <TodoItem
                    key={key}
                    todoItem={todos[i].todoItem}
                    done={todos[i].done}
                    todoId={todos[key].id}
                  />
              ))
            ) : (
              <Text style={styles.infoText}>There are no items</Text>
            )}
          </ScrollView>
        </View>
        <Text style={styles.subheader}>
          Checked ({filterTodos(true)})
        </Text>
        <View style={styles.todosContainer} >
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {todosKeys.length > 0 ? (
              todosKeys.map((key, i) => (
                todos[i].done &&
                  <TodoItem
                    key={key}
                    todoItem={todos[i].todoItem}
                    done={todos[i].done}
                    todoId={todos[key].id}
                  />
              ))
            ) : (
              <Text style={styles.infoText}>There are no items</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.buttonStyle}>
          <Button 
            title="Remove all todos" 
            onPress={() => createTwoButtonAlert()} />
        </View>
      </View>
    );
  }
}