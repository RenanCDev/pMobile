import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import colors from '../constants/colors';
import { HomeButtonWrapper } from '../styles/HeaderHomeButtom.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HeaderHomeButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <HomeButtonWrapper onPress={() => navigation.navigate('HomeScreen')}>
      <Ionicons name="home" size={24} color={colors.dark.surface} />
    </HomeButtonWrapper>
  );
}
