const billInput = document.getElementById('myInput');
const tipButtons = document.querySelectorAll('.procentButtons .buttons button');
const customInput = document.getElementById('customInputId');
const numOfPeopleInput = document.getElementById('numPeople');
const tipAmountDisplay = document.getElementById('tipAmountInput');
const totalDisplay = document.getElementById('total');
const resetButton = document.querySelector('.resetBut');

billInput.addEventListener("focus", FocusStyle);
customInput.addEventListener("focus", FocusStyle);
numOfPeopleInput.addEventListener("focus", FocusStyle);

function FocusStyle() {
  this.style.border = "2px solid #26C2AE";
};

function getTipPercentage() {
  let tipPercentage = 0;
  tipButtons.forEach(button => {
    if (button.classList.contains('active')) {
      tipPercentage = parseFloat(button.textContent) / 100;
    }
  })
  if (customInput.value !== '') {
    tipPercentage = parseFloat(customInput.value) / 100;
  }
  return tipPercentage;
};

function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
};

function handleClick(event) {
  tipButtons.forEach(button => {
    button.classList.remove('active');
  });
  event.target.classList.add('active');
  customInput.value = event.target.textContent.replace('%', '');
};

function handleCustomInputChange() {
  tipButtons.forEach(button => {
    button.classList.remove('active');
  });
  Tip();
};

function handleNumOfPeopleChange() {
  Tip();
};

function handleReset() {
  billInput.value = '';
  tipButtons.forEach(button => {
    button.classList.remove('active');
  });
  customInput.value = '';
  numOfPeopleInput.value = '';
  tipAmountDisplay.textContent = formatCurrency(0);
  totalDisplay.textContent = formatCurrency(0);
};
tipButtons.forEach(button => {
  button.addEventListener('click', handleClick);
});

function Tip() {
  const billAmount = parseFloat(billInput.value);
  let tipPercentage = getTipPercentage();
  const numOfPeople = parseFloat(numOfPeopleInput.value);
  const tipAmount = (billAmount * tipPercentage) / numOfPeople;
  const totalAmount = (billAmount + (billAmount * tipPercentage)) / numOfPeople;
  tipAmountDisplay.textContent = formatCurrency(tipAmount);
  totalDisplay.textContent = formatCurrency(totalAmount);
};

customInput.addEventListener('input', handleCustomInputChange);
numOfPeopleInput.addEventListener('input', handleNumOfPeopleChange);
resetButton.addEventListener('click', handleReset);