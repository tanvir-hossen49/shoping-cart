let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, price, img, desc, name } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div class="item" id='product-id-${id}'>
          <img src="${img}" alt="" width="100%" />
          <div class="details">
            <h3>${name}</h3>
            <p>
            ${desc}
            </p>
            <div class="price-quantitye">
              <h2>$ ${price}</h2>
              <div class="button">
                <i onclick='decreament(${id})' class="bi bi-dash-lg"></i>
                <div class="quantity" id=${id}>${
        search.item === undefined ? 0 : search.item
      }</div>
                <i onclick='increament(${id})' class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
      </div>`;
    })
    .join(""));
};
generateShop();

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


