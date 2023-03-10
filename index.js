let name1 = document.getElementById("name");
let nameErr = document.getElementById("nameErrMsg");

let email1 = document.getElementById("email");
let emailErr = document.getElementById("emailErrMsg");

let woSta1 = document.getElementById("status");

let genMa1 = document.getElementById("genderMale");
let genFe1 = document.getElementById("genderFemale");

let userForm1 = document.getElementById("addUserForm");

let userData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};
name1.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErr.textContent = "Required*";
    } else {
        nameErr.textContent = "";
    }
    userData.name = event.target.value;
});

email1.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErr.textContent = "Required*";
    } else {
        emailErr.textContent = "";
    }
    userData.email = event.target.value;
});

woSta1.addEventListener("change", function(event) {
    userData.status = event.target.value;
});

genMa1.addEventListener("change", function(event) {
    userData.gender = event.target.value;
});

genFe1.addEventListener("change", function(event) {
    userData.gender = event.target.value;
});

function validateUserData(userData) {
    let {
        name,
        email
    } = userData;
    if (name === "") {
        nameErr.textContent = "Required*";
    }
    if (email === "") {
        emailErr.textContent = "Required*";
    }
}

function submitUserData(userData) {
    let options = {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
        },
        body: JSON.stringify(userData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErr.textContent = "Email Already Exists";
                }
            }
        });
}

userForm1.addEventListener("submit", function(event) {
    event.preventDefault();
    validateUserData(userData);
    submitUserData(userData);
});