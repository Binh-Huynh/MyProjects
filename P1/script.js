// script.js - Xử lý trang chủ (index.html)
document.addEventListener("DOMContentLoaded", () => {
    const cartCountElem = document.getElementById("cart-count");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const searchInput = document.getElementById("searchInput");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const productList = document.getElementById("productList");

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Tính tổng số lượng (nếu có nhiều hơn 1 sản phẩm trùng lặp)
        const totalQuantity = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
        cartCountElem.textContent = totalQuantity;
    }

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Nếu sản phẩm đã có, tăng số lượng
        const index = cart.findIndex(item => item.id === product.id);
        if (index > -1) {
            cart[index].quantity = parseInt(cart[index].quantity) + 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Đã thêm vào giỏ hàng!");
    }

    // Gán sự kiện cho các nút "Thêm vào giỏ"
    function bindAddToCartButtons() {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (e) => {
                const productElem = e.target.closest(".product");
                const product = {
                    id: productElem.getAttribute("data-id"),
                    name: productElem.getAttribute("data-name"),
                    price: productElem.getAttribute("data-price"),
                    category: productElem.getAttribute("data-category")
                };
                addToCart(product);
            });
        });
    }

    // Lọc sản phẩm theo tìm kiếm, danh mục và giá
    function filterProducts() {
        loadingSpinner.style.display = "block";
        setTimeout(() => {
            const searchValue = searchInput.value.trim().toLowerCase();
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;

            document.querySelectorAll(".product").forEach(product => {
                const name = product.getAttribute("data-name").toLowerCase();
                const category = product.getAttribute("data-category");
                const price = parseInt(product.getAttribute("data-price"));

                let matchesSearch = name.includes(searchValue);
                let matchesCategory = (categoryValue === "all" || category === categoryValue);
                let matchesPrice = false;
                if (priceValue === "all") {
                    matchesPrice = true;
                } else if (priceValue === "low" && price < 100000) {
                    matchesPrice = true;
                } else if (priceValue === "medium" && price >= 100000 && price <= 500000) {
                    matchesPrice = true;
                } else if (priceValue === "high" && price > 500000) {
                    matchesPrice = true;
                }

                product.style.display = (matchesSearch && matchesCategory && matchesPrice) ? "block" : "none";
            });
            loadingSpinner.style.display = "none";
        }, 500);
    }

    // Gán sự kiện cho bộ lọc và thanh tìm kiếm
    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
    searchInput.addEventListener("input", filterProducts);

    // Khởi tạo
    bindAddToCartButtons();
    updateCartCount();
});
