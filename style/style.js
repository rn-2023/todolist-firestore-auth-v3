import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 15
  },
  todosContainer: {
    flexShrink: 1,
    marginTop: 15,
    marginBottom: 5
  },
  headerItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10
  },
  subheader: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  myAccountSubheader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  newItem: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 15
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: "90%"
  },
  deleteAccountButton: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: "90%",
    color: 'red',
    backgroundColor: 'red'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 5
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    minWidth: '70%'
  },
  myAccountLabel: {
    marginTop: 5,
    marginBottom: 3,
    marginLeft: 10,
    fontSize: 15
  },
  myAccountTextInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 10,
    fontSize: 15
  },
  logoutIcon: {
    marginTop: 10,
    marginLeft: 25,
  },
  link: {
    textDecorationLine: 'underline'
  }
});