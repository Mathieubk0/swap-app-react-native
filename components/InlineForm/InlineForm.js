import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Switch, Checkbox } from 'react-native';

export default function InlineForm({ addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) {
  
  return (
    <>
      <View style={styles.InlineForm}></View>
    </>
  );
}

const styles = StyleSheet.create({
  InlineForm: {
    backgroundColor: '#fff',

    // height: 100,
    // width: 400,
    margin: 4
  }
});