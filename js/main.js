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

const modalTimerId = setTimeout(openModal, 10000); 

window.addEventListener("scroll", () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(); 
    }
});

//Forms get use XMLHttpRequest
/*
const forms = document.querySelectorAll('form');

const message = {
    loading: "Loading...",
    success: "Thanks, we'll call you back soon",
    failure: "Error"
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        statusMessage.style.cssText = `
                text-align: center;
            `;
        form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }
        });
    });
}
*/

//Forms get use fetch
/*
const forms = document.querySelectorAll('form');

const message = {
    loading: "Loading...",
    success: "Thanks, we'll call you back soon",
    failure: "Error"
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        statusMessage.style.cssText = `
                text-align: center;
            `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(data => data.text())
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
        }).catch(() => {
            statusMessage.textContent = message.failure;
        }).finally(() => {
            form.reset();
            setTimeout(() => {
                statusMessage.remove();
            }, 2000);
        })
    });
}
*/

//Forms get use json-server
const forms = document.querySelectorAll('form');

const message = {
    loading: "Loading...",
    success: "Thanks, we'll call you back soon",
    failure: "Error"
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        statusMessage.style.cssText = `
                text-align: center;
            `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
        }).catch(() => {
            statusMessage.textContent = message.failure;
        }).finally(() => {
            form.reset();
            setTimeout(() => {
                statusMessage.remove();
            }, 2000);
        });
    });
}




















