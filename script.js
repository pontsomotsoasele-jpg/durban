// Dynamic Welcome Message 
const welcomeMessage = document.getElementById("welcomeMessage");
if (welcomeMessage) {
  function updateWelcomeMessage() {
    const now = new Date();
    welcomeMessage.textContent = `Welcome! Today is ${now.toDateString()} and the time is ${now.toLocaleTimeString()}`;
  }
  updateWelcomeMessage();
  setInterval(updateWelcomeMessage, 1000);
}

// Hero Slideshow 
const hero = document.getElementById("hero");
if (hero) {
  const images = ["durban.jpg", "durban1.jpg", "durban2.jpg"];
  let currentIndex = 0;

  function updateHeroBackground() {
    hero.style.backgroundImage = `url(${images[currentIndex]})`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  }

  updateHeroBackground();

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const colorBtn = document.getElementById("colorBtn");

  if (nextBtn) nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateHeroBackground();
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateHeroBackground();
  });

  if (colorBtn) colorBtn.addEventListener("click", () => {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    document.body.style.backgroundColor = randomColor;
  });
}

//  Mobile Menu Toggle \
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('showing');
  });
}

//  About Page: Durban Info & Fun Facts 
const durbanInfo = {
  history: "Durban’s history stretches back centuries, beginning with the indigenous Zulu people who settled in KwaZulu-Natal. Portuguese explorer Vasco da Gama arrived in 1497, naming the area 'Natal'. British settlers arrived in the early 19th century, and by 1835 the town was named after Sir Benjamin D’Urban. The city grew as a strategic port and welcomed Indian laborers in the late 1800s, shaping its cultural and economic identity.",
  culture: "Durban’s culture blends African, Indian, and European influences. Zulu traditions are central, with music, dance, beadwork, and storytelling. The Indian community enriches the city with festivals, spice markets, and cuisine such as 'bunny chow'. Contemporary art, fashion, and music thrive alongside cultural heritage, making Durban a vibrant city where history and diversity meet the ocean.",
  attractions: [
    "Golden Mile beachfront with hotels, restaurants, and promenades.",
    "uShaka Marine World, an aquarium and water park.",
    "Durban Botanic Gardens, Africa's oldest surviving botanical gardens.",
    "Valley of a Thousand Hills for scenic views and Zulu culture.",
    "KwaMuhle Museum and Phansi Museum for history and culture."
  ]
};

const funFacts = [
  "Durban is home to the world’s largest population of Indians outside of India.",
  "Durban’s Golden Mile is over 6 kilometers long.",
  "The city hosts the annual Durban International Film Festival.",
  "Durban was one of the first cities in South Africa to have a municipal electricity supply."
];

// Display History & Culture
const historyCultureSection = document.getElementById('historyCulture');
if (historyCultureSection) {
  historyCultureSection.innerHTML = `
    <h2>History & Culture</h2>
    <p>${durbanInfo.history}</p>
    <p>${durbanInfo.culture}</p>
    <button id="toggleExtra">Show More / Show Less</button>
    <p id="extraInfo" class="hidden">
      The city's cultural life is tied to the ocean, with surfing, fishing, and beach festivals being integral to leisure activities.
    </p>
  `;

 const toggleExtraBtn = document.getElementById('toggleExtra');
if (toggleExtraBtn) {
  toggleExtraBtn.addEventListener('click', () => {
    const extra = document.getElementById('extraInfo');
    if (extra) extra.classList.toggle('show');
  });
}

}

// Display Attractions
const attractionsSection = document.getElementById('attractions');
if (attractionsSection) {
  let attractionsHTML = '<h2>Must-See Attractions</h2><ul>';
  durbanInfo.attractions.forEach(item => {
    attractionsHTML += `<li>${item}</li>`;
  });
  attractionsHTML += '</ul>';
  attractionsSection.innerHTML = attractionsHTML;
}

// Display Random Fun Fact
const funFactPara = document.getElementById('funFact');
if (funFactPara) {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  funFactPara.textContent = funFacts[randomIndex];
}

const galleryContainer = document.getElementById('galleryContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

if (galleryContainer && lightbox && lightboxImg) {

  const galleryItems = [
    {src: "download (2).jpg", caption: "Beautiful view of Durban", category: "beach"},
    {src: "download (3).jpg", caption: "Scenery of Durban", category: "beach"},
    {src: "durban review.jpg", caption: "Historical site at Durban in 1920's and 1930's", category: "historical"},
    {src: "download6.jpg", caption: "Culture at Durban KwaZulu-Natal", category: "culture"},
    {src: "popi.jpg", caption: "View of Durban's stadium area"}
  ];

  function displayGallery(items) {
    galleryContainer.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('gallery-item');
      div.innerHTML = `
        <img src="${item.src}" alt="${item.caption}">
        <div class="caption">${item.caption}</div>
      `;
      div.querySelector('img').addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.src;
      });
      galleryContainer.appendChild(div);
    });
  }

  function filterGallery(category) {
    if(category === 'all') {
      displayGallery(galleryItems);
    } else {
      const filtered = galleryItems.filter(item => item.category === category);
      displayGallery(filtered);
    }
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', e => {
    if(e.target !== lightboxImg) lightbox.style.display = 'none';
  });

  // Initialize gallery
  displayGallery(galleryItems);

  // Optional: dynamically attach filter buttons if they exist
  const filterButtons = document.querySelectorAll('.filter-btns button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.textContent.toLowerCase().replace('show ', '');
        filterGallery(category);
      });
    });
  }
}

const weatherContainer = document.getElementById("weatherContainer");
const weatherInfo = document.getElementById("weatherInfo");

if (weatherContainer && weatherInfo) {
  const apiKey = "701ac9a86d3d412bb32155940252709"; 

  async function getDurbanWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Durban&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        weatherInfo.innerHTML = `<span style="color:red;">Error: ${data.error.message}</span>`;
        return;
      }

      displayWeather(data);
    } catch (error) {
      weatherInfo.innerHTML = `<span style="color:red;">Error: ${error.message}</span>`;
      console.error(error);
    }
  }

  function displayWeather(data) {
    weatherInfo.innerHTML = `
      <div class="weather-card">
        <img src="${data.current.condition.icon.startsWith('//') ? 'https:' + data.current.condition.icon : data.current.condition.icon}" 
             alt="${data.current.condition.text}">
        <div>
          <p><strong>City:</strong> ${data.location.name}</p>
          <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
          <p><strong>Condition:</strong> ${data.current.condition.text}</p>
          <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
          <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
          <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        </div>
      </div>
    `;
  }

  // Fetch Durban weather on page load
  getDurbanWeather();
}


