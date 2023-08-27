
const productApiUrl =
	'http://localhost/wordpress/wp-json/wp/v2/product?consumer_key=ck_6d879438f8fe05bafc6388f0ea4bfda8f4d169b1&consumer_secret=cs_0a9a68c9cfd4a10fca3831baa56639459ae80e62';
const mediaApiUrl =
	'http://localhost/wordpress/wp-json/wp/v2/media?consumer_key=ck_6d879438f8fe05bafc6388f0ea4bfda8f4d169b1&consumer_secret=cs_0a9a68c9cfd4a10fca3831baa56639459ae80e62';

async function fetchProductsAndMedia() {
	let productsResponse = await fetch(productApiUrl);
	let mediaResponse = await fetch(mediaApiUrl);

	let products = await productsResponse.json();
	let media = await mediaResponse.json();

	let featuredProduct = products.find((product) => product.id === 152);
	if (featuredProduct) {
		displayProduct(featuredProduct, 'feature-products', media);
	}

	let latestProducts = products.slice(0, 3);
	displayProducts(latestProducts, 'idkproducts-latest', media);
}

function getImageFromMedia(product, media) {
	let mediaItem = media.find((item) => item.id === product.featured_media);
	return mediaItem ? mediaItem.source_url : null;
}

function displayProduct(product, sectionId, media) {
	const section = document.getElementById(sectionId);

	let productDiv = document.createElement('div');
	productDiv.className = 'product';

	let productImage = document.createElement('img');
	let imageUrl = getImageFromMedia(product, media);
	if (imageUrl) {
		productImage.src = imageUrl;
		productDiv.appendChild(productImage);
	}

	let productTitle = document.createElement('h3');
	productTitle.textContent = product.title.rendered;

	let productContent = document.createElement('p');
	productContent.innerHTML = product.content.rendered;

    let productPrice = document.createElement('p');
		productPrice.textContent = `$29.99`;

    let productLink = document.createElement('a');
		productLink.href = `productDetail.html?id=${product.id}`;
		productLink.textContent = 'View Details';

	let addToCartButton = document.createElement('button');
	addToCartButton.innerText = 'Add to Cart';
    addToCartButton.className = 'addToCart';
	addToCartButton.addEventListener('click', () => {
	});

	productDiv.appendChild(productTitle);
    productDiv.appendChild(productImage);
	productDiv.appendChild(productContent);
    productDiv.appendChild(productLink);
    productDiv.appendChild(productPrice);
	productDiv.appendChild(addToCartButton);
	section.appendChild(productDiv);
}

function displayProducts(products, sectionId, media) {
	products.forEach((product) => displayProduct(product, sectionId, media));
}

// Call the main function
fetchProductsAndMedia();
