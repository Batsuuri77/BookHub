import { StyleSheet } from 'react-native';

const bookHubStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  uploadImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
  formContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top', // Ensure text starts at the top of the TextInput
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default bookHubStyles;
