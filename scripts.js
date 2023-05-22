var Time = document.getElementById('time');

// Setting up all functionalities to display updated time.
function CurrentRunningTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var AMPM = hours >= 12 ? 'PM' : 'AM';

    // Code to convert 24 hours format to 12 hours format.
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Add leading zeros to single digit numbers.
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Assigning the current time to Variable Time to display it on the browser
    Time.innerHTML = hours + ":" + minutes + ":" + seconds + " " + AMPM;

    // Check if the current time matches any of the alarms
    checkAlarms(hours, minutes, AMPM);
}

// setInterval function to update the time every second (1000 milliseconds).
setInterval(CurrentRunningTime, 1000);

//function to add time format in alarms array to get AM and PM 
function timeFormat(time) {
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0]);
    var minutes = splitTime[1];
    var AMPM = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = (hours < 10 ? "0" : "") + hours;

    var timeformat = hours + ":" + minutes + " " + AMPM;

    return timeformat;
}
//this function is used to push the alarms added by user to a arrary called alarms
//storing the alarms added by user in a variable called alarms
var alarms = [];
//this is a function to add alarms to variable alarms
function setAlarm() {
    var alarmInput = document.getElementById("alarmInput");
    var alarmTime = alarmInput.value;

    if (alarmTime !== "") {
        alarms.push(timeFormat(alarmTime));
        alarmInput.value = "";
        alarmsDisplay();
    }
}
//this delete function is added every alarm created by user to delete unwanted alarms at any time
function deleteAlarm(index) {
    alarms.splice(index, 1);
    alarmsDisplay();
}
//this function is used to display the alarms added by users using a loop to add them in a sequence
function alarmsDisplay() {
    var alarmsContent = document.getElementById("alarms");
    alarmsContent.innerHTML = "";
    for (var i = 0; i < alarms.length; i++) {
        var alarmText = alarms[i];
        var deleteButton = '<button id="delete" onclick="deleteAlarm(' + i + ')">Delete</button>';
        alarmsContent.innerHTML += alarmText + deleteButton + "<br>"+"<br>";
    }
}
//function that alerts when the current time matches the time in alarms array and then removed automatically using splice

function checkAlarms(hours,minutes,AMPM) {
    var currentTimeFormat = hours + ":" + minutes + " " + AMPM;

    for (var i = 0; i < alarms.length; i++) {
        if (currentTimeFormat === alarms[i]) {
            alert("Alarm " + (i + 1) + " Snoozing!");
            alarms.splice(i, 1);
            alarmsDisplay();
            break;
        }
    }
}

//dark and light mode controls

const toggle = document.getElementById('toggle');
const modeName = document.getElementById('mode-name');

toggle.addEventListener('change', function() {
    document.body.classList.toggle("dark-mode")
  if (this.checked) {
    modeName.textContent = 'Dark Mode';
  } else {
    modeName.textContent = 'Light Mode';
  }
});
