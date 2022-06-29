import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/Entypo'
import axios from 'axios'

const { width } = Dimensions.get('window')
export const Megasena = () => {
  const countries = [
    '6 Números',
    '7 Números',
    '8 Números',
    '9 Números',
    '10 Números',
    '11 Números',
    '12 Números',
    '13 Números',
    '14 Números',
    '15 Números'
  ]

  const [quantidadeNumeros, setQuantidadeNumeros] = useState(null)
  const [numerosSorteados, setNumerosSorteados] = useState([])
  const [carregando, setCarregando] = useState(false)

  const sortearNumeros = async () => {
    setCarregando(true)

    const config = {
      jsonrpc: '2.0',
      method: 'generateIntegerSequences',
      params: {
        apiKey: '6da4a0a5-2785-49ab-8243-c0518b839a25',
        n: 1,
        length: quantidadeNumeros,
        min: 1,
        max: 60,
        replacement: false,
        base: 10
      },
      id: 3076
    }

    if (quantidadeNumeros < 6) {
      alert('Selecione a quantidade de numeros antes')
      setCarregando(false)
      return
    }

    const response = await axios.post(
      'https://api.random.org/json-rpc/4/invoke',
      config
    )
    let numerosOrdenados = response.data.result.random.data[0].sort()

    setCarregando(false)
    setNumerosSorteados(numerosOrdenados.sort())
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={{ flex: 1, marginTop: 10 }}
    >
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Gerar números para mega-sena
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SelectDropdown
          data={countries}
          defaultButtonText={'Selecionar'}
          dropdownStyle={{ backgroundColor: '#FFF' }}
          buttonStyle={{
            height: 50,
            backgroundColor: '#FFF',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#444'
          }}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            )
          }}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index + 6);
            setQuantidadeNumeros(index + 6)
          }}
        />
        <TouchableOpacity
          onPress={() => sortearNumeros()}
          style={{
            height: 50,
            marginLeft: 10,
            backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            paddingHorizontal: 20
          }}
        >
          <Text style={{ fontSize: 22, textAlign: 'center', color: '#fff' }}>
            Gerar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        {!carregando && numerosSorteados.length > 0 && (
          <Text style={{ fontSize: 22, textAlign: 'center' }}>
            Numeros sorteados
          </Text>
        )}

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {carregando ? (
            <Text style={{ fontSize: 22, textAlign: 'center' }}>
              Sorteando numeros...
            </Text>
          ) : (
            numerosSorteados.map((numero, index) => (
              <NumerosSorteados key={index} numero={numero} />
            ))
          )}
        </View>
      </View>

      <View></View>
    </ScrollView>
  )
}

const NumerosSorteados = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        margin: 5,
        backgroundColor: 'green',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}>
        {props.numero}
      </Text>
    </View>
  )
}
