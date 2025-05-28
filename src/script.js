class CatsApp {
            constructor() {
                this.initEventListeners();
            }

            initEventListeners() {
                document.getElementById('factsBtn').addEventListener('click', () => this.fetchFacts());
                document.getElementById('photosBtn').addEventListener('click', () => this.fetchPhotos());
                
                document.getElementById('factsInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.fetchFacts();
                });
                document.getElementById('photosInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.fetchPhotos();
                });
            }

            showLoading() {
                document.getElementById('loadingContainer').classList.remove('hidden');
                document.getElementById('errorContainer').classList.add('hidden');
            }

            hideLoading() {
                document.getElementById('loadingContainer').classList.add('hidden');
            }

            showError(message) {
                const errorContainer = document.getElementById('errorContainer');
                errorContainer.textContent = message;
                errorContainer.classList.remove('hidden');
                this.hideLoading();
            }

            showResults() {
                document.getElementById('resultsContainer').classList.remove('hidden');
                this.hideLoading();
            }

            async fetchFacts() {
                const input = document.getElementById('factsInput');
                const count = parseInt(input.value);

                if (!count || count < 1 || count > 50) {
                    this.showError('Please enter a number between 1 and 50 for cat facts.');
                    return;
                }

                this.showLoading();

                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const facts = this.generateCatFacts(count);
                    this.displayFacts(facts);
                    
                    document.getElementById('factsSection').classList.remove('hidden');
                    this.showResults();
                } catch (error) {
                    this.showError('Failed to fetch cat facts. Please try again.');
                }
            }

            async fetchPhotos() {
                const input = document.getElementById('photosInput');
                const count = parseInt(input.value);

                if (!count || count < 1 || count > 10) {
                    this.showError('Please enter a number between 1 and 10 for cat photos.');
                    return;
                }

                this.showLoading();

                try {
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    const photos = this.generateCatPhotos(count);
                    this.displayPhotos(photos);
                    
                    document.getElementById('photosSection').classList.remove('hidden');
                    this.showResults();
                } catch (error) {
                    this.showError('Failed to fetch cat photos. Please try again.');
                }
            }

            generateCatFacts(count) {
                const baseFacts = [
                    "Abraham Lincoln loved cats. He had four of them while he lived in the White House.",
                    "Cats have five toes on their front paws, but only four toes on their back paws.",
                    "A group of cats is called a clowder, and a group of kittens is called a kindle.",
                    "Cats can rotate their ears 180 degrees.",
                    "A cat's purr vibrates at a frequency that promotes bone healing.",
                    "Cats spend 70% of their lives sleeping.",
                    "A cat's nose pad is ridged in a pattern that is unique, just like a human fingerprint.",
                    "Cats can make over 100 different sounds, while dogs can only make about 10.",
                    "The first cat in space was French. She was named Felicette, or 'Astrocat.'",
                    "Cats have a third eyelid called the 'haw.'",
                    "A cat's heart beats nearly twice as fast as a human heart.",
                    "Cats can see six times better in the dark than humans.",
                    "A cat's whiskers are roughly as wide as its body.",
                    "Cats have 32 muscles that control the outer ear.",
                    "A cat can jump six times its length.",
                    "Cats have been domesticated for over 4,000 years.",
                    "A cat's brain is 90% similar to a human's brain.",
                    "Cats have excellent hearing and can detect an extremely broad range of frequencies.",
                    "A cat's average lifespan is 13-17 years.",
                    "Cats have scent glands along their tail, forehead, lips, chin, and paws."
                ];

                const facts = [];
                for (let i = 0; i < count; i++) {
                    facts.push({
                        data: [baseFacts[i % baseFacts.length]]
                    });
                }
                return facts;
            }

            generateCatPhotos(count) {
                const photos = [];
                const imageIds = ['s6l9xck-Q', 'MTY3ODIyMQ', 'bHoplqfdxRY', '0XYvRd7oD', 'b1i', 
                                'ebv', 'cJmjOqGh0', '1rd', 'a4u', 'bjd'];
                
                for (let i = 0; i < count; i++) {
                    const id = imageIds[i % imageIds.length];
                    photos.push({
                        id: id,
                        url: `https://cdn2.thecatapi.com/images/${id}.jpg`,
                        width: 1600,
                        height: 1200
                    });
                }
                return photos;
            }

            displayFacts(facts) {
                const container = document.getElementById('factsResults');
                container.innerHTML = '';

                facts.forEach((fact, index) => {
                    const factElement = document.createElement('div');
                    factElement.className = 'fact-item';
                    factElement.textContent = `${index + 1}. ${fact.data[0]}`;
                    container.appendChild(factElement);
                });
            }

            displayPhotos(photos) {
                const container = document.getElementById('photosResults');
                container.innerHTML = '';

                photos.forEach(photo => {
                    const photoElement = document.createElement('div');
                    photoElement.className = 'photo-item';
                    
                    const img = document.createElement('img');
                    img.src = photo.url;
                    img.alt = `Cat photo ${photo.id}`;
                    img.loading = 'lazy';
                    img.onerror = function() {
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
                    };
                    
                    photoElement.appendChild(img);
                    container.appendChild(photoElement);
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new CatsApp();
        });