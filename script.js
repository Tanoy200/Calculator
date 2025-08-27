const display = document.getElementById('display');

function appendValue(value) {
  const operators = ['+', '-', '*', '/'];
  const last = display.value.slice(-1);
  if (operators.includes(last) && operators.includes(value)) {
    // replace last operator with new one
    display.value = display.value.slice(0, -1) + value;
    return;
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // avoid evaluating empty or trailing operator
    const expr = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    if (!expr) return;
    if (/[+\-*/]$/.test(expr)) return;
    const result = eval(expr);
    display.value = String(result);
  } catch (e) {
    display.value = 'Error';
  }
}

// --- Keyboard support ---
window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (e.ctrlKey || e.metaKey) return;

  if (/^[0-9]$/.test(key)) {
    appendValue(key);
    e.preventDefault();
    return;
  }

  if (['+', '-', '*', '/', '.'].includes(key)) {
    appendValue(key);
    e.preventDefault();
    return;
  }

  if (key === 'Enter' || key === '=') {
    calculate();
    e.preventDefault();
    return;
  }

  if (key === 'Backspace') {
    deleteLast();
    e.preventDefault();
    return;
  }

  if (key === 'Escape') {
    clearDisplay();
    e.preventDefault();
    return;
  }

  if (key === 'Unidentified') return;
});
