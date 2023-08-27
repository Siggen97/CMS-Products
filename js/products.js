/** @format */

document.addEventListener('DOMContentLoaded', () => {
	fetchProducts();
});

function fetchProducts() {
	const productsApiUrl =
		'http://localhost/wordpress/wp-json/wp/v2/product?consumer_key=ck_6d879438f8fe05bafc6388f0ea4bfda8f4d169b1&consumer_secret=cs_0a9a68c9cfd4a10fca3831baa56639459ae80e62';
	const mediaApiUrl =
		'http://localhost/wordpress/wp-json/wp/v2/media?consumer_key=ck_6d879438f8fe05bafc6388f0ea4bfda8f4d169b1&consumer_secret=cs_0a9a68c9cfd4a10fca3831baa56639459ae80e62';

	// Fetch both products and media
	Promise.all([fetch(productsApiUrl), fetch(mediaApiUrl)])
		.then((responses) => Promise.all(responses.map((res) => res.json())))
		.then(([products, media]) => {
			displayProducts(products, media);
		})
		.catch((error) => console.error('Error fetching data:', error));
}

function displayProducts(products, media) {
	const productsSection = document.getElementById('productsidk');

	products.forEach((product) => {
		let productDiv = document.createElement('div');
		productDiv.className = 'product';

		let productTitle = document.createElement('h3');
		productTitle.textContent = product.title.rendered;
		

		let productContent = document.createElement('p');
		productContent.innerHTML = product.content.rendered;

		let productPrice = document.createElement('p');
		productPrice.textContent = `$29.99`;

		let productImage = document.createElement('img');
		let associatedMedia = media.find((m) => m.id === product.featured_media);
		if (associatedMedia && associatedMedia.source_url) {
			productImage.src = associatedMedia.source_url;
		}

		let productLink = document.createElement('a');
		productLink.href = `productDetail.html?id=${product.id}`;
		productLink.textContent = 'View Details';
		productLink.addClassName = 'viewDetails';
		
		
		
		function addToCart(productId) {
			console.log(`Product with ID: ${productId} added to cart.`);
		}
		let addToCartButton = document.createElement('button');
		addToCartButton.innerText = "add to cart";
		addToCartButton.className = 'addToCart';
		addToCartButton.addEventListener('click', () => {
			addToCartButton(product.id);
		});
		
		productDiv.appendChild(productTitle);
		productDiv.appendChild(productImage);
		productDiv.appendChild(productContent);
		productDiv.appendChild(productLink);
		productDiv.appendChild(productPrice);
		productDiv.appendChild(addToCartButton);
		productsSection.appendChild(productDiv);
	});
	
}
