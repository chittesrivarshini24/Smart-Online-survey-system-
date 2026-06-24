
import { auth, db } from './firebase-config.js';

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Check User
onAuthStateChanged(auth, async (user) => {

    if (user) {

        const userDisplay =
        document.getElementById('userName');

        if (userDisplay) {
            userDisplay.innerText =
            user.displayName ||
            user.email.split('@')[0];
        }

        // Dashboard Response Count
        try {

            const snapshot =
            await getDocs(
                collection(db, "responses")
            );

            const totalResponses =
            document.getElementById("totalResponses");

            if(totalResponses){
                totalResponses.innerText =
                snapshot.size;
            }

        } catch(error){

            console.log(error);

        }

    } else {

        window.location.href = 'login.html';

    }

});

// Logout
const logoutBtn =
document.getElementById('logoutBtn');

if (logoutBtn) {

    logoutBtn.addEventListener('click', () => {

        signOut(auth)
        .then(() => {

            window.location.href =
            'login.html';

        });

    });

}
