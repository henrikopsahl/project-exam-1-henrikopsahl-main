async function getPostDetails(postId) {
  const url = `https://www.jagaranti.icu/wp-json/wp/v2/posts/${postId}?_embed`;

  try {
      const response = await fetch(url);
      const post = await response.json();
  
      const postContainer = document.querySelector(".post-container");
  
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.title.rendered;
      postContainer.appendChild(postTitle);
  
      if (post._embedded && post._embedded["wp:featuredmedia"]) {
          const postImage = document.createElement("img");
          postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
          postImage.onclick = function() {
              document.getElementById("myModal").style.display = "block";
              document.getElementById("img01").src = this.src;
          }
          postContainer.appendChild(postImage);
      }
  
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

// Modal functionality
var modal = document.getElementById("myModal");

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() { 
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}



