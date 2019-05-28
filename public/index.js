firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Selamat Datang : " + email_id;
	  //console.log(email_id);

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}


//unique counter for each data
let d = new Date();
let uid = d.getTime();
let counter = uid;

//get form
document.getElementById("map-form").addEventListener("submit", submitMap);

function submitMap(e) {
  e.preventDefault();

  let title = getInput("title");
  let address = getInput("address");
  let icon = getInput("icon");
  let img = getInput("img");
  let lat = getInput("lat");
  let lng = getInput("lng");
  let phone = getInput("phone");
  let tags = getInput("tags");
  let url = getInput("url");

  saveMap(title, address, icon, img, lat, lng, phone, tags, url);
  initMap();

  //alert message
  document.querySelector(".alert").style.display = "block";

  //hide after 3 second
  setTimeout(function() {
    document.querySelector(".alert").style.display = "none";
  }, 2000);
  document.getElementById("map-form").reset();
}

//fuction to get form values
function getInput(id) {
  return document.getElementById(id).value;
}

//save data to database
function saveMap(title, address, icon, img, lat, lng, phone, tags, url) {
  counter += 1;
  let map = {
    id: counter,
    title: title,
	address: address,
	icon: icon,
	img: img,
    lat: lat,
    lng: lng,
	phone: phone,
	tags: {0: tags},
	url: url
  };
  let mapRef = firebase.database().ref("maps/" + counter);
  mapRef.set(map);
  document.getElementById("box").innerHTML = "";
}

//retrieve data from database
function getMaps() {
  let mapRef = firebase.database().ref("maps/");
  mapRef.on("child_added", function(data) {
    let res = data.val();
    document.getElementById("box").innerHTML += `
        <ul>
        <li>Name of Place:${res.title}</li>
        <li>Latitude:${res.lat}</li>
        <li>Longitude:${res.lng}</li>
        <button class="btn" onclick=""><i class="fas fa-edit"></i> Edit</button>
    </ul>
    <br><br>
        `;
  });
}
