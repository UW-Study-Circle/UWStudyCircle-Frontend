



const queryURL = window.location.search;
const urlParams = new URLSearchParams(queryURL);
var groupId=urlParams.get("id");
console.log(groupId)
var pendingIdsSet = new Set();
var groupAdminId;


async function getGroupInfo(){ 
    const url="http://127.0.0.1:6969/api/group/id/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
 
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log(data)
   
    
    
    document.getElementById("groupname").innerHTML = data.groupname;
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("course").innerHTML = data.courseinfo;
    document.getElementById("duration").innerHTML = data.duration;
    document.getElementById("admin").innerHTML = data.admin;
    document.getElementById("status").innerHTML = data.status;
    document.getElementById("level").innerHTML = data.level;
    document.getElementById("capacity").innerHTML = data.capacity;


    document.getElementById("chat").href="http://127.0.0.1:6969/chat?groupid=" + data.id;
   
        
   
 

    // document.getElementById("chat").href = `chat.html?id=${data.id}`; 
    
}




getGroupInfo();
