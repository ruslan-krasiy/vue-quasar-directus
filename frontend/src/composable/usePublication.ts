import { Ref, computed, onMounted, ref, shallowRef, watch } from 'vue';
import {useUser} from 'boot/user';
import apiGet from 'src/api/api';

import { storage } from 'boot/firebase';
import { ref as firebaseRef, getDownloadURL } from 'firebase/storage';

import { Notify } from 'quasar';
import { Publication } from 'src/interfaces/publication.interface';

interface UsePublicationLikesType {
  publication: Ref<Publication>
  likeshandler(): void
  imgUrl: Ref<string>
  isActiveBtn: Ref<boolean>

}

const usePublication = (data: Publication):UsePublicationLikesType => {
  const user = useUser();
  const imgUrl = ref<string>('');


  const isActiveBtn = computed({
    get: () => data.likes && data.likes.includes(user.uid) ? false : true,
    set: (val: boolean) => val
  });

  const publication = shallowRef(data);

  const likeshandler = async () => {
    const likes = data.likes || [];
    likes.push(user.uid)

    publication.value = {
      ...data,
      likes
    };
  };

  watch(()=>publication.value, async () => {
    try{
      await apiGet<Publication>(
          `publications/${data.id}`,
          'PATCH',
          publication.value);

      Notify.create({
        type: 'positive',
        message: 'You like has been sent'
      });

      isActiveBtn.value = false;
      // console.log('WATCH  2: ', isActiveBtn.value);
    }catch(err){
      Notify.create({
        type: 'negative',
        message: 'Sorry! Something went wrong'
      })
    }
  });

  onMounted(async ()=>{
    try{
      if(publication.value.image){
        imgUrl.value = await getDownloadURL(firebaseRef(storage, '/publications/' + publication.value.image));
      }
    }catch(e){
      imgUrl.value =  'no-image.png'
    }
  });

  return {
    publication,
    likeshandler,
    isActiveBtn,
    imgUrl
  }
}

export default usePublication
