import React, { useEffect } from 'react'

import { View, ScrollView, TextInput, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'
// import Slider from '@react-native-community/slider'
import { Slider } from 'react-native-elements'
import axios from 'axios'
import { fonts } from 'react-native-elements/dist/config'

export const Gerasenha = () => {
  const maiuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const minuscula = 'abcdefghijklmnopqrstuvwxyz'
  const numeros = '0123456789'
  const simbolos = '!@#$%¨&*()_+-=[]{}|;:<>,.?/'

  const [senha, setSenha] = React.useState('')
  const [usarMaiuscula, setUsarMaiuscula] = React.useState(true)
  const [usarMinuscula, setUsarMinuscula] = React.useState(false)
  const [usarNumeros, setUsarNumeros] = React.useState(false)
  const [usarSimbolos, setUsarSimbolos] = React.useState(false)

  const [tamanhoSenha, setTamanhoSenha] = React.useState(6)

  useEffect(() => {
    gerarSenha()
  }, [tamanhoSenha, usarMaiuscula, usarMinuscula, usarNumeros, usarSimbolos])

  const gerarSenha = async () => {
    let characters = ''
    characters = usarMaiuscula ? maiuscula : ''
    characters += usarMinuscula ? minuscula : ''
    characters += usarNumeros ? numeros : ''
    characters += usarSimbolos ? simbolos : ''

    const config = {
      jsonrpc: '2.0',
      method: 'generateStrings',
      params: {
        apiKey: '6da4a0a5-2785-49ab-8243-c0518b839a25',
        n: 1,
        length: tamanhoSenha,
        characters: characters,
        replacement: true
      },
      id: 42
    }

    try {
      const response = await axios.post(
        'https://api.random.org/json-rpc/4/invoke',
        config
      )

      setSenha(response.data.result.random.data[0])

      console.log(response.data.result.random.data[0])
    } catch (error) {
      console.log('deu erro')
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'flex-start' }}
      style={{ flex: 1, marginTop: 10 }}
    >
      <View></View>

      <View style={{ alignItems: 'center', width: '100%' }}>
        <Text style={{ marginBottom: 20, fontSize: 22 }}>
          Número de caracteres de senha
        </Text>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingHorizontal: 10,
            flex: 1,
            width: '100%'
          }}
        >
          <View style={{ width: 100, height: 50, marginBottom: 10 }}>
            <TextInput
              placeholder=""
              value={tamanhoSenha.toString()}
              onChangeText={text => setTamanhoSenha(parseInt(text))}
              keyboardType="number-pad"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                height: '100%',
                width: '100%',
                borderRadius: 10,
                textAlign: 'center'
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
              width: 180
            }}
          >
            <Slider
              style={{ width: 150 }}
              value={tamanhoSenha}
              onValueChange={value => setTamanhoSenha(Math.floor(value))}
              minimumValue={6}
              maximumValue={32}
            />
            <Text style={{ marginLeft: 10 }}>{tamanhoSenha}</Text>
          </View>
          <View>
            <CheckBox
              left
              title="Letras maiúscula"
              checked={usarMaiuscula}
              onPress={() => setUsarMaiuscula(!usarMaiuscula)}
            />
            <CheckBox
              left
              title="Letras minúsculas"
              checked={usarMinuscula}
              onPress={() => setUsarMinuscula(!usarMinuscula)}
            />
            <CheckBox
              left
              title="Números"
              checked={usarNumeros}
              onPress={() => setUsarNumeros(!usarNumeros)}
            />
            <CheckBox
              left
              title="Símbolos"
              checked={usarSimbolos}
              onPress={() => setUsarSimbolos(!usarSimbolos)}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 20,
          paddingHorizontal: 10
        }}
      >
        <Text style={{ fontSize: 22, textAlign: 'center' }}>
          Senha gerada: {senha}
        </Text>
      </View>
    </ScrollView>
  )
}
