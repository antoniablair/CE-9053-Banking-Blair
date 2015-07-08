/* globals describe beforeEach it expect */ 

var BankAccount = require("../app/bank_account");

describe("BankAccount", function(){
    it("Exists", function(){
        expect(BankAccount).toBeDefined();
    });
    
    var myAccount = new BankAccount({balance: 20, locked: false});
    it("contains a balance", function(){
        expect(myAccount.balance).toEqual(20);
    });
    
    it("creates an Account ID if you don't specify one", function(){
    expect(myAccount.accountId).toBeDefined();
    });
    
    var defaultLockBalance = new BankAccount({accountId: 'abc'});
    it("defaults locked to false if you don't specify locked", function(){
        expect(defaultLockBalance.locked).toBe(false);
    });
    
    it("defaults balance to 0 if you don't specify a starting balance", function(){
        expect(defaultLockBalance.balance).toEqual(0);
    });
    
    var emptyAccount = new BankAccount();
     it("Has error if it is undefined", function(){
         // To do: This is failing the test even though it is throwing
        expect(emptyAccount.balance).toThrow();
    });
});

describe("Locked Throw", function() {
   var amILockedAccount = new BankAccount({balance: 3000, locked: 'three' });
   it("throws an error if locked is not true or false", function(){
       //  To do: This is failing the test even though it is throwing
      expect(amILockedAccount).toThrow(); 
   });
});

describe("Deposit", function(){
    var blairAccount = new BankAccount({balance: 20, accountId: 'abc', locked: false});
    beforeEach(function() {
        blairAccount.deposit(10);
      });
    it("successfully makes a deposit", function(){
       expect(blairAccount.balance).toEqual(30); 
    });
});

describe("Withdraw with starting balance under $1000", function(){
    var blairAccount3 = new BankAccount({ balance: 10, accountId: '5678', locked: false});
    beforeEach(function() {
        blairAccount3.withdraw(9);
     });
    it("withdraws and removes an extra dollar", function(){
       expect(blairAccount3.balance).toEqual(0); 
    });
});

describe("Withdraw from locked account", function() {
   var myLockedAccount = new BankAccount({balance: 5, locked: true});
   beforeEach(function(){
       myLockedAccount.withdraw(1);
   });
   it("Throws when you try to withdraw from a locked account", function(){
       expect(myLockedAccount.balance).toThrow();
   });
});

describe("Withdraw from $1000+", function(){
    var blairAccountLarge = new BankAccount({ balance: 1010, accountId: '5678', locked: false});
    beforeEach(function() {
        blairAccountLarge.withdraw(9);
     });
    it("withdraws and removes an extra dollar", function(){
       expect(blairAccountLarge.balance).toEqual(1001); 
    });
    it("throws if resulting in a negative number", function(){
        // To do: This is failing the test even though it is throwing
        blairAccountLarge.withdraw(1020);
        expect(blairAccountLarge.balance).toThrow();
    });
});
