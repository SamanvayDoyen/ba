import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import Note from './components/Note';
import db from './config';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };
  }

  componentDidMount() {
    const tasks = db.ref('tasks');
    tasks.on('value', (snap) => {
      const todos = snap.val();
      const taskList = [];
      for (let id in todos) {
        taskList.push({ id, ...todos[id] });
      }
      this.setState({ noteArray: taskList });
    });
  }

  addTask = () => {
    if (this.state.noteText) {
      const tasks = db.ref('tasks'); //
      var d = new Date();
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const newTask = {
        note: this.state.noteText,
        date:
          d.getFullYear() + ' ' + monthNames[d.getMonth()] + ' ' + d.getDate(),
      };

      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
      tasks.push(newTask);
    }
  };

  markDone(key) {
    const node = db.ref('tasks').child(this.state.noteArray[key].id);
    node.remove();
    this.state.noteArray.splice(key, 1);
  }
  render() {
    var notes = this.state.noteArray.map((key, val) => {
      return <Note task={key} val={val} markDone={() => this.markDone(val)} />;
    });

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#3D6DCC'}
          centerComponent={{
            text: 'Note It!',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => {
              this.setState({ noteText: noteText });
            }}
            value={this.state.noteText}
            placeholder="Enter task here"
            placeholderTextColor="#E91E63"></TextInput>
        </View>
        <TouchableOpacity onPress={this.addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  textInput: {
    alignSelf: 'stretch',
    color: '#black',
    padding: 20,
    backgroundColor: '#56543',
    borderTopWidth: 2,
    borderTopColor: '#3D6DCC',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#3D6DCC',
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 25,
  },
});
