import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import CustomButton from "../components/CustomButton";
import HeaderMenu from "../components/HeaderMenu";
import * as S from "../styles/HomeScreen.styles";

import { useDataContext } from "../context/DataContext";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import { clearAllData } from "../services/storageService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    personalLogado,
    alunoLogado,
    setPersonalLogado,
    setAlunoLogado,
  } = useDataContext();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8 }}>
          <HeaderMenu />
        </View>
      ),
    });
  }, [navigation]);

  const nome = personalLogado?.nome ?? alunoLogado?.pessoa.nome ?? "";
  const tipoLogado = personalLogado ? "personal" : alunoLogado ? "aluno" : null;

  const handleLogoutConfirm = async () => {
    setLogoutModalVisible(false);
    setPersonalLogado(null);
    setAlunoLogado(null);
  };

  return (
    <S.Container>
      <S.Title>
        {nome ? `Faça bom uso do app, ${nome}` : "Bem-vindo!"}
      </S.Title>

      {tipoLogado ? (
        <>
          <CustomButton
            title="Visualizar Perfil"
            onPress={() =>
              navigation.navigate(
                tipoLogado === "personal" ? "ViewPersonal" : "ViewAluno"
              )
            }
            type="primary"
          />

          <CustomButton
            title="Visualizar Serviços"
            onPress={() => navigation.navigate("ViewServico")}
            type="primary"
          />

          <CustomButton
            title="Logout"
            onPress={() => setLogoutModalVisible(true)}
            type="secondary"
          />
        </>
      ) : (
        <>
          <CustomButton
            title="Sou Personal"
            onPress={() => navigation.navigate("LoginPersonal")}
            type="primary"
          />

          <CustomButton
            title="Sou Aluno"
            onPress={() => navigation.navigate("LoginAluno")}
            type="secondary"
          />
        </>
      )}

      <LogoutConfirmModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </S.Container>
  );
}
