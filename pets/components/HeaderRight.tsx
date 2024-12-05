import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import useAuth from "../firebase/hooks/useAuth";
import StyledButton from "./StyledButton";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <StyledButton
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}
        title={"Logout"}
        style={{ width: "auto", marginLeft: 12, backgroundColor: "red" }}
      />
    </>
  );
}
