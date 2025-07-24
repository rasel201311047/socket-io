import { View, Text , TextInput, TouchableOpacity  } from 'react-native'
import React from 'react'

const register = () => {
  return (
        <View className="mb-10 pb-10 px-10 mt-20">

        <TextInput placeholder="Type User Name" className={'border border-blue-500  rounded-lg'} />
         
         <View className='flex-row gap-4 '>
 

          <TouchableOpacity onPress={()=>router.push('/register')} className="mx-auto border border-blue-500  w-36  mt-2 py-2 rounded-lg">
            <Text className="text-blue-500 font-bold text-center">Register</Text>
          </TouchableOpacity>
         </View>
        </View>
  )
}

export default register