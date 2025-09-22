import { Alert, Button, Text, TextInput, View } from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLogin } from '../lib/useLogin';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } = useLogin();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onSubmit = async () => {
    const result = await handleSubmit();
    if (result?.success) {
      navigation.navigate('Home');
    } else if (result?.error) {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl text-center mb-5">Login</Text>
      {error ? <Text className="text-red-500 text-center mb-2.5">{error}</Text> : null}
      <TextInput
        className="border border-gray-300 p-2.5 mb-2.5 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 p-2.5 mb-2.5 rounded"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={onSubmit} disabled={loading} />
    </View>
  );
};


export default LoginScreen;