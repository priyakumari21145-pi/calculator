  const display = document.getElementById('display');
  let currentInput = '';
  let shouldReset = false;

  function inputDigit(digit) {
    if (shouldReset) {
      currentInput = '';
      shouldReset = false;
    }
    currentInput += digit;
    updateDisplay();
  }

  function inputOperator(op) {
    if (/[+\-*/]$/.test(currentInput)) {
      currentInput = currentInput.slice(0, -1);
    }
    currentInput += op;
    shouldReset = false;
    updateDisplay();
  }

  function inputDot(dot) {
    const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes(dot)) {
      currentInput += dot;
      updateDisplay();
    }
  }

  function clearDisplay() {
    currentInput = '';
    updateDisplay('0');
  }

  function calculate() {
    try {
      let result = eval(currentInput);
      result = Number.isFinite(result) ? result : 'Err';
      updateDisplay(result);
      currentInput = result.toString();
      shouldReset = true;
    } catch (e) {
      updateDisplay('Err');
    }
  }

  function updateDisplay(value = currentInput) {
    display.textContent = value || '0';
  }
  document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key)) {
      inputDigit(key);
    } else if ('+-*/'.includes(key)) {
      inputOperator(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (key === 'Escape') {
      clearDisplay();
    } else if (key === '.') {
      inputDot('.');
    }
  });