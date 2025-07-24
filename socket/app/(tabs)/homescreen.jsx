import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../../contex/index.js";
import { router } from "expo-router";

const API_URL = "http://10.10.10.99:8000/api";

const homescreen = () => {
  const {
    currentUserName,
    setCurrentUserName,
    setCurrentUser,
  } = useContext(GlobalContext);

  async function handleRegister(isLogin) {
    if (!currentUserName.trim()) {
      Alert.alert("Username required");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUserName }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(currentUserName);
        router.push("/chatscreen");
      } else {
        Alert.alert(data.error || "Error");
      }
    } catch (e) {
      Alert.alert("Network error");
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TextInput
        value={currentUserName}
        onChangeText={setCurrentUserName}
        placeholder="Username"
        className="border border-blue-500 rounded-lg w-64 mb-4 p-2"
      />
      <View className="flex-row gap-4">
        <TouchableOpacity
          onPress={() => handleRegister(true)}
          className="bg-blue-500 w-32 py-2 rounded-lg"
        >
          <Text className="text-white font-bold text-center">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRegister(false)}
          className="border border-blue-500 w-32 py-2 rounded-lg"
        >
          <Text className="text-blue-500 font-bold text-center">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default homescreen;