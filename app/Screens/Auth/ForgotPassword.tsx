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
import { ExText } from '../../ui/ExText';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from './Header';
import Guardian from '../../modules/exentriq-utils/Guardian';
import { utilityIsValidEmail } from '../../utils/validateForm';
import ModalSuccess from './ModalSuccess';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation()

  const recoveryPassword = async () => {
    setLoading(true);
    const isValidEmail = utilityIsValidEmail(email);
    if (isValidEmail) {
      return Guardian.call('accountService.forgotPassword', [email], null)
        .then((response: any) => {
          setLoading(false);
          setShowModal(true)
          return response;
        })
        .catch((err: any) => {
          console.error('[Servic+e.recoveryPassword', err)
          setLoading(false);
          setErrors({
            ...errors,
            error: 'Recovery password error'
          })
        });
    } else {
      setLoading(false);
      setErrors({
        ...errors,
        error: 'Email not valid'
      })
    }
  };
  return (
    <>
      <ModalSuccess showModal={showModal} title={'Check your email to change your password'} />
      <HeaderScreen title={'Forgot password'} />
      <ScrollView>
        <FormControl isRequired isInvalid={'error' in errors}>
          <Stack w={'100%'} p={3}>
            <Input
              fontSize={mapFontsSize.f5}
              focusOutlineColor={mapColors.primary}
              variant="underlined"
              placeholder="Username or email"
              mt={5}
              type='text'
              onChangeText={text => setEmail(text)} />
            {'error' in errors && <FormControl.ErrorMessage>{errors.error}</FormControl.ErrorMessage>}
          </Stack>
          <Pressable onPress={() => nav.navigate('Login')} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', padding: 8 }}>
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
              onPress={recoveryPassword} >
              Send
            </Button>
          </Stack>
        </FormControl>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordScreen;
