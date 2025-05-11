const apiKey = "23a122c5770f4a68939de13c60bc10cb"; // Replace with your NewsAPI key
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const loading = document.getElementById("loading");

async function fetchNews(query = "top-headlines") {
  loading.style.display = "block";
  newsContainer.innerHTML = "";
  let url = `https://newsapi.org/v2/${
    query === "top-headlines" ? "top-headlines" : "everything"
  }?${
    query === "top-headlines" ? "country=us" : `q=${encodeURIComponent(query)}`
  }&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    loading.style.display = "none";

    if (data.articles && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = "<p>No news found.</p>";
    }
  } catch (error) {
    loading.style.display = "none";
    newsContainer.innerHTML = "<p>Error fetching news. Please try again.</p>";
    console.error("Error:", error);
  }
}

function displayNews(articles) {
  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    newsCard.innerHTML = `
                    ${
                      article.urlToImage
                        ? `<img src="${article.urlToImage}" alt="${article.title}">`
                        : ""
                    }
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${
                          article.description || "No description available."
                        }</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    </div>
                `;
    newsContainer.appendChild(newsCard);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } /* else {
    fetchNews();
  } */
  if (searchInput.value === "") {
    newsContainer.innerHTML = "<p>Please enter a search term.</p>";
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Load top headlines on page load
fetchNews();
