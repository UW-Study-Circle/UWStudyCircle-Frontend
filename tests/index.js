export async function getUser() {
    const url="http://127.0.0.1:6969/";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    //console.log(data);
    return data;
}
export async function renderPage() {
    var result;
    const profile = await getUser();
    // console.log(profile)
    if (profile["Error"]){
        // User unauthenticated
        console.log(profile);
        result=profile;
    }
    else{
        window.location.href = 'dashboard.html';
        result='dashboard';
    }

    return result
}