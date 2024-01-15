import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

export default function QuickViewBox({ BASEURL, propertyToFilter }) {

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
                throw new Error('Failed to fetch QuickViewBox Data');
            }
            return response.json();
        })
        .then(data => { 
            const sortedData = data.data
            // eslint-disable-next-line
            .map(item => item.Outbound == item.Inbound ? {...item, Outbound: "See Note", Inbound: " "} : item)

            setFormData({ ...data, data: sortedData });
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [BASEURL]);

    return (
        <>
            <View style={styles.QuickViewBox}></View>
        </>
    )
}

const styles = StyleSheet.create({
    QuickViewBox: {
      borderColor: 'black',
      borderWidth: 1,
      height: '25%',
      width: '100%',
      margin: 4
    }
  });