
async function searchGroup(event) {
    event.preventDefault()
  var query = document.getElementById("search_query").value;
  console.log(query);

  const url = `http://127.0.0.1:6969/api/group/${query}`;
  console.log(url);
  const fetchOptions = {
    method: "GET",
    credentials: 'include',
  };
  let response = await fetch(url, fetchOptions);
  let data = await response.json();
  console.log(data);
  console.log(data["Content"].length);
  var root = document.getElementById("grouplist");
  root.innerHTML = '';
  console.log(data["Content"].length);
  if(data["Content"].length==0)
  {
    var e=document.createElement("p");
    e.innerHTML='Sorry! No group matches the search description. Check if the spelling you entered is correct or create a new group.';
    root.appendChild(e);
  }
  for (i = 0, len = data["Content"].length, text = ""; i < len; i++) {

    var divelem = document.createElement("div");
    divelem.className = "profile bg-light";
    var imagelem = document.createElement("img");
    imagelem.src = "images/cs1.jpg";
    imagelem.alt = "";
    imagelem.className = "round-img";

    var div2 = document.createElement("div");

    var elem = document.createElement("h2");
    var elem1 = document.createElement("p");
    elem1.innerHTML = "Status " + data["Content"][i]["status"];

    var elem2 = document.createElement("p");
    elem2.innerHTML = "Course:  " + data["Content"][i]["courseinfo"];

    var elem3 = document.createElement("p");
    elem3.innerHTML = "Description:  " + data["Content"][i]["description"];
    var elem4 = document.createElement("p");

    var groupId = data["Content"][i]["id"];
    var aelem = document.createElement("a");
    aelem.className = "btn btn-primary";
    aelem.href = "profile.html?id=" + groupId; //add group id to url
    aelem.innerHTML = "View Group";
    aelem.style = "width: 140px; margin: 5px";


    var aelem1 = document.createElement("a");
    aelem1.className = "btn btn-primary gr";
    if(status=="Private"){
       aelem1.href=`javascript:joinPrivateGroup("${groupId}")`;
    }else{
      aelem1.href = `javascript:joinPublicGroup("${groupId}")`;
    }
    aelem1.innerHTML = "Join Group";
    aelem1.style = "width: 140px; margin: 5px";

    elem.innerHTML = "Group Name: " + data["Content"][i]["groupname"];
    div2.appendChild(elem);
    div2.appendChild(aelem);
    div2.appendChild(aelem1);
    div2.appendChild(elem1);
    div2.appendChild(elem2);
    div2.appendChild(elem3);
    divelem.appendChild(div2);
    // divelem.firstChild = imagelem;
    divelem.appendChild(imagelem);
    root.appendChild(divelem);
    // console.log(i);
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
