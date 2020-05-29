import 'dotenv/config';

export default {
  name: 'Tic Tac Toe',
  version: '0.0.1',
  extra: {
    publishKey: process.env.EXPO_PUBLISHKEY,
    subscribeKey: process.env.EXPO_SUBSCRIBEKEY,
    url: process.env.EXPO_API_BASE_URL
  },
};
