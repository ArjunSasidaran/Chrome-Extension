chrome.runtime.sendMessage({
    command: 'scheduleReminder',
    data: {name: "A1", dueDate: "500"}
  }, response => {
    console.log(response.result);
  });

// Check if reminder has been created, if yes then create an alarm for it
chrome.runtime.onMessage.addlistener((request) => {
    if (request == 'scheduleAssignment') {
        createAlarm();
    }
})


function createAlarm(){
    chrome.storage.local.get('assignmentInfo', (assignment) => {

        // Assignment exists
        if (assignment.assignmentInfo) {
            
            timeLeft = assignment.assignmentInfo.deadline - (new Date().getTime);
            daysLeft = timeLeft / (1000 * 60 * 60 * 24);
        }
    
        // Create an alarm everyday
        for (let i = 0; i < daysLeft; i++) {
            chrome.alarms.create("notification " + {i}, {delayInMinutes: i * 1440});
        }
    })
}