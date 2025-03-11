document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        if (cartCount) cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        const cart = getCart();
        cart.push(product);
        saveCart(cart);
        alert("Đã thêm vào giỏ hàng!");
    }

    function removeCartItem(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    function renderCart() {
        if (!cartItemsContainer || !totalPriceElement) return;
        const cart = getCart();
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price} VND</p>
                <button onclick="removeCartItem(${index})">Xóa</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += parseInt(item.price);
        });

        totalPriceElement.textContent = totalPrice;
    }

    if (document.querySelectorAll(".add-to-cart")) {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productElement = event.target.closest(".product");
                const product = {
                    id: productElement.dataset.id,
                    name: productElement.dataset.name,
                    price: productElement.dataset.price
                };
                addToCart(product);
            });
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            renderCart();
        });
    }

    updateCartCount();
    renderCart();
});
