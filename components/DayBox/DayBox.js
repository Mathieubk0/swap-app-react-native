import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { ScrollView, TextInput, View } from "react-native";

export default function DayBox({ BASEURL, selectedDay, propertyToFilter}) {
    
    const date = format(selectedDay, 'dd/MM/yyyy');
    
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
    
        fetch(`${BASEURL}/dbData`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch DayBox Data');
            }
            return response.json();
        })
        .then(data => {
            const sortedData = data.data
            .filter(item => item.Date === date)
            .sort((a, b) => new Date(b.Sent) - new Date(a.Sent))
             // eslint-disable-next-line
            .map(item => item.Outbound == item.Inbound ? {...item, Outbound: "See Note", Inbound: " "} : item);

            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [BASEURL, date]);

    return (
        <>
            <View>
                <TextInput id="searchBox"></TextInput>
            </View>
            <View>

            </View>
        </>
    )
}