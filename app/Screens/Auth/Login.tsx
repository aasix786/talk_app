import {
  Button,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
  View,
} from 'native-base';
import {useState} from 'react';
import {Alert} from 'react-native';
import {config} from '../../lib/constants/config';
import {useAuth} from '../../lib/hooks/useAuth';
import {
  connect,
  createSession,
  getUserData,
  login,
} from '../../lib/services/connect';
import {mapFontsSize} from '../../themes/fonts/mapFontsSizes';
import {mapFontsWeights} from '../../themes/fonts/mapFontsWeights';
import {mapColors} from '../../themes/mapColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ExText} from '../../ui/ExText';
import {useNavigation} from '@react-navigation/native';
import HeaderScreen from './Header';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('fabrizioeforge');
  const [password, setPassword] = useState('asdlolxd123$');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [state, dispatch] = useAuth();
  const nav = useNavigation();

  const callbacksUser = {
    onConnected: (data: object) => {
      console.log('cb:::onConnected', data);
      dispatch({
        type: 'SET_DATA',
        payload: {connected: true},
      });
    },
    onDisconnected: (data: object) => {
      console.log('cb:::onDisconnected', data);
    },
    onClose: (data: object) => {
      console.log('cb:::onClose', data);
      dispatch({
        type: 'SET_DATA',
        payload: {connected: false},
      });
    },
    onDisconnectedByUser: (data: object) => {
      console.log('cb:::onDisconnectedByUser', data);
    },
    onUser: (data: object) => {
      console.log('cb:::onUser', data);
    },
    handleStreamMessageReceived: (data: object) => {
      console.log('cb:::handleStreamMessageReceived', data);
    },
  };

  const onConnect = async () => {
    // console.log('onConnect::');
    const server = config.stage.URL_DEFAULT_TALK;
    connect({server, logoutOnError: false, callbacksUser});
  };

  const onLogin = async () => {
    // username: 'fabrizioeforge',
    // password: 'asdlolxd123$',
    setLoading(true);
    await onConnect();
    const user = await login({
      username,
      password,
    });
    // console.log('user::', JSON.stringify(user, null, 2));
    if (!user) {
      setErrors({
        ...errors,
        name: 'Failed auth, username or password is wrong',
      });
      setLoading(false);
      return false;
    }
    const {sessionToken} = user || {};
    if (sessionToken) {
      const session = await createSession(sessionToken);
      //   console.log(
      //     'onConnect:::createSession:::session::::',
      //     JSON.stringify(session, 1, 2),
      //   );
      const {verifyData} = session;
      if (verifyData._id) {
        const userDataMeteor = await getUserData(verifyData._id);
        // console.log('userDataMeteor::', JSON.stringify(userDataMeteor, null, 2));
        const userData = {
          user,
          session,
          userDataMeteor,
          authenticated: true,
          connected: true,
        };
        dispatch({type: 'SET_DATA', payload: userData});
      }
    }
    setLoading(false);
  };

  return (
    <>
      <HeaderScreen title={'Login with one of your social account'} />
      <ScrollView>
        <FormControl isRequired isInvalid={'name' in errors}>
          <Stack w={'100%'} p={3}>
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Username or email"
              mt={5}
              type="text"
              onChangeText={text => setUsername(text)}
            />
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Password"
              type={show ? 'text' : 'password'}
              mt={5}
              onChangeText={text => setPassword(text)}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <MaterialCommunityIcons
                    name={show ? 'eye' : 'eye-off'}
                    size={24}
                    mr="2"
                    color={show ? mapColors.primary : mapColors.textGrey}
                  />
                </Pressable>
              }
            />
            {'name' in errors && (
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            )}
          </Stack>

          <Pressable
            onPress={() => nav.navigate('ForgotPassword')}
            style={{alignItems: 'flex-end', padding: 8}}>
            <ExText
              children={'Forgot your password?'}
              size={mapFontsSize.f5}
              color={mapColors.primary}
              weight={mapFontsWeights.thin}
            />
          </Pressable>
          <Stack m={4}>
            <Button
              isLoading={loading}
              backgroundColor={mapColors.primary}
              _text={{
                fontSize: mapFontsSize.f5,
              }}
              mb={3}
              onPress={onLogin}>
              Login
            </Button>
            <Button
              backgroundColor={mapColors.primary}
              _text={{
                fontSize: mapFontsSize.f5,
              }}
              onPress={() => nav.navigate('Register')}>
              Sign Up
            </Button>
          </Stack>
        </FormControl>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
