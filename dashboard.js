async function getUser() {
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
async function renderPage() {
    const profile = await getUser();
    // console.log(profile)
    if (profile["Error"]){
        window.location.href = 'login.html';
    }
    document.getElementById("username").innerHTML = "Username: " + profile["username"];
    document.getElementById("firstname").innerHTML = "First Name: "+ profile["firstname"];
    document.getElementById("lastname").innerHTML = "Last Name: "+ profile["lastname"];
    document.getElementById("gender").innerHTML = "Gender: "+ profile["gender"];
    document.getElementById("bday").innerHTML = "Birthday "+ profile["bday"];
    document.getElementById("email").innerHTML = "Email: "+ profile["email"];
    document.getElementById("phonenumber").innerHTML = "Phone: "+ profile["phonenumber"];



}
renderPage();