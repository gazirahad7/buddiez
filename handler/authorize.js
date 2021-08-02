// login / register / logout is here

import { clearAll } from "./commonfunction.js";

import { uniqId, showAllPosts } from "./commonfunction.js";

const allPostsDiv = document.getElementById("all-posts");

const welcomeMsg = document.getElementById("welcome-msg");
// Section Block
const sectionNone = document.getElementById("section-none");
const postsSecBlock = document.getElementById("post-section-block");
//
const loginForm = document.getElementById("login-form");
const wantToLoginBtn = document.getElementById("want-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const navBar = document.getElementsByClassName('my-nav')[0]
console.log('nav bar', navBar);

/* ======= Login event ======= */
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let canLogin = 1;

    const loginEmail = document.getElementById("login-email");
    const loginPass = document.getElementById("login-pass");
    const loginEmailError = document.getElementById("login-email-error");
    const loginPassError = document.getElementById("login-pass-error");
    const loginError = document.getElementById("login-error");

    if (!loginEmail.value.trim()) {
        clearAll([loginError]);
        loginEmailError.textContent = "Email can't be empty";
        canLogin = 0;
    } else {
        clearAll([loginEmailError]);
    }

    if (!loginPass.value.trim()) {
        clearAll([loginError]);
        loginPassError.textContent = "Password can't be empty";
        canLogin = 0;
    } else {
        clearAll([loginPassError]);
    }

    if (canLogin) {
        let logInSuccess = 0;

        for (let i = 0; i < allUsers.length; i++) {
            if (
                allUsers[i].email === loginEmail.value &&
                allUsers[i].pass === loginPass.value
            ) {
                clearAll();
                loginForm.style.display = "none";

                mainDB = {...mainDB, loggedIn: allUsers[i].userID };

                localStorage.setItem("DB", JSON.stringify(mainDB));

                loggedIn = allUsers[i].userID;

                welcomeMsg.innerHTML = "Welcome, " + allUsers[i].name;
                logoutBtn.style.display = "block";
                postsSecBlock.style.display = "block";

                sectionNone.style.display = "none";

                showAllPosts(allPostsDiv);
                logInSuccess = 1;

                break;
            }
        }

        if (!logInSuccess) {
            clearAll([loginPass]);
            loginError.innerHTML = "Invalid password or email";
        }
    }
});

// Want to login button
wantToLoginBtn.addEventListener("click", (e) => {
    //e.preventDefault();
    clearAll();

    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// on click logout button
logoutBtn.addEventListener("click", () => {
    clearAll();

    //localStorage.removeItem(loggedIn)
    loggedIn = "";
    mainDB = {...mainDB, loggedIn };
    localStorage.setItem("DB", JSON.stringify(mainDB));
    welcomeMsg.innerHTML = "";
    logoutBtn.style.display = "none";
    postsSecBlock.style.display = "none";
    loginForm.style.display = "block";
    sectionNone.style.display = "block";
});

const registerForm = document.getElementById("register-form");
const wantToRegisterBtn = document.getElementById("want-register-btn");

// on submit register button
/* ======= Register event ======= */
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("hi regform")

    let canRegister = 1;

    const registerName = document.getElementById("register-name");
    const registerEmail = document.getElementById("register-email");
    const registerPass = document.getElementById("register-pass");
    const registerConfPass = document.getElementById("register-conf-pass");

    const registerError = document.getElementById("register-error");

    const registerNameError = document.getElementById("register-name-error");
    const registerEmailError = document.getElementById("register-email-error");
    const registerPassError = document.getElementById("register-pass-error");
    const registerConfPassError = document.getElementById(
        "register-conf-pass-error"
    );

    if (!registerName.value.trim()) {
        clearAll([registerError]);
        registerNameError.textContent = "Name can't be empty";

        canRegister = 0;
    } else {
        clearAll([registerNameError]);
    }
    if (!registerEmail.value.trim()) {
        clearAll([registerError]);
        registerEmailError.textContent = "Email can't be empty";
        canRegister = 0;
    } else {
        clearAll([registerEmailError]);
    }
    if (!registerPass.value.trim()) {
        clearAll([registerError]);
        registerPassError.textContent = "Password can't be empty";
        canRegister = 0;
    } else {
        clearAll([registerPassError]);
    }
    if (registerPass.value.trim() !== registerConfPass.value.trim()) {
        clearAll([registerError]);
        registerConfPassError.textContent = "Passwords dont match";
        canRegister = 0;
    } else {
        clearAll([registerConfPassError]);
    }
    if (canRegister) {
        const newRegistered = {
            name: registerName.value.trim(),
            email: registerEmail.value.trim(),
            pass: registerPass.value.trim(),
            userID: uniqId("userid"),
        };

        let alreadyExsists = 0;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email === registerEmail.value.trim()) {
                registerError.innerHTML = "Email already exists!!!";

                alreadyExsists = 1;

                break;
            }
        }

        if (!alreadyExsists) {
            postsSecBlock.style.display = "block";


            //localStorage.setItem("loggedIn", registerEmail.value.trim());
            //console.log(localStorage.setItem("loggedIn", allUsers.userID))

            welcomeMsg.innerHTML = "welcome, " + registerName.value;
            navBar.style.display = "block"

            clearAll();
            registerForm.style.display = "none";

            allUsers.push(newRegistered);
            mainDB = {...mainDB, allUsers };
            localStorage.setItem("DB", JSON.stringify(mainDB));
            logoutBtn.style.display = "block";
            sectionNone.style.display = "none";
            let yes = 1;

            for (let i = 0; i < allUsers.length; i++) {
                if (yes) {
                    //localStorage.setItem("loggedIn", allUsers[i].userID);
                    console.log("HI");
                }
                mainDB = {...mainDB, loggedIn: allUsers[i].userID };
                localStorage.setItem("DB", JSON.stringify(mainDB));
                loggedIn = allUsers[i].userID;
            }
        } else {
            clearAll([registerPass, registerConfPass]);
        }
    }
});

// Want to register button
wantToRegisterBtn.addEventListener("click", (e) => {
    //e.preventDefault();

    clearAll();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});