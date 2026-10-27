const test = require('node:test');
const assert = require('node:assert/strict');

const { createAccountManager } = require('./index');

test('view balance returns current balance', () => {
  const account = createAccountManager(1000);
  assert.equal(account.viewBalance(), 1000);
});

test('credit adds amount to balance', () => {
  const account = createAccountManager(1000);
  account.credit(250.5);
  assert.equal(account.viewBalance(), 1250.5);
});

test('debit subtracts amount when funds are available', () => {
  const account = createAccountManager(1000);
  account.debit(200.25);
  assert.equal(account.viewBalance(), 799.75);
});

test('debit refuses transaction when funds are insufficient', () => {
  const account = createAccountManager(100);
  const result = account.debit(250);
  assert.equal(result, false);
  assert.equal(account.viewBalance(), 100);
});

test('menu option validation rejects unsupported choices', () => {
  const account = createAccountManager(1000);
  assert.equal(account.handleMenuChoice(9), 'Invalid choice, please select 1-4.');
});
