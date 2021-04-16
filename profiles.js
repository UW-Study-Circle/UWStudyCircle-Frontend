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
    var imagelem = document.createElement("img");
    imagelem.src = "images/cs1.jpg";
    imagelem.alt = "";
    imagelem.className = "round-img";
    imagelem.style = "width: 240px; height: 240px";

    var div2 = document.createElement("div");

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
    aelem.href = "profile.html";
    aelem.innerHTML = "View Group";
    aelem.style = "width: 140px; margin: 5px";

    var aelem1 = document.createElement("a");
    aelem1.className = "btn btn-primary gr";
    aelem1.href = "join-group.html?id=" + groupId; //add group id to url
    aelem1.innerHTML = "Join Group";
    aelem1.style = "width: 140px; margin: 5px";

    var aelem2 = document.createElement("BUTTON");
    aelem2.className = "btn btn-danger gr";
    aelem2.onclick = confirmDelete;
    aelem2['data-id'] = groupId;
    console.log(data["Content"][i]);
    aelem2.innerHTML = "Delete Group";
    aelem2.style = "width: 140px; margin: 5px";

    elem.innerHTML = "Group Name: " + groupName;
    div2.appendChild(elem);
    div2.appendChild(aelem);
    div2.appendChild(aelem1);
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
    root.appendChild(divelem);
    console.log(i);
  }
  return data;
}

getGroup();
