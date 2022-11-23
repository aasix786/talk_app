import {FlashList} from '@shopify/flash-list';
import {Avatar, Badge, Button, Center, Text, View} from 'native-base';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {config} from '../../lib/constants/config';
import {DB} from '../../lib/database';
import withObservables from '@nozbe/with-observables';
import {TABLE_SUBSCRIPTIONS} from '../../lib/database/models/Rooms';

const RoomsComponent = ({subscriptions}: any) => {
  return (
    <View>
      <Text>Rooms Observables</Text>
      <View
        style={{
          height: Dimensions.get('window').height - 200,
          width: Dimensions.get('screen').width,
        }}>
        {subscriptions && (
          <FlashList
            data={subscriptions}
            renderItem={({item}: any) => {
              // console.log('item::', item.unread)
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
        )}
      </View>
    </View>
  );
};

const enhance = withObservables(['subscriptions'], () => {
  const database = new DB().database;
  return {
    subscriptions: database.get(TABLE_SUBSCRIPTIONS).query().observe(),
  };
});
const EnhancedRoomsComponent = enhance(RoomsComponent);

export default EnhancedRoomsComponent;
