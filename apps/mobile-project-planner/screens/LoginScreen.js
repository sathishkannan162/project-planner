import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import React from 'react';
import { useLogin } from '../lib/useLogin';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } = useLogin();
  const navigation = useNavigation();

  const onSubmit = async () => {
    const result = await handleSubmit();
    if (result?.success) {
      navigation.navigate('Home');
    } else if (result?.error) {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});