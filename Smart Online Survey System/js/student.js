import { auth, db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Check Login
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// Student Survey Submit
const surveyForm = document.getElementById("studentForm");

if (surveyForm) {

    surveyForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {
            category: "Student",
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,

            q1: surveyForm.q1.value,
            q2: surveyForm.q2.value,
            q3: surveyForm.q3.value,
            q4: surveyForm.q4.value,

            q5: document.getElementById("q5").value,

            submittedAt: serverTimestamp()
        };

        try {

            await addDoc(
                collection(db, "responses"),
                formData
            );

            // Go to Thank You Page
            window.location.href = "thankyou.html";

        } catch (error) {

            console.error(error);

            alert("❌ Submission Failed");

        }

    });

}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        signOut(auth)
            .then(() => {
                window.location.href = "login.html";
            });

    });

}