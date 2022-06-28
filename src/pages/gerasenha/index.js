import React from 'react';

import { View, ScrollView, TextInput, Text } from 'react-native';
import Slider from '@react-native-community/slider';


export const Gerasenha = () => {

  const maiuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minuscula = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@#$%¨&*()_+-=[]{}|;:<>,.?/';

  const [senha, setSenha] = React.useState('');
  const [usarMaiuscula, setUsarMaiuscula] = React.useState(false);
  const [usarMinuscula, setUsarMinuscula] = React.useState(false);
  const [usarNumeros, setUsarNumeros] = React.useState(false);
  const [usarSimbolos, setUsarSimbolos] = React.useState(false);

  const [tamanhoPadrao, setTamanhoPadrao] = React.useState(8);



  const gerarSenha = async () => {

    let characters = '';
    characters = usarMaiuscula ? maiuscula : '';
    characters += usarMinuscula ? minuscula : '';
    characters += usarNumeros ? numeros : '';
    characters += usarSimbolos ? simbolos : '';

    const config = {
      "jsonrpc": "2.0",
      "method": "generateStrings",
      "params": {
        "apiKey": "6da4a0a5-2785-49ab-8243-c0518b839a25",
        "n": 1,
        "length": 10,
        "characters": characters,
        "replacement": true
      },
      "id": 42
    }

    const response = await axios.post('https://api.random.org/json-rpc/4/invoke', config);

    console.log(response.data.result.random.data[0]);

  }


  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1, marginTop: 10 }}>

      <View>

      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 20, fontSize: 22 }}>Número de caracteres de senha</Text>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ width: 100, height: 50, marginRight: 10 }}>
            <TextInput placeholder='' value={tamanhoPadrao.toString()} keyboardType='number-pad' style={{ borderWidth: 1, borderColor: '#ccc', height: '100%', width: '100%', borderRadius: 10, textAlign: 'center' }} />
          </View>

          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={tamanhoPadrao}
            maximumValue={tamanhoPadrao * 10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setTamanhoPadrao(value)}
          />

          <Text>{tamanhoPadrao}</Text>
        </View>

      </View>

    </ScrollView>
  );
}