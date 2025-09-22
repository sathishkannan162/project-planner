import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLogin } from '../lib/useLogin';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLogin();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onSubmit = async () => {
    const result = await handleSubmit();
    if (result?.success) {
      navigation.navigate('Home');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-4 py-12">
      <View className="w-full max-w-md space-y-8">
        <View>
          <Text className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
            Sign in to your account
          </Text>
        </View>
        <View className="mt-8 space-y-6">
          <View className="-space-y-px rounded-md shadow-sm">
            <View>
              <TextInput
                className='relative mb-4 block w-full rounded-t-md border-0 px-3 py-3 text-gray-900 text-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset'
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email address"
              />
            </View>
            <View>
              <TextInput
                className='relative mb-4 block w-full rounded-t-md border-0 px-3 py-3 text-gray-900 text-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset'
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password"
              />
            </View>
          </View>

          {error && (
            <Text className="text-center text-red-600 text-sm">{error}</Text>
          )}

          <View>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:bg-indigo-700 disabled:opacity-50"
              accessibilityRole="button"
              accessibilityState={{ disabled: loading }}
            >
              <Text className="font-semibold text-white">
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="text-center">
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-indigo-600">
                Don't have an account?{' '}
                <Text className="font-medium">Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
