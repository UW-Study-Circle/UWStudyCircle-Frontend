export async function getGroupInfo(groupId){ 
    const url="http://127.0.0.1:6969/api/group/id/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
 
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    let info = "";
    Object.keys(data).forEach(function(key) {
        info += key+" : " + data[key] + "<br>"
      });
    //console.log(data.content[groupId].admin)

    var groupAdminId = data.content[groupId].admin;
    return groupAdminId;
}


var pendingIdsSet = new Set();

export async function getMemberIds(groupId){
    const url="http://127.0.0.1:6969/api/member/members/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();

    var userIds = [];
 
    data.forEach(function(member){
        var userId = member["user_id"];
        userIds.push(userId);
        var pending = member["pending"];
        if(pending) pendingIdsSet.add(userId);
    })
    let result = "";
    console.log(userIds)
    for(var i=0;i<userIds.length;i++){
        var userId = userIds[i];
        var userName = await getUserNameById(userId); 
        
        result = result + userName +"<br>";
    }
    return result;
}

async function getUserNameById(userId){
    const url="http://127.0.0.1:6969/id/" + userId;
    const fetchOptions = {
        method: "GET",
        credentials : 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    
   
    
    var userName = data[0].user_id;
    if(pendingIdsSet.has(userId)){
        userName += " (Pending)";    // show (Pending) status if the users need admin approval
    }
  
    return userName;

}

