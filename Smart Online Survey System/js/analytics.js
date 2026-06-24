
import { db } from './firebase-config.js';
import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadAnalytics() {

    const q = query(
        collection(db, "responses"),
        orderBy("submittedAt", "desc")
    );

    const snapshot = await getDocs(q);

    let counts = {
        Student: 0,
        Hospital: 0,
        Employee: 0,
        Office: 0
    };

    snapshot.forEach(doc => {

        const data = doc.data();

        if (counts[data.category] !== undefined) {
            counts[data.category]++;
        }

    });

    // Cards
    document.getElementById("total").innerText = snapshot.size;
    document.getElementById("s_count").innerText = counts.Student;
    document.getElementById("h_count").innerText = counts.Hospital;
    document.getElementById("e_count").innerText = counts.Employee;
    document.getElementById("o_count").innerText = counts.Office;

    // Pie Chart
    new Chart(document.getElementById("pieChart"), {
        type: "doughnut",
        data: {
            labels: ["Student", "Hospital", "Employee", "Office"],
            datasets: [{
                data: [
                    counts.Student,
                    counts.Hospital,
                    counts.Employee,
                    counts.Office
                ],
                backgroundColor: [
                    "#6366f1",
                    "#a855f7",
                    "#f97316",
                    "#06b6d4"
                ]
            }]
        }
    });

    // Bar Chart
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: ["Student", "Hospital", "Employee", "Office"],
            datasets: [{
                label: "Responses",
                data: [
                    counts.Student,
                    counts.Hospital,
                    counts.Employee,
                    counts.Office
                ],
                backgroundColor: [
                    "#6366f1",
                    "#a855f7",
                    "#f97316",
                    "#06b6d4"
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

loadAnalytics();
