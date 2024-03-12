chromeAssignments = chrome.storage.local.get(['assignments']).assignments
console.log(chromeAssignments = chrome.storage.local.get(['assignments']).assignments)

document.addEventListener('DOMContentLoaded', function() {
    // Load assignments from chrome.storage or another source
      i = 0
      if (!chromeAssignments) {
        // Load add assignment page if there are no assignments
        ToaddPopup();
      }
      else {
        chromeAssignments.forEach(assignment => {
          console.log(assignment);
          let assignmentDiv = document.createElement('div');
          assignmentDiv.classList.add('assignment');
    
          let heading = document.createElement('h3');
          heading.textContent = assignment.name;
    
          let course = document.createElement('p');
          course.textContent = 'Course: ' + assignment.course;
    
          let dueDate = document.createElement('p');
          dueDate.textContent = 'Due Date: ' + assignment.dueDate;
    
          let deleteIcon = document.createElement('img');
          deleteIcon.src = 'delete.png';
          deleteIcon.id = 'delete-icon' + i
          deleteIcon.classList.add('delete-icon');
    
          assignmentDiv.appendChild(heading);
          assignmentDiv.appendChild(course);
          assignmentDiv.appendChild(dueDate);
          assignmentDiv.appendChild(deleteIcon);
    
          document.body.appendChild(assignmentDiv);
          i++
        });
      }
  
    // Add button event listener
    document.getElementById('addButton').addEventListener('click', function() {
      ToaddPopup();
    });
    })

function ToaddPopup(){
  console.log(window.location.pathname);
  if (window.location.pathname != 'popup.html') {
    window.location.href = 'popup.html'; // Navigate to popup.html
  }
}

function addAssignment() {

}

function deleteAssignment(i) {
  chrome.storage.local.get(['assignments'], function(result) {
      if (result.assignments) {
          result.assignments.splice(i, 1);
          chrome.storage.local.set({ 'assignments': result.assignments }, function() {
              location.reload();
          });
      }
  });
}