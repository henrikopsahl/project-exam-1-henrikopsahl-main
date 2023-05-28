async function getPostDetails(postId) {
  const url = `https://www.jagaranti.icu/wp-json/wp/v2/posts/${postId}?_embed`;

  try {
    const response = await fetch(url);
    const post = await response.json();

    const postContainer = document.querySelector(".post-container");

    const postDetails = document.createElement("div");
    postDetails.className = "post-details";
    postContainer.appendChild(postDetails);

    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title.rendered;
    postDetails.appendChild(postTitle);

    if (post._embedded && post._embedded["wp:featuredmedia"]) {
      const postImage = document.createElement("img");
      postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
      postImage.onclick = function () {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("img01").src = this.src;
      };
      postDetails.appendChild(postImage);
    }

    const hrElement = document.createElement("hr");
    postContainer.appendChild(hrElement);

    if (post.content && post.content.rendered) {
      const postContent = document.createElement("div");
      postContent.innerHTML = post.content.rendered;
      postContainer.appendChild(postContent);
    }
  } catch (error) {
    console.log(error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
getPostDetails(postId);

function hamburgerMenu() {
  var hamburgerLinks = document.querySelector(".links");
  if (hamburgerLinks.style.display === "block") {
    hamburgerLinks.style.display = "none";
  } else {
    hamburgerLinks.style.display = "block";
  }
}

// Make the modal show and work
var modal = document.getElementById("myModal");

document.getElementsByClassName("close")[0].onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
