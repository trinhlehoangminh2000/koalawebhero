function submitAddForm(event) {
  event.preventDefault();
  var contact = document.getElementById('product-add-form');
  //here we will send data in json format behind the scene to the server
  var formData = {
    title: contact.elements.namedItem('title').value,
    price: contact.elements.namedItem('price').value,
    img: contact.elements.namedItem('img').value,
    description: contact.elements.namedItem('description').value
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
        document.getElementById('product-add-form').reset();
        //display a sucess message in green
        var success = document.getElementById('success');
        success.classList.remove("hidden");
      }
    };
  ajax.open('post', './handleproduct');
  ajax.setRequestHeader("Content-Type", "application/json");
  console.log(JSON.stringify(formData));
  ajax.send(JSON.stringify(formData));
}
function submitUpdateForm() {
  event.preventDefault();
  var contact = document.getElementById('product-update-form');
  //here we will send data in json format behind the scene to the server
  var formData = {
    id : document.getElementById('productid').innerHTML,
    title: contact.elements.namedItem('title').value,
    price: contact.elements.namedItem('price').value,
    img: contact.elements.namedItem('img').value,
    description: contact.elements.namedItem('description').value
  }
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
      console.log(this);
      console.log(this.status);
      if (this.readyState == 4 && this.status == 201) {
        var data = JSON.parse(this.responseText);
        console.log("sucess");
        var success = document.getElementById('success');
        success.classList.remove("hidden");
      }
    };
  ajax.open('post', './handleproductupdate');
  ajax.setRequestHeader("Content-Type", "application/json");
  console.log(JSON.stringify(formData));
  ajax.send(JSON.stringify(formData));
}