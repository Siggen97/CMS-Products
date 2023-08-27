/** @format */

document.addEventListener('DOMContentLoaded', () => {
	const params = new URLSearchParams(window.location.search);
	const productId = params.get('id');

	fetchMedia().then((fetchedMedia) => {
		media = fetchedMedia; // Store the media data in the media variable
		if (productId) {
			fetchProductDetails(productId);
		}
	});
});


function fetchProductDetails(id) {
	const apiUrl = `http://localhost/wordpress/wp-json/wp/v2/product/${id}?consumer_key=ck_6d879438f8fe05bafc6388f0ea4bfda8f4d169b1&consumer_secret=cs_0a9a68c9cfd4a10fca3831baa56639459ae80e62`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((product) => {
			displayProductDetail(product);
		});
}
let media = []; // This will store the media data

function fetchMedia() {
	const mediaApiUrl =
		'http://localhost/wordpress/wp-json/wp/v2/media?consumer_key=YOUR_KEY&consumer_secret=YOUR_SECRET';
	return fetch(mediaApiUrl).then((response) => response.json());
}


function displayProductDetail(product) {
	const section = document.getElementById('product-detail');
	section.innerHTML = ''; 

	let productTitle = document.createElement('h2');
	productTitle.textContent = product.title.rendered;

	let productDescription = document.createElement('p');
	productDescription.innerHTML = product.content.rendered;

    let productPrice = document.createElement('p');
		productPrice.textContent = `$29.99`;

		let productImage = document.createElement('img');
		let associatedMedia = media.find((m) => m.id === product.featured_media);
		if (associatedMedia && associatedMedia.source_url) {
			productImage.src = associatedMedia.source_url;
		}

		function addToCart(productId) {
			console.log(`Product with ID: ${productId} added to cart.`);
		}
		let addToCartButton = document.createElement('button');
		addToCartButton.innerText = 'add to cart';
		addToCartButton.className = 'addToCart';
		addToCartButton.addEventListener('click', () => {
			addToCart(product.id);
		});


	section.appendChild(productTitle);
    section.appendChild(productImage)
	section.appendChild(productDescription);
    section.appendChild(productPrice)
    section.appendChild(addToCartButton);
}
