export async function postFormDataAsJson() {


    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
       
    };

    const response = await fetch('http://127.0.0.1:6969/api/user/', fetchOptions);

 

    return response.json();
}

/**
    * Event handler for a form submit event.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
    *
    * @param {SubmitEvent} event
    */

export async function handleFormSubmit() {

    var result;
    
    const responseData = await postFormDataAsJson();
    

    try {
       

        console.log({ responseData });
        if (responseData["Success"])
        {
            result="login";
        }

        if (responseData["Duplicate"])
        {
            result="duplicate";
        }
        if (responseData["Error"])
        {
            result="error";
        }
        
    } catch (error) {
        console.error(error);
    }

    

    return responseData;
}
