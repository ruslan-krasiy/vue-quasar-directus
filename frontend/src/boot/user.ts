import { boot } from 'quasar/wrappers';
import { auth } from 'boot/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { inject, reactive } from 'vue';

interface User {
  name: string;
  email: string;
  authenticated: boolean;
  uid: string;
  setUser: (userData: Partial<User>) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
}

const user = reactive<User>({
  name: '',
  email: '',
  authenticated: false,
  uid: '',

  setUser(userData: Partial<User>) {
    this.name = userData.name || '';
    this.email = userData.email || '';
    this.authenticated = userData.authenticated || false;
    this.uid = userData.uid || '';
  },

  clearUser() {
    this.name = '';
    this.email = '';
    this.authenticated = false;
    this.uid = '';
  },

  isAuthenticated() {
    return this.authenticated;
  },
});

export default boot(({ app }) => {
  onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      user.setUser({
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        authenticated: true,
        uid: firebaseUser.uid,
      });
    } else {
      user.clearUser();
    }
  });

  app.provide('user', user);
});

export function useUser() {
  const user = inject<User>('user');
  if (!user) {
    throw new Error('User is not provided');
  }
  return user;
}
