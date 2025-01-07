// Pobranie formularza i jego elementów
const form = document.querySelector('.consultation-form');
const submitButton = document.querySelector('.submit-btn');
const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    date: document.getElementById('date'),
};


// Funkcja sprawdzająca poprawność formularza
function validateForm() {
    let isValid = true;

    // Sprawdzanie imienia i nazwiska
    if (!fields.name.value.trim()) {
        showError(fields.name, 'Proszę podać swoje imię i nazwisko.');
        isValid = false;
    } else {
        clearError(fields.name);
    }

    // Sprawdzanie e-maila
    if (!validateEmail(fields.email.value.trim())) {
        showError(fields.email, 'Proszę podać poprawny adres e-mail.');
        isValid = false;
    } else {
        clearError(fields.email);
    }

    // Sprawdzanie numeru telefonu
    if (!validatePhone(fields.phone.value.trim())) {
        showError(fields.phone, 'Proszę podać poprawny numer telefonu (np. +48123456789 lub 123456789).');
        isValid = false;
    } else {
        clearError(fields.phone);
    }

    // Sprawdzanie daty
    if (!validateDate(fields.date.value.trim())) {
        showError(fields.date, 'Proszę wybrać inny dzień konsultacji.');
        isValid = false;
    } else {
        clearError(fields.date);
    }

    // Blokowanie/odblokowanie przycisku
    submitButton.disabled = !isValid;
    return isValid;
}

// Funkcja sprawdzająca poprawność daty konsultacji
function validateDate(selectedDate) {
    if (!selectedDate) return false; // Sprawdzanie, czy data jest wybrana
    const today = new Date();
    today.setDate(today.getDate() + 1); // Jeden dzień później od bieżącego dnia
    const selected = new Date(selectedDate);
    return selected >= today; // Sprawdzanie, czy data nie jest wcześniejsza niż jutro
}


// Pokazuje błąd (dodaje stylizację i komunikat)
function showError(field, message) {
    field.classList.add('error');
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.innerText = message;
        field.parentNode.appendChild(errorMessage);
    }
}

// Usuwa błąd (czyści stylizację i komunikat)
function clearError(field) {
    field.classList.remove('error');
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

// Funkcje walidacji
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(?:\+48)?[0-9]{9}$/;
    return phoneRegex.test(phone);
}

// Nasłuchiwanie zdarzeń (input, change)
Object.values(fields).forEach((field) => {
    field.addEventListener('input', validateForm);
});

// Obsługa wysyłania formularza
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Zatrzymanie domyślnego wysłania
    if (validateForm()) {
        alert('Formularz został wysłany pomyślnie!');
        form.reset();
        validateForm(); // Sprawdzenie poprawności po zresetowaniu
    }
});
// Ustawienie minimalnej daty dla pola "date"
const dateField = document.getElementById('date');

function setMinDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Jeden dzień później od bieżącego dnia
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Dodaj 0 na początku, jeśli miesiąc jest jednocyfrowy
    const day = String(today.getDate()).padStart(2, '0'); // Dodaj 0 na początku, jeśli dzień jest jednocyfrowy
    const minDate = `${year}-${month}-${day}`;
    dateField.setAttribute('min', minDate); // Ustaw minimalną datę
}
// Pobranie elementów hamburgera i nawigacji
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Obsługa kliknięcia na hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show'); // Pokazanie/ukrycie menu
});

document.addEventListener('DOMContentLoaded', () => {
    // Pobierz wszystkie elementy FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Przełącz klasę "active" dla klikniętego elementu
            item.classList.toggle('active');
        });
    });
});

// Wywołaj funkcję przy ładowaniu strony
setMinDate();




