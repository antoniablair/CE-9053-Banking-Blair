

function BankAccount(cfg) {
    // check for config parameter. If config does not exist or config is not an object 
    // or config keys
    if(!cfg || typeof cfg !== 'object' || Object.keys(cfg).length <= 0) {
        throw "Config parameter must be a non-empty object";
    }
    // check for a defined balance
    if(cfg.balance && (cfg.balance < 0 || typeof cfg.balance !== 'number')) {
        throw "Balance must a number of at least 0";
    } else if (cfg.balance) {
        this.balance = cfg.balance;
    } else {
        this.balance = 0;
    }
    // check to make sure account ID exists or is set
    if(!cfg.accountId) {
        this.accountId = Math.floor(Math.random() * 90000) + 10000;
    } else {
        this.accountId = cfg.accountId;
    }
    // check to make sure locked parameter is properly set
    if(cfg.locked && typeof cfg.locked !== 'boolean') {
        throw "Account lock status error.";
    } else if (!cfg.locked) {
        this.locked = false;
    } else {
        this.locked = cfg.locked;
    }
}

BankAccount.prototype = {
    deposit: function(amount) {
        if(!amount || typeof amount !== 'number' || amount <= 0) {
             throw "Invalid deposit amount.";
        } 
        else if (this.locked === true) {
            throw "The account is locked, sorry.";
        }
        else {
            this.balance = this.balance + amount;  
        } 
    },
    withdraw: function(amount) {
        if(!amount || typeof amount !=='number' || amount <= 0) {
            throw "Invalid withdrawal amount.";
        }
        else if (this.locked === true) {
            throw "The account is locked for withdrawals, sorry.";
        }
        else {
            if (this.balance < amount) { 
                throw "Negative balance is not allowed.";
            }
            else {
                if (this.balance < 1000) {
                    if ((this.balance - 1) < amount) {
                        throw "Transactions under $1000 require a $1 fee.                              Negative balance is not allowed after withdrawal.";
                    }
                    else {
                    this.balance = this.balance - amount - 1;
                    }
                }
            }
        }
    }
};

module.exports = BankAccount;




// console.log(account);

// account.withdraw(1);

// console.log(account);
