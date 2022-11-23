import {
    Button,
} from 'native-base';
import { mapFontsSize } from '../../themes/fonts/mapFontsSizes';
import { mapFontsWeights } from '../../themes/fonts/mapFontsWeights';
import { mapColors } from '../../themes/mapColors';
import { ExText } from '../../ui/ExText';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        margin: 8,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    imageLogo: {
        width: '100%',
        maxWidth: 75,
        height: '15%'
    }
})

const ModalSuccess = ({ showModal, title }: any) => {
    const nav = useNavigation()
    const srcImage = require('../../assets/images/talk-icon.png');

    return (
        <Modal
            animationType="slide"
            presentationStyle='overFullScreen'
            visible={showModal}>
            <View style={styles.modalContainer}>
                <Image
                    source={srcImage}
                    resizeMode="contain"
                    style={styles.imageLogo} />
                <View style={{ marginBottom: 16 }}>
                    <ExText
                        size={mapFontsSize.f9}
                        weight={mapFontsWeights.bold}
                        numberOfLines={3}
                        textAlign="center">
                        {title}
                    </ExText>
                </View>
                <Button
                    backgroundColor={mapColors.primary}
                    _text={{
                        fontSize: mapFontsSize.f5
                    }}
                    onPress={() => nav.navigate('Login')} >
                    Back to login
                </Button>
            </View>

        </Modal>
    );
};

export default ModalSuccess;
