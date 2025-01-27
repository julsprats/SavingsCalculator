import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [gasPrice, setGasPrice] = useState('');
  const [gasMileage, setGasMileage] = useState('');
  const [electricPrice, setElectricPrice] = useState('');
  const [electricMileage, setElectricMileage] = useState('');
  const [distanceDriven, setDistanceDriven] = useState('25000'); // default value
  const [additionalDistance, setAdditionalDistance] = useState('');
  const [savings, setSavings] = useState('');
  const [electricCarDistance, setElectricDistance] = useState('');

  const calculate = () => {
    const gasCarDistance = parseFloat(gasMileage) || 0;

    // electric car distance
    const electricCarDist = parseFloat(electricMileage) * parseFloat(gasPrice) / parseFloat(electricPrice);
    setElectricDistance(electricCarDist.toFixed(1)); // one decimal

    const additional = electricCarDist - gasCarDistance;
    setAdditionalDistance(additional.toFixed(1)); // one decimal

    const gasCost = (parseFloat(gasPrice) * parseFloat(distanceDriven)) / gasCarDistance;
    const electricCost = (parseFloat(electricPrice) * parseFloat(distanceDriven)) / parseFloat(electricMileage);
    const savingsAmount = gasCost - electricCost;
    setSavings(savingsAmount.toFixed(1)); // one decimal
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 35, marginBottom: 15 }}>EV Savings Calculator</Text>

      
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Gas Vehicle Information</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text>Cost of 1L of gas</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: 'whitesmoke' }}
            onChangeText={(text) => setGasPrice(text)}
            value={gasPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>Gas Car Mileage</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: 'whitesmoke' }}
            onChangeText={(text) => setGasMileage(text)}
            value={gasMileage}
            keyboardType="numeric"
          />
        </View>

      </View>
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}>Electric Vehicle Information</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text>Cost of 1 kWh of electricity</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: 'whitesmoke' }}
            onChangeText={(text) => setElectricPrice(text)}
            value={electricPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>Electric Car Mileage</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: 'whitesmoke' }}
            onChangeText={(text) => setElectricMileage(text)}
            value={electricMileage}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text>How many km do you drive each year?</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: 'whitesmoke', width: 390, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Button title="15000 km" onPress={() => setDistanceDriven('15000')}
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: distanceDriven === '15000' ? 'black' : 'darkgrey' }}
          color={distanceDriven === '15000' ? 'black' : 'darkgrey'} />
        <Button title="25000 km" onPress={() => setDistanceDriven('25000')}
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: distanceDriven === '25000' ? 'black' : 'darkgrey' }}
          color={distanceDriven === '25000' ? 'black' : 'darkgrey'} />
        <Button title="40000 km" onPress={() => setDistanceDriven('40000')}
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: distanceDriven === '40000' ? 'black' : 'darkgrey' }}
          color={distanceDriven === '40000' ? 'black' : 'darkgrey'} />
      </View>

      <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20, marginTop: 20, width: 390 }}>
        <Button title="Estimate Savings" onPress={calculate} color='black' />
      </View>

      <Text style={{ textAlign: 'center', padding: 10, fontSize: 18 }}>For the price of 1 liter of gas, you can travel:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 100, borderColor: 'gray', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'pink' }}>
            <Text>Gas</Text>
            <Text style={{ fontSize: 30 }}>{gasMileage}</Text>
            <Text>km</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ height: 100, borderColor: 'gray', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'turquoise' }}>
          <Text>Electric car</Text>
            <Text style={{ fontSize: 30 }}>{electricCarDistance}</Text>
            <Text>km</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ height: 100, borderColor: 'gray', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'gold' }}>
            <Text>→</Text>
            <Text style={{ fontSize: 30 }}>{additionalDistance}</Text>
            <Text>km more</Text>
          </View>
        </View>
      </View>
      
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, padding: 10, textAlign: 'center' }}>By switching to electric, you obtain:</Text>
        <View style={{ height: 100, borderColor: 'gray', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'black', width: 390 }}>
            <Text style={{ fontSize: 30, color: 'white' }}>${savings}</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>in savings per year</Text>
          </View>
      </View>
    </View>
  );
}