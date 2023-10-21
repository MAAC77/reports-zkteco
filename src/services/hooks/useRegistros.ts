import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { signOut } from "../../context/AuthContext";
import { api } from "../api";

export type Registro = {
  periodo: string;
  tipo: string;
  diferencia: string | null;
  hora: string;
};

type getRegistrosResponse = {
  registros: { [key: string]: Registro[] };
  minAtraso: string;
};

export async function getRegistros(): Promise<getRegistrosResponse | unknown> {
  if (typeof window === "undefined") return;

  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get("asistencia", config);
    const { data } = response;
    console.log('===')
    console.log({ ...data })
    return { ...data };
  } catch (error: any) {
    if (error.response.status === 403) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }
  }
}

export function useRegistros(options?: UseQueryOptions) {
  return useQuery(["registros"], () => getRegistros(), {
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  }) as UseQueryResult<getRegistrosResponse, unknown>;
}
