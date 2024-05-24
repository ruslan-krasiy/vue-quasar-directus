import { FirebaseError } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

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
      const response = await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
      if(response){
        const user = await getAuth().currentUser;
        console.log({user})
        if(user){
          await updateProfile(user, {
            displayName: fullname.value
          });

          router.push('/')
        }
      }
      console.log(response);
    }catch(err){
      const _error = err  as FirebaseError
      console.log(_error.code)
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
