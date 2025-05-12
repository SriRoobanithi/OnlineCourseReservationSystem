const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get('userid');
const id = urlParams.get('courseid');

let profilename=document.getElementById("profilename");
let email=document.getElementById("email");
let name=document.getElementById("name");
let age=document.getElementById("age");
let contactno=document.getElementById("contactno");
let url = `http://localhost:8080/api/findUser/${userid}`;
let url2=`http://localhost:8080/api/courses/${id}`;
let porm1=fetch(url)
porm1.then((response)=>{
    if(response.ok){
        return response.json();
    }else{
        throw new Error("Network response was not ok");
    }
}).then((data)=>{
    console.log(data);
    profilename.innerHTML=`<h2>${data.name}</h2>`;
    email.innerHTML=`<h2>${data.email}</h2>`;
    name.innerHTML=`<h2>${data.name}</h2>`;
    age.innerHTML=`<h2>${data.age}</h2>`;
    contactno.innerHTML=`<h2>${data.contactno}</h2>`;

}).catch(()=>{
    console.error("There was a problem with the fetch operation:", error);
});
let courseid=document.getElementById("courseid");
let coursename=document.getElementById("coursename");
let duration=document.getElementById("duration");
let courseauthor=document.getElementById("courseauthor");
let imgs=document.getElementById("imgs");
let idvalue=0;
let porm2=fetch(url2)
porm2.then((response)=>{
    if(response.ok){
        return response.json();
    }else{
        throw new Error("Network response was not ok");
    }
}).then((data2)=>{
    console.log(data2);
    idvalue=data2.id;
    imgs.innerHTML=`<img src="../assests/${data2.id}.jpeg" alt="course image" width="80px" height="80px">`;
    coursename.textContent=`${data2.coursename}`
    duration.innerHTML=`<h2>${data2.courseduration}</h2>`;
    courseauthor.innerHTML=`<h2>${data2.courseauthor}</h2>`;
}).catch((error)=>{
    console.error("There was a problem with the fetch operation:", error);
})

let explore=document.getElementById("explore_btn")
explore.addEventListener("click",()=>{
    if(idvalue==1){
        window.location.href=`https://www.w3schools.com/java`
    }
  if(idvalue==2){
    window.location.href=`https://www.w3schools.com/python` 
}
  if(idvalue==3){
    window.location.href=`https://www.w3schools.com/c`
  }
  if(idvalue==4){
    window.location.href=`https://www.w3schools.com/cpp/default.asp`
  }
    if(idvalue==5){
        window.location.href=`https://www.w3schools.com/sql`
    }
    if(idvalue==6){
        window.location.href=`https://www.w3schools.com/cs/index.php`
    }
})