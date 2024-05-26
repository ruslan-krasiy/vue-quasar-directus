import getData, { RequestError } from 'src/api/api';
import { Publication } from 'src/interfaces/publication.interface';
import { reactive } from 'vue';

interface UseAllPublicationsType {
  loading: boolean
  data: Publication[] | null
  error: string | null
}

const useAllPublications = ():{state: UseAllPublicationsType, fetchData: () => Promise<void>} => {

  const state = reactive<UseAllPublicationsType>({
    loading: true,
    data: null,
    error: null
  })

  const fetchData = async () => {
    state.loading = true;
    try {
      const data = await getData<Publication[]>('publications');
      state.data = data;
    } catch (err) {
      const error = err as RequestError;
      state.error = error.message;
    } finally {
      state.loading = false;
    }
  };

  return {
    state,
    fetchData
  }
}

export default useAllPublications;
