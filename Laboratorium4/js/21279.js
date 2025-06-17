  function checkForm() {
    let error = false;
  
    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const info = document.getElementById("contactInfo");
  
    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorInfo = document.getElementById("errorInfo");
  
    // Reset klas
    [name, email, info].forEach(field => {
      field.classList.remove("is-valid", "is-invalid");
    });
    [errorName, errorEmail, errorInfo].forEach(e => e.classList.add("d-none"));
  
    if (name.value.trim() === "") {
      name.classList.add("is-invalid");
      errorName.classList.remove("d-none");
      error = true;
    } else {
      name.classList.add("is-valid");
    }
  
    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;
    if (email.value.trim() === "") {
      email.classList.add("is-invalid");
      errorEmail.innerHTML = "Podanie adresu email jest wymagane!";
      errorEmail.classList.remove("d-none");
      error = true;
    } else if (!emailRegex.test(email.value.trim())) {
      email.classList.add("is-invalid");
      errorEmail.innerHTML = "Podano niepoprawny adres email!";
      errorEmail.classList.remove("d-none");
      error = true;
    } else {
      email.classList.add("is-valid");
    }
  
    if (info.value.trim() === "") {
      info.classList.add("is-invalid");
      errorInfo.classList.remove("d-none");
      error = true;
    } else {
      info.classList.add("is-valid");
    }
  
    return !error;
  }
  