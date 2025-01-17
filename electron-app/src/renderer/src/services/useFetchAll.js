export const useFetchAuthAll=async( url, token, method, body=null, headers=null )=>{

    if (!url || !token) {
      throw new Error("URL and token are required");
    }
    let sheader={
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
    if(headers!=null){
      sheader=headers
    }
    let sbody=null
    if(body!=null){
      sbody=body
    }
    try {
      const response = await fetch(url, {
        method:method,
        mode: "cors",
        headers: sheader,
        body: sbody ? JSON.stringify(sbody) : null,
      }); 
      console.log(JSON.stringify(response))
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); 
      console.log(data)
      return data;
    } catch (error) {
      throw error;  
    }
  }