import {
  Button,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from 'native-base';
import { useState } from 'react';
import { mapFontsSize } from '../../themes/fonts/mapFontsSizes';
import { mapFontsWeights } from '../../themes/fonts/mapFontsWeights';
import { mapColors } from '../../themes/mapColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ExText } from '../../ui/ExText';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from './Header';
import Guardian from '../../modules/exentriq-utils/Guardian';
import { isValidateConfirmPassword, isValidatePassword, utilityIsValidEmail } from '../../utils/validateForm';
import ModalSuccess from './ModalSuccess';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [firstShow, setFirstShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigation()

  const signup = async (): Promise<any> => {
    setLoading(true);
    const isValidEmail = utilityIsValidEmail(email);
    const isValidPassword = isValidatePassword(password);
    const isValidConfirmPassword = isValidateConfirmPassword(password, firstPassword);

    if (!isValidEmail) {
      setErrors({
        ...errors,
        error: 'Email not valid'
      })
      setLoading(false);
      return false;
    }
    if (!isValidConfirmPassword) {
      setErrors({
        ...errors,
        error: 'Passwords do not match'
      })
      setLoading(false);
      return false;
    }
    if (!isValidPassword) {
      setErrors({
        ...errors,
        error: '- Password must contain at least one number, one letter and a special character (!, @, #, $, %, ^, &, *, (, ), _, + )\n - Password must be at least 8 characters in length'
      })
      setLoading(false);
      return false;
    }

    const params = [
      name,
      password,
      name,
      '',
      'M',
      '01-01-1900',
      '',
      '',
      email,
      '',
      '',
      '',
      'free',
      '',
      '',
    ];

    return Guardian.call(
      'accountService.create',
      params,
      null,
    )
      .then((response: any) => {
        const { error } = response || {};
        if (error) {
          setLoading(false);
          setErrors({
            ...errors,
            error: 'Signup error'
          })
          return error;
        }
        setLoading(false);
        setShowModal(true)
        return response;
      })
      .catch((err: any) => {
        console.error('[Service].signup.error', err);
        setErrors({
          ...errors,
          error: 'Signup error'
        })
        setLoading(false);
        return null;
      });
  };

  return (
    <>
      <ModalSuccess showModal={showModal} title={'Account created, check your email to activate it'} />
      <HeaderScreen title={'Create a new account'} />
      <ScrollView>
        <FormControl isRequired isInvalid={'error' in errors}>
          <Stack w={'100%'} p={3}>
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Your email"
              mt={5}
              onChangeText={text => setEmail(text)} />
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Create Username"
              mt={5}
              type='text'
              onChangeText={text => setName(text)} />
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Confirm Password"
              type={firstShow ? "text" : "password"}
              mt={5}
              onChangeText={text => setFirstPassword(text)}
              InputRightElement={
                <Pressable onPress={() => setFirstShow(!firstShow)}>
                  <MaterialCommunityIcons name={firstShow ? "eye" : "eye-off"} size={24} mr="2" color={firstShow ? mapColors.primary : mapColors.textGrey} />
                </Pressable>
              }
            />
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              mt={5}
              onChangeText={text => setPassword(text)}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <MaterialCommunityIcons name={show ? "eye" : "eye-off"} size={24} mr="2" color={show ? mapColors.primary : mapColors.textGrey} />
                </Pressable>
              }
            />
            {'error' in errors && <FormControl.ErrorMessage>{errors.error}</FormControl.ErrorMessage>}
          </Stack>

          <Pressable onPress={() => nav.navigate('Login')} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', padding: 8, flexDirection: 'row' }}>
            <ExText
              children={'Already have a profile?'}
              size={mapFontsSize.f5}
              color={mapColors.textGrey}
              weight={mapFontsWeights.thin}
            />
            <ExText
              children={'Login here'}
              size={mapFontsSize.f5}
              color={mapColors.primary}
              weight={mapFontsWeights.thin}
              style={{ paddingLeft: 4 }}
            />
          </Pressable>
          <Stack m={4}>
            <Button
              isLoading={loading}
              backgroundColor={mapColors.primary}
              _text={{
                fontSize: mapFontsSize.f5
              }}
              onPress={signup} >
              Sign Up
            </Button>
          </Stack>
        </FormControl>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;
