// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXf9AMuPEcDATG9JOMgEvU4vSoxB_E18g",
  authDomain: "billard-tracker-4d51e.firebaseapp.com",
  databaseURL: "https://billard-tracker-4d51e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "billard-tracker-4d51e",
  storageBucket: "billard-tracker-4d51e.appspot.com",
  messagingSenderId: "834006150908",
  appId: "1:834006150908:web:0d7a8160c0dcb99ae3f179"
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
