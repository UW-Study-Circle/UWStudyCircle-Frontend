const queryURL = window.location.search;
const urlParams = new URLSearchParams(queryURL);
var groupId=urlParams.get("id");
var val=[]

export async function getGroupInfo(){ 
    const url="http://127.0.0.1:6969/api/group/id/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
 
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log(data);
    var info = "";
    Object.keys(data).forEach(function(key) {
        info += key+" : " + data[key] + "<br>";
        
      
      })
    console.log(info);
    // document.getElementById("text-2").innerHTML = info;
    return {data,info};
}