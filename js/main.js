let postsData = [];
let currentIndex = 0;
const url = "https://www.jagaranti.icu/wp-json/wp/v2/posts?_embed&per_page=8";

async function getPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    postsData = data;
    displayPosts();
  } catch (error) {
    console.log(error);
  }
}

function displayPosts() {
  const postContainer = document.querySelector(".posts-container");
  postContainer.innerHTML = "";

  const startIndex = currentIndex;
  const endIndex = startIndex + 4;

  for (let i = startIndex; i < endIndex; i++) {
    if (postsData[i]) {
      const post = postsData[i];
      const title = post.title.rendered;

      let image = "";
      if (post._embedded["wp:featuredmedia"]) {
        image = post._embedded["wp:featuredmedia"][0].source_url;
      }

      const postHtml = `
        <div class="post">
          <a href="details.html?id=${post.id}">
            <img src="${image}" alt="${title}">
          </a>
          <h2><a href="details.html?id=${post.id}">${title}</a></h2>
        </div>
      `;
      postContainer.innerHTML += postHtml;
    }
  }

  Arrows(endIndex);
}

function Arrows(endIndex) {
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  prevArrow.style.display = currentIndex === 0 ? "none" : "block";
  nextArrow.style.display = endIndex >= postsData.length ? "none" : "block";
}

function showPreviousPosts() {
  currentIndex -= 4;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  displayPosts();
}

function showNextPosts() {
  currentIndex += 4;
  displayPosts();
}

// Adding event listeners to the next/prev buttons
document
  .querySelector(".prev-arrow")
  .addEventListener("click", showPreviousPosts);
document.querySelector(".next-arrow").addEventListener("click", showNextPosts);

getPosts();

const allUrl =
  "https://www.jagaranti.icu/wp-json/wp/v2/posts?_embed&per_page=12";
const postsPerPage = 10;
let currentPage = 1;
let allPosts = [];

async function getAllPosts() {
  try {
    const response = await fetch(allUrl);
    const data = await response.json();
    allPosts = data;
    showPosts();
  } catch (error) {
    console.log(error);
  }
}

function showPosts() {
  const morePostsContainer = document.querySelector(".more-posts-container");
  const startIndex = 0;
  const endIndex = Math.min(
    startIndex + currentPage * postsPerPage,
    allPosts.length
  );
  const postsToShow = allPosts.slice(startIndex, endIndex);

  morePostsContainer.innerHTML = "";

  postsToShow.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    if (post._embedded && post._embedded["wp:featuredmedia"]) {
      const postImageLink = document.createElement("a");
      postImageLink.href = `details.html?id=${post.id}`;
      const postImage = document.createElement("img");
      postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
      postImage.alt = post.title.rendered;
      postImageLink.appendChild(postImage);
      postContainer.appendChild(postImageLink);
    }

    const postTitle = document.createElement("h2");
    const postLink = document.createElement("a");
    postLink.href = `details.html?id=${post.id}`;
    postLink.textContent = post.title.rendered;
    postTitle.appendChild(postLink);
    postContainer.appendChild(postTitle);

    morePostsContainer.appendChild(postContainer);
  });
}

function showMorePosts() {
  currentPage++;
  showPosts();

  if (currentPage * postsPerPage >= allPosts.length) {
    const viewMoreButton = document.querySelector("#view-more");
    viewMoreButton.style.display = "none";
  }
}

// Adding click event to the view more button
const viewMoreButton = document.querySelector("#view-more");
viewMoreButton.addEventListener("click", showMorePosts);

getAllPosts();

// this is for making the header stick to the top at all time
window.onscroll = function () {
  scrollPage();
};

const header = document.querySelector(".header");

const sticky = header.offsetTop;

function scrollPage() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// function for making the hamburger menu work
function hamburgerMenu() {
  var hamburgerLinks = document.querySelector(".links");
  if (hamburgerLinks.style.display === "block") {
    hamburgerLinks.style.display = "none";
  } else {
    hamburgerLinks.style.display = "block";
  }
}
