import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            showPopup(
                "Registration Successful 🎉",
                "Your account has been created successfully.",
                "login.html"
            );

        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);

            showPopup(
                "Login Successful 🎉",
                "Welcome back to Smart Survey.",
                "dashboard.html"
            );

        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
}

// AUTH CHECK
onAuthStateChanged(auth, (user) => {
    if (!user) {
        if (
            !window.location.pathname.includes('login.html') &&
            !window.location.pathname.includes('register.html') &&
            !window.location.pathname.includes('index.html')
        ) {
            window.location.href = 'login.html';
        }
    }
});

function showPopup(title, message, redirectUrl = null) {
    const popup = document.createElement("div");

    popup.className = "popup-overlay";

    popup.innerHTML = `
        <div class="popup-box">
            <h2>${title}</h2>
            <p>${message}</p>
            <button id="popupOk">OK</button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("popupOk").onclick = () => {
        popup.remove();

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };
}