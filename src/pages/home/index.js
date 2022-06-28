import React from 'react';

import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export const Home = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

      <TouchableOpacity style={{ height: 50, width: 220, backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 20 }} onPress={() => navigation.navigate('Megasena')}>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>MegaSena</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ height: 50, width: 220, marginTop: 10, backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 20 }} onPress={() => navigation.navigate('Gerasenhas')}>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>Gerar senhas</Text>
      </TouchableOpacity>
    </View>
  );
}