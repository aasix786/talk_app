import { View } from 'native-base';
import { Alert, Dimensions, Image, StyleSheet } from 'react-native';
import { mapFontsSize } from '../../themes/fonts/mapFontsSizes';
import { mapFontsWeights } from '../../themes/fonts/mapFontsWeights';
import { mapImages } from '../../themes/mapImages';
import { ExJumbotron } from '../../ui/ExJumbotron';
import { ExText } from '../../ui/ExText';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useRoute } from '@react-navigation/native';



const styles = StyleSheet.create({
    image: {
        width: 300,
        maxWidth: 500,
        height: 50
    },
    google: {
        marginTop: 16,
        width: 192,
        height: 48
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});
const HeaderScreen = ({ title }: any) => {
    const route = useRoute();

	// TODO: implement login by google
    const signInByGoogle = async () => {
        GoogleSignin.configure({
            webClientId: '334920019454-88445uh3e20i7idsvr4m85eflellmenr.apps.googleusercontent.com'
        });
        GoogleSignin.hasPlayServices().then(() => {
            GoogleSignin.signIn()
                .then((userInfo) => {
                    // onLoginGoogle({
                    //   spaceId: "",
                    //   userInfo
                    // });
                })
                .catch((error) => {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        Alert.alert('Play services non disponibile');
                    } else {
                        Alert.alert('Error login by google');
                    }
                });
        }).catch(() => {
            Alert.alert('Play services non disponibile');
        });
    };


    return (
        <ExJumbotron source={mapImages.background} height={Dimensions.get('window').height / 3}>
            <View style={styles.container}>
                <ExText
                    children={'Welcome to'}
                    size={mapFontsSize.f9}
                    color="white"
                    weight={mapFontsWeights.regular}
                />
                <Image
                    source={mapImages.logoWhite}
                    style={styles.image}
                    resizeMode="contain"
                />
                <ExText
                    children={title}
                    size={mapFontsSize.f6}
                    color="white"
                    weight={mapFontsWeights.bold}
                />
                {route.name == 'Login' && (
                    <GoogleSigninButton
                        style={styles.google}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signInByGoogle}
                    />
                )}
            </View>
        </ExJumbotron>
    );
};

export default HeaderScreen;
