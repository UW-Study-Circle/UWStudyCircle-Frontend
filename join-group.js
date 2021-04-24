
// loop through each contents item and hides it

function hideSideContent(){
    var elements = document.getElementsByClassName("contents");
    for(var i=0; i < elements.length; i++){
        elements[i].style.display = "none";
    };
}

hideSideContent();

// show the 1st content item
document.getElementsByClassName("contents")[0].style.display = "block";

const queryURL = window.location.search;
const urlParams = new URLSearchParams(queryURL);
var groupId=urlParams.get("id");

// collect title IDs into an iterable array
var contentsArr = ["group-mem", "group-info"];

// go through each title IDs one at a time
for(var i=0; i<contentsArr.length; i++){
    document.getElementById(contentsArr[i]).addEventListener("click", function(){
        // if any of the title IDs are clicked, hide all 
        hideSideContent();

        // record the ID of the clicked icon
        var titleClicked = this.getAttribute("id");

        // test which title was clicked and show the clicked tiles contents
        if(titleClicked == "group-mem"){  // click group member
            document.getElementById("members").style.display = "block";
        }
        else if(titleClicked == "group-info"){  // click group info
            document.getElementById("info").style.display = "block";
        }
        else{
            console.log("No title was clicked");
        };
    }, false);
};

async function getGroupInfo(){ 
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
    document.getElementById("text-2").innerHTML = info;
}

getGroupInfo();

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
        userIds.push(member["user_id"]);
    })
    let result = "";
    for(var i=0;i<userIds.length;i++){
        var userId = userIds[i];
        var userName = await getUserNameById(userId); 
        result = result + userName +"<br>";
    }
    document.getElementById("text-1").innerHTML = result;
}

async function joinPublicGroup(){
    const url="http://127.0.0.1:6969/api/member/join/" + groupId;
    const fetchOptions = {
        method: "PUT",
        credentials: 'include',
    };
  
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    var error =  data["Error"];
    if(error !=null){
      alert(error);
    }else{
        var success = data["Success"];
        alert(success);
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
    return userName;
}

async function requestInfo() {
    const profile = await getUser();
    groupRequestArr = await groupRequest();
    adminId = await getAdmin();


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

async function requestInfo() {
    const profile = await getUser();
    const groupRequestArr = await groupRequest();


    // console.log(profile)
    if (profile["Error"]) {
        window.location.href = 'login.html';
    }
    var result = ""
    for (var i = 0; i < groupRequestArr.length; i++) {
        var requestNo = i + 1;
        var userName = await getUserNameById(groupRequestArr[i]["user_id"]);
        result = result + requestNo + " - " + userName + "<br>";
    }

    document.getElementById("requestInfo").innerHTML = result;
    document.getElementById("inputHeading").innerHTML = "Enter the number from list above you want to approve";
    


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

getMemberIds();

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
