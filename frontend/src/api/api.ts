
async function apiGet<T>(from: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: T):Promise<T> {
  const options = {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    method: method || 'GET'
  }

  if(body){
    Object.assign(options, {body: JSON.stringify(body)})
  }


  try{
    const response = await fetch(`/api/items/${from}`, options);
    if(response.status === 200){
      const {data} = await response.json();
      return data as T;
    }

    throw new RequestError(response, 'Failed to get data');

  }catch(error){
    if (error instanceof EvalError) {
      throw error
    }
    throw new RequestError(null, `${error}`)
  }

}


export class RequestError extends Error {
	response: Response | null

	constructor(response: Response | null, message: string) {
		super(message)
		this.response = response
	}
};

export default apiGet;
