    // Initializing firebase
    
    var config = {
    apiKey: "AIzaSyCE-azdViU6L8n1hVOk1tKW-ysu1UDIDUY",
    authDomain: "the-train-game-123.firebaseapp.com",
    databaseURL: "https://the-train-game-123.firebaseio.com",
    projectId: "the-train-game-123",
    storageBucket: "the-train-game-123.appspot.com",
    messagingSenderId: "645355952081"
  };
  firebase.initializeApp(config);

$(function() {
    // Creating a variable to reference the database
var database = firebase.database();
    // Local variables
var name = '';
var destination = '';
var firstTrain = '';
var frequency = 0;

$("#add-train").on("click", function() {
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
 
})})
