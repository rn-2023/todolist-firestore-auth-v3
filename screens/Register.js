import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable } from 'react-native';
import { logout, signUp } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';

export default function Register({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handlePressRegister = () => {
    if (!nickname) {
      Alert.alert('Nickname is required');
    } else if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      signUp(nickname, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setNickname('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigation.navigate('Todos');
        } 
      });
    }
  };

  const handlePressLogout = async () => { 
    logout();
    navigation.navigate('Login');
  }

  if (isLoggedIn) {
    return(
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todos: Register</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in. Go to your todos...
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Todos"
            onPress={() => navigation.navigate('Todos')} />
        </Pressable>
        <Text style={styles.infoText}>
          Or to your account...
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="My account"
            onPress={() => navigation.navigate('My Account')} />
        </Pressable>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todos: Register</Text>
        </View>
        <Text style={styles.infoText}>Create an account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nickname*"
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname.trim())}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm password*"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
        <Pressable style={styles.buttonStyle}>
          <Button 
            title="Register"
            onPress={handlePressRegister} />
        </Pressable>
        <Text style={styles.infoText}>Already have an account?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')} />
        </Pressable>
      </View>
    );
  }
}