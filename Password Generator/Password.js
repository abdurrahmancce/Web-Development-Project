document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('password-display');
    const passwordLengthSlider = document.getElementById('password-length');
    const lengthValueSpan = document.getElementById('length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateButton = document.getElementById('generate-button');
    const copyButton = document.getElementById('copy-button');
    const copyFeedback = document.getElementById('copy-feedback'); 
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    lengthValueSpan.textContent = passwordLengthSlider.value;

    passwordLengthSlider.addEventListener('input', () => {
        lengthValueSpan.textContent = passwordLengthSlider.value;
    });

    function generatePassword() {
        const length = parseInt(passwordLengthSlider.value);
        let characters = '';
        let generatedPassword = '';

        if (includeUppercase.checked) characters += uppercaseChars;
        if (includeLowercase.checked) characters += lowercaseChars;
        if (includeNumbers.checked) characters += numberChars;
        if (includeSymbols.checked) characters += symbolChars;

        if (characters === '') {
            passwordDisplay.value = 'Select at least one character type!';
            return;
        }

        let guaranteedChars = [];
        if (includeUppercase.checked) guaranteedChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
        if (includeLowercase.checked) guaranteedChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
        if (includeNumbers.checked) guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
        if (includeSymbols.checked) guaranteedChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

        for (let i = guaranteedChars.length; i < length; i++) {
            generatedPassword += characters[Math.floor(Math.random() * characters.length)];
        }

        generatedPassword = (guaranteedChars.join('') + generatedPassword)
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');

        passwordDisplay.value = generatedPassword.slice(0, length);
    }

    generateButton.addEventListener('click', generatePassword);

    generatePassword();

    copyButton.addEventListener('click', () => {
        passwordDisplay.select();
        passwordDisplay.setSelectionRange(0, 99999); 
        document.execCommand('copy');

        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 1500); 
    });

    
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
});