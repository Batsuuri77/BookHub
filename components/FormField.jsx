import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`mb-3 ${otherStyles}`}>
      <Text className="text-base text-textcolor font-imedium">{title}</Text>

      <View className="px-4 mt-1 w-full h-[56px]  bg-[#f8f8f8] rounded-xl border border-grey focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-textcolor font-isemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
