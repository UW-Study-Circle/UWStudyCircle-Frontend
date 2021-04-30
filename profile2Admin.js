async function getUser() {
    const url = "http://127.0.0.1:6969/";

    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log("hello")
    return data;
}


async function groupRequest() {
    const url = "http://127.0.0.1:6969/api/member/members/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };

    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    return data;
}
groupRequest();

async function getAdmin() {
    const url = "http://127.0.0.1:6969/api/group/id/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };

    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    return data["admin"]
}
// get group members (1st: get group user_id, 2nd: get member's name through user_id)
async function getMemberIds(){
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
    for(var i=0;i<userIds.length;i++){
        var userId = userIds[i];
        var userName = await getUserNameById(userId); 
        result = result + userName +"<br>";
    }
    document.getElementById("text-1").innerHTML = result;
}

// user join group (add the user to the group member list)
async function joinPublicGroup(){
    const url="http://127.0.0.1:6969/api/member/join/" + groupId;
    const fetchOptions = {
        method: "PUT",
        credentials: 'include',
    };
  
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    var error =  data["Error"];
    if(error != null){
      alert(error);     // show message if the user already joined the group 
    }else{
        var success = data["Success"]; 
        alert(success);   // show message that need admin approval if the user join a private group
    }
}



async function getUserNameById(userId){
    const url="http://127.0.0.1:6969/id/" + userId;
    const fetchOptions = {
        method: "GET",
        credentials : 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    var userName = data["firstname"]+" "+data["lastname"]; 
    if(pendingIdsSet.has(userId)){
        userName += " (Pending)";    // show (Pending) status if the users need admin approval
    }
    if(userId==groupAdminId){
        userName += " (Admin)";  // show (Admin) if the user is admin of the group
    }
    return userName;
}


async function helperGetUserNameById(userId) {
    const url = "http://127.0.0.1:6969/id/" + userId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    var userName = data["firstname"] + " " + data["lastname"];
    
    return userName;
}

async function requestInfo() {
    const profile = await getUser();
    groupRequestArr = await groupRequest();
    adminId = await getAdmin();
}

async function adminApproval() {
    const profile = await getUser();
    groupRequestArr = await groupRequest();
    adminId = await getAdmin();
    
    var confirmPassword = document.getElementById("cnpwd").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}


async function getUser() {
    const url = "http://127.0.0.1:6969/";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };


    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    return data;
}




async function requestInfo() {
    const profile = await getUser();
    const groupRequestArr = await groupRequest();
    var pends = []
    for (var i = 0; i < groupRequestArr.length; i++) {
        var requestNo = groupRequestArr[i]["user_id"];
        if (groupRequestArr[i]["pending"]==true){
            var namePend = await helperGetUserNameById(groupRequestArr[i]["user_id"])
           
            console.log(namePend)
            console.log(requestNo)

            pends.push(namePend)
        }
    }
    list1=[]
    for (var i = 0; i < groupRequestArr.length; i++) {
        if (groupRequestArr[i]["pending"] == true) {
            list1.push(groupRequestArr[i])
        }
    }

    if (profile["Error"]) {
        window.location.href = 'login.html';
    }
    var result = ""
    for (var i = 0; i < list1.length; i++) {
        var userID = list1[i]["id"];
        var userName = pends[i]
       
        result = result + userID + " - " + userName + "<br>";
        
    }

    const profileU = await getUser();
    adminIdNo = await getAdmin();
    console.log(profileU["id"])
    console.log(adminIdNo)

    if (profileU["id"] == adminIdNo){
        document.getElementById("requestInfo").innerHTML = result;
        document.getElementById("inputHeading").innerHTML = "Enter the number from list above you want to approve";
    }
    else{
        document.getElementById("requestInfo").style.display = "none";
        document.getElementById("inputHeading").style.display = "none";
        document.getElementById("div1").style.display = "none";
       
    }

}

requestInfo();



function submitForm(e, form) {
    e.preventDefault();
    var approvedID = document.getElementById("approvedID").value;

    fetch('http://127.0.0.1:6969/api/member/request/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ "approval": true, "group_id": groupId, "request_id": approvedID })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //Success code goes here
        alert('form submited')
    }).catch(function (err) {
        //Failure
        alert('Error')
    });
}

function submitForm2(e, form) {
    e.preventDefault();
    var groupId=urlParams.get("id");
    const url="http://127.0.0.1:6969/api/group/id/" + groupId;
    var new_description = document.getElementById("new_description").value;

    fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ "new_description": new_description})
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data["Success"])
        {
            document.getElementById("description").innerHTML = new_description;
            alert(data["Success"]);     
        }

        if (data["Error"])
        {
            alert(data["Error"]);
        }
        if (data["Failure"])
        {
            alert(data["Failure"]);
        }
        //Success code goes here
        // alert('form submited')
    }).catch(function (err) {
        //Failure
        alert('Error')
    });
}

