// Initializing firebase

var config = {
    apiKey: "AIzaSyCND6M1D2Yu7cgxaLtKsHlDIwDh8iFUjAM",
    authDomain: "train123-d9e53.firebaseapp.com",
    databaseURL: "https://train123-d9e53.firebaseio.com",
    projectId: "train123-d9e53",
    storageBucket: "train123-d9e53.appspot.com",
    messagingSenderId: "803859808594"
};
firebase.initializeApp(config);


$(function () {
    // Creating a variable to reference the database
    var database = firebase.database();
    // Local variables
    var name = '';
    var destination = '';
    var firstTrain = '';
    var frequency = 0;

    $("#add-train").on("click", function () {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Pushing data collected from variables to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        database.ref().on("child_added", function (childSnapshot) {
            var nextArr;
            var minAway;
            // Chang year so first train comes before now
            var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
            // Difference between the current and firstTrain
            var diffTime = moment().diff(moment(firstTrainNew), "minutes");
            var remainder = diffTime % childSnapshot.val().frequency;
            // Minutes until next train
            var minAway = childSnapshot.val().frequency - remainder;
            // Next train time
            var nextTrain = moment().add(minAway, "minutes");
        })
        database.ref().on("child_added", function (snapshot) {
            var sv = snapshot.val();
            $("#add-Row").append("<tr><td scope='col')>" + sv.name + "</td>" +
                "<td scope='col'>" + sv.destination + "</td>" +
                "<td scope='col'>" + sv.firstTrain + "</td>" +
                "<td scope='col'>" + sv.frequency + "</td> ></tr>");

        });

    })
});
