const regExp = /^\d+$/;

const containsOnlyDigits = (str) => {
    return regExp.test(str);
};
console.log(containsOnlyDigits("12345"));
console.log(containsOnlyDigits("12a45"));
console.log(containsOnlyDigits("123 45"));


setInterval(() => {
    console.log("прошла секунда");
}, 1000);

const count = () => {
    let i = 1;
    
    const interval = setInterval(() => {
        console.log(i);
        i++;
        if ( i > 10) {
            clearInterval(interval);
        }
    }, 1000)
};
count();

let time =  10;
let interval = null;

const timer = document.querySelector("#timer");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");

start.addEventListener("click", () => {
    if(interval !== null | null === 0) {
        return;
    }
    interval = setInterval(() => {
        time--;
        timer.textContent = time;
        if(time === 0) {
            clearInterval(interval)
            interval = null;
        }
    }, 1000)
});

stop.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});
reset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    time = 10;
    timer.textContent = time;
})

const box = document.querySelector("#box");

box.addEventListener("click", () => {
    box.classList.toggle("active");
});

const xhr = new XMLHttpRequest();
xhr.open("GET", "./test.json");
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    }else{
        console.log("щшибка запроса: ", xhr.status);
    }
};
xhr.onerror = function () {
    console.log("error");
};
xhr.send();


const loginInput = document.querySelector("#loginInput");
const checkBtn = document.querySelector("#checkBtn");
const userCard = document.querySelector("#userCard");
const message = document.querySelector("#message");

checkBtn.addEventListener("ckick", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./users.json");
    xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 300) {
            const users = JSON.parse(xhr.responseText);
            const login = loginInput.value.trim();
            const user = users.find(item => item.login === login);
            if(user) {
                userCard.innerHTML = `
                 <h3>${user.login}</h3>
                 <p>Роль: ${user.role}</p>
                <p>Email: ${user.email}</p>`
            };
            message.textContent = "";
        }else {
            userCard.innerHTML = "";
            message.textContent = "пользователь не найден";
        }
    }
    xhr.onerror = function () {
    message.textContent = "error";
 };
 xhr.send();
});

function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("данные пользователя");
        }, 1000)
    });
}
function getPosts () {
    return new Promise(() => {
        setTimeout(() => {
            resolve("posts");
        }, 2000)
    });
}

function getComments () {
    return new Promise(() => {
        setTimeout(() => {
            resolve("comments");
        }, 3000);
    });
}
Promise.all([
    getUser(),
    getPosts(),
    getComments()
])
 .then((results) => {
    console.log("все данные получены", results);
 })
 .catch((error) => {
    console.log("произошла ошиба", error);
 });

async function getUserData(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
            throw new Error("user no");
        }
        const data = await response.json();
        console.log("user", data);
    }catch (error) {
        console.log("error", error.message);
    }finally{
        console.log("finished");
    }
}
getUserData(1);

async function createPhoto () {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/photos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    albumId: 1,
                    title: "my photo",
                    url: "https://example.com/photo.jpg",
                    thumbnailUrl: "https://example.com/photo.jpg"
                })
            }
        );
        if (!response.ok) {
            throw new Error("error in send");
        }
        const data = await response.json();
        console.log("succesful at server:", data);
    }catch (error) {
        console.log("error", error.message);
    }
}
createPhoto();