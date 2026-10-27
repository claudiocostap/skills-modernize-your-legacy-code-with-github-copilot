const readline = require('node:readline');

function createAccountManager(initialBalance = 1000) {
  let balance = Number(initialBalance);

  function viewBalance() {
    return balance;
  }

  function credit(amount) {
    if (Number.isNaN(Number(amount))) {
      throw new Error('Credit amount must be a number.');
    }

    balance = Number(balance) + Number(amount);
    return balance;
  }

  function debit(amount) {
    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
      throw new Error('Debit amount must be a number.');
    }

    if (balance < numericAmount) {
      return false;
    }

    balance = Number(balance) - numericAmount;
    return true;
  }

  function handleMenuChoice(choice) {
    switch (Number(choice)) {
      case 1:
        return `Current balance: ${viewBalance()}`;
      case 2:
        return 'Enter credit amount: ';
      case 3:
        return 'Enter debit amount: ';
      case 4:
        return 'Exiting the program. Goodbye!';
      default:
        return 'Invalid choice, please select 1-4.';
    }
  }

  return {
    viewBalance,
    credit,
    debit,
    handleMenuChoice,
    get balance() {
      return balance;
    },
    set balance(nextBalance) {
      balance = Number(nextBalance);
    },
  };
}

async function runAccountMenu() {
  const account = createAccountManager(1000);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (promptText) => new Promise((resolve) => {
    rl.question(promptText, (answer) => resolve(answer));
  });

  while (true) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await ask('Enter your choice (1-4): ');
    const menuResult = account.handleMenuChoice(choice);

    if (menuResult === 'Exiting the program. Goodbye!') {
      console.log(menuResult);
      break;
    }

    if (menuResult.startsWith('Current balance:')) {
      console.log(menuResult);
      continue;
    }

    if (menuResult === 'Invalid choice, please select 1-4.') {
      console.log(menuResult);
      continue;
    }

    console.log(menuResult);

    const amountInput = await ask('');
    const parsedAmount = Number(amountInput);

    if (Number.isNaN(parsedAmount)) {
      console.log('Invalid amount entered.');
      continue;
    }

    if (Number(choice) === 2) {
      account.credit(parsedAmount);
      console.log(`Amount credited. New balance: ${account.viewBalance()}`);
    }

    if (Number(choice) === 3) {
      const wasSuccessful = account.debit(parsedAmount);
      if (wasSuccessful) {
        console.log(`Amount debited. New balance: ${account.viewBalance()}`);
      } else {
        console.log('Insufficient funds for this debit.');
      }
    }
  }

  rl.close();
}

if (require.main === module) {
  runAccountMenu().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { createAccountManager, runAccountMenu };
