function validateText(id) {
    const textInput = document.getElementById(id);
    const errorText = document.getElementById(`${id}Error`);

    fieldName = id.charAt(0).toUpperCase() + id.slice(1);
    if (textInput.value.trim() === "") {
        errorText.textContent = `${fieldName} is required.`;
        textInput.classList.add("invalid");
        return false;
    }
    return true;
};


function clearError() {
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => {
        error.textContent = "";
    })
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.classList.remove("invalid");
    })
};



document.getElementById("form2").addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    const bodyValid = validateText("body");
    if (bodyValid) {
        alert("Form data submitted successfully");
        event.target.submit();
    }
});

document.querySelectorAll(".field").forEach(inputs => {
    inputs.addEventListener("input", (e) => {
        if (inputs.value.trim() !== "") {
            document.getElementById(`${inputs.id}Error`).textContent = "";
            inputs.classList.remove("invalid");
            inputs.classList.add("valid");
        }
    })
});