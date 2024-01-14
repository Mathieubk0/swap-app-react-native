import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Switch, Checkbox } from 'react-native';

export default function InlineForm({ addShift, deleteShift, ovSwitch, handleChange, handleSubmit, shifts }) {
    return (
        <ScrollView>
          <View>
            <View style= {styles.container}>
              <View style= {styles.Inputs}>
                {shifts.map((shift, index) => (
                  <View key={index}>
                    <Text>
                      <TouchableOpacity onPress={() => addShift()}>
                        {/* Your add button icon or text goes here */}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteShift(index)}>
                        {/* Your delete button icon or text goes here */}
                      </TouchableOpacity>
                    </Text>
                    <TextInput
                      id="Date"
                      required
                      autoComplete="on"
                      type="date"
                      name="Date"
                      value={shift.Date}
                      onChangeText={(value) => handleChange(index, 'Date', value)}
                    />
                    <TextInput
                      id="Outbound"
                      required
                      type="number"
                      min="9000"
                      max="9199"
                      name="Outbound"
                      placeholder="Outbound"
                      value={shift.Outbound}
                      onChangeText={(value) => handleChange(index, 'Outbound', value)}
                    />
                    <TextInput
                      id="Inbound"
                      required
                      type="number"
                      min="9000"
                      max="9199"
                      name="Inbound"
                      placeholder="Inbound"
                      value={shift.Inbound}
                      onChangeText={(value) => handleChange(index, 'Inbound', value)}
                    />
                    <Switch
                      id="Overnight-switch"
                      value={shift.isOvernight}
                      onValueChange={() => ovSwitch(index)}
                    />
                    <Checkbox onPress={() => handleChange(index, 'FIRST', isChecked)}>
                        <Text>FIRST</Text>
                    </Checkbox>
                    <Checkbox onPress={() => handleChange(index, 'BAR', isChecked)}>
                        <Text>BAR</Text>
                    </Checkbox>
                    <Checkbox onPress={() => handleChange(index, 'PURSER', isChecked)}>
                        <Text>PURSER</Text>
                    </Checkbox>
                        <Text></Text>
                    <Checkbox onPress={() => handleChange(index, 'Early', isChecked)}>
                        <Text>Early</Text>
                    </Checkbox>
                    <Checkbox onPress={() => handleChange(index, 'Late', isChecked)}>
                        <Text>Late</Text>
                    </Checkbox>
                    <Checkbox onPress={() => handleChange(index, 'LTA', isChecked)}>
                        <Text>LTA</Text>
                    </Checkbox>
                    <Checkbox onPress={() => handleChange(index, 'DO', isChecked)}>
                        <Text>DO</Text>
                    </Checkbox>
                  </View>
                ))}
              </View>

              <View>
                <TextInput
                  name="Note"
                  maxLength={50}
                  placeholder="Note"
                />
                <View>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity href="https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d">
                    <Text>Swap Form</Text>
                  </TouchableOpacity>
                  <TouchableOpacity href="https://www.momentumserviceslondon.com/activite">
                    <Text>Roster</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text>LTA: "Long turn-around"</Text>
                <Text>D.O.: "Day off"</Text>
                <Text>9000 + 9000 = "See Note" 🤓</Text>
              </View>

            </View>
          </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Inputs: {

  }
});