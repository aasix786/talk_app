import {Avatar, Badge, Button, Center, Text, View} from 'native-base';
import {useEffect} from 'react';
import {useAuth} from '../../lib/hooks/useAuth';
import {disconnect, reconnect, subscribeUser} from '../../lib/services/connect';
import * as Progress from 'react-native-progress';
import {useRooms} from '../../lib/hooks/userRooms';
import {FlashList} from '@shopify/flash-list';
import {Alert, Dimensions} from 'react-native';
import {config} from '../../lib/constants/config';

const RoomsScreen = ({navigation}:any) => {
  //@ts-ignore
  const [state, dispatch] = useAuth();
  const {data, fetch} = useRooms();

  
  useEffect(() => {
   
  }, []);

  useEffect(() => {
    // console.log('data::::', data);
  }, [data]);

  useEffect(() => {
    // console.log('data::::state', state);
  }, [state]);

  // console.log('RoomsScreen:::state::auth::', state);
  return (
    <View>
      {!state.connected && (
        <Center style={{margin: 8}}>
          <Text>Connection...</Text>
          <Progress.Bar
            color={'green'}
            useNativeDriver={true}
            animationType={'timing'}
            indeterminate
            width={200}
          />
        </Center>
      )}
       <Button
        title="Go to PrototypeWatermelonDB"
        onPress={() => navigation.navigate('PrototypeWatermelonDB')}>
        Go to PrototypeWatermelonDB
      </Button>

      <Button style={{margin: 8}} title="Fetch data" onPress={() => fetch()}>
        Fetch data
      </Button>

      <Button
        style={{margin: 8}}
        title="Sub rooms ex"
        onPress={() =>  {
          Alert.alert('Info', 'this action is in working');
          // subscribeUser(state.userDataMeteor?.userId)
        }}>
        Sub rooms ex
      </Button>
      <Button
        style={{margin: 8}}
        title="Close connection"
        onPress={() => disconnect()}>
        Close connection
      </Button>
      <Button
        style={{margin: 8}}
        title="Reconnect connection"
        onPress={() => reconnect(state.user?.sessionToken)}>
        Reconnect connection
      </Button>
      <View
        style={{
          height: Dimensions.get('window').height - 200,
          width: Dimensions.get('screen').width,
        }}>
        <FlashList
          data={data}
          renderItem={({item}: any) => {
            const srcAvatar = `${config.stage.EXENTRIQ_AVATAR_URL}${item.username}`;
            return (
              <View
                style={{
                  padding: 16,
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                }}>
                <Center>
                  <Avatar
                    bg="lightBlue.400"
                    source={{
                      uri: srcAvatar,
                    }}
                    size="md">
                    NB
                    <Avatar.Badge bg="green.500" />
                  </Avatar>
                  <Text>{item.name}</Text>
                  <Text>{item.lastMessage?.msg}</Text>
                  <Badge colorScheme="green" style={{borderRadius: 100}}>
                    <Text>{item.unread}</Text>
                  </Badge>
                </Center>
              </View>
            );
          }}
          estimatedItemSize={200}
        />
      </View>
      {/* <Button
        title="Go to PrototypesConnections"
        onPress={() => navigation.navigate('PrototypesConnections')}>
        Go to PrototypesConnections
      </Button> */}

      
    </View>
  );
};

export default RoomsScreen;
