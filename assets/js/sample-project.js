document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    const handleResize = () => {
        if (window.innerWidth >= 1280) {
            mobileMenu.classList.add("hidden");
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
});

document.addEventListener('DOMContentLoaded', () => {
    const ipCheckbox = document.getElementById('ip-checkbox');
    const passwordCheckbox = document.getElementById('password-checkbox');
    const textInput = document.getElementById('textInput');
    const getResponseButton = document.querySelector('#api-form input[type="button"]');

    ipCheckbox.addEventListener('change', () => toggleCheckbox(ipCheckbox, 'password-checkbox', 'textInput'));
    passwordCheckbox.addEventListener('change', () => toggleCheckbox(passwordCheckbox, 'ip-checkbox', 'textInput'));

    getResponseButton.addEventListener('click', () => {
        userInputCheck(textInput.value, 'password-checkbox', 'ip-checkbox');
    });
});

function toggleCheckbox(clickedCheckbox, otherCheckboxId, inputFieldId) {
    const otherCheckbox = document.getElementById(otherCheckboxId);
    const inputField = document.getElementById(inputFieldId);

    if (clickedCheckbox.checked) {
        otherCheckbox.checked = false;

        if (clickedCheckbox.id === 'password-checkbox') {
            inputField.placeholder = "Enter a number from 1-32";
        } else {
            inputField.placeholder = "Enter IP";
        }

    } else {
        inputField.placeholder = "";
    }
}

function userInputCheck(userValue, passwordCheckBox, ipCheckBox) {
    const passwordBox = document.getElementById(passwordCheckBox);
    const ipBox = document.getElementById(ipCheckBox);

    if (passwordBox.checked) {
        if (/^\d+$/.test(userValue) && parseInt(userValue) <= 32 && parseInt(userValue) >= 1) {
            const passwordApiUrl = `https://api.api-ninjas.com/v1/passwordgenerator?length=${userValue}`;
            getApiData(passwordApiUrl, "password");
        } else {
            document.getElementById('output-area').textContent = 'Invalid value';
        }
    } else if (ipBox.checked) {
        let ipv46_regex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/ig;
        if (ipv46_regex.test(userValue)) {
            const ipApiUrl = `https://api.api-ninjas.com/v1/iplookup?address=${userValue}`;
            getApiData(ipApiUrl, "ip");
        } else {
            document.getElementById('output-area').textContent = 'Invalid IP address';
        }
    }
}

function getApiData(apiUrl, apiType) {
    const apiKey = "CY6GSZKtYfcoeOtHijKN9g==RDIEEKQTfz1bG8jo";

    let options = {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
        }
    };

    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw err;
                });
            }
            return response.json();
        })
        .then(data => {
            const outputArea = document.getElementById('output-area');
            if (apiType === 'ip') {
                if (data['is_valid'] === false) {
                    document.getElementById('output-area').textContent = "Invalid IP address";
                }
                else {
                    document.getElementById('output-area').textContent = `Country: ${data['country']}`;
                }
            } else {
                outputArea.textContent = data['random_password'];
            }
        })
        .catch(error => {
            const outputArea = document.getElementById('output-area');
            if (error.error) {
                outputArea.textContent = error.error;
            } else {
                outputArea.textContent = error.message || 'An unknown error occurred';
            }
            console.error('Error:', error.error);
        });
}