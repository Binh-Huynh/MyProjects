document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cart-count");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const searchInput = document.getElementById("searchInput");
    const productList = document.getElementById("productList");
    const loadingSpinner = document.getElementById("loadingSpinner");

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Đã thêm vào giỏ hàng!");
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            const product = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: productElement.dataset.price,
                category: productElement.dataset.category
            };
            addToCart(product);
        });
    });

    function filterProducts() {
        loadingSpinner.style.display = "block"; // Hiện loading

        setTimeout(() => {
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;
            const searchValue = searchInput.value.toLowerCase();

            document.querySelectorAll(".product").forEach(product => {
                const productName = product.dataset.name.toLowerCase();
                const productCategory = product.dataset.category;
                const productPrice = parseInt(product.dataset.price);

                let categoryMatch = categoryValue === "all" || productCategory === categoryValue;
                let priceMatch = false;
                let searchMatch = productName.includes(searchValue);

                if (priceValue === "all") priceMatch = true;
                else if (priceValue === "low" && productPrice < 100000) priceMatch = true;
                else if (priceValue === "medium" && productPrice >= 100000 && productPrice <= 500000) priceMatch = true;
                else if (priceValue === "high" && productPrice > 500000) priceMatch = true;

                product.style.display = (categoryMatch && priceMatch && searchMatch) ? "block" : "none";
            });

            loadingSpinner.style.display = "none"; // Ẩn loading
        }, 500);
    }

    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
    searchInput.addEventListener("input", filterProducts);

    updateCartCount();
});
