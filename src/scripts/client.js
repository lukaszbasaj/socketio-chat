
const window = document.window;
const userNameInputBox = document.getElementsByClassName('.usernameInput');
const messagePool = document.getElementsByClassName('.chat--page_messages');
const chatPage = document.getElementsByClassName('.chat--page');
const loginPage = document.getElementsByClassName('.login--page');
let username;

const fadeOut = (target) => {
    const fadeTarget = document.getElementById(target);
    const fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
};

const show = elem => {
    elem.classList.add('is-visible');
};

const hide = elem => {
    elem.classList.remove('is-invisible');
};

const toggle = elem => {
    elem.classList.toggle('is-visible');
};

const setUsername = () => {
    username = cleanInput(userNameInputBox.val().trim());
    if (username) {
        loginPage.fadeOut();
        chatPage.show();
        loginPage.removeEventListener("click", toggle);
    }
    socket.emit('add user', username);
};