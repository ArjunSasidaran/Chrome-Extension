// Check if reminder has been created, if yes then create an alarm for it
chrome.runtime.onMessage.addListener((request) => {
    if (request == 'scheduleAssignment') {
        createAlarm();
    }
})

// Create notification for alarms
chrome.alarms.onAlarm.addListener(function(alarm) {
    createNotification();
  });


function createNotification() {
    console.log('Notification');
    chrome.notifications.create('Assignment Due', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Assignment due',
        message: 'Your assignment is due soon'
      }, function(notificationId) {});
}

function createAlarm(){
    chrome.storage.local.get(['assignments'], function(result) {

        // Assignment exists
        if (result.length != 0) {

            // Get newest Assignment
            var assignment = result.assignments[result.assignments.length - 1];
            console.log(assignment.Deadline);


            let timeLeft = new Date(assignment.Deadline) - new Date();
            var daysLeft = timeLeft / (1000 * 60 * 60 * 24);
        }
    
        // Create an alarm everyday
        for (let i = 0; i < daysLeft; i++) {
            chrome.alarms.create(`${assignment.Assignment} due in ${i} days`, {delayInMinutes: i * 1440});
            console.log(i * 1440);
        }
    })
}