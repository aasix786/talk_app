import sdk from './sdk';
import axios from 'axios';
import {config} from '../constants/config';
import {Alert} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import { nanoid } from 'nanoid'
let connectingListener: any;
let disconnectListener: any;
let disconnectByUserListener: any;
let connectedListener: any;
let closeListener: any;
let usersListener: any;
let notifyAllListener: any;
let rolesListener: any;
let notifyLoggedListener: any;
let callbacksUserSave: cbUser;
let subscribeUserUpdate: any;
let streamListener: Promise<any> | false;

interface cbUser {
  onConnected: Function;
  onDisconnected: Function;
  onClose: Function;
  onDisconnectedByUser: Function;
  onUser: Function;
  handleStreamMessageReceived: Function;
}

function connect({
  server,
  logoutOnError = false,
  callbacksUser,
}: {
  server: string;
  logoutOnError: boolean;
  callbacksUser: cbUser;
}): Promise<void> {
  callbacksUserSave = callbacksUser;
  return new Promise<void>(resolve => {
    if (sdk.current?.client?.host === server) {
      return resolve();
    }
    // Check for running requests and abort them before connecting to the server
    disconnect();

    // database.setActiveDB(server);

    // store.dispatch(connectRequest());

    if (connectingListener) {
      connectingListener.then(stopListener);
    }

    if (connectedListener) {
      connectedListener.then(stopListener);
    }

    if (closeListener) {
      closeListener.then(stopListener);
    }

    if (usersListener) {
      usersListener.then(stopListener);
    }

    if (notifyAllListener) {
      notifyAllListener.then(stopListener);
    }

    if (rolesListener) {
      rolesListener.then(stopListener);
    }

    if (notifyLoggedListener) {
      notifyLoggedListener.then(stopListener);
    }

    if (streamListener) {
      streamListener.then(stopListener);
    }

    // unsubscribeRooms();

    sdk.initialize(server);

    const config = {
      reopen: 2000,
    };
    sdk.current
      .connect(config)
      .then(() => {
        console.log('connected');
      })
      .catch((err: unknown) => {
        console.log('connect error', err);
      });

    connectedListener = sdk.onStreamData('connected', (data: any) => {
      console.log('sdk.onStreamDataconnected', data);
      callbacksUser.onConnected(data);
    });
    disconnectListener = sdk.onStreamData('disconnected', (data: any) => {
      callbacksUser.onDisconnected(data);
    });
    closeListener = sdk.onStreamData('close', (data: any) => {
      callbacksUser.onClose(data);
    });
    disconnectByUserListener = sdk.onStreamData(
      'disconnected_by_user',
      (data: any) => {
        callbacksUser.onDisconnectedByUser(data);
      },
    );

    usersListener = sdk.onStreamData('users', (data: any) => {
      callbacksUser.onUser(data);
    });

    //Subscriber user
    streamListener = sdk.onStreamData('stream-notify-user', (data: any) => {
      callbacksUser.handleStreamMessageReceived(data);
    });

    
    

    resolve();
  });
}

function subscribeUser(userId: any) {
  if (!userId) {
    console.log('subscribeUser:::empty');
    return;
  }
  console.log('subscribeUser:::userId', userId);

  sdk.onStreamData('stream-exentriq-user-stream', (data: any) => {
    console.log('stream-exentriq-user-stream::::', data);
  });
 
  //Subscriber user
  const contextRegistered = `asd${Math.random()}asd`;
  console.log(
    'sub:::',
    `${userId}/rocketchat_subscription-subscription-ex/${contextRegistered}/updated`,
  );
  //rooms
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-subscription-ex/${contextRegistered}/inserted`, () => { console.log('inserted:::')}, nanoid());
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-subscription-ex/${contextRegistered}/updated`, () => { console.log('updated:::')}, nanoid());
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-subscription-ex/${contextRegistered}/removed`, () => { console.log('removed:::')}, nanoid());

  //calls
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-meetcalls-ex/${contextRegistered}/inserted`, () => { console.log('inserted:::')}, nanoid());
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-meetcalls-ex/${contextRegistered}/updated`, () => { console.log('updated:::')}, nanoid());
  sdk.subscribe('stream-exentriq-user-stream',`${userId}/rocketchat_subscription-meetcalls-ex/${contextRegistered}/removed`, () => { console.log('removed:::')}, nanoid());

  sdk.current.methodCall('rocketchat_subscription-subscription-ex/sync', contextRegistered, {
    $date: Date.now(),
  });
  sdk.current.methodCall('rocketchat_subscription-meetcalls-ex/sync', contextRegistered, {
    $date: Date.now(),
  });
}

async function reconnect(sessionToken: string) {
  const server = config.stage.URL_DEFAULT_TALK;
  const statusConnection = getStatusConnection();
  if (
    statusConnection.readyState === 3 ||
    typeof statusConnection.readyState === 'undefined'
  ) {
    // Alert.alert('Need Reconnection', 'connection status is closed.');
    await connect({
      server,
      logoutOnError: false,
      callbacksUser: callbacksUserSave,
    });
    await createSession(sessionToken);
  } else {
    // Alert.alert('Connection info', 'connection status is alive.');
  }
}

function getStatusConnection() {
  const ddp = sdk.current?.socket?._j?.ddp;
  return {
    readyState: ddp?.connection?.readyState,
    url: ddp?.connection?.url,
    _socketId: ddp?.connection?._socketId,
    session: ddp?.connection?.session,
    lastPing: ddp?.lastPing,
  };
}

function disconnect() {
  return sdk.disconnect();
}

function stopListener(listener: any): boolean {
  console.log('stopListener::::', listener);
  return listener && listener.stop();
}

/** User credentials generic interface */
export interface ICredentials {
  password: string;
  username: string;
  email?: string;
  ldap?: boolean;
  ldapOptions?: object;
}

async function login(credentials: ICredentials) {
  const {username, password} = credentials;
  const response = await axios.post(`${config.stage.URL_EXENTRIQ_HOST}`, {
    method: config.stage.METHOD_AUTH_GUARDIAN_LOGIN,
    params: [username, password],
  });
  return response.data.result;
}

async function fetchRoomsList(unread = false) {
  const rooms = await sdk.methodCall(
    'getRooms',
    {sort: {lm: -1, tlv: 1, ls: 1, ts: 1}},
    unread,
  );
  return rooms;
}

async function createSession(sessionToken: string) {
  console.log('createSession:::', sessionToken);
  const data = await sdk.methodCall('verifyToken', sessionToken);
  if (!data) {
    console.error('createSession:::verify token not valid');
  }
  const {loginToken, status, _id} = data || {};

  const loginMeteor = await sdk.methodCall('login', {resume: loginToken});

  // console.log('loginMeteor::::', loginMeteor);

  return {...loginMeteor, verifyData: data};
}

/**
 * get user data after session complete
 * @param _id user id
 */
async function getUserData(_id: string) {
  return await sdk.methodCall('getUserData', _id);
}

export {
  connect,
  reconnect,
  disconnect,
  stopListener,
  getStatusConnection,
  login,
  createSession,
  subscribeUser,
  getUserData,
  fetchRoomsList,
};
