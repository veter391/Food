//### SERVER CONFIG
const server = {
    get: 'http://localhost:3000/menu',
    post:'http://localhost:3000/requests',
    url: 'http://localhost:3000'
  };

// Async/Await ES(8)
// active asincrone code
const postData = async (url, data) => {
    // add await for wait for responce from server
    const res = await fetch(url, {
        method: "POST",
        // header for send json
        headers: {
        'Content-type': 'application/json'
        },
        // object to JSON
        body: data
    });

// add await for wait for responce from server and return result
    return await res.json();
};



// check formData() function for knowing how works 
const getData = async url => {
    const res = await fetch(url);

    if (!res.ok) {
        // throw return the error
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

export {server, postData, getData};