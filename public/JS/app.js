
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBHTLb_v3gjXNH_sepXbYGRTy3_DPbzuQ0",
    authDomain: "authweb-1b.firebaseapp.com",
    databaseURL: "https://authweb-1b-default-rtdb.firebaseio.com",
    projectId: "authweb-1b",
    storageBucket: "authweb-1b.appspot.com",
    messagingSenderId: "423190698897",
    appId: "1:423190698897:web:396a837ea1ef0d01c65830"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

  var dp = firebase.database()

//   console.log(dp);

  
  function addtodo() {
      var input = document.getElementById("inputField");
      if(input.value){

        
        var key = Date.now().toString(26)
        
        var userInput = {
          input:input.value,
          key
        }
        
        firebase.database().ref("userInput/" + key).set(userInput)
        
        input.value = "";
      }else{
        alert("Enter your Task")
      }
      }
      firebase.database().ref("userInput").on("child_added", function(data){
         // ***************************Create list*********************************
         
         var liElement = document.createElement("li");
         
         
         var liText = document.createTextNode(data.val().input);
         
         
         liElement.appendChild(liText);
         
         // ***********************Delete button**********************************
         
         var delbtn = document.createElement("button");
         
         var delbtnText = document.createTextNode("Delete");
         
         delbtn.appendChild(delbtnText);
         
         delbtn.setAttribute("onclick", "deleteItem(this)");
         
         delbtn.setAttribute("id", data.val().key)
         
         
         liElement.appendChild(delbtn);
         
         // ***********************Edit button**********************************
         
         var editbtn = document.createElement("button");
         
         var editbtnText = document.createTextNode("Edit");
         
         editbtn.appendChild(editbtnText);
         
         liElement.appendChild(editbtn);
         
         editbtn.setAttribute("onclick", "editItem(this)");
         
         editbtn.setAttribute("id", data.val().key)
         
         var list = document.getElementById("list");
         
         list.appendChild(liElement);
         
         var liElement2 = document.createElement("span");

         liElement2.setAttribute("class" , "task task-complete")

         liElement.appendChild(liElement2)
  
        }
)


function deleteAll() {
  firebase.database().ref("userInput").remove()
  var list = document.getElementById("list");
  list.innerHTML = "";
}

function deleteItem(z) {
  firebase.database().ref("userInput").child(z.id).remove()
  z.parentNode.remove();
}

function editItem(e) {
    var valueName = e.parentNode.firstChild.nodeValue;
    var input1 = prompt("Enter updated value...",valueName);
    var editText = {
      input :input1,
      key:e.id,
    }
    firebase.database().ref("userInput").child(e.id).set(editText)
    e.parentNode.firstChild.nodeValue = input1;
    
  }