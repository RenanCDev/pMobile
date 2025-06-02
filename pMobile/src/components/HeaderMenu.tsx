// components/HeaderMenu.tsx
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HeaderMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = (route: keyof RootStackParamList) => {
    setModalVisible(false);
    navigation.navigate(route);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          name="menu"
          size={24}
          color={colors.white}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleNavigate('Staff')}
            >
              <Text style={styles.text}>Manter Personal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => handleNavigate('Student')}
            >
              <Text style={styles.text}>Manter Aluno</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 10,
  },
  menu: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    width: 200,
    paddingVertical: 10,
    shadowColor: '#000',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: colors.textPurple,
    fontWeight: '600',
  },
});
