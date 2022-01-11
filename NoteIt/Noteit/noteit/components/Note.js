import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.task} style={styles.note}>
        <Text style={styles.noteText}>{this.props.task.note}</Text>
        <Text style={styles.noteText}>{this.props.task.date}</Text>
        <TouchableOpacity
          onPress={this.props.markDone}
          style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 190,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#ededed',
  },

  noteDelete: {
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    right: 10,
    bottom: 10,
    top: 10,
    backgroundColor: '#50b697',
  },
});
