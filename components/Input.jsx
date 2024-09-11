import { View, Text, TextInput } from "react-native";

const Input = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className={`my-2 ${otherStyles}`}>
      <Text className="text-base font-medium text-textcolor">{title}</Text>

      <View className="flex w-full items-center justify-center px-4 py-2 ">
        <TextInput
          className="text-textcolor border-b border-grey w-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;
