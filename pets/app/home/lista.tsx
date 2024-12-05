import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import StyledButton from "../../components/StyledButton";
import Loading from "../../components/Loading";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import HeaderRight from "@/components/HeaderRight";
type Pet = {
  id?: string;
  type: string;
  name: string;
  age: number;
};

export default function Pets() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Pet>("pets");

  const router = useRouter();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAddPet = async () => {
    if (!type || !name || !age) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      await create({
        type,
        name,
        age: parseInt(age, 10),
      });
      await refreshData();
      setType("");
      setName("");
      setAge("");
    } catch (error: any) {
      Alert.alert("Error", error.toString());
    }
  };

  const handleDeletePet = async (id: string) => {
    try {
      await remove(id);
      await refreshData();
    } catch (error: any) {
      Alert.alert("Error", error.toString());
    }
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "lista",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Manage Pets</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Type (cat, dog)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <StyledButton
        title="Add Pet"
        onPress={handleAddPet}
        style={{ marginTop: 12 }}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text>
                {item.name} ({item.type}), {item.age} years old
              </Text>
              <StyledButton
                title="Delete"
                onPress={() => handleDeletePet(item.id!)}
                style={{ backgroundColor: "red", width: "25%" }}
              />
            </View>
          )}
          keyExtractor={(item) => item.id!}
          style={{ width: "100%", marginTop: 20 }}
        />
      )}
    </View>
  );
}
