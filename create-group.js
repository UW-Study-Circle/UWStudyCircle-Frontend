$(document).ready(function () {
    var maxField = 10; //Input fields increment limitation
    var addButton = $('.add_button'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
    var fieldHTML = '<div><input type="text" name="field_name[]" value=""/><a href="javascript:void(0);" class="remove_button" title="Remove field"><h1>-</h1></a></div>'; //New input field html 
    var x = 1; //Initial field counter is 1

    //Once add button is clicked
    $(addButton).click(function () {
        //Check maximum number of input fields
        if (x < maxField) {
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); //Add field html
        }
    });

    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function (e) {
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
});

/**
* Helper function for POSTing data as JSON with fetch.
*
* @param {Object} options
* @param {string} options.url - URL to POST data to
* @param {FormData} options.formData - `FormData` instance
* @return {Object} - Response body from URL that was POSTed to
*/

    async function postFormDataAsJson({ url, formData }) {
    console.log(formData);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
        credentials: 'include'
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
    console.log(event);

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        console.log({ responseData });
        if (responseData["Success"])
        {
            window.location.href = 'profiles.html';
        }

        if (responseData["Duplicate"])
        {
            alert(responseData["Duplicate"]);
        }
        if (responseData["Error"])
        {
            alert(responseData["Error"]);
        }
    } catch (error) {
        console.error(error);
    }
}

const exampleForm = document.getElementById("groupForm");
exampleForm.addEventListener("submit", handleFormSubmit);

