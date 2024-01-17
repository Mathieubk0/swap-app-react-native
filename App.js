import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { format } from 'date-fns';
import ToastManager from 'toastify-react-native';
import Calendar from './components/Calendar/Calendar';
import InlineForm from './components/InlineForm/InlineForm';

export default function App() {

  const todayDate = new Date();
  const IPv4Address = '192.168.0.8';
  const BASEURL = `http://${IPv4Address}:3001`;

  const isOutdated = (day) => {
    todayDate.setHours(0, 0, 0, 0);
    return day < todayDate;
  };

  const [showQuickView, setShowQuickView] = useState(false);
  const toggleQuickViewBox = () => {
    setShowQuickView(!showQuickView);
  };

  const [selectedDay, setSelectedDay] = useState(null);
  const toggleDayBox = (day) => { 
    setSelectedDay(prevSelectedDay => (prevSelectedDay && prevSelectedDay.getTime() === day.getTime() ? null : day));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.display}>
          <Text style={styles.greetings}>Hi there! Today is { format(todayDate, 'MMMM do, y O') }</Text>
          <View style={styles.InlineForm}>
            <InlineForm BASEURL= {BASEURL} isOutdated={isOutdated} />
          </View>
          <View style={styles.Calendar}>
            <Calendar BASEURL= {BASEURL} isOutdated={isOutdated} showQuickView={showQuickView} toggleQuickViewBox={toggleQuickViewBox} selectedDay={selectedDay} toggleDayBox={toggleDayBox} />
          </View>
        </View>
      </ScrollView>
      
      <ToastManager />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 1,
  },
  display: {
    flex: 1,
    backgroundColor: '#f0f0ffd9',
    borderRadius: 5,
    marginTop: 64,
    margin: 8,
    alignItems: 'center',
  },
  greetings: {
    flex: 1,
    margin: 2,
    fontSize: 17,
    fontWeight: 'bold',
  },
  InlineForm: {
    flex: 2,
  },
  Calendar: {
    flex: 3,
  }
});