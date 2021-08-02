import { getCurrentTime, showAllPosts } from "./handler/commonfunction.js";
import { clearAll } from "./handler/commonfunction.js";
import { uniqId } from "./handler/commonfunction.js";

//new
const sectionNone = document.getElementById("section-none");

const allPostsDiv = document.getElementById("all-posts");
// Post edit
const postMsg = document.getElementById("post-msg");
const postBtn = document.getElementById("post-btn");

const postDelete = document.getElementById("post-delete");
const modal = document.getElementById("modal");

// Catch edit btn
export function allPostsDivFun(e, userid, myPostsDiv) {
  const postIndex = e.target.value;

  if (e.target.classList.contains("edit-btn")) {
    const postContent =
      e.target.parentElement.parentElement.parentElement.parentElement
        .childNodes[5].innerHTML;

    window.scroll({
      top: 100,
      behavior: "smooth",
    });

    postMsg.value = postContent;
    postBtn.value = "Edit Now!";
    postBtn.setAttribute("post-id", postIndex);
  } else if (e.target.classList.contains("delete-btn")) {
    postDelete.value = postIndex;
  } else if (e.target.classList.contains("like-btn")) {
    if (!postLikes[postIndex].includes(loggedIn)) {
      postLikes[postIndex].push(loggedIn);
    } else {
      postLikes[postIndex].splice(postLikes[postIndex].indexOf(loggedIn), 1);
    }
    mainDB = { ...mainDB, postLikes };
    localStorage.setItem("DB", JSON.stringify(mainDB));
    if (userid) {
      showAllPosts(myPostsDiv, userid);
    } else {
      showAllPosts(allPostsDiv);
    }
  }
}

// postDelete.addEventListener("click", (e) => {
//   console.log("hi");
//   modal.classList.remove("show-modal");
//   //console.log(e.target.value);
//   allPosts.splice(e.target.value, 1);
//   mainDB = { ...mainDB, allPosts };
//   localStorage.setItem("DB", JSON.stringify(mainDB));
//   showAllPosts(allPostsDiv);
//   console.log("END");
// });

export function postDeleteFun(e, userid, myPostsDiv) {
  console.log("hi");
  modal.classList.remove("show-modal");
  //console.log(e.target.value);
  allPosts.splice(e.target.value, 1);
  mainDB = { ...mainDB, allPosts };
  localStorage.setItem("DB", JSON.stringify(mainDB));
  if (userid) {
    showAllPosts(myPostsDiv, userid);
  } else {
    showAllPosts(allPostsDiv);
  }
  console.log("END");
}

export function postForms(e, userid, myPostsDiv) {
  e.preventDefault();
  console.log("hi");
  //console.log("postBtn value", postBtn.value);
  if (!userid) sectionNone.style.display = "none";
  const PostTextError = document.getElementById("post-tex-error");

  if (postBtn.value === "Post Now!") {
    clearAll();

    let canPost = 1;

    if (!postMsg.value.trim()) {
      clearAll();
      PostTextError.textContent = "Post can't be empty";

      canPost = 0;
    } else {
      clearAll([PostTextError]);
    }

    if (canPost) {
      const newPost = {
        id: uniqId("post"),
        content: postMsg.value.trim(),
        //userID: localStorage.getItem(loggedIn),
        userID: loggedIn,
        created_at: getCurrentTime(),
      };

      allPosts.unshift(newPost);
    }
  } else if (postBtn.value === "Edit Now!") {
    //console.log("post id", postBtn.getAttribute("post-id"))

    if (!postMsg.value.trim()) {
      clearAll();
      PostTextError.textContent = "Edit text can't be empty";
    } else {
      clearAll([PostTextError]);
    }

    const postIndex = postBtn.getAttribute("post-id");
    allPosts[postIndex].content = postMsg.value;

    postBtn.value = "Post Now!";
  }

  mainDB = { ...mainDB, allPosts };
  localStorage.setItem("DB", JSON.stringify(mainDB));
  if (userid) {
    showAllPosts(myPostsDiv, userid);
  } else {
    showAllPosts(allPostsDiv);
  }
  clearAll([postMsg]);
}
