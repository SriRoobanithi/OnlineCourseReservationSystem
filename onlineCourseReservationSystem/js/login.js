const signinTab = document.getElementById("signinTab");
const signupTab = document.getElementById("signupTab");
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");

signinTab.addEventListener("click", () => {
  signinForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  signinTab.classList.add("text-indigo-600", "border-indigo-600");
  signinTab.classList.remove("text-gray-400");
  signupTab.classList.remove("text-pink-600", "border-pink-500");
  signupTab.classList.add("text-gray-400");
});

signupTab.addEventListener("click", () => {
  signinForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  signupTab.classList.add("text-pink-600", "border-pink-500");
  signupTab.classList.remove("text-gray-400");
  signinTab.classList.remove("text-indigo-600", "border-indigo-600");
  signinTab.classList.add("text-gray-400");
});

let signinbtn = document.getElementById("signin_btn");
let signupbtn = document.getElementById("signup_btn");
signupbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let contactno = document.getElementById("contactno").value;
  let data = {
    email,
    password,
    name,
    age,
    contactno,
  };
  let url = "http://localhost:8080/api/addUser";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status == 200) {
        alert("User Created Successfully");
      } else {
        alert("User Already Exists");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
let url1 = "http://localhost:8080/api/getUser";
signinbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let logemail = document.getElementById("logemail").value;
  let logpassword = document.getElementById("logpassword").value;
  let url2 = `http://localhost:8080/api/getuser/${logemail}`;
  let porm = fetch(url2);
  porm
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.password == 12345) {
        alert("Login Successful");
        window.location.href = "adminhome.html";
      } else if (data.password == logpassword) {
        alert("Login Successful");
        let id=data.id;
        let name=data.name;
     window.location.href = `home2.html?username=${name}&score=${id}`;
        // window.location.href = "home2.html";
      } else {
        alert("Invalid Password");
      }
    })
    .catch(() => {
      alert("User Not Found");
      console.log("error using api");
    });
});
