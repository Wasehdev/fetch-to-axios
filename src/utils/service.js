
 export const getService = async (url, params = {}) => {
    try {
    const _params =  new URLSearchParams(params);
    const _paramsString = _params.toString();
    const queryParams = _paramsString ? `?${_paramsString}` : '';
    const completeUrl = url + queryParams
    let response = await fetch(completeUrl);
    return {
        success: response.ok, 
        data : response.ok ? await response.json() : `Request failed with status code ${response.status}`,
        status : response.status, 
        statusText : response.statusText, 
        headers : getHeaders(response.headers),
        request : { url : completeUrl , params  }
    }
    } catch (error) {
    return error
    }
};

export const postService = async (url , payload) => {
  return await service(url, payload, 'POST')
};

export const putService = async (url , payload) => {
 return await service(url, payload, 'PUT')
};

export const deleteService = async (url ) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    let response = await fetch(url, options)
    return {
      success: response.ok, 
      data : response.ok ? await response.json() : `Request failed with status code ${response.status}`,
      status : response.status, 
      statusText : response.statusText, 
      headers : getHeaders(response.headers),
      request : { url  }
    }
  } catch (error) {
    console.log('error')
    return error
  }
};

const getHeaders = (headers) => {
  let headerObj = {};
  const keys = headers.keys();
  let header = keys.next();
  while (header.value) {
      headerObj[header.value] = headers.get(header.value);
      header = keys.next();
    }
  return headerObj;
};

const service = async(url, payload, method) => {
  try {  
    const _formData =   payload instanceof FormData 
    const body = _formData ? payload : JSON.stringify(payload)
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body 
  }
  if(_formData) {
    delete options.headers['Content-Type']
  }
  let response = await fetch(url, options)
  return {
    success: response.ok, 
    data : response.ok ? await response.json() : `Request failed with status code ${response.status}`,
    status : response.status, 
    statusText : response.statusText, 
    headers : getHeaders(response.headers),
    request : { url , payload }
  }
} catch (error) {
  return error
}
}

