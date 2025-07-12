import { api } from "../../services/api";

export const getAllPersonal = async () => {
  try {
    const response = await api.get("/personal/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar personal:", error);
    throw error;
  }
};
