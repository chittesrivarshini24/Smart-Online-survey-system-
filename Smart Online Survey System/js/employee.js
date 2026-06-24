import { auth, db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
});

const surveyForm = document.getElementById("employeeForm");

if (surveyForm) {

    surveyForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {
            category: "Employee",
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

            await addDoc(collection(db, "responses"), formData);

            window.location.href = "thankyou.html";

        } catch (error) {

            console.error(error);
            alert("❌ Submission Failed");

        }

    });

}

document.getElementById("logoutBtn").addEventListener("click", () => {

    signOut(auth).then(() => {
        window.location.href = "login.html";
    });

});