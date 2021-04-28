async function logout() {
    const url="http://127.0.0.1:6969/api/logout/true";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log(data);
    window.location.href = 'http://localhost:8080/index.html';
}