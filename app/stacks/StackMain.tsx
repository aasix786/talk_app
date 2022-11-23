import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/Auth/Login';
import RegisterScreen from '../Screens/Auth/Register';
import ForgotPasswordScreen from '../Screens/Auth/ForgotPassword';
import { useAuth } from '../lib/hooks/useAuth';
import StackTabHome from './StackTabHome';
import ProfileScreen from '../Screens/Profile';
import SettingsScreen from '../Screens/Settings';
import WatermelonDB from '../Screens/Prototypes/WatermelonDB';

const Stack = createNativeStackNavigator();

export default function StackMain() {
  const [state, dispatch] = useAuth();
  // useEffect(() => {
  //   console.log('change state auth:::', state)
  // }, [state]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {state?.authenticated ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={StackTabHome}
            />
            <Stack.Screen
              options={{ title: 'Profile' }}
              name="Profile"
              component={ProfileScreen}
            />
            <Stack.Screen
              options={{ title: 'Settings' }}
              name="Settings"
              component={SettingsScreen}
            />
            <Stack.Screen
              name="PrototypeWatermelonDB"
              component={WatermelonDB}
              options={{title: 'PrototypeWatermelonDB'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
