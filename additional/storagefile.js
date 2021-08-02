let mainDB = JSON.parse(localStorage.getItem("DB"));

if (!mainDB) {
    mainDB = {
        allUsers: [],
        allPosts: [],
        postLikes: {},
        allComment: [],
        loggedIn: "",
    };
    localStorage.setItem("DB", JSON.stringify(mainDB));
}

const { allUsers, allPosts, postLikes, allComment } = mainDB;
let { loggedIn } = mainDB;