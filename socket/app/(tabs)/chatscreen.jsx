import { useEffect, useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { GlobalContext } from "../../contex/index.js";
import io from "socket.io-client";

const SOCKET_URL = "http://10.10.10.99:8000";

let socket;

const chatscreen = () => {
  const {
    currentUser,
    messages,
    setMessages,
    callRequest,
    setCallRequest,
    allUsers,
    setAllUsers,
    selectedUser,
    setSelectedUser,
  } = useContext(GlobalContext);

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket = io(SOCKET_URL);
    socket.emit("join", currentUser);

    socket.on("users", (users) => {
      setAllUsers(users);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("call", (data) => {
      setCallRequest(data);
      Alert.alert(`${data.type} call from ${data.from}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

function sendMessage() {
  if (!selectedUser || !message) return;
  socket.emit("message", { to: selectedUser, message });
  setMessages((prev) => [...prev, { from: currentUser, to: selectedUser, message }]);
  setMessage("");
}

  function startCall(type) {
    if (!selectedUser) return;
    socket.emit("call", { to: selectedUser, type });
    Alert.alert(`${type} call sent to ${selectedUser}`);
  }

  // Filter messages between currentUser and selectedUser
const filteredMessages = messages.filter(
  m =>
    (m.from === currentUser && m.to === selectedUser) ||
    (m.from === selectedUser && m.to === currentUser)
);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="font-bold mb-2">Select user to chat/call:</Text>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedUser(item)}
            className={`p-2 mb-2 rounded-lg ${selectedUser === item ? "bg-blue-200" : "bg-gray-100"}`}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedUser ? (
        <>
          <Text className="font-bold mb-2">Chat with {selectedUser}:</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type message"
            className="border border-blue-500 rounded-lg mb-2 p-2"
          />
          <View className="flex-row gap-2 mb-2">
            <TouchableOpacity onPress={sendMessage} className="bg-blue-500 px-4 py-2 rounded-lg">
              <Text className="text-white">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startCall("video")} className="bg-green-500 px-4 py-2 rounded-lg">
              <Text className="text-white">Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startCall("voice")} className="bg-purple-500 px-4 py-2 rounded-lg">
              <Text className="text-white">Voice Call</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredMessages}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Text>{item.from}: {item.message}</Text>
            )}
          />
        </>
      ) : (
        <Text>Select a user to start chatting or calling.</Text>
      )}
    </View>
  );
};

export default chatscreen;