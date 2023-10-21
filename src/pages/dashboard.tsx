import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RiAddFill,
  RiMoneyDollarCircleLine,
  RiRestTimeFill,
  RiRestTimeLine,
  RiShoppingCartLine,
  RiWallet3Line,
  RiTimeFill,
} from "react-icons/ri";
import * as yup from "yup";

import MiniStatistics from "../components/Dashboard/MiniStatistics";
import { TransactionsOverview } from "../components/Dashboard/TransactionsOverview";
import { Input } from "../components/Form/Input";
import { Switch } from "../components/Form/Switch";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Transactions } from "../components/Transactions";
import { useCategories } from "../services/hooks/useCategories";
import {
  createTransaction,
  useTransactions,
} from "../services/hooks/useTransactions";
import { queryClient } from "../services/queryClient";
import { MotionGrid } from "../styles/animations";
import { currency } from "../utils/mask";
import { api } from "../services/api";
import { Registro, useRegistros } from "../services/hooks/useRegistros";

const getData = (fecha: string, data: Registro[]) => {
  const entradaMañana = data.find(
    (item) => item.periodo === "Mañana" && item.tipo === "ENTRADA"
  );
  const salidaMañana = data.find(
    (item) => item.periodo === "Mañana" && item.tipo === "SALIDA"
  );
  const entradaTarde = data.find(
    (item) => item.periodo === "Tarde" && item.tipo === "ENTRADA"
  );
  const salidaTarde = data.find(
    (item) => item.periodo === "Tarde" && item.tipo === "SALIDA"
  );
  console.log(entradaMañana);
  return (
    <Tr>
      <Td>{fecha}</Td>
      <Td>{entradaMañana?.hora ?? ""}</Td>
      <Td>{entradaMañana?.diferencia ?? ""}</Td>
      <Td>{salidaMañana?.hora ?? ""}</Td>
      <Td>{salidaMañana?.diferencia ?? ""}</Td>
      <Td>{entradaTarde?.hora ?? ""}</Td>
      <Td>{entradaTarde?.diferencia ?? ""}</Td>
      <Td>{salidaTarde?.hora ?? ""}</Td>
      <Td>{salidaTarde?.diferencia ?? ""}</Td>
    </Tr>
  );
};

export default function Dashboard() {
  const { data, isLoading } = useRegistros();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
        <Sidebar />

        <Flex flexDirection="column" w="100%">
          <Breadcrumb fontWeight="medium" fontSize="md" w="100%">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex justify="space-between" align="center" mt="2">
            <Text fontSize="4xl" fontWeight="bold">
              Resumen
            </Text>
          </Flex>

          <MotionGrid
            w="100%"
            columns={{ sm: 1, md: 2, xl: 3 }}
            spacing="24px"
            my="5"
            initial="hidden"
            animate="visible"
          >
            <MiniStatistics
              label="Atrasos este Mes"
              amount={data?.minAtraso}
              icon={<RiTimeFill />}
              animationDelay={1}
            />
            <MiniStatistics
              label="Restantes de tolerancia este mes"
              amount={`0 min`}
              icon={<RiTimeFill />}
              animationDelay={2}
            />
            <MiniStatistics
              label="Licencias"
              amount={`0`}
              icon={<RiTimeFill />}
              animationDelay={3}
            />
          </MotionGrid>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Reporte</TableCaption>
              <Thead>
                <Tr>
                  <Th>FECHA</Th>
                  <Th>ENTRADA MAÑANA</Th>
                  <Th>RETRASO</Th>
                  <Th>SALIDA MAÑANA</Th>
                  <Th>RETRASO</Th>
                  <Th>ENTRADA TARDE</Th>
                  <Th>RETRASO</Th>
                  <Th>SALIDA TARDE</Th>
                  <Th>RETRASO</Th>
                </Tr>
              </Thead>
              {data &&
                Object.entries(data.registros).map(([fecha, item]) => {
                  return getData(fecha, item);
                })}
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
