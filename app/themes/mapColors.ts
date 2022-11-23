/** @format */

export interface TColorsValues {
  error: string;
  info: string;
  success: string;
  primary: string;
  progressBar: string;
  text: string;
  textGrey: string;
  textLightGrey: string;
  messageReceived: string;
  messageSent: string;
  backgroundNotifications: string;
  backgroundChat: string;
  iconBackground: string;
  backgroundSectionSearch: string;
  backgroundTyping: string;
  backgroundCancelText: string;
  backgroundMeetInProgress: string;
  typing: string;
  avatarBackground: string;
  iconDark: string;
  iconHeader: string;
  buttonLogout: string;
  buttonSuccess: string;
  buttonDanger: string;
  buttonWarning: string;
  buttonInfo: string;
  buttonDisabled: string;
  statusOnline: string;
  statusAway: string;
  statusBusy: string;
  statusInvisible: string;
  attachImage: string;
  attachVideo: string;
  attachOther: string;
  attachPosition: string;
  attachAudio: string;
  attachTask: string;
  lightKeyboardChatBackground: string;
  link: string;
  readMore: string;
  badge: string;
  divider: string;
  borderBottom: string;
  backgroundLabel: string;
  loaderBackground: string;
  loaderWheel: string;
  dataLoader: string;
  tabNotSelected: string;
  tabIcon: string;
  audioRecord: string;
  notification: string;
  linearGradient: TLinearGradient;
  googleDefault: string;
  placeholder: string;
  edo: string;
  switcherColor: string;
  backgroundDataSeparator: string;
  textDataSeparator: string;
  lightGray: string;
  iosLink: string;
  sectionTitle: string;
}

interface TLinearGradiendCoord {
  x: number;
  y: number;
}

export interface TLinearGradient {
  colors: Array<string>;
  start: TLinearGradiendCoord;
  end: TLinearGradiendCoord;
  locations: Array<number>;
  useAngle: boolean;
  angle: number;
  angleCenter: TLinearGradiendCoord;
  disabledColors: Array<string>;
}

export type TColor = keyof TColorsValues;

export const mapColors: TColorsValues = {
  error: '#f3565d',
  info: '#47929f',
  success: '#4caf50',
  primary: '#1bbc9b',
  progressBar: '#FA7410',
  text: '#232323',
  textGrey: '#7a7a7a',
  textLightGrey: '#9b9ca4',
  messageReceived: '#fff',
  messageSent: '#b1e1d7',
  backgroundChat: '#f5f5f5',
  borderBottom: '#f5f5f5',
  backgroundLabel: '#f5f5f5',
  iconBackground: '#0000000d',
  backgroundNotifications: '#E8F8F5',
  backgroundSectionSearch: '#f5f5f5',
  backgroundTyping: '#eee',
  backgroundCancelText: '#e0e0e0',
  backgroundMeetInProgress: '#1bbc9b',
  typing: '#9b9ca4',
  avatarBackground: '#C5C5C5',
  iconDark: '#4a4a4a',
  iconHeader: '#fff',
  buttonLogout: '#f3565d',
  buttonSuccess: '#4caf50',
  buttonDanger: '#f3565d',
  buttonWarning: '#ffc107',
  buttonInfo: '#47929f',
  buttonDisabled: '#dad9d9',
  statusOnline: '#4caf50',
  statusAway: '#ffc107',
  statusBusy: '#f3565d',
  statusInvisible: '#9e9e9e',
  attachImage: '#f44336',
  attachVideo: '#ff9800',
  attachOther: '#4caf50',
  attachPosition: '#03a9f4',
  attachAudio: '#009688',
  attachTask: '#673ab7',
  lightKeyboardChatBackground: '#eee',
  link: '#1bbc9b',
  badge: '#f3565d',
  divider: '#eee',
  loaderBackground: '#f5f5f5',
  loaderWheel: '#1bbc9b',
  dataLoader: '#1bbc9b',
  tabNotSelected: 'rgba(0,0,0,0.65)',
  tabIcon: '#1bbc9b',
  audioRecord: 'red',
  notification: '#F3565D',
  linearGradient: {
    colors: ['#1bbc9b', '#1bbc9b'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
    locations: [0.0, 1.0],
    useAngle: true,
    angle: 45,
    angleCenter: { x: 0.5, y: 0.5 },
    disabledColors: [],
  },
  readMore: '#1bbc9b',
  googleDefault: '#1faadb',
  placeholder: '#9e9e9e',
  edo: '#4496BD',
  backgroundDataSeparator: '#efefef',
  textDataSeparator: '#7f7f7f',
  switcherColor: '#1bbc9b',
  lightGray: '#e1e1e1',
  iosLink: '#007Aff',
  sectionTitle: '#54575a',
};
