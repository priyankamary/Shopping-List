grocery_list = []

function render_list(){

  myUL = $('#myUL')
  myUL.empty()

  console.log(grocery_list)

  for(var item in grocery_list){
    console.log(grocery_list[item]["itemName"])
    var li = $('<li/>')
            .html(grocery_list[item]["itemName"]+" ("+grocery_list[item]["createdBy"]+")")
            .attr('id', grocery_list[item]["_id"])
            .appendTo(myUL)
    // $("myUL").append('<li>'+grocery_list[item]["itemName"]+'</li>')
  }

  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.id = grocery_list[i]['_id']
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    console.log("Adding onclick for ", i)
    close[i].addEventListener('click', function(){
      deleteItem(this.id)
    });
  }

  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
}


function deleteItem(id){
  $.ajax({
    url: '/api/list/'+id,
    type: 'DELETE'
  })
  .done(function(data){
    console.log("deleted: ", data)
    getGroceryList()
  })
  .fail(function(data){
    console.log("Error: ", data)
  })
}


function getGroceryList(){
  $.get('/api/list')
  .done(function(data){
    // console.log(data)
    grocery_list = data
    render_list()
  })
  .fail(function(data){
    console.log("Error: ", data)
  })
}

function newElement() {
  var itemName = $('#itemName').val()
  var createdBy = sessionStorage.getItem("username")

  console.log('newElement')
  console.log(itemName)
  $.post('/api/list', { "itemName": itemName, "createdBy": createdBy })
  .done(function(data){
    console.log(data)
    // grocery_list = data
    // render_list()
    getGroceryList()
  })
  .fail(function(data){
    console.log("Error: ", data)
  })
}

$(document).ready(function(){

  getGroceryList()
  // Create a new list item when clicking on the "Add" button
  
})