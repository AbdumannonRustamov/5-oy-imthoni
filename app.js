const signUpButton = document.querySelector('.btn2');
signUpButton.addEventListener('click', (eventDef) => {
    eventDef.preventDefault();
    
    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#signupPassword').value;
    const confirmPassword = document.querySelector('#signupConfirmPassword').value;
    
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return; 
    }
    
    if (password !== confirmPassword) {
        alert('Parollar mos kelmaydi!');
        return;
    }
    
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    
    window.location.href = 'home.html';
});

const loginButton = document.querySelector('.btn1');
loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const loginEmail = document.querySelector('#loginEmail').value;
    const loginPassword = document.querySelector('#loginPassword').value;
    
    if (loginEmail === "" || loginPassword === "") {
        alert("Iltimos, email va parolni kiriting.");
        return;
    }
    
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        window.location.href = 'home.html'; 
    } else {
        alert('Email yoki parol notogri!');
    }
});
