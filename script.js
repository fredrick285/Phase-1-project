if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for ( let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  const  addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  const  cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
 const  buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  const input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
 let button = event.target
 let shopItem = button.parentElement.parentElement
 let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
 let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
 let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
 let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
 let cartItems = document.getElementsByClassName('cart-items')[0]
 let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
 let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
 let cartItemContainer = document.getElementsByClassName('cart-items')[0]
 let cartRows = cartItemContainer.getElementsByClassName('cart-row')
 let total = 0
  for (let i = 0; i < cartRows.length; i++) {
     let cartRow = cartRows[i]
     let priceElement = cartRow.getElementsByClassName('cart-price')[0]
     let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
     let price = parseFloat(priceElement.innerText.replace('$', ''))
     let quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
//about info

//async function getInfo() {
  //let url = ' http://localhost:3000';
  //try {
    //  let res = await fetch(url);
      //return await res.json();
  ///} catch (error) {
      //console.log(error);
  //}
//}
//async function renderInfo() {
  //let about = await getUsers();
  //let html = '';
  //users.forEach(user => {
    //  let htmlSegment = `<div class="user">
      //                   <h2>${user.mission}<h2>
        //                  <h2>${about.vision}</h2>
          //                <div class="email"><a href="email:${user.email}">${user.email}</a></div>
            //          </div>`;

      //html += htmlSegment;
  //});

 // let container = document.querySelector('.container');
 // container.innerHTML = html;
//}

//renderInfo();
///const  aboutButton = document.getElementsByClassName('about')
  //for (let i = 0; i < aboutButton.length; i++) {
    //let button =renderInfo[i]
      //button.addEventListener('click', )}
      let aboutInfo={
        "mission":"to thrive and be sole solar accesssories supplier",
        "vision":"make people lives easier"
      }
      async function loadInfo(){
        return (await fetch(" http://localhost:3000/About"))
      }
      document.addEventListener("DOMContentLoaded" , async()=>{
        let info=[];
        try{info=await loadInfo();
        }catch (e) {
          console.log(error);
          console.log(e);
      }show(info);
    })
// // Function to hide the loader
// function hideloader() {
//   document.getElementById('loading').style.display = 'none';
// }
// // Function to define innerHTML for HTML table
// function show(data) {
//   let tab = 
//       `<tr>
//         <th>Name</th>
//         <th>Office</th>
//         <th>Position</th>
//         <th>Salary</th>
//        </tr>`;
  
//   // Loop to access all rows 
//   for (let r of data.list) {
//       tab += `<tr> 
//   <td>${r.name} </td>
//   <td>${r.office}</td>
//   <td>${r.position}</td> 
//   <td>${r.salary}</td>          
// </tr>`;
//   }
//   // Setting innerHTML as tab variable
function show(info){
  document.getElementById("aboutNav").innerHTML = info;
  Object.keys(aboutInfo).forEach(item => {
    const li=document.createElement('li');
    li.appendChild(document.createTextnode(item));
    li.setAttribute('id',$[item])
    info.appendParent(li);
    
  })
}
