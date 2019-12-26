function submitAddForm(event) {
    event.preventDefault();
    var contact = document.getElementById('employee-add-form');
    //here we will send data in json format behind the scene to the server
    var formData = {
      name: contact.elements.namedItem('name').value,
      jobTitle: contact.elements.namedItem('job').value,
      img: contact.elements.namedItem('img').value,
    }
    console.log(formData);
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        console.log(this);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 201) {
          var data = JSON.parse(this.responseText);
          console.log("sucess");
          //reset form
          document.getElementById('employee-add-form').reset();
          //display a sucess message in green
          var success = document.getElementById('success');
          success.classList.remove("hidden");
        }
      };
    ajax.open('post', './handleEmployee');
    ajax.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(formData));
    ajax.send(JSON.stringify(formData));
  }