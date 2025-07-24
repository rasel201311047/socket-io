import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [callRequest, setCallRequest] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        messages,
        setMessages,
        callRequest,
        setCallRequest,
        allUsers,
        setAllUsers,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;