export default class Payments {
  constructor() {
    this.currentPayment = null; // visa mastercard mir
    this.cardNumber = null;
    this.cardValidityTitle = document.querySelector('.card-validity-title');

    document.querySelector('.card-number').addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/ /g, '');
      this.cardNumber = e.target.value;
      this.currentPayment = Payments.definePayment(this.cardNumber);
      this.drawPayment();
    });

    document.querySelector('.submit').addEventListener('click', (e) => {
      e.preventDefault();
      const result = Payments.isCardValid(Array.from(this.cardNumber));
      this.drawValidity(result);
    });
  }

  static definePayment(cardNumber) {
    if (cardNumber.startsWith('2')) return 'mir';

    if (cardNumber.startsWith('4')) return 'visa';

    if (cardNumber.startsWith('5')) return 'mastercard';

    return null;
  }

  static isCardValid(digits) {
    let sum = 0;

    for (let i = 0; i < digits.length; i += 1) {
      // eslint-disable-next-line radix
      let cardNum = parseInt(digits[i]);

      if ((digits.length - i) % 2 === 0) {
        cardNum *= 2;

        if (cardNum > 9) {
          cardNum -= 9;
        }
      }

      sum += cardNum;
    }

    return sum % 10 === 0;
  }

  drawPayment() {
    const paymentElems = document.querySelectorAll('.payment');
    paymentElems.forEach((paymentEl) => {
      if (paymentEl.dataset.payment === this.currentPayment) {
        paymentEl.classList.add('selected');
      } else {
        paymentEl.classList.remove('selected');
      }
    });
  }

  drawValidity(result) {
    this.cardValidityTitle.classList.remove('hidden');
    this.cardValidityTitle.classList.remove('valid');
    this.cardValidityTitle.classList.remove('invalid');
    if (result) {
      this.cardValidityTitle.classList.add('valid');
      this.cardValidityTitle.textContent = 'valid';
    } else {
      this.cardValidityTitle.classList.add('invalid');
      this.cardValidityTitle.textContent = 'invalid';
    }
  }
}
