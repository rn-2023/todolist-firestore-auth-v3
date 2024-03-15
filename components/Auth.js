import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword, 
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, USERS_REF, TODOS_REF } from '../firebase/Config';

export const signUp = async (nickname, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setDoc(doc(db, USERS_REF, userCredential.user.uid), {
      nickname: nickname,
      email: userCredential.user.email
    })
    console.log("Registration successful.");
  })
  .catch((error) => {
    console.log("Registration failed. ", error.message);
    Alert.alert("Registration failed. ", error.message);
  })
}

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    console.log("Logged successful.");
  })
  .catch((error) => {
    console.log("Login failed. ", error.message);
    Alert.alert("Login failed. ", error.message);
  })
}

export const logout = async () => { 
  await signOut(auth)
  .then(() => {
    console.log("Logout successful.");
  })
  .catch((error) => {
    console.log("Login failed. ", error.message);
    Alert.alert("Login failed. ", error.message);
  })
}

export const updateEmailAddress = async (email) => {
  await updateEmail(auth.currentUser, email).
  then(() => {
    console.log("Email was updated successfully.");
  }).catch((error) => {
    console.log("Update of email failed. ", error.message);
    Alert.alert("Update of email failed. ", error.message);
  });
}

export const changePassword = async (password) => { 
  await updatePassword(auth.currentUser, password)
  .then(() => {
    console.log("Password changed successfully.");
    Alert.alert("Password changed successfully.");
  })
  .catch((error) => {
    console.log("Password change error. ", error.message);
    Alert.alert("Password change error. ", error.message);
  })
}

export const resetPassword = async (email) => {
  auth.languageCode = 'fi'; 
  await sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Password reset email has been sent.");
    Alert.alert("Password reset email has been sent.");
  })
  .catch((error) => {
    console.log("Password reset error. ", error.message);
    Alert.alert("Password reset error. ", error.message);
  })  
}

export const removeUser = async () => {
  deleteTodoDocuments();
  deleteUserDocument();
  deleteUser(auth.currentUser)
  .then(() => {
    console.log("User was removed.");
  }).catch((error) => {
    console.log("User delete error. ", error.message);
    Alert.alert("User delete error. ", error.message);
  });
}

const deleteTodoDocuments = async () => {
  let unsubscribe;
  const subColRef = collection(
    db, USERS_REF, auth.currentUser.uid, TODOS_REF);
  unsubscribe = onSnapshot(subColRef, (querySnapshot) => {
    querySnapshot.docs.map(doc => {
      removeTodo(doc.id)
    })
  })
  unsubscribe();
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

const deleteUserDocument = async () => {
  await deleteDoc(doc(db, USERS_REF, auth.currentUser.uid))
  .then(() => {
    console.log("User document was removed.");
  }).catch((error) => {
    console.log("User document delete error. ", error.message);
    Alert.alert("User document delete error. ", error.message);
  });
};