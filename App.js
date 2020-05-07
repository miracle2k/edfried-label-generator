import React from 'react';
import { App } from './src';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://898b2c40cf4442b9abc6e959241e49e3@sentry2.s.dpool.org/29', 
});


export default App;