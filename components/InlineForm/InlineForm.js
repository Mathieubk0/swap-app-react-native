import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Switch, Linking } from 'react-native';
import CheckBox from "expo-checkbox";
import { Toast } from 'toastify-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

export default function InlineForm({ BASEURL, isOutdated }) {
  
  const handleLink1Press = () => { Linking.openURL('https://www.google.com')};
  const handleLink2Press = () => { Linking.openURL('https://www.wikipedia.org')};

  const [shifts, setShifts] = useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}]);

  const handleChange = (index, fieldName, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = value;
    setShifts(updatedShifts);
  };

  const addShift = () => {
    const newShifts = [...shifts, {isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}];
    setShifts(newShifts)
  };

  const deleteShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy');
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const [email, onChangeEmail] = useState('');
  const [note, onChangeNote] = useState('');
  const [isOvernight, setIsOvernight] = useState(false);

  const ovSwitch = (index) => { 
    return () => {
      setIsOvernight((previousState) => !previousState);

      const updatedShifts = [...shifts];
      updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
      setShifts(updatedShifts);
    };
  };
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSubmit = () => {

    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(new Date(shift.Date)));

    if (isAnyOutdated) {
      Toast.error('Oops... You can\'t submit an outdated swap 🤓');
      return;
    }

    shifts.forEach(shift => {
      const formData = {
        Email: email,
        Date: formatDate(selectedDate),
        Outbound: shift.Outbound,
        Inbound: shift.isOvernight ? shift.Inbound + '+1d' : shift.Inbound,
        Position: selectedPosition,
        Early: shift.Early,
        Late: shift.Late,
        LTA: shift.LTA,
        DO: shift.DO,
        Note: note
      };
    
      fetch(`${BASEURL}/formData`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        return response.json()
      })
      .then(data => {
        console.log('Success', data);
        Toast.success(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submitted successfully!`);
      })
      .catch(error => {
        console.log(error);
        Toast.error(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submission failed`)
      });
    });
  };

  return (
    <>
      <View style={styles.InlineForm}>
        <View>
          <TextInput style={styles.Email} placeholder="Email" onChangeText={(value) => onChangeEmail(value)} value={email} />
        </View>

        <ScrollView horizontal>
          <ScrollView>
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

              {shifts.map((shift, index) => (
                <View key={index} style={{flexDirection: 'row', margin: 0}}>
                  <View style={styles.SHIFT}>
                    <TouchableOpacity style={styles.AddButton} onPress={addShift}><Text style={{color: 'white', fontSize: 9}}>+</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.DeleteButton} onPress={() => deleteShift(index)}><Text style={{color: 'white', fontSize: 9}}>-</Text></TouchableOpacity>
                  </View>
                  <View style={styles.Date}>
                    <TouchableOpacity onPress={openDatePicker}>
                      <Text>{selectedDate.toDateString()}</Text>
                    </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={selectedDate}
                          mode="date"
                          display="spinner"
                          onChange={handleDateChange}
                        />
                      )}
                  </View>
                  <View style={styles.Outbound}><TextInput onChangeText={(value) => handleChange(index, 'Outbound', value)} value={shift.Outbound} placeholder="Outbound" keyboardType="numeric" /></View>
                  <View style={styles.Inbound}><TextInput onChangeText={(value) => handleChange(index, 'Inbound', value)} value={shift.Inbound} placeholder="Inbound" keyboardType="numeric" /></View>
                  <View style={styles.Overnight}><Switch onValueChange={ovSwitch(index)} value={shift.isOvernight}></Switch></View>
                  <View style={styles.FIRST}>
                    <CheckBox 
                      value={selectedPosition === 'FIRST'} 
                      onValueChange={() => {
                        setSelectedPosition('FIRST');
                        handleChange(index, 'Position', 'FIRST')
                      }} 
                    />
                  </View>
                  <View style={styles.BAR}>
                    <CheckBox 
                      value={selectedPosition === 'BAR'} 
                      onValueChange={() => {
                        setSelectedPosition('BAR');
                        handleChange(index, 'Position', 'BAR')
                      }} 
                    />
                  </View>
                  <View style={styles.PURSER}>
                    <CheckBox 
                      value={selectedPosition === 'PURSER'} 
                      onValueChange={() => {
                        setSelectedPosition('PURSER');
                        handleChange(index, 'Position', 'PURSER')
                      }} 
                    />
                  </View>
                  <View style={styles.FOR}></View>
                  <View style={styles.Early}><CheckBox value={shift.Early} onValueChange={() => handleChange(index, 'Early', !shift.Early)}></CheckBox></View>
                  <View style={styles.Late}><CheckBox value={shift.Late} onValueChange={() => handleChange(index, 'Late', !shift.Late)}></CheckBox></View>
                  <View style={styles.LTA}><CheckBox value={shift.LTA} onValueChange={() => handleChange(index, 'LTA', !shift.LTA)}></CheckBox></View>
                  <View style={styles.DO}><CheckBox value={shift.DO} onValueChange={() => handleChange(index, 'DO', !shift.DO)}></CheckBox></View>
                </View>
              ))}

            </View>
          </ScrollView>
        </ScrollView>

        <View style={{flexDirection: 'column', margin: 2, justifyContent: 'center'}}>
          <TextInput style={styles.Note} placeholder="Note" onChangeText={(value) => onChangeNote(value)} value={note}></TextInput>
          <View style={{flexDirection: 'row', margin: 2, justifyContent: 'center'}}>
            <TouchableOpacity style={styles.Submit_Button}><Text style={{color:'#fff'}} onPress={handleSubmit}>Submit</Text></TouchableOpacity>
            <TouchableOpacity style={styles.Link1_Button}><Text style={{color:'#fff'}} onPress={handleLink1Press}>Link 1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.Link2_Button}><Text style={{color:'#fff'}} onPress={handleLink2Press}>Link 2</Text></TouchableOpacity>
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
    height: 12,
    width: 12,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DeleteButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    height: 12,
    width: 12,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  Link1_Button: {
    backgroundColor: '#4fd009',
    borderRadius: 4,
    height: 25,
    width: 100,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Link2_Button: {
    backgroundColor: '#4fd009',
    borderRadius: 4,
    height: 25,
    width: 100,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SHIFT: {width: 60, height: 20, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
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