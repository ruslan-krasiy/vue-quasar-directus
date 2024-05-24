import { FirebaseError } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';


interface UseSignInType {
  email: Ref
  password: Ref
  error: Ref
  submit(): void
}
const useSignIn = ():UseSignInType => {
  const router = useRouter();
  const email = ref<string>('');
  const password = ref<string>('');

  const error = ref<string | null>(null);

  const submit = async () => {
    console.log('Submit Login:');


    error.value = null;

    try{
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email.value, password.value);
      if(response){
        console.log('Logged in');
        router.push('/');
      }
      console.log(response);
    }catch(err){
      const _error = err  as FirebaseError
      console.log(_error.code)
      error.value = 'Your email address or password are incorrect'
      // if(_error.code === 'auth/invalid-email')
      //   error.value = 'Your email address or password are incorrect'
      // if(_error.code === 'auth/user-not-found')
      //   error.value = 'Password should be at least 6 characters'
      // if(_error.code === 'auth/wrong-password')
      //   error.value = 'Your email address or password are incorrect'
      // if(_error.code === 'auth/user-disabled')
      //   error.value = 'Password should be at least 6 characters'
    }
  };

  return {
    email,
    password,
    submit,
    error
  }
}

export default useSignIn;
