import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
// import QuickViewBox from '../components/QuickViewBox/QuickViewBox';
// import DayBox from '../components/DayBox/DayBox';

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Calendar({ showToasts, BASEURL, isOutdated, showQuickView, toggleQuickViewBox, selectedDay, toggleDayBox }) {

    // Display Months & Days 
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentMonth = startOfMonth(currentDate);
    const months = [currentMonth];
    for (let i = 1; i < 2; i++) {months.push(startOfMonth(addMonths(currentMonth, i)))};

    const [daysWithData, setDaysWithData] = useState([]);

    const propertyToFilter = ['Inbound','Outbound','Position','Email','Sent','Date','Note', 'Early', 'Late', 'LTA', 'DO'];

    useEffect(() => {

        fetch(`${BASEURL}/dbData`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch Calendar Data');
        }
        return response.json()
        })
        .then(data => {
        const sortedData= data.data
        .map(item => item.Date);

        setDaysWithData(sortedData)
        })
        .catch(error => console.error('Error fetching days with data:', error))
    }, [BASEURL])
    
    // Update Date every minute
    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <View style={styles.Calendar}>
                <TouchableOpacity style={styles.QuickView} onPress={showToasts}>
                    <Text style={{color:'#fff'}}>Quick View</Text>
                </TouchableOpacity>
                {/* { showQuickView && <QuickViewBox BASEURL={BASEURL} propertyToFilter={propertyToFilter} /> } */}
                { months.map( month => (
                    <View key={month}>
                        <View style={styles.Calendar_Month}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                                {format( month, 'MMMM yyyy')}
                            </Text>
                        </View>
                        <View style={styles.Calendar_Month}>
                            { eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) })
                                .map(day => (
                                    <TouchableOpacity 
                                        key={day}
                                        style={isOutdated(day)? styles.isOutdated_Day : styles.Calendar_Day}
                                        //     ${selectedDay && format(day, 'dd/MM/yyyy') === format(selectedDay, 'dd/MM/yyyy') ? 'calendar-day-selected' : ''}
                                        
                                        //     `} 
                                        // onPress={() => {
                                        //     isOutdated(day) ? toggleDayBox(null) : toggleDayBox(day)
                                        // }}
                                    >
                                    <Text style={isOutdated(day)?{fontSize: 8, color: '#fff'}:{fontSize: 8}}>
                                        {format(day, 'EEEE')}
                                    </Text>
                                    <Text style={isOutdated(day)?{fontSize: 13, color: '#fff'}:{fontSize: 13}}>
                                        {format(day, 'd')}
                                    </Text>
                                    { daysWithData.includes(format(day, 'dd/MM/yyyy')) && !isOutdated(day) === true ? 
                                        ( <View style={styles.Dot}></View> ) : ( <View></View> )
                                    }
                                    </TouchableOpacity>
                                    )
                                )
                            }
                        </View>
                        {/* { selectedDay && format(month, 'MMMM yyyy') === format(selectedDay, 'MMMM yyyy') && (
                            <DayBox selectedDay={selectedDay} BASEURL={BASEURL} propertyToFilter={propertyToFilter} />
                            )
                        } */}
                    </View>
                ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Calendar: {
        alignItems: 'center',
    },
    QuickView: {
        backgroundColor: 'red',
        borderRadius: 4,
        height: '4%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Calendar_Month: {
        padding: 4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Calendar_Day: {
        backgroundColor: '#fff',
        borderColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        margin: 1,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    Calendar_Day_Selected: {

    },
    isOutdated_Day: {
        backgroundColor: 'grey',
        borderColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        margin: 1,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    Dot: {
        backgroundColor: 'red',
        height: 7,
        width: 7,
        borderRadius: 100,
    }
  });