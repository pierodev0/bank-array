'use strict';

/*====================================
SELECTORS
====================================*/
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function createUsername(accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .split(' ')
      .map(word => word[0])
      .join('')
      .toLowerCase();
  });
}

createUsername(accounts);

/*====================================
LOGIN
====================================*/

let currentAcount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAcount = accounts.find(
    obj => obj.username === inputLoginUsername.value
  );

  if (currentAcount && currentAcount.pin === Number(inputLoginPin.value)) {
    //Show UI
    containerApp.style.opacity = 100;
    updateUI(currentAcount);
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }
});

console.log(accounts);
/*====================================
Show movements
====================================*/
function displayMovements(account) {
  containerMovements.innerHTML = '';
  account.movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

/*====================================
Calc Summary
====================================*/

function displaySummary(account) {
  const balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;

  const incomes = account.movements
    .filter(val => val > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(val => val < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .map(val => val * (account.interestRate / 100))
    .filter(val => val > 1)
    .reduce((acc, curr) => acc + curr);

  labelSumInterest.textContent = `${interest}€`;
}

/*====================================
UPDATE UI
====================================*/
function updateUI(account) {
  displayMovements(account);
  displaySummary(account);
}
