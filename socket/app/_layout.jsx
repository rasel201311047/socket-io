import { Stack } from "expo-router";
import GlobalState from '../contex/index.js';
import '../global.css'; 

export default function RootLayout() {
  return (
    <GlobalState>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GlobalState>
  );
}