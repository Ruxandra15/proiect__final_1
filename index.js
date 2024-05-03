class Formular {
  constructor() {
      this.form = document.getElementById('makeupForm');
      this.successMessage = new SuccessMessage('Formularul a fost trimis cu succes!');
      this.errorMessage = new ErrorMessage('Te rog completează toate câmpurile!');
      this.init();
  }

  init() {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
      event.preventDefault();
      const { firstName, lastName, telefon, date, hour } = this.getDataFromForm();

      if (!firstName || !lastName || !telefon || !date || !hour) {
          this.showErrorMessage();
          return;
      } else {
          this.removeErrorMessage();
      }

      try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  firstName,
                  lastName,
                  telefon,
                  date,
                  hour
              })
          });

          if (response.ok) {
              this.showSuccessMessage();
              this.form.reset();
              setTimeout(() => {
                  this.removeSuccessMessage();
              }, 5000);
          } else {
              throw new Error('Eroare la trimiterea formularului!');
          }
      } catch (error) {
          console.error(error);
      }
  }

  getDataFromForm() {
      return {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          telefon: document.getElementById('telefon').value,
          date: document.getElementById('date').value,
          hour: document.getElementById('hour').value
      };
  }

  showErrorMessage() {
      this.form.appendChild(this.errorMessage.getElement());
  }

  removeErrorMessage() {
      if (this.form.contains(this.errorMessage.getElement())) {
          this.form.removeChild(this.errorMessage.getElement());
      }
  }

  showSuccessMessage() {
      this.form.appendChild(this.successMessage.getElement());
  }

  removeSuccessMessage() {
      if (this.form.contains(this.successMessage.getElement())) {
          this.form.removeChild(this.successMessage.getElement());
      }
  }
}

class SuccessMessage {
  constructor(message) {
      this.message = message;
      this.element = document.createElement('p');
      this.element.textContent = this.message;
      this.element.classList.add('success-message');
  }

  getElement() {
      return this.element;
  }
}

class ErrorMessage {
  constructor(message) {
      this.message = message;
      this.element = document.createElement('p');
      this.element.textContent = this.message;
      this.element.classList.add('error-message');
  }

  getElement() {
      return this.element;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Formular();
});
