export async function searchGroup(query) {
    
//   var query = document.getElementById("search_query").value;
//   console.log(query);

  const url = `http://127.0.0.1:6969/api/group/${query}`;
  console.log(url);
  const fetchOptions = {
    method: "GET",
    credentials: 'include',
  };
  let response = await fetch(url, fetchOptions);
  let data = await response.json();
  console.log(data);
//   console.log(data["Content"].length);
//   var root = document.getElementById("grouplist");
//   root.innerHTML = '';
//   for (i = 0, len = data["Content"].length, text = ""; i < len; i++) {

//     var divelem = document.createElement("div");
//     divelem.className = "profile bg-light";
//     var imagelem = document.createElement("img");
//     imagelem.src = "images/cs1.jpg";
//     imagelem.alt = "";
//     imagelem.className = "round-img";

//     var div2 = document.createElement("div");

//     var elem = document.createElement("h2");
//     var elem1 = document.createElement("p");
//     elem1.innerHTML = "Status " + data["Content"][i]["status"];

//     var elem2 = document.createElement("p");
//     elem2.innerHTML = "Course:  " + data["Content"][i]["courseinfo"];

//     var elem3 = document.createElement("p");
//     elem3.innerHTML = "Description:  " + data["Content"][i]["description"];
//     var elem4 = document.createElement("p");


//     var aelem = document.createElement("a");
//     aelem.className = "btn btn-primary";
//     aelem.href = "profile.html";
//     aelem.innerHTML = "View Group";

//     elem.innerHTML = "Group Name: " + data["Content"][i]["groupname"];
//     div2.appendChild(elem);
//     div2.appendChild(aelem);
//     div2.appendChild(elem1);
//     div2.appendChild(elem2);
//     div2.appendChild(elem3);
//     divelem.appendChild(div2);
//     // divelem.firstChild = imagelem;
//     divelem.appendChild(imagelem);
//     root.appendChild(divelem);
//     // console.log(i);
//   }
  return data;
}