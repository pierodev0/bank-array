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

const select = document.getElementById('mySelect');
//Variables de estado
let usuarioActual = accounts[0];

startApp();

const cuentas = accounts.map(cuenta => ({
  ...cuenta,
  username: cuenta.owner
    .split(' ')
    .map(word => word[0])
    .join('')
    .toLowerCase(),
}));

function renderMovimientos(movements) {
  containerMovements.innerHTML = '';

  movements.forEach((movimiento, i) => {
    const tipoMovimiento = movimiento > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
        <div class="movements__type movements__type--${tipoMovimiento}">${
      i + 1
    } ${tipoMovimiento}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movimiento}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function startApp() {
  containerApp.style.cssText = 'opacity:100';
  renderMovimientos(usuarioActual.movements);
  showSummary(usuarioActual);
}

select.addEventListener('change', function (e) {
  const selectedOption = this.options[this.selectedIndex];
  const pin = selectedOption.dataset.pin;

  usuarioActual = cuentas.find(cuenta => cuenta.username === select.value);

  containerApp.style.cssText = 'opacity:100';
  renderMovimientos(usuarioActual.movements);
  showSummary(usuarioActual);
});

const typeMovements = document.getElementById('type-movements');
typeMovements.addEventListener('change', function (e) {
  const type = typeMovements.value;

  if (type === 'all') {
    console.log(usuarioActual);
    const deposits = usuarioActual.movements.map(mov => mov);
    renderMovimientos(deposits);
  }

  if (type === 'deposit') {
    const deposits = usuarioActual.movements.filter(mov => mov > 0);
    renderMovimientos(deposits);
  }

  if (type === 'withdrawal') {
    const withdrawal = usuarioActual.movements.filter(mov => mov < 0);
    renderMovimientos(withdrawal);
  }
});

function showSummary(usuarioActual) {
  const showBalance = usuarioActual.movements.reduce((acu, curr) => acu + curr);

  const incomes = usuarioActual.movements
    .filter(user => user > 0)
    .reduce((acu, curr) => acu + curr, 0);

  const out = usuarioActual.movements
    .filter(user => user < 0)
    .reduce((acu, curr) => acu + curr, 0);

  const interest = usuarioActual.movements
    .filter(value => value > 0)
    .map(val => val * (usuarioActual.interestRate / 100))
    .filter(val => val > 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${showBalance}€`;
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
}

function iniciarSesion(e) {
  e.preventDefault();

  const usuarioActual = cuentas.find(
    cuenta => cuenta.username === inputLoginUsername.value
  );
  const passwordUsuario = inputLoginPin.value;

  if (usuarioActual && usuarioActual.pin === +passwordUsuario) {
    containerApp.style.cssText = 'opacity:100';
    renderMovimientos(usuarioActual.movements);

    const showBalance = usuarioActual.movements.reduce((acu, curr) => acu + curr);
    labelBalance.textContent = `${showBalance}€`;
  }
}

btnLogin.addEventListener('click', iniciarSesion);

btnTransfer.addEventListener("click", (e) => {
    e.preventDefault();

    const receivingAccount = cuentas.find(account => account.username ===  inputTransferTo.value)
    const amount = inputTransferAmount.value

    //TODO: Completar funcion para tranferir cuenta
    if(receivingAccount && amount > 0 && usuarioActual !== receivingAccount && amount)


})
