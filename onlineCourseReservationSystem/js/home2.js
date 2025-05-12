let ids={}
let courseid=0;
// Get data from URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const score = urlParams.get('score');
let userid=score;
let profilename=document.getElementById("profilename");
profilename.innerHTML=`<h2>${username}</h2>`;
document.addEventListener("DOMContentLoaded", ()=> {
    let cards=document.getElementById("main_card");
    const url="http://localhost:8080/api/getall";
    let prom=fetch(url)
    prom.then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Network response was not ok");
        }
    }).then((data)=>{
        console.log(data)
        data.forEach((items,keys)=>{
            let div=document.createElement("div");
            div.className="card";
            div.innerHTML=`
            <img src="../assests/${keys+1}.jpeg" alt="course image" class="cardimg">
            <div id="cardname" class="carditems"><h2>${items.coursename}</h2>
            <p>${items.courseduration}</p></div>
            <div id="cardcost" class="carditems"><p>${items.courseauthor}</p>
            <p>$${items.cost}</p></div>
            <button id="addcart${keys+1}" class="btn">Add to cart</button>`;
           cards.appendChild(div);
          console.log(keys)
          ids[keys]=items;
          console.log(ids)
    }).catch((error)=>{
        console.error("There was a problem with the fetch operation:", error);
    });
})
let carddiv=document.getElementById("carddiv");
let cardicon=document.getElementById("cardicon");
count=0;
cardicon.addEventListener("click",()=>{
  if(count==0){
    carddiv.style.display="flex";
    count=1;}
    else{
      carddiv.style.display="none";
      count=0;
    }
})
})
let counttotal=0;
document.addEventListener("click", (event) => {
    let cartdetail=document.getElementById("cartdetail");
    cartdetail.style.display="none";
    if (event.target && event.target.classList.contains("btn")) {
        const buttonId = event.target.id;
        const cardIndex = buttonId.replace("addcart", "");
        const selectedItem = ids[cardIndex - 1];

        if (selectedItem) {
            counttotal+=selectedItem.cost;
            console.log(counttotal);
            let cartDiv = document.getElementById("carddiv");
            let cartItem = document.createElement("table");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
               <tr>
               <td><img src="../assests/${cardIndex}.jpeg" alt="course image" class="cartimg"></td>
                <td><h2>${selectedItem.coursename}</h2></td>
                <td><p>${selectedItem.courseduration}</p></td>
                <td><p>${selectedItem.courseauthor}</p></td>
                <td><p>$${selectedItem.cost}</p></td>
                <td><button class="remove-btn">Remove</button></td>
                 </tr>
            `;
            courseid=selectedItem.id;
            console.log(courseid);
            cartDiv.appendChild(cartItem);
            let proceed=document.createElement("div");
            proceed.className="proceed";
            proceed.innerHTML=`
            <h2 id="totalvalue">total:$${counttotal}</h2>
            <button id="proceed_btn" class="btns">checkout</button>`;
            cartDiv.appendChild(proceed);
            alert(`${selectedItem.coursename} has been added to the cart!`);
        } else {
            console.error("Item not found in ids object.");
        }
    }
});
document.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("remove-btn")) {
        const cartItem = event.target.closest(".cart-item");
        if (cartItem) {
            cartItem.remove();
            alert("Item removed from cart!");
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "proceed_btn") {
        window.location.href = `dashboard.html?userid=${userid}&courseid=${courseid}`;
    }
});