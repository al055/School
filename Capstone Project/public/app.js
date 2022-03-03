// When the user scrolls down 20px from the top of the document, slide down the navbar
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
}

(function() {

    //initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyAujnCkalCLZvImYFVAk8D2YQuwhTIomxI",
      authDomain: "ecosense-75ed1.firebaseapp.com",
      databaseURL: "https://ecosense-75ed1-default-rtdb.firebaseio.com",
      projectId: "ecosense-75ed1",
      storageBucket: "ecosense-75ed1.appspot.com",
    };
    firebase.initializeApp(firebaseConfig);

    // Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // Add login event
    btnLogin.addEventListener('click', e => {
      // Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // Log In
      const promise = auth.signInWithEmailAndPassword(email, pass)
        .then(user => {
          alert("Thank You For Logging In!");
          window.location.href = "calculator.html";
        })
        promise.catch(e => {
          console.log(e.message);
          alert("User Not Found Please Try Again");
        })
    });

    // Add Sign up event
    btnSignUp.addEventListener('click', e => {
      // Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // Sign up 
      const promise = auth.createUserWithEmailAndPassword(email, pass)
        .then(cred => {
          alert("Thank You For Signing Up!");
          var uid = firebase.auth().currentUser.uid;
          firebase.database().ref().child('Users').update({
            userid: uid
          })
          window.location.href = "calculator.html";
        });
        promise.catch(e => {
          console.log(e.message);
          alert("Please Enter a Valid Email and Password");
        });
    });
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
      alert("Thank You For Logging Out");
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        $msg = 'Login Complete Thanks';
      } else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
      }
    })
} ())