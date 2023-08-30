// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Firestore database
const db = firebase.firestore();

// Add workout form
const addWorkoutForm = document.querySelector("#addWorkoutForm");

addWorkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const workoutName = document.querySelector("#workoutName").value;
    const sets = parseInt(document.querySelector("#sets").value);
    const reps = parseInt(document.querySelector("#reps").value);

    db.collection("workouts").add({
        workoutName: workoutName,
        sets: sets,
        reps: reps,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    addWorkoutForm.reset();
});

// Display workouts
const workoutsList = document.querySelector("#workoutsList");

db.collection("workouts")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        workoutsList.innerHTML = "";
        snapshot.forEach((doc) => {
            const workout = doc.data();
            const workoutItem = document.createElement("div");
            workoutItem.classList.add("workout-item");
            workoutItem.innerHTML = `
                <h3>${workout.workoutName}</h3>
                <p>Sets: ${workout.sets}</p>
                <p>Reps: ${workout.reps}</p>
            `;
            workoutsList.appendChild(workoutItem);
        });
    });
