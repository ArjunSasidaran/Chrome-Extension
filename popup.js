
document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById("assignment_info");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let course = document.getElementById("course").value;
        let assignment_name = document.getElementById("assignment_name").value;
        let deadline = document.getElementById("deadline").value;

        // store in json
        let course_info = {
            'Course': course,
            'Assignment': assignment_name,
            'Deadline': deadline
        };
        
        // check to see if there are existing assignments
        chrome.storage.local.get(['assignments'], function(result) {

            let assignments = result.assignments || [];

            assignments.push(course_info);

            chrome.storage.local.set({'assignments':assignments}, function(){
                console.log('StoredData: ', assignments)

            });
    
     });
    
    });

});
