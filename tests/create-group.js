export async function postFormDataAsJson() {
    // const plainFormData = Object.fromEntries(formData.entries());
    // const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        //body: formDataJsonString,
        credentials: 'include'
    };

    const response = await fetch('http://127.0.0.1:6969/api/group/', fetchOptions);

 

    return response.json();
}