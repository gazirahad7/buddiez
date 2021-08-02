import { showAllPosts } from "./handler/commonfunction.js";
import { postForms, allPostsDivFun, postDeleteFun } from "./post.js";

const loginForm = document.getElementById("login-form");

const welcomeMsg = document.getElementById("welcome-msg");
/* ======= show login user ======= */

const sectionNone = document.getElementById("section-none");
const postsSecBlock = document.getElementById("post-section-block");

const logoutBtn = document.getElementById("logout-btn");

const allPostsDiv = document.getElementById("all-posts");

//
const postForm = document.getElementById("post-form");

const postDelete = document.getElementById("post-delete");

postForm.addEventListener("submit", postForms);

//
allPostsDiv.addEventListener("click", allPostsDivFun);
postDelete.addEventListener("click", postDeleteFun);

// Check logged in user or not
if (loggedIn) {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].userID === loggedIn) {
      loginForm.style.display = "none";
      sectionNone.style.display = "none";

      welcomeMsg.innerHTML = "Welcome, " + allUsers[i].name;
      logoutBtn.style.display = "block";
      postsSecBlock.style.display = "block";

      showAllPosts(allPostsDiv);
      break;
    }
  }
}
