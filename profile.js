import { showAllPosts } from "./handler/commonfunction.js";
import { postForms, allPostsDivFun, postDeleteFun } from "./post.js";

let pageURL = window.location.href;
let usersid = pageURL.substr(pageURL.lastIndexOf("/") + 1).split("?id=")[1];
const postForm = document.getElementById("post-form");
const postDelete = document.getElementById("post-delete");
//console.log(usersid)

const myPostsDiv = document.getElementById("my-posts");
postForm.addEventListener("submit", (e) => postForms(e, usersid, myPostsDiv));
postDelete.addEventListener("click", (e) =>
  postDeleteFun(e, usersid, myPostsDiv)
);

myPostsDiv.addEventListener("click", (e) =>
  allPostsDivFun(e, usersid, myPostsDiv)
);


// allPostsDivFun();
// postForms();

document.addEventListener("DOMContentLoaded", function () {
  showAllPosts(myPostsDiv, usersid);
});
