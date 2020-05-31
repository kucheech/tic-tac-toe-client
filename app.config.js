import 'dotenv/config';

export default ({ config }) => {
  return Object.assign(config,
    {
      name: 'Tic Tac Toe',
      version: '0.0.1',
      extra: {
        pubnubKeys: {
          publishKey: process.env.EXPO_PUBLISHKEY,
          subscribeKey: process.env.EXPO_SUBSCRIBEKEY
        },
        aws_api: {
          url: process.env.EXPO_API_URL,
          key: process.env.EXPO_X_API_KEY
        }
      },
    });
};
