import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { format } from 'date-fns';
import ToastManager, { Toast } from 'toastify-react-native';
import Calendar from './components/Calendar/Calendar';
import InlineForm from './components/InlineForm/InlineForm';

export default function App() {
  const todayDate = new Date();
  const BASEURL = `http://10.14.0.2:3001`;

  const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
  };

  const [shifts, setShifts] = useState([{isOvernight: false, Date: '', Outbound: '', Inbound: '', Position:'', Early: false, Late: false, LTA: false, DO: false}]);

  const [showQuickView, setShowQuickView] = useState(false);
  const toggleQuickViewBox = () => {
    setShowQuickView(!showQuickView);
  };

  const [selectedDay, setSelectedDay] = useState(null);
  const toggleDayBox = (day) => { 
    setSelectedDay(prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day));
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

  const ovSwitch = (index) => { 
    const updatedShifts = [...shifts];
    updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
    setShifts(updatedShifts)
  };

  const handleChange = (index, fieldName, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = value;
    setShifts(updatedShifts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(new Date(shift.Date)));

    if (isAnyOutdated) {
      Toast.error('Oops... You can\'t submit an outdated swap 🤓');
      return;
    }

    shifts.forEach(shift => {
      const formData = {
        Email: e.target.elements.Email.value,
        Date: shift.Date,
        Outbound: shift.Outbound,
        Inbound: shift.isOvernight ? shift.Inbound + '+1d' : shift.Inbound,
        Position: shift.Position,
        Early: shift.Early,
        Late: shift.Late,
        LTA: shift.LTA,
        DO: shift.DO,
        Note: e.target.elements.Note.value
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
        setShowQuickView(true)
      })
      .catch(error => {
        console.log(error);
        Toast.error(`${shift.Outbound} - ${shift.Inbound} on ${shift.Date} submission failed`)
      });
    });
  };

  const showToasts = () => {
    Toast.success('Youhou! Let\'s GO!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.greetings} onPress={showToasts}>Hi there! Today is { format(todayDate, 'MMMM do, y O') }</Text>
        {/* <InlineForm style={styles.InlineForm} BASEURL= {BASEURL} todayDate={todayDate} isOutdated={isOutdated} addShift={addShift} deleteShift={deleteShift} ovSwitch={ovSwitch} handleChange={handleChange} shifts={shifts} handleSubmit={handleSubmit} /> */}
        <ScrollView style={styles.Calendar}>
          <Calendar showToasts={showToasts} BASEURL= {BASEURL} todayDate={todayDate}isOutdated={isOutdated} handleSubmit={handleSubmit} showQuickView={showQuickView} toggleQuickViewBox={toggleQuickViewBox} selectedDay={selectedDay} toggleDayBox={toggleDayBox} />
        </ScrollView>
      </View>
      
      <ToastManager />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  display: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0f0ffd9',
    borderRadius: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  greetings: {
    height: '3%',
    marginTop: 32,
  },
  InlineForm: {
    
  },
  Calendar: {
    height: '90%',
    width: '100%',
  }
});