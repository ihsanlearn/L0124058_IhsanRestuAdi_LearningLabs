async function fetchProducts() {
   try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      const productContainer = document.getElementById('product-container');

      
      data.forEach(product => {
         const shortDescription = product.description.length > 30 
         ? product.description.slice(0, 30) + '...' 
         : product.description;
         
         const shortTitle = product.title.length > 25 
         ? product.title.slice(0, 25) + '...' 
         : product.title;
         
         const stars = '★'.repeat(product.rating.rate) + '☆'.repeat(5 - product.rating.rate);
         
         const productCard = document.createElement('div');
         productCard.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden');

         productCard.innerHTML = `
         <img src="${product.image}" alt="${shortTitle}" class="w-full h-64 object-fit ">
         <div class="p-4 flex flex-col justify-between">
            <div>
               <h3 class="text-md font-semibold text-gray-800">${shortTitle}</h3>
               <p class="text-sm text-gray-500 mt-2">${shortDescription}</p>
               <div class="flex justify-between items-center mt-4">
               <span class="text-xl font-bold text-gray-900">$${product.price}</span>
                  <span class="text-yellow-500 text-lg">${stars}</span>
               </div>
            </div>
            <button class="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Add to Cart</button>
         </div>
         `;
         
         productContainer.appendChild(productCard);
      });
   } catch (error) {
      console.error('error fetching products:', error);
   }
}

async function fetchAnime() {
   try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime")
      const { data } = await response.json()
      
      const animeContainer = document.getElementById('anime-container')
      
      data.forEach(anime => {
         const shortSynps = anime.synopsis.length > 50
         ? anime.synopsis.slice(0, 50) + "..."
         : anime.synopsis

         const shortTitle = anime.title.length > 25 
         ? anime.title.slice(0, 25) + '...' 
         : anime.title;

         const animeCard = document.createElement('div');
         animeCard.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden');

         animeCard.innerHTML = `
            <img src="${anime.images.webp.image_url}" alt="${anime.title}" class="w-full h-64 object-fit ">
            <div class="p-4 flex flex-col justify-between">
               <div>
                  <h3 class="text-md font-semibold text-gray-800">${shortTitle}</h3>
                  <p class="text-sm text-gray-500 mt-2">${shortSynps}</p>
                  <div class="flex justify-between items-center mt-4">
                     <span class="text-md font-bold text-gray-900">${anime.rating}</span>
                  </div>
               </div>
               <a class="w-full mt-4 bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition-colors" target="_blank" href="https://youtube.com/watch?v=${anime.trailer.youtube_id}">Watch Now</a>
            </div>
         `;

         animeContainer.appendChild(animeCard)
      })

   } catch (error) {
      console.error('error fetching products: ', error)
   }
}

// Memanggil fungsi fetchProducts saat halaman dimuat
window.onload = function() {
   fetchProducts(),
   fetchAnime()
};