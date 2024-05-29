import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth} from 'boot/firebase';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Notify } from 'quasar'
interface UseSignInType {
  email: Ref
  password: Ref
  submit(): void
}
const useSignIn = ():UseSignInType => {
  const router = useRouter();
  const email = ref<string>('');
  const password = ref<string>('');

  const error = ref<string | null>(null);

  const submit = async () => {
    error.value = null;

    try{
      const response = await signInWithEmailAndPassword(auth, email.value, password.value);
      if(response){
        Notify.create({
          message: 'Sign-in confirmed',
          type: 'positive'
        })
        router.push('/');
      }
    }catch(err){
      Notify.create({
        message: 'Your email with your password is wrong',
        type: 'negative'
      });
    }
  };

  return {
    email,
    password,
    submit,
  }
}

export default useSignIn;
