import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";

import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";

export default function LoginScreen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/lista");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : (
        <>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
          <Text style={styles.hint}>
            Use o email: user@example.com e senha: 123456
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <StyledButton
            title="Login"
            onPress={async () => {
              try {
                await login(email, password);
                router.push("/home/lista");
              } catch (error: any) {
                Alert.alert("Erro ao logar", error.toString());
              }
            }}
            style={{ marginTop: 12 }}
          />
        </>
      )}
      <Text style={{ marginTop: 20 }}>Novo aqui se cadastre agora</Text>
      <StyledButton
        title="Cadastrar"
        onPress={async () => {
          try {
            router.push("/registro");
          } catch (error: any) {
            Alert.alert("Erro ao cadastrar", error.toString());
          }
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
