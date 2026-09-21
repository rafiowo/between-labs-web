'use strict';

// Fictional records used only by the website preview.
const SAMPLE_PEOPLE = [
  { name: 'Sam', note: '2 entries', amount: '+$120.00', direction: 'owed' },
  { name: 'Alex', note: '1 entry', amount: '+$300.00', direction: 'owed' },
  { name: 'Jamie', note: '1 entry', amount: '−$85.00', direction: 'owing' },
  { name: 'Taylor', note: 'All square', amount: '✓ Settled', direction: 'settled' },
];

const REPAYMENT_DEMO = {
  total: 100,
  startingPayment: 25,
  paymentStep: 25,
};

/** Create a text-only element without interpreting content as HTML. */
function createElement(tagName, text, className = '') {
  const element = document.createElement(tagName);
  element.textContent = text;
  element.className = className;
  return element;
}

function createPersonRow(person) {
  const row = createElement('div', '', 'person-row');
  const avatar = createElement('span', person.name[0], 'avatar');
  const details = createElement('div', '');
  details.append(createElement('strong', person.name), createElement('small', person.note));

  const amountClass = { owing: 'outgoing', settled: 'settled' }[person.direction] ?? '';
  const amount = createElement('b', person.amount, amountClass);
  const chevron = createElement('span', '›', 'chevron');
  chevron.setAttribute('aria-hidden', 'true');

  row.append(avatar, details, amount, chevron);
  return row;
}

function initializePeoplePreview() {
  const list = document.querySelector('#people-list');
  const count = document.querySelector('#people-count');
  const filterButtons = document.querySelectorAll('[data-filter]');

  function selectFilter(filter) {
    const visiblePeople = SAMPLE_PEOPLE.filter((person) =>
      filter === 'open' ? person.direction !== 'settled' : person.direction === filter,
    );

    list.replaceChildren(...visiblePeople.map(createPersonRow));
    count.textContent = String(visiblePeople.length);

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => selectFilter(button.dataset.filter));
  });

  selectFilter('open');
}

function initializeRepaymentDemo() {
  const button = document.querySelector('#repay');
  const remainingLabel = document.querySelector('#remaining');
  const paidLabel = document.querySelector('#paid');
  const progress = document.querySelector('#progress-fill');
  const status = document.querySelector('#repay-status');
  const { total, startingPayment, paymentStep } = REPAYMENT_DEMO;
  let paid = startingPayment;

  function renderRepayment() {
    const isSettled = paid === total;
    remainingLabel.textContent = isSettled ? 'All square!' : `$${total - paid} left`;
    paidLabel.textContent = `$${paid} repaid`;
    progress.style.width = `${(paid / total) * 100}%`;

    const buttonLabel = isSettled ? 'Reset the demo ' : `Try a $${paymentStep} repayment `;
    const buttonIcon = createElement('span', isSettled ? '↺' : '+');
    button.replaceChildren(document.createTextNode(buttonLabel), buttonIcon);

    status.textContent = isSettled
      ? 'Settled. One less thing on your mind.'
      : 'A small demo. No real money moves.';
  }

  button.addEventListener('click', () => {
    // A click after settlement returns to the original sample balance.
    paid = paid === total ? startingPayment : Math.min(paid + paymentStep, total);
    renderRepayment();
  });

  renderRepayment();
}

initializePeoplePreview();
initializeRepaymentDemo();
