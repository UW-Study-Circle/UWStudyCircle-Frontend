export async function getUser() {
    const url="http://127.0.0.1:6969/";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    // console.log(data);
    return data;
}

