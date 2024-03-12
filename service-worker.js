chrome.storage.local.get(['assignments'], function(result){
    console.log(result);
});


// Check if reminder has been created, if yes then create an alarm for it
chrome.runtime.onMessage.addListener((request) => {
    if (request == 'scheduleAssignment') {
        createAlarm();
    }
})

// Create notification for alarms
chrome.alarms.onAlarm.addListener(function(alarm) {
    createNotification(alarm.Assignmentname);
  });


function createNotification(Assignmentname) {
    console.log('Notification');
    chrome.notifications.create(Assignmentname, {
        title: 'Assignment due',
        message: 'Your assignment is due soon',
        iconUrl: 'icon.png',
        type: 'basic'
      });

}

function createAlarm(){
    chrome.storage.local.get(['assignments'], function(result) {

        // Assignment exists
        if (result.assignments && result.assignments.length > 0) {

            // Get newest Assignment
            var assignment = result.assignments[result.assignments.length - 1];
            console.log(assignment.Deadline);


            var minutesLeft = (new Date(assignment.Deadline) - Date.now()) / 60000;
        }
    
        // Create an alarm everyday
        for (let i = minutesLeft; i >= 0; i -= 1440 ) {
            console.log(i);
            let days = i / 1440;
            let name = assignment.Assignment + days;
            chrome.alarms.create(`${name} due in ${days} days`, {delayInMinutes: i});
        }
    })
}

function deleteAssignment(){
    chrome.storage.local.get(['assignments'], function(result){

        console.log(result);

        if (result.assignments && result.assignments.length > 0) {
        
            let updatedAssignments = result.assignments.filter(function(currAssignment){
                // remove the assignment
                if(Date.now() > new Date(currAssignment.Deadline))
                    return false; // false means remove
                else
                    return true; // true means keep

            });

            console.log(updatedAssignments);

            chrome.storage.local.set({ 'assignments': updatedAssignments }, function() {
                console.log('Expired assignments removed');
            });

        }

        
    });

}