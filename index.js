let loadingText = document.getElementById("LoadingText");
let entriesLoadingText = document.getElementById("EntriesLoadingText");
let submitButton = document.getElementById("SubmitButton");

let form = {
    username: document.getElementById("InputUsername"),
    firstName: document.getElementById("InputFirstName"),
    lastName: document.getElementById("InputLastName"),
    usernameHelp: document.getElementById("UsernameHelp"),
    firstNameHelp: document.getElementById("FirstNameHelp"),
    lastNameHelp: document.getElementById("LastNameHelp"),
    submitSuccessText: document.getElementById("SubmitSuccess"),
    submitFailText: document.getElementById("SubmitFail"),
}

let loadingTexts = ["Loading","Loading.","Loading.."];
let curLoad = 0

const apiUrl = "https://node-js-form.herokuapp.com";

function getEntries() {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    };

    document.getElementById("EntryHolder").innerHTML = "";
    entriesLoadingText.style.display = "block";

    fetch( apiUrl+"/entries", options )
        .then(response => response.json())
        .then(json => {
            //loading entries!


            const message = JSON.parse(json)

            if (message.status == "success")
            {
                for (let row of message.rows)
                {
                    let newHTML = "<div class='mx-auto my-2'><div class='card justify-content-md-center'><div class='card-body'>";
                    newHTML += "<h5 class='card-title'>" + row.username + "</h5>";
                    newHTML += "<hr/>";
                    newHTML += "<p class='card-text'> First Name: " + row.firstname + "</p>";
                    newHTML += "<p class='card-text'> Last Name: " + row.lastname + "</p>";
                    newHTML += "</div></div></div>"

                    document.getElementById("EntryHolder").innerHTML += newHTML;
                }
            }
            else
            {
                console.log(message);
                //failed
            }

            entriesLoadingText.style.display = "none";

        })
        .catch((error) => {
            //failed
            console.error("Error:", error);
            //there was a problem!
        });
}

getEntries();

function changeLoadingText() {
    curLoad += 1;
    loadingText.textContent = loadingTexts[curLoad%loadingTexts.length];
    entriesLoadingText.textContent = loadingTexts[curLoad%loadingTexts.length];
    setTimeout(changeLoadingText, 500);
}

//this cycles the Loading text so user knows page has not froze
changeLoadingText();

function startLoading() {
    submitButton.style.display = "none";
    loadingText.style.display = "block";
    form.submitFailText.style.display = "none";
    form.submitSuccessText.style.display = "none";
}

function doneLoading() {
    submitButton.style.display = "block";
    loadingText.style.display = "none";
}

function formValidate() {

    form.firstNameHelp.style.display = "none";
    form.lastNameHelp.style.display = "none";
    form.usernameHelp.style.display = "none";

    if (form.firstName.value && form.lastName.value && form.username.value)
    {
        return true;
    }
    else 
    {
        if (!form.firstName.value)
        {
            form.firstNameHelp.style.display = "block";
        }
        if (!form.lastName.value)
        {
            form.lastNameHelp.style.display = "block";
        }
        if (!form.username.value)
        {
            form.usernameHelp.style.display = "block";
        }
        return false;
    }
}

function formSubmit() {

    startLoading();
    
    if ( formValidate() )
    {

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: form.firstName.value,
                lastname: form.lastName.value,
                username: form.username.value
            }),
        }
    
    
        fetch( apiUrl+"/submit", options )
            .then(response => response.json())
            .then(json => {
                //done loading
                doneLoading();
    
                const message = JSON.parse(json)
    
                if (message.status == "success")
                {
                    form.submitSuccessText.style.display = "block";
                    getEntries();
                }
                else
                {
                    form.submitFailText.style.display = "block";
                }
    
            })
            .catch((error) => {
                doneLoading();
                console.error("Error:", error);
                //there was a problem!
            });
    }
    else
    {
        doneLoading();
    }

}