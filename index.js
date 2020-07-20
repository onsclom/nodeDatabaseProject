function formSubmit() {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "testing"
        }),
    }


    fetch('http://localhost:3000/submit', options)
        .then(response => response.json())
        .then(json => {
            //done loading
            console.log(json);
        })
        .catch((error) => {
            console.error("Error:", error);
            //there was a problem!
        });
}