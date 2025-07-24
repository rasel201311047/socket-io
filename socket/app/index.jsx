import { Image, Text, TouchableOpacity, View } from "react-native";
import im from '../assets/projectimg/img.png'
import { router } from "expo-router";
export default function Index() {
  return (
    <View className="h-screen flex justify-between bg-white">
      <View className="pt-10 mt-20">
        <Image source={im}/>
      </View>
      <View className="flex items-center  mt-10 h-full ">
        <View className="mb-10 pb-10">
          <Text >Here start to comunicate</Text>
          <TouchableOpacity onPress={()=>router.push('/homescreen')} className="bg-blue-500 px-4  mt-2 py-2 rounded-lg">
            <Text className="text-center text-white font-bold">Get Start</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
