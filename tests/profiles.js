 export async function getGroup() {
    const url="http://127.0.0.1:6969/api/group";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    // console.log(data);
    // console.log(data["Content"].length);
    var root = document.getElementById("grouplist"); 
    
    return data;
  }