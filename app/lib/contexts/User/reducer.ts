interface action {
  type: string;
  payload: object;
}
export const reducer = (state: any, action: action) => {
  switch (action.type) {
    case 'SET_DATA':
      // console.log(
      //   'reducer:::change::user::action::SET_DATA',
      //   JSON.stringify(action.payload, 1, 2),
      // );
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const initialState = {
  authenticated: false,
  connected: false,
  session: null,
  user: null,
  userDataMeteor: null,
};
