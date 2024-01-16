import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Switch, Checkbox, Linking } from 'react-native';

export default function InlineForm({ addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) {
  
  const handleRosterPress = () => { Linking.openURL('https://www.momentumserviceslondon.com/activite')};
  const handleSwapFormPress = () => { Linking.openURL('https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d')};

  return (
    <>
      <View style={styles.InlineForm}>
        <View>
          <TextInput style={styles.Email} placeholder="Email"></TextInput>
        </View>

        <ScrollView horizontal>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', margin: 0}}>
              <View style={styles.SHIFT}><Text style={{fontWeight: 'bold'}}>SHIFT</Text></View>
              <View style={styles.Date}><Text style={{fontWeight: 'bold'}}>Date</Text></View>
              <View style={styles.Outbound}><Text style={{fontWeight: 'bold'}}>Outbound</Text></View>
              <View style={styles.Inbound}><Text style={{fontWeight: 'bold'}}>Inbound</Text></View>
              <View style={styles.Overnight}><Text style={{fontWeight: 'bold'}}>Overnight</Text></View>
              <View style={styles.FIRST}><Text style={{fontWeight: 'bold'}}>FIRST</Text></View>
              <View style={styles.BAR}><Text style={{fontWeight: 'bold'}}>BAR</Text></View>
              <View style={styles.PURSER}><Text style={{fontWeight: 'bold'}}>PURSER</Text></View>
              <View style={styles.FOR}><Text style={{fontWeight: 'bold'}}>FOR</Text></View>
              <View style={styles.Early}><Text style={{fontWeight: 'bold'}}>Early</Text></View>
              <View style={styles.Late}><Text style={{fontWeight: 'bold'}}>Late</Text></View>
              <View style={styles.LTA}><Text style={{fontWeight: 'bold'}}>LTA</Text></View>
              <View style={styles.DO}><Text style={{fontWeight: 'bold'}}>D.O.</Text></View>
            </View>
              {/* {shifts.map((shift, index) => (
                <>
                  <View key={index} style={{flexDirection: 'row', margin: 0}}>
                    <View style={styles.SHIFT}>
                      <TouchableOpacity style={styles.AddButton}><Text style={{color: 'white', alignSelf: 'center'}}>+</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.DeleteButton}><Text style={{color: 'black', alignSelf: 'center'}}>-</Text></TouchableOpacity>
                    </View>
                    <View style={styles.Date}></View>
                    <View style={styles.Outbound}></View>
                    <View style={styles.Inbound}></View>
                    <View style={styles.Overnight}></View>
                    <View style={styles.FIRST}></View>
                    <View style={styles.BAR}></View>
                    <View style={styles.PURSER}></View>
                    <View style={styles.FOR}></View>
                    <View style={styles.Early}></View>
                    <View style={styles.Late}></View>
                    <View style={styles.LTA}></View>
                    <View style={styles.DO}></View>
                  </View>
                </>
              ))} */}
          </View>
        </ScrollView>

        <View style={{flexDirection: 'column', margin: 2, justifyContent: 'center'}}>
          <TextInput style={styles.Note} placeholder="Note"></TextInput>
          <View style={{flexDirection: 'row', margin: 2, justifyContent: 'center'}}>
            <TouchableOpacity style={styles.Submit_Button}><Text style={{color:'#fff'}} onPress={handleSubmit}>Submit</Text></TouchableOpacity>
            <TouchableOpacity style={styles.SwapForm_Button}><Text style={{color:'#fff'}} onPress={handleSwapFormPress}>Swap Form</Text></TouchableOpacity>
            <TouchableOpacity style={styles.Roster_Button}><Text style={{color:'#fff'}} onPress={handleRosterPress}>Roster</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  InlineForm: {
    backgroundColor: '#b4b4ff',
    height: 200,
    width: 380,
    padding: 2,
    borderRadius: 5,
    marginBottom: 4,
  },
  Email: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: 17,
    width: 175,
    textAlign: 'center',
    margin: 2
  },
  Note: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 175,
    textAlign: 'center',
    margin: 2
  },
  AddButton: {
    backgroundColor: 'blue',
    borderRadius: 3,
    borderStyle: 'none',
    height: 12,
    width: 12,
  },
  DeleteButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    borderStyle: 'none',
    height: 12,
    width: 12,
  },
  Submit_Button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    height: 25,
    width: 100,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SwapForm_Button: {
    backgroundColor: '#4fd009',
    borderRadius: 4,
    height: 25,
    width: 100,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Roster_Button: {
    backgroundColor: '#4fd009',
    borderRadius: 4,
    height: 25,
    width: 100,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SHIFT: {width: 60, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Date: {width: 80, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Outbound: {width: 80, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Inbound: {width: 80, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Overnight: {width: 80, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  FIRST: {width: 60, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  BAR: {width: 60, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  PURSER: {width: 60, height: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  FOR: {width: 50, height: 20, backgroundColor: '#f0f0ffd9', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Early: {width: 50, height: 20, backgroundColor: '#f0f0ffd9', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  Late: {width: 50, height: 20, backgroundColor: '#f0f0ffd9', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  LTA: {width: 50, height: 20, backgroundColor: '#f0f0ffd9', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
  DO: {width: 50, height: 20, backgroundColor: '#f0f0ffd9', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'}
});