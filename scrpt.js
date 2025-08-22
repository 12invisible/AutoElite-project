
const cars = [
    {
        id: 1, brand: "Toyota", model: "Camry", year: 2023, price: 28500, fuel: "Gas", image: "https://www.toyotaaruba.com/readBlob.do?id=9193&width=&height=",
        features: ["Leather", "Sunroof", "Navigation"]
    },
    {
        id: 2, brand: "Honda", model: "Accord", year: 2023, price: 29500, fuel: "Gas", image: "https://hips.hearstapps.com/hmg-prod/images/2024-honda-accord-sport-hybrid-101-673b7a93c4168.jpg?crop=0.637xw:0.535xh;0.298xw,0.363xh&resize=2048:*",
        features: ["Premium Sound", "Heated Seats"]
    },
    {
        id: 3, brand: "Ford", model: "Mustang", year: 2023, price: 42500, fuel: "Gas", image: "https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80",
        features: ["V8 Engine", "Sport Package"]
    },
    {
        id: 4, brand: "BMW", model: "3 Series", year: 2023, price: 48500, fuel: "Gas", image: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-3-series-108-66562dcf5c7e3.jpg?crop=0.624xw:0.524xh;0.184xw,0.313xh&resize=1200:*",
        features: ["Luxury Package", "Premium"]
    },
    { id: 5, brand: "Tesla", model: "Model 3", year: 2023, price: 42500, fuel: "Electric", image: "https://images.prismic.io/carwow/aCxkIidWJ-7kSVx9_TeslaModel32025exteriorfrontthreequarterviewdriving.jpg", features: ["Autopilot", "Electric"] },
    {
        id: 6, brand: "Mercedes", model: "C-Class", year: 2022, price: 45500, fuel: "Gas", image: "https://financialexpresswpcontent.s3.amazonaws.com/uploads/2018/08/c-class-med.jpg",
        features: ["Luxury", "Premium"]
    },
    {
        id: 7, brand: "Toyota", model: "RAV4", year: 2023, price: 32500, fuel: "Hybrid", image: "https://img.autocarindia.com/ExtraImages/20250521010312_2025_Toyota_Rav4_front.jpg",
        features: ["AWD", "Hybrid"]
    },
    {
        id: 8, brand: "Honda", model: "CR-V", year: 2022, price: 30500, fuel: "Gas", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPejzO2Y84BWm3nueYdwtzUfRt6tnLirmsEg&s",
        features: ["Family", "Spacious"]
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayCars(cars);
    updatePriceValue();
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun text-warning fs-5';
    } else {
        icon.className = 'fas fa-moon text-white fs-5';
    }
}

// Price range update
function updatePriceValue() {
    const range = document.getElementById('priceRange');
    const value = document.getElementById('priceValue');
    value.textContent = '$' + parseInt(range.value).toLocaleString();
}

// Display cars
function displayCars(carsToDisplay) {
    const grid = document.getElementById('carGrid');
    grid.innerHTML = '';

    carsToDisplay.forEach(car => {
        const card = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="car-card card h-100">
                            <span class="position-absolute top-0 end-0 badge bg-danger mt-2 me-2">New</span>
                            <img src="${car.image}" class="car-image card-img-top" alt="${car.brand} ${car.model} ${car.year} - ${car.fuel} vehicle">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                                    <span class="badge badge-premium">$${car.price.toLocaleString()}</span>
                                </div>
                                <p class="card-text text-muted small">${car.year} • ${car.fuel} • ${car.features.join(' • ')}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewCar(${car.id})">
                                        <i class="fas fa-eye me-1"></i>Details
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="addToFavorites(${car.id})">
                                        <i class="fas fa-heart me-1"></i>Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        grid.innerHTML += card;
    });
}

// Search functionality
function searchCars() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = cars.filter(car =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.features.some(f => f.toLowerCase().includes(query))
    );
    displayCars(filtered);
}

// Apply filters
function applyFilters() {
    const brand = document.getElementById('brandFilter').value;
    const year = document.getElementById('yearFilter').value;
    const fuel = document.getElementById('fuelFilter').value;
    const price = parseInt(document.getElementById('priceRange').value);

    const filtered = cars.filter(car =>
        (brand === '' || car.brand === brand) &&
        (year === '' || car.year.toString() === year) &&
        (fuel === '' || car.fuel === fuel) &&
        car.price <= price
    );

    displayCars(filtered);
}

// Sort cars
function sortCars() {
    const sortBy = document.getElementById('sortSelect').value;
    let sorted = [...cars];

    switch (sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'year-desc':
            sorted.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            sorted.sort((a, b) => a.year - b.year);
            break;
    }

    displayCars(sorted);
}

// View car details
function viewCar(id) {
    alert('Viewing car details for ID: ' + id);
    // In a real app, this would open a modal or navigate to a details page
}

// Add to favorites
function addToFavorites(id) {
    alert('Added car ' + id + ' to favorites!');
}

// Initialize price range slider
document.getElementById('priceRange').addEventListener('input', updatePriceValue);
