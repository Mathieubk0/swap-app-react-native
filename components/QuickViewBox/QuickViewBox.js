import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, Text } from "react-native";
import CheckBox from "expo-checkbox";

export default function QuickViewBox({ BASEURL, propertyToFilter }) {

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

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
            {loading ? (
                <View style={styles.Loading_spinner}></View>
            ) : (
                <View style= {styles.QuickViewBox}>
                    <ScrollView horizontal>
                            <View style={styles.Table}>
                                <View style={styles.Header}>
                                    <View style={styles.Date}><Text style={{fontWeight: 'bold'}}>Date</Text></View>
                                    <View style={styles.Outbound}><Text style={{fontWeight: 'bold'}}>Outbound</Text></View>
                                    <View style={styles.Inbound}><Text style={{fontWeight: 'bold'}}>Inbound</Text></View>
                                    <View style={styles.Position}><Text style={{fontWeight: 'bold'}}>Position</Text></View>
                                    <View style={styles.Email}><Text style={{fontWeight: 'bold'}}>Email</Text></View>
                                    <View style={styles.FOR}><Text style={{fontWeight: 'bold'}}>FOR</Text></View>
                                    <View style={styles.Early}><Text style={{fontWeight: 'bold'}}>Early</Text></View>
                                    <View style={styles.Late}><Text style={{fontWeight: 'bold'}}>Late</Text></View>
                                    <View style={styles.LTA}><Text style={{fontWeight: 'bold'}}>LTA</Text></View>
                                    <View style={styles.DO}><Text style={{fontWeight: 'bold'}}>D.O.</Text></View>
                                    <View style={styles.Note}><Text style={{fontWeight: 'bold'}}>Note</Text></View>
                                    <View style={styles.Sent}><Text style={{fontWeight: 'bold'}}>Sent</Text></View>
                                </View>
                                    {formData && formData.data && formData.data.length > 0 ? (
                                            formData.data
                                                .filter(dataItem => ( 
                                                    propertyToFilter.some(column => 
                                                        dataItem[column].toString().toLowerCase().includes(search.toLowerCase())
                                                        )))
                                                .map((dataItem, index) => (
                                                        <>
                                                            <ScrollView >
                                                                <View style={styles.Body}>
                                                                    <View style={styles.Date}><Text>{dataItem.Date}</Text></View>
                                                                    <View style={styles.Outbound}><Text style={{color: 'blue'}}>{dataItem.Outbound}</Text></View>
                                                                    <View style={styles.Inbound}><Text style={{color: 'blue'}}>{dataItem.Inbound}</Text></View>
                                                                    <View style={styles.Position}><Text>{dataItem.Position}</Text></View>
                                                                    <View style={styles.Email}><Text>{dataItem.Email}</Text></View>
                                                                    <View style={styles.FOR}></View>
                                                                    <View style={styles.Early}><CheckBox disabled={true} value={dataItem.Early}></CheckBox></View>
                                                                    <View style={styles.Late}><CheckBox disabled={true} value={dataItem.Late}></CheckBox></View>
                                                                    <View style={styles.LTA}><CheckBox disabled={true} value={dataItem.LTA}></CheckBox></View>
                                                                    <View style={styles.DO}><CheckBox disabled={true} value={dataItem.DO}></CheckBox></View>
                                                                    <View style={styles.Note}><ScrollView horizontal><Text>{dataItem.Note}</Text></ScrollView></View>
                                                                    <View style={styles.Sent}><Text>{dataItem.Sent}</Text></View>
                                                                </View>
                                                            </ScrollView>
                                                        </>
                                                    ))
                                                ) : (
                                                    <View>
                                                        <View style={styles.Body}><Text>No shift yet. Add yours 🤓</Text></View>
                                                    </View>
                                    )}
                            </View>
                    </ScrollView>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    QuickViewBox: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderBlockColor: '#ccc',
        borderRadius: 5,
        width: '98%',
        margin: 5,
        position: 'fixed'
    },
    Loading_spinner: {
        borderColor: '#0000001a',
        borderWidth: 4,
        borderLeftColor: '#767676',
        borderLeftWidth: 4,
        borderRadius: 100,
        width: 24,
        height: 24,
        margin: 20,
        // animation: rotate 1s linear infinite,
    },
    Table: {
        flexDirection: 'column',
    },
    Header: {
        flexDirection: 'row',
    },
    Body: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Date: {width: 100, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Outbound: {width: 75, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Inbound: {width: 75, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Position: {width: 75, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Email: {width: 150, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    FOR: {width: 50, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Early: {width: 50, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Late: {width: 50, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    LTA: {width: 50, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    DO: {width: 50, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Note: {width: 150, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'},
    Sent: {width: 150, height: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc'}
  });