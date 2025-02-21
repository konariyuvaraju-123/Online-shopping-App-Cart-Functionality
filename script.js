//elements references
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedBackElement = document.getElementById("feedback");

//default products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "StopWatch",
    price: 1000,
  },
  {
    id: 5,
    name: "HeadPhones",
    price: 500,
  },
];

//empty cart
const cart = [];

document.getElementById("clearCart").addEventListener("click", () => {
  cart.length = 0;
  renderCardDetails();
  updateUserFeedback("cart is empty", "success");
});
document.getElementById("sortPrice").addEventListener("click", () => {
  cart.sort((item1, item2) => {
    return item1.price - item2.price;
  });
  renderCardDetails();
});

function renderProductDetails() {
  products.forEach(function (product) {
    // const productRow=`<div class="product-row">
    //       <p>${product.name} - Rs. ${product.price}</p>
    //       <button>Add to cart</button>
    //     </div>`;
    // productsContainer.insertAdjacentHTML("beforeend", productRow);
    const divElement = document.createElement("div");
    divElement.className = "product-row";
    divElement.innerHTML = `<p>${product.name} - Rs. ${product.price}</p>
    <button onclick="addItem(${product.id})">Add to cart</button>`;
    productsContainer.appendChild(divElement);
  });
}
function renderCardDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product;
    const cartItemRow = `
  <div class="product-row">
  <p>${name} - Rs. ${price}</p>
  <button onclick="removeFromCart(${id})">Remove</button>
  </div>
  `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });
  // let totalprice=0;
  console.log("cart", cart);
  // for(let i=0; i<cart.length; i++) {
  //   totalprice=totalprice+cart[i].price;
  // }

  const totalprice = cart.reduce(function (acc, curProduct) {
    return acc + curProduct.price;
  }, 0);
  document.getElementById("totalPrice").innerHTML = `Rs: ${totalprice}`;
}
//add to cart
function addItem(id) {
  const isProductAvailable = cart.some(function (product) {
    return product.id === id;
  });
  if (isProductAvailable) {
    const productToAdd = cart.find(function (product) {
      return product.id === id;
    });
    updateUserFeedback(`Item already added to the cart`, "error");
    // feedBackElement.textContent = `${productToAdd.name} already added successfully`;
    return;
  }

  console.log("the item clicked", id);
  //check if the item already exists in the cart.
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });
  cart.push(productToAdd);
  console.log(cart);
  renderCardDetails();
  // feedBackElement.textContent = `${name} added successfully`;
  updateUserFeedback(`${productToAdd.name} is added to the cart`, "success");
}
function removeFromCart(id) {
  // debugger
  console.log(id);
  const product = cart.find((product) => product.id === id);
  // const updatedCart = cart.filter(function (product) {
  //   return product.id != id;
  // });
  const productIndex = cart.findIndex((product) => product.id === id);
  cart.splice(productIndex, 1);
  // cart=updatedCart;

  updateUserFeedback(`${product.name} is removed from the cart`, "error");
  // console.log(updatedCart);
  renderCardDetails();
}

//
let TimerId;
function updateUserFeedback(msg, type) {
  clearTimeout(TimerId);
  //type -success (green), error (red)

  feedBackElement.style.display = "block";

  if (type === "success") {
    feedBackElement.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedBackElement.style.backgroundColor = "red";
  }
  feedBackElement.textContent = msg;
  TimerId = setTimeout(() => {
    feedBackElement.style.display = "none";
  }, 4000);
}
renderProductDetails();