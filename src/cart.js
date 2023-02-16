let shopingCart = document.getElementById("shopingCart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  const cartItem = document.getElementById("cartAmount");
  let sum = 0;
  for (let i of basket) {
    sum += i.item;
  }
  cartItem.innerHTML = sum;
};
calculation();

let generateShopingCart = () => {
  if (basket.length !== 0) {
    return (shopingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let { name, img, price } = shopItemData.find((x) => x.id === id) || [];

        return `
        <div class='cart-item'>
            <img src='${img}' width='100'>

            <div class='details'>
                <div class='title-price-x'>
                    <h4 class='title-price'>
                        <p class='cart-item-name'>${name}</p>
                        <p class='cart-item-price'>$${price}</p>
                    </h4>
                    <i class='bi bi-x-lg'></i>
                </div>

                <div class='cart-btn'>
                  
                    <i onclick='decreament(${id})' class="bi bi-dash-lg"></i>
                    <div class="quantity" id=${id}>${item}</div>
                    <i onclick='increament(${id})' class="bi bi-plus-lg"></i>
                </div>
                
                <h3></h3>
            </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shopingCart.innerHTML = "shoping cart is empty";
  }
};
generateShopingCart();

let increament = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) {
    basket.push({
      id: selectedItems.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItems.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decreament = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItems.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
