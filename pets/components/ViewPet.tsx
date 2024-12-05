import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Pet } from "../types";

type Props = {
  pet: Pet;
  onDelete: () => Promise<void>;
};

export default function ViewPet({ pet, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{pet.name}</Text>
      <Text style={styles.type}>Tipo: {pet.type}</Text>
      <Text style={styles.age}>Idade: {pet.age} anos</Text>
      <Button title="Excluir" onPress={onDelete} color="#e57373" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  age: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
});
