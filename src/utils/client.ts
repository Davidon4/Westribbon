const stringify = (obj: any): string => {
    let cache: any[] = [];
    let str = JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    });
    cache = null;
    return str;
  }
  
  interface GraphqlResponse {
    data: any;
    error: string | null;
    processing: boolean;
  }
  
  export async function graphqlNoAuthRequest(graphql_string: string, variablesObject?: any): Promise<GraphqlResponse> {
    let headers = {
      "Content-Type": "application/json"
    };
  
    let requestBody = { 
      query: graphql_string
    }; 
  
    const postData = variablesObject || {};
    if (Object.keys(postData).length !== 0) {
      requestBody = { 
        query: graphql_string,
        variables: postData // corrected from 'variable' to 'variables'
      };
    }
  
    const reqBody = stringify(requestBody);  
    const response = await fetch("https://graphql.westribbon.com.ng/" as string, {  
      method: "POST",
      headers,
      body: reqBody,
    });
  
    let payload: GraphqlResponse = {
      data: null,
      error: null,
      processing: true
    };
  
    const responseObj = await response.json();  
    if (responseObj.errors) {
      console.log(responseObj.errors[0].message);
      payload.error = responseObj.errors[0].message;
      payload.processing = false;
    }
  
    if (!responseObj.errors) {
      payload.data = responseObj.data;
      payload.processing = false;
    }
  
    return payload;
  }
  
  
  export async function graphqlAuthRequest(request: Request, graphql_string: string, variablesObject?: any): Promise<GraphqlResponse> {
    const authorization = request.headers?.authorization;
    if (!authorization) {
      throw new Error('Not authorized due to absence of valid token!');
    } 
  
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authorization
    };
  
    let requestBody = { 
      query: graphql_string
    }; 
  
    const postData = variablesObject || {};
    if (Object.keys(postData).length !== 0) {
      requestBody = { 
        query: graphql_string,
        variables: postData
      };
    }
  
    const response = await fetch("https://graphql.westribbon.com.ng/" as string, {
      method: "POST",
      headers,
      body: stringify(requestBody),
    });
  
    let payload: GraphqlResponse = {
      data: null,
      error: null,
      processing: true
    };
  
    const responseObj = await response.json();  
    if (responseObj.errors) {
      console.log(responseObj.errors[0].message);
      payload.error = responseObj.errors[0].message;
      payload.processing = false;
    }
  
    if (!responseObj.errors) {
      payload.data = responseObj.data;
      payload.processing = false;
    }
  
    return payload;
  }
  
  export async function graphqlTokenAuthRequest(token: string, graphql_string: string, variablesObject?: any): Promise<GraphqlResponse> {
    if (!token) {
      throw new Error("Request not authorized due to absence of valid token!");
    } 
  
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    };
  
    let requestBody = { 
      query: graphql_string
    }; 
  
    const postData = variablesObject || {};
    if (Object.keys(postData).length !== 0) {
      requestBody = { 
        query: graphql_string,
        variables: postData
      };
    }
  
    const response = await fetch("https://graphql.westribbon.com.ng/" as string, {
      method: "POST",
      headers,
      body: stringify(requestBody),
    });
  
    let payload: GraphqlResponse = {
      data: null,
      error: null,
      processing: true
    };
  
    const responseObj = await response.json();  
    if (responseObj.errors) {
      console.log(responseObj.errors[0].message);
      payload.error = responseObj.errors[0].message;
      payload.processing = false;
    }
  
    if (!responseObj.errors) {
      payload.data = responseObj.data;
      payload.processing = false;
    }
  
    return payload;
  }  