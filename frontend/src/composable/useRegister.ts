import { FirebaseError } from 'firebase/app';
import {auth} from 'boot/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
interface UseRegiserType {
  email: Ref
  fullname: Ref
  password: Ref
  repeatPassword: Ref
  error: Ref
  submit(): void
  validateEmail(a: string): boolean
}
const useRegister = ():UseRegiserType => {
  const router = useRouter();
  const email = ref<string>('');
  const fullname = ref<string>('');
  const password = ref<string>('');
  const repeatPassword = ref<string>('');

  const error = ref<string | null>(null);

  const validateEmail = (email: string): boolean => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
  }


  const submit = async () => {
    error.value = null;

    try{
      const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
      if(response){
        const user = auth.currentUser;
        if(user){
          await updateProfile(user, {
            displayName: fullname.value
          });

          Notify.create({
            message: 'Your account has been created',
            type: 'positive'
          });
          router.push('/')
        }
      }
    }catch(err){
      const _error = err  as FirebaseError
      if(_error.code === 'auth/weak-password')
        error.value = 'Password should be at least 6 characters'
    }
  };



  return {
    email,
    fullname,
    password,
    repeatPassword,
    submit,
    validateEmail,
    error
  }
}

export default useRegister;
