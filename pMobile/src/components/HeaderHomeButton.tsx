import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HeaderHomeButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 12 }}>
      <Ionicons name="home" size={24} color={colors.white} />
    </TouchableOpacity>
  );
}
