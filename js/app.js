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
   accounts.forEach( account => {
    account.username = account.owner
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toLowerCase();
   })
}

createUsername(accounts);

/*====================================
LOGIN
====================================*/

let currentAcount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAcount = accounts.find( obj => obj.username === inputLoginUsername.value);

  if(currentAcount && currentAcount.pin === Number(inputLoginPin.value)){
    containerApp.style.opacity = 100;
  }

});
