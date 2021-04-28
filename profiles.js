/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// function deleteGroup(groupid) {
//   const url="http://127.0.0.1:6969/api/group/id/${groupid}";
//   const fetchOptions = {
//       method: "DELETE",
//       credentials: 'include',
//   };
// }

async function confirmDelete(e) {
  console.log(e.target);
  const groupid = e.target['data-id'];
  console.log(groupid)
  // var r = confirm("Are you sure to delete the group?");
  if (confirm("Are you sure to delete the group?")) {
    const url = `http://127.0.0.1:6969/api/group/id/${groupid}`;
    const fetchOptions = {
      method: "DELETE",
      credentials: "include",
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    console.log(data);
    alert("The group is deleted.");
    window.location.reload();
  }
}

async function getMembers(groupId){
  const url="http://127.0.0.1:6969/api/member/members/" + groupId;
  const fetchOptions = {
      method: "GET",
      credentials: 'include',
  };
  let response = await fetch(url, fetchOptions);
  let data = await response.json();
  console.log("group members", data);
  var userIds = [];
  data.forEach(function(member){
      var userId = member["user_id"];
      userIds.push(userId);
  });
  return userIds;
}

async function getGroup() {
  const url = "http://127.0.0.1:6969/api/group";
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  let response = await fetch(url, fetchOptions);
  let data = await response.json();

  const email = 'y@e.c';
  const password = 'aaaa';
  const url1 = `http://127.0.0.1:6969/api/user/email/${email}/password/${password}`;
  const fetchOptions1 = {
    method: "GET",
    // credentials: "include",
  };
  let response1 = await fetch(url1, fetchOptions1);
  let data1 = await response1.json();

  console.log(data1);
  console.log(data["Content"].length);
  var root = document.getElementById("grouplist");
  for (i = 0, len = data["Content"].length, text = ""; i < len; i++) {
    var divelem = document.createElement("div");
    divelem.className = "profile bg-light";
    divelem.style = "position: relative;"
    var imagelem = document.createElement("img");
    imagelem.src = "images/cs1.jpg";
    imagelem.alt = "";
    imagelem.className = "round-img";
    imagelem.style = "width: 240px; height: 240px";

    // var divadmin = document.createElement("div");
    // divadmin.style = "width: 70px; height: 70px; position: absolute; top:10px; right:10px; ";
    var adminlem = document.createElement("img");
    adminlem.src = "images/admin.png";
    adminlem.alt = "";
    adminlem.style = "width: 50px; height: 50px; position: absolute; top:10px; right:10px;opacity: 0.6 ";
    var admintext = document.createElement("p");
    admintext.innerHTML = "Admin" ;
    admintext.style = "position: absolute; top:63px; right:10px; font-weight: bold;font-family: sans-serif;";
    // divadmin.appendChild(adminlem);
    // divadmin.appendChild(admintext);
    


    var div2 = document.createElement("div");
    div2.style = "width: 380px; margin-right:60px"

    var status = data["Content"][i]["status"];
    var groupId = data["Content"][i]["id"];
    var courseInfo = data["Content"][i]["courseinfo"];
    var description = data["Content"][i]["description"];
    var groupName = data["Content"][i]["groupname"];
    
    var elem = document.createElement("h2");
    var elem1 = document.createElement("p");
    elem1.innerHTML = "Status " + status;

    var elem2 = document.createElement("p");
    elem2.innerHTML = "Course:  " + courseInfo;

    var elem3 = document.createElement("p");
    elem3.innerHTML = "Description:  " + description;

    var elem4 = document.createElement("p");

    var aelem = document.createElement("a");
    aelem.className = "btn btn-primary gr";
    aelem.href = "profile.html?id=" + groupId; //add group id to url
    aelem.innerHTML = "View Group";
    aelem.style = "width: 140px; height: 40px; margin: 5px";

    var aelem1 = document.createElement("a");
    aelem1.className = "btn btn-primary gr";
    if(status=="Private"){
       aelem1.href=`javascript:joinPrivateGroup("${groupId}")`;
    }else{
      aelem1.href = `javascript:joinPublicGroup("${groupId}")`;
    }
    aelem1.innerHTML = "Join Group";
    aelem1.style = "width: 140px; height: 40px; margin: 5px";

    var aelem2 = document.createElement("BUTTON");
    aelem2.className = "btn btn-danger gr";
    aelem2.onclick = confirmDelete;
    aelem2['data-id'] = groupId;
    console.log(data["Content"][i]);
    aelem2.innerHTML = "Delete Group";
    aelem2.style = "width: 140px; height: 40px; margin: 5px";

    elem.innerHTML = "Group Name: " + groupName;
    div2.appendChild(elem);
    div2.appendChild(aelem);
    if(!(await getMembers(groupId)).includes(parseInt(window.localStorage.getItem("current_userId")))){
      div2.appendChild(aelem1);
    }
    
    console.log(window.localStorage, data["Content"][i]["admin"].toString())
    if(window.localStorage.getItem("current_userId") == data["Content"][i]["admin"].toString()){
      div2.appendChild(aelem2);
    }
    
    div2.appendChild(elem1);
    div2.appendChild(elem2);
    div2.appendChild(elem3);
    divelem.appendChild(div2);
    // divelem.firstChild = imagelem;
    divelem.appendChild(imagelem);
    if(window.localStorage.getItem("current_userId") == data["Content"][i]["admin"].toString()){
      divelem.appendChild(adminlem);
      divelem.appendChild(admintext);
    }
    root.appendChild(divelem);
    console.log(i);
  }
  return data;
}

// user join group (add the user to the group member list)
async function joinPrivateGroup(groupId){
  const url="http://127.0.0.1:6969/api/member/join/" + groupId;
  const fetchOptions = {
      method: "PUT",
      credentials: 'include',
  };

  let response = await fetch(url, fetchOptions);
  let data = await response.json();
  var error =  data["Error"];
  var msg = "This is a private group.\n\n";
  if(error != null){
    alert(msg+ "Request has been sent. Waiting for Admin Approval.");     // show message if the user already joined the group 
  }else{
      var success = data["Success"]; 
      alert(msg+success);   // show message that need admin approval if the user join a private group
  }
}


// user join group (add the user to the group member list)
async function joinPublicGroup(groupId){
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

getGroup();
