
function filterProjects(category) {
  const projectItems = document.querySelectorAll('.project-item'); 

  projectItems.forEach(item => {
    const projectCategory = item.dataset.category; 

    if (category === 'all' || projectCategory === category) {
      item.classList.remove('hidden'); 
    } else {
      item.classList.add('hidden'); 
    }
  });
}
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const filterCategory = this.dataset.filter; 
    filterProjects(filterCategory); 
  });
});
filterProjects('all');
function openLightbox(imageSrc, caption) {
  const modal = document.getElementById('lightbox-modal');
  const modalImage = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');

  modal.style.display = 'block'; 
  modalImage.src = imageSrc;   
  modalCaption.textContent = caption; 
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.style.display = 'none'; 
  modal.classList.remove('active');
}

document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', function(e) {
    e.preventDefault(); 
    const imageSrc = this.dataset.src;  
    const caption = this.dataset.caption; 

    openLightbox(imageSrc, caption);
  });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);


document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);


document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeLightbox();
  }
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let isValid = true; 
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  
  nameError.textContent = '';
  nameError.style.display = 'none';
  emailError.textContent = '';
  emailError.style.display = 'none';
  messageError.textContent = '';
  messageError.style.display = 'none';

  
  if (nameInput.value.trim() === '') {
    nameError.textContent = nameInput.title; 
    nameError.style.display = 'block';
    isValid = false;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    emailError.textContent = emailInput.title;
    emailError.style.display = 'block';
    isValid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address format.';
    emailError.style.display = 'block';
    isValid = false;
  }


  if (messageInput.value.trim() === '') {
    messageError.textContent = messageInput.title;
    messageError.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
    this.submit(); 
  }
});
document.addEventListener('DOMContentLoaded', function() { // Ensures the DOM is fully loaded
  // Get input elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Get error message elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Function to validate a single field
  function validateField(inputElement, errorElement, validationFn, errorMessage) {
    const value = inputElement.value.trim();
    if (!validationFn(value)) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
      inputElement.classList.add('invalid'); // Add visual cue
      inputElement.setAttribute('aria-invalid', 'true'); // For accessibility
      return false;
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      inputElement.classList.remove('invalid'); // Remove visual cue
      inputElement.removeAttribute('aria-invalid'); // Remove attribute
      return true;
    }
  }

  // Validation functions (can be reused)
  const isNotEmpty = (value) => value !== '';
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Add event listeners for real-time validation
  nameInput.addEventListener('input', function() {
    validateField(nameInput, nameError, isNotEmpty, nameInput.title);
  });

  emailInput.addEventListener('input', function() {
    validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address format.');
  });

  messageInput.addEventListener('input', function() {
    validateField(messageInput, messageError, isNotEmpty, messageInput.title);
  });

  // Add a blur event listener to ensure feedback is shown even if the user tabs through fields
  nameInput.addEventListener('blur', function() {
    validateField(nameInput, nameError, isNotEmpty, nameInput.title);
  });

  emailInput.addEventListener('blur', function() {
    validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address format.');
  });

  messageInput.addEventListener('blur', function() {
    validateField(messageInput, messageError, isNotEmpty, messageInput.title);
  });

  // Handle form submission (this part is largely the same as before, but now with real-time checks)
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default submission

    let isValid = true;

    // Run all validations again on submit to catch any missed errors and ensure consistency
    if (!validateField(nameInput, nameError, isNotEmpty, nameInput.title)) isValid = false;
    if (!validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address format.')) isValid = false;
    if (!validateField(messageInput, messageError, isNotEmpty, messageInput.title)) isValid = false;

    if (isValid) {
      alert('Form submitted successfully!');
      this.submit(); // Or use AJAX
    } else {
      alert('Please correct the highlighted fields before submitting.'); // Inform the user to review errors
    }
  });
});
