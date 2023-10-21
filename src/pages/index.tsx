import {
  Button,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../components/Form/Input";
import { Logo } from "../components/Header/Logo";
import { AuthContext, SignInCredentials } from "../context/AuthContext";

const signInFormSchema = yup.object().shape({
  email: yup.string(),
  password: yup.string().required("password required").min(5),
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm<SignInCredentials>({
    resolver: yupResolver(signInFormSchema),  
  });
  const errors = formState.errors;

  const handleSignIn: SubmitHandler<SignInCredentials> = async (values) => {
    await signIn(values);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      flexDirection="column"
    >
      <Stack spacing={6} align="center" w="100%">
        <Logo />

        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              {...register("usuario")}
              type="text"
              name="usuario"
              value="4011283"
              label="Usuario"
              error={errors.usuario}
            />
            <Input
              {...register("password")}
              type="password"
              value="4011283"
              name="password"
              label="Password"
              error={errors.password}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="yellow"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Login
          </Button>

          {/* <Text fontSize="sm" mt="4" textAlign="center">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <ChakraLink fontWeight="bold" display="inline-block">
                Register Now
              </ChakraLink>
            </Link>
          </Text> */}
        </Flex>
      </Stack>
    </Flex>
  );
}
