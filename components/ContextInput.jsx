import { View, Text, TextInput, StyleSheet } from "react-native";

const ContextInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  maxLength = 300,
  multiline = true,
  ...props
}) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>

      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="grey"
        onChangeText={handleChangeText}
        maxLength={maxLength}
        multiline={multiline}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333333",
    backgroundColor: "#f9f9f9",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default ContextInput;
