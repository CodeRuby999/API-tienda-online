document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    const productFilter = document.getElementById('productFilter');
    let allProducts = [];

    async function fetchProducts() {
        try {
            productsContainer.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';

            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            
            allProducts = products.slice(0, 15);
            displayProducts(allProducts);
            updateFilter(allProducts);
            
            console.log('Productos cargados:', allProducts);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            productsContainer.innerHTML = '<div class="alert alert-danger">Error al cargar los productos</div>';
        }
    }

    function displayProducts(products) {
        productsContainer.innerHTML = products.map(product => `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function updateFilter(products) {
        productFilter.innerHTML = `
            <option value="all">Mostrar todos los productos</option>
            ${products.map(product => `
                <option value="${product.id}">${product.title}</option>
            `).join('')}
        `;
    }

    productFilter.addEventListener('change', (e) => {
        if (e.target.value === 'all') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                product => product.id === parseInt(e.target.value)
            );
            displayProducts(filteredProducts);
        }
    });

    fetchProducts();
});