 export async function getGroup() {
    const url="http://127.0.0.1:6969/api/group";
    const fetchOptions = {
        method: "GET",
        credentials: 'include',
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
    // console.log(data);
    // console.log(data["Content"].length);
    var root = document.getElementById("grouplist"); 
    
    return data;
  }


export async function confirmDelete(groupid) {

  var msg="";
  // var r = confirm("Are you sure to delete the group?");
 
    const url = `http://127.0.0.1:6969/api/group/id/${groupid}`;
    const fetchOptions = {
      method: "DELETE",
      credentials: "include",
    };
    let response = await fetch(url, fetchOptions);
    let data = await response.json();
   
    msg="The group is deleted.";
   
  
  return msg;
}