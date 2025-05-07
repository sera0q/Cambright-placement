document.addEventListener('DOMContentLoaded', function () {
  const nameField = document.getElementById('studentName');
  const emailField = document.getElementById('studentEmail');
  const passField = document.getElementById('studentPassport');
  const pinInput = document.getElementById('pinInput');
  const startBtn = document.getElementById('startBtn');
  const pinError = document.getElementById('pin-error');
  const form = document.getElementById('welcome-form');
  const pinElement = document.getElementById('pinShow');

  // Simulate a stored pin
  // pinElement.textContent = 'PIN: ' + pin; // 👈 Comment this out

  localStorage.setItem('examPin', JSON.stringify({ pin: "123456" }));

  const pinData = JSON.parse(localStorage.getItem('examPin'));
  if (pinData) {
    const pin = pinData.pin;
  } else {
    pinElement.textContent = 'No PIN available or expired.';
  }

  [nameField, emailField, passField, pinInput].forEach(el => {
    el.addEventListener('input', validateAll);
  });

  validateAll(); // on load

  function validateAll() {
    const filled = nameField.value.trim() && emailField.value.trim() && passField.value.trim();
    const pinOk = isValidPin(pinInput.value.trim());

    startBtn.disabled = !(filled && pinOk);
    pinError.style.display = (pinInput.value && !pinOk) ? 'block' : 'none';
  }

  function isValidPin(pin) {
    const pinData = JSON.parse(localStorage.getItem('examPin'));
    return pinData && pin === pinData.pin;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (startBtn.disabled) return;

    localStorage.setItem('currentStudent', JSON.stringify({
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      passport: passField.value.trim()
    }));

    window.location.href = "exam.html";
  });
});
