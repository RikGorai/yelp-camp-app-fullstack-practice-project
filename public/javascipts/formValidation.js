
function validateText(id){
    const textInput = document.getElementById(id);
    const errorText = document.getElementById(`${id}Error`);
    
    fieldName = id.charAt(0).toUpperCase() + id.slice(1);
    if(textInput.value.trim()===""){
        errorText.textContent = `${fieldName} is required.`;
        textInput.classList.add("invalid");
        return false;
    }
    return true;
}
function validateNum(id) {
    const textInput = document.getElementById(id);
    const errorText = document.getElementById(`${id}Error`);
    
    fieldName = id.charAt(0).toUpperCase() + id.slice(1);
    const numValue = parseFloat(textInput.value.trim());
    const regex = /^[-+]?\d*\.?\d+$/;

    if (textInput.value.trim() === "") {
        errorText.textContent = `${fieldName} is required.`;
        textInput.classList.add("invalid");
        return false;
    } else if (!regex.test(textInput.value.trim())) {
        errorText.textContent = `${fieldName} must be a number.`;
        textInput.classList.remove("valid");
        textInput.classList.add("invalid");
        return false;
    
    } else if(numValue<=0){
        errorText.textContent = `${fieldName} must be greater then 0.`;
        textInput.classList.add("invalid");
        return false;
    } else if (numValue>=3000) {
        errorText.textContent = `${fieldName} have a limit of $3000.`;
        textInput.classList.add("invalid");
        return false;
    }
    return true;
}

function clearError() {
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => {
        error.textContent = "";
    })
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.classList.remove("invalid");
    })
}




document.getElementById("Form").addEventListener("submit",(e) =>{
    e.preventDefault();

    clearError();

    const titleValid =validateText("title");
    const locationValid =validateText("location");
    const imageValid =validateText("Image");
    const descriptionValid =validateText("description");
    const priceValid = validateNum("price");

    if (titleValid && locationValid && imageValid && descriptionValid && priceValid){
        alert("Form data submitted successfully");
        event.target.submit();
    }
});

document.querySelectorAll(".field").forEach(inputs =>{
    inputs.addEventListener("input",(e)=> {
        if(inputs.value.trim()!==""){
            document.getElementById(`${inputs.id}Error`).textContent="";
            inputs.classList.remove("invalid");
            inputs.classList.add("valid");
        }
    })
});
document.querySelector("#price").addEventListener("input", (e) =>{
    const priceValid = validateNum("price");
    if (priceValid){
        document.getElementById(`priceError`).textContent = "";
        e.target.classList.remove("invalid");
        e.target.classList.add("valid");
    }
})