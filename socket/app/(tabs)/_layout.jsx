import { Tabs } from 'expo-router';

export default function Tablayout() {
  return (
    <Tabs>
      <Tabs.Screen name="homescreen" options={{ title: 'Home', headerShown: true }} />
      <Tabs.Screen name="chatscreen" options={{ title: 'Chat', headerShown: true }} />
    </Tabs>
  );
}