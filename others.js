const close = document.getElementById("close");
const open = document.getElementsByClassName("open");
const postCancel = document.getElementById("post-cancel");

// Show Modal
document.body.addEventListener(
    "click",
    function(evt) {
        if (evt.target.classList.contains("open")) {
            modal.classList.add("show-modal");
            console.log(modal);
        }
    },
    false
);
// Hide Modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));
postCancel.addEventListener("click", () =>
    modal.classList.remove("show-modal")
);

// Hide modal outside click
window.addEventListener("click", (e) =>
    e.target == modal ? modal.classList.remove("show-modal") : false
);