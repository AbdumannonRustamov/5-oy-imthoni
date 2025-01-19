const loginButton = document.querySelecxtor('.btn1');
loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "home.html";
});


const signUPbutton = document.querySelector('.btn2');

signUPbutton.addEventListener('click', (eventDef) => {
    eventDef.preventDefault();
    window.location.href = "home.html";
});

    