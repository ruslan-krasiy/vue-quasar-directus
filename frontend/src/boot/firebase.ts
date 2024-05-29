import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseAppConfig = {
  apiKey: 'AIzaSyAuSa0_u_ZBWnwJ65xpXZ8D66oqmZuoF8U',
  authDomain: 'fir-vue-quasar.firebaseapp.com',
  projectId: 'fir-vue-quasar',
  storageBucket: 'fir-vue-quasar.appspot.com',
  messagingSenderId: '638805685781',
  appId: '1:638805685781:web:10a0e5b6041a170d2fc01c'
};

const app = initializeApp(firebaseAppConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage }
