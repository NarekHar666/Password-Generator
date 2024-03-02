// Selecting DOM elements
const submit = document.querySelector(".submit")
const inputNumber = document.querySelector("#length-input")
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector("#lowercase")
const characters = document.querySelector("#characters")
const numbers = document.querySelector("#numbers")
const displayPassword = document.querySelector(".displayPassword")
const errorInput = document.querySelector(".errorInput")
const errorCheckbox = document.querySelector(".errorCheckbox")
const copyBtn = document.querySelector(".copyBtn")

  // Variable to store the timeout ID
let st = null

  // Function to generate a random lowercase letter
  const generateRandomLowerCase = () => {
  const uppercase = "abcdefghijklmnopqrstuvwxyz"
  return uppercase[Math.floor(Math.random() * uppercase.length)]
  }

  // Function to generate a random uppercase letter
  const generateRandomUpperCase = () => {
    const lowercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return lowercase[Math.floor(Math.random() * lowercase.length)]
  }

  // Function to generate a random number
  const generateRandomNumber = () => {
    const numbers = "123456789"
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  // Function to generate a random symbol
  const generateRandomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  // Main function to generate a password
  const generatePassword = () => {
    // Get the desired password length from user input
    const length = parseInt(inputNumber.value);

    // Validate the password length
    if (!length || length < 8 || length > 15) {
      errorInput.innerHTML = 'Please enter a valid password length between 8 and 15.';
      return;
    };

    // Initialize variables
    let password = "";
    const charactersArray = [];
    errorInput.innerHTML = ''
  
    // Populate charactersArray with selected character types
    if (lowercase.checked) {
      charactersArray.push(generateRandomLowerCase);
    }
    if (uppercase.checked) {
      charactersArray.push(generateRandomUpperCase);
    }
    if (numbers.checked) {
      charactersArray.push(generateRandomNumber);
    }
    if (characters.checked) {
      charactersArray.push(generateRandomSymbol);
    }
  
    // Check if at least one checkbox is selected
    if (charactersArray.length === 0) {
      errorCheckbox.innerHTML = "Please check at least one checkbox"
      return;
    }


     // Shuffle the charactersArray to ensure randomness
  charactersArray.sort(() => Math.random() - 0.5);

  // Generate at least one character for each selected checkbox
  charactersArray.forEach((charFunction) => {
    password += charFunction();
  });

  // Generate the remaining characters
  for (let i = charactersArray.length; i < length; i++) {
    const randomCharacterFunction = charactersArray[Math.floor(Math.random() * charactersArray.length)];
    password += randomCharacterFunction();
  }

    // Shuffle the password to ensure randomness
    password = password.split("").sort(() => Math.random() - 0.3).join("")
    
    // Clear error messages and prepare for password display
    errorCheckbox.innerHTML = ""
    copyBtn.classList.add("dNone")
    displayPassword.classList.add("shake-horizontal")
    submit.setAttribute("disabled",true)
    submit.style.background = "gray"
    submit.innerHTML = "GENERATING..."
    displayPassword.innerHTML = "********"

    // Display the password after a delay
    let st = setTimeout(()=>{
        displayPassword.innerHTML = password
        displayPassword.classList.remove("shake-horizontal")
        submit.removeAttribute("disabled",true)
        submit.style.background = "blue"
        submit.innerHTML = "Create Password"
        copyBtn.innerHTML = "COPY"
        copyBtn.classList.remove("dNone")
    },1000)
  }

  function copyText() {
    const passwordText = displayPassword.innerText;
  
    // Create a temporary textarea element to hold the password
    const textarea = document.createElement("textarea");
    textarea.value = passwordText;
  
    // Append the textarea to the DOM
    document.body.appendChild(textarea);
  
    // Select and copy the password from the textarea
    textarea.select();
    document.execCommand("copy");
  
    // Remove the temporary textarea
    document.body.removeChild(textarea);
  
    // Update the button text to indicate successful copying
    copyBtn.innerHTML = "COPIED!";
    setTimeout(() => {
      copyBtn.innerHTML = "COPY";
    }, 1500);
  }
   

  // Event listener for the submit button
  submit.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyText);