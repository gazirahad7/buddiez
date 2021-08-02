// loggedIN userID from user
const getUserName = (userID) => {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].userID === userID) {
      return allUsers[i].name;
    }
  }
};

// Clear to DOM
export function clearAll(clearArr) {
  if (!clearArr) {
    const allErrorTxt = document.querySelectorAll(".error-txt");
    const allInputs = document.querySelectorAll(".input-fld");

    allErrorTxt.forEach((error) => (error.innerHTML = ""));
    allInputs.forEach((input) => (input.value = ""));
  } else {
    clearArr.forEach((input) => {
      if (input.value) {
        input.value = "";
      } else if (input.innerHTML) {
        input.innerHTML = "";
      }
    });
  }
}

// Unique ID generate Function
    export function uniqId(prefix) {
      return `${Date.now().toString(36) +
        `_${prefix}_` +
        Math.random().toString(36).substr(2)
        }`;
    }


// Date Time function
export function getCurrentTime() {
  let date = new Date();
  let options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString("en-us", options);
}
// Comment in post  function
function createComment(e, element) {
  // e.preventDefault();

  //console.log(e.target.firstChild.nextElementSibling.value);
  const commentContent = e.target.firstChild.nextElementSibling.value;

  const postID = e.target.childNodes[2].nextElementSibling.value;

  console.log(e.target.parentElement);

  const newComment = {
    comtID: uniqId("comment"),
    content: commentContent,
    userID: loggedIn,
    postID: postID,
    created_at: getCurrentTime(),
  };

  allComment.push(newComment);
  mainDB = { ...mainDB, allComment };
  localStorage.setItem("DB", JSON.stringify(mainDB));
  e.target.parentElement.style.display = "block";
  showAllPosts(element);
}

// Show all posts function
export function showAllPosts(element, usersid) {
  //console.log(usersid);
  element.innerHTML = "";
  for (let i = 0; i < allPosts.length; i++) {
    if (usersid && allPosts[i].userID !== usersid) {
      continue;
    }

    if (!postLikes[allPosts[i].id]) postLikes[allPosts[i].id] = [];

    const postComments = allComment.filter(
      (comment) => comment.postID === allPosts[i].id
    );
    //console.log(postComments.length);

    let post = ` 
    <div class="upload-post">
   <h5><a href="profile.html?id=${allPosts[i].userID
      }"><i class="fas fa-user profile"></i>${getUserName(
        allPosts[i].userID
      )}</a></h5>
    <small class="time">${allPosts[i].created_at}</small>
    <p>${allPosts[i].content}</p>
    <hr>
    <div>`;

    post += "<button type='button' class='btn mr-3 my-0 py-0 like-btn";

    if (postLikes[allPosts[i].id].includes(loggedIn)) post += " liked";

    post += "' value='" + allPosts[i].id + "'>";
    post += "👍";

    post += `<sup><b>${postLikes[allPosts[i].id].length ? postLikes[allPosts[i].id].length : ""
      }</b></sup>
      </button>
      <button type="button" class="btn mr-3 my-0 py-0 comment-btn">📧<sup><b class="comt-count">${postComments.length ? postComments.length : ""
      }</b></sup></button>
${allPosts[i].userID === loggedIn
        ? `
      <div class="dropdown my-custom-dot">
  <button class="btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i class="fas fa-ellipsis-h"></i>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button value="${i}"class="dropdown-item edit-btn" type="button">Edit<i class="far fa-edit"></i></button>
    <button value="${i}" class="dropdown-item delete-btn open" type="button">Delete<i class="far fa-trash-alt"></i></button>
   
  </div>

</div>
     `
        : ""
      }
<hr>



  <div class="comment-div">
       
       ${postComments
        .map(
          (comment) => `<div class="d-flex comment-body">
        <a href="profile.html?id=${comment.userID
            }"><i class="fas fa-user profile"></i></a>
        <div>
            <div class="d-flex justify-content-between">
                <h6 class="cmter-name">${getUserName(comment.userID)}</h6>
                <small class="time">${comment.created_at}</small>
            </div>
            <p class="cmt-text">${comment.content}</p>
            <div class="d-flex">
                <button class="cmt-like">like</button>
                <button class="cmt-reply">reply</button>
            </div>
        </div>
    </div>`
        )
        .join("")}

          <form class="comment-form">
            <input type="text" class="comment-box mt-4" placeholder="Write a comment">
            <input type="hidden" value="${allPosts[i].id}">
            <input type="submit" value="Comment" class="comment-submit">
          </form>
        </div>
    </div>
    </div>
    `;

    element.insertAdjacentHTML("beforeend", post);
  }

  [...document.querySelectorAll(".comment-form")].map((cmtfrm) =>
    cmtfrm.addEventListener("submit", (e) => createComment(e, element))
  );

  [...document.querySelectorAll(".comment-btn")].map((cmtbtn) =>
    cmtbtn.addEventListener("click", (e) => {
      let cmtToggle = "";
      console.log(e.target.parentElement.childNodes);
      if (e.target.parentElement.childNodes[8]) {
        cmtToggle = e.target.parentElement.childNodes[8];
      } else {
        cmtToggle = e.target.parentElement.childNodes[6];
      }

      console.log(cmtToggle);

      if (cmtToggle.style.display === "block") {
        cmtToggle.style.display = "none";
      } else {
        cmtToggle.style.display = "block";
      }
    })
  );

  mainDB = { ...mainDB, postLikes };
  localStorage.setItem("DB", JSON.stringify(mainDB));

}
