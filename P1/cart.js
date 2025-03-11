// cart.js - Xử lý trang giỏ hàng (cart.html)
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElem = document.getElementById("totalPrice");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    function loadCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Hiển thị các mục giỏ hàng
    function renderCart() {
        const cart = loadCart();
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemTotal = parseInt(item.price) * parseInt(item.quantity);
            totalPrice += itemTotal;
            const tr = document.createElement("tr");
            tr.innerHTML = `
          <td>${item.name}</td>
          <td>${Number(item.price).toLocaleString()} VND</td>
          <td>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
          </td>
          <td>${itemTotal.toLocaleString()} VND</td>
          <td><button class="remove-item" data-index="${index}">Xóa</button></td>
        `;
            cartItemsContainer.appendChild(tr);
        });
        totalPriceElem.textContent = "Tổng tiền: " + totalPrice.toLocaleString() + " VND";
        bindCartEvents();
    }

    // Gán sự kiện cho nút xóa và thay đổi số lượng
    function bindCartEvents() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeItem(index);
            });
        });
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", (e) => {
                const index = e.target.getAttribute("data-index");
                const newQty = parseInt(e.target.value);
                updateQuantity(index, newQty);
            });
        });
    }

    function removeItem(index) {
        const cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    function updateQuantity(index, newQty) {
        const cart = loadCart();
        if (newQty < 1) newQty = 1;
        cart[index].quantity = newQty;
        saveCart(cart);
        renderCart();
    }

    clearCartBtn.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không?")) {
            localStorage.removeItem("cart");
            renderCart();
        }
    });

    checkoutBtn.addEventListener("click", () => {
        if (confirm("Xác nhận thanh toán?")) {
            alert("Thanh toán thành công!");
            localStorage.removeItem("cart");
            renderCart();
        }
    });

    renderCart();
});
