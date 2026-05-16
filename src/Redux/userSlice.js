import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: [
         {
            id: 1,
            fullName: "John Doe",
            email: "john.doe@example.com",
            password: "Passwor@d",
            accounts:[
                {
                    id: 1,
                    name: "Main Account",
                    accountNumber: "1234567890",
                    balance: 250000,
                },
                {
                    id: 2,
                    name: "Savings Account",
                    accountNumber: "1234567891",
                    balance: 250000,
                }
            ],
            transactions: [],
        },
        {
            id: 2,
            fullName: "Jane Doe",
            email: "jane.doe@example.com",
            password: "password",
            accounts: [
                {
                    id: 1,
                    name: "Main Account",
                    accountNumber: "1234567892",
                    balance: 250000,
                },
                {
                    id: 2,
                    name: "Savings Account",
                    accountNumber: "1234567893",
                    balance: 250000,
                }
            ],
            transactions: [],
        },
        {
            id: 3,
            fullName: "John Smith",
            email: "john.smith@example.com",
            password: "password",
            accounts: [
                {
                    id: 1,
                    name: "Main Account",
                    accountNumber: "1234567894",
                    balance: 5000000,
                }
                
            ],
            transactions: [],
        },
        {
            id: 4,
            fullName: "William Smith",
            email: "william.smith@example.com",
            password: "password",
            accounts: [
                {
                    id: 1,
                    name: "Main Account",
                    accountNumber: "1234567895",
                    balance: 5000000,
                }
            ],
            transactions: [],
        },
    ],
    reducers: {
        transferFunds: (state, action) => {
            const {userID, senderAccountID, recipientAccountNumber, recipientID, amount, memo} = action.payload;

            const sender = state.find(user => user.id === userID);
            const senderAccount = sender.accounts.find(account => account.id === senderAccountID);

            if (senderAccount.balance > amount) {
                senderAccount.balance -= amount;
                const recipient = state.find(user => user.id === recipientID);
                const recipientAccount = recipient.accounts.find(account => account.accountNumber === recipientAccountNumber);
                recipientAccount.balance += amount;
                sender.transactions.push({
                    id: sender.transactions.length + 1,
                    type: "debit",
                    amount: amount,
                    name: recipient.fullName,
                    accountName: recipientAccount.name,
                    memo: memo,
                    date: new Date().toISOString(),
                });
                recipient.transactions.push({
                    id: recipient.transactions.length + 1,
                    type: "credit",
                    amount: amount,
                    name: sender.fullName,
                    accountName: senderAccount.name,
                    memo: memo,
                    date: new Date().toISOString(),
                });
                alert("Funds transferred successfully");
                return state;
            }

        }
    }
})

export const { transferFunds } = userSlice.actions;
export default userSlice.reducer;