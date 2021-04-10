async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

/**
    * Event handler for a form submit event.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
    *
    * @param {SubmitEvent} event
    */

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        console.log({ responseData });
        if (responseData["Success"]) {
            window.location.href = 'login.html';
        }

        if (responseData["Duplicate"]) {
            alert(responseData["Duplicate"]);
        }
        if (responseData["Error"]) {
            alert(responseData["Error"]);
        }

    } catch (error) {
        console.error(error);
    }
}

const exampleForm = document.getElementById("approvalForm");
exampleForm.addEventListener("submit", handleFormSubmit);


// loop through each contents item and hides it
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

async function groupRequest() {
    const url = "http://127.0.0.1:6969/api/member/members/" + groupId;
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log(data);
    return data;
}
groupRequest();

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
    var info = "";
    Object.keys(data).forEach(function(key) {
        info += key+" : " + data[key] + "<br>";
      
      })
    document.getElementById("text-2").innerHTML = info;
}

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


    // console.log(profile)
    if (profile["Error"]) {
        window.location.href = 'login.html';
    }
    var result = ""
    if(profile["id"]==adminId){
        for (var i = 0; i < groupRequestArr.length; i++) {
            var requestNo = i + 1;
            var userName = await getUserNameById(groupRequestArr[i]["user_id"]);
            result = result + requestNo + " - " + userName + "<br>";
        }
        var inputFieldRequest = '<input type="text" id="approvedID" value="Ex: 3"/>';
        var submitButtonRequest = '<input type="submit" class="btn btn-primary my-1"/>'

        document.getElementById("adminHeading").innerHTML = "Admin Approval Requests";
        document.getElementById("requestInfo").innerHTML = result;
        document.getElementById("inputHeading").innerHTML = "Enter the number from list above you want to approve";
        document.getElementById("inputApprovalID").innerHTML = inputFieldRequest
        document.getElementById("submitBtn").innerHTML = submitButtonRequest;


    }
    
    
}
getMemberIds();
requestInfo();

