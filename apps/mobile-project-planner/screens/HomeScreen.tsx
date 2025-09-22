import { Text, View } from 'react-native';

import { useSession } from '../lib/auth-client';

const HomeScreen: React.FC = () => {
  const { data: session } = useSession();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome, {session?.user?.email || 'User'}!</Text>
    </View>
  );
};

export default HomeScreen;
