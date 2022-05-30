// 3D scroll

let zSpacing = -1000;
let lastPos = zSpacing / 5;
let $frames = document.getElementsByClassName("frame");
let frames = Array.from($frames);
let zVals = [];

window.onscroll = function() {
    let top = document.documentElement.scrollTop;
    let delta = lastPos - top;

    lastPos = top;

    frames.forEach(function(n, i) {
        zVals.push((i * zSpacing) + zSpacing);
        zVals[i] += delta * -5.5;

        let frame = frames[i];
        let transform = `translateZ(${zVals[i]}px)`;
        let opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;

        frame.setAttribute("style", `transform: ${transform}; opacity: ${opacity}`);
    });
};

window.scrollTo(0, 1);


// Modal

const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("[data-close]");

function openModal() {
    modal.classList.toggle("modal-show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
};

function closeModal() {
    modal.classList.toggle("modal-show");
    document.body.style.overflow = "";
};

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("modal-show")) {
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 5000); 

window.addEventListener("scroll", () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(); 
    }
});


//Forms get


