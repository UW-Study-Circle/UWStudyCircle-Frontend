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


export async function confirmDelete(e) {
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