
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

async function getGroup() {
  const url="http://127.0.0.1:6969/api/group";
  const fetchOptions = {
      method: "GET",
      credentials: 'include',
  };
  let response = await fetch(url, fetchOptions);
  let data = await response.json();
  console.log(data);
  console.log(data["Content"].length);
  var root = document.getElementById("grouplist"); 
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

    
    var aelem = document.createElement("a");
    aelem.className = "btn btn-primary gr";
    aelem.href = "profile.html";
    aelem.innerHTML = "View Group";
    
    var aelem1 = document.createElement("a");
    aelem1.className = "btn btn-primary gr";
    aelem1.href = "join-group.html?id="+data["Content"][i]["id"]; //add group id to url
    aelem1.innerHTML = "Join Group";


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
    console.log(i);
  } 
  return data;
}

getGroup();