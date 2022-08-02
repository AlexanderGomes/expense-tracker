import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transaction')) || [{ amount: 500, category: 'Salary', type: 'Income', date: '2022-08-01' }, { amount: 225, category: 'Investments', type: 'Income', date: '2022-08-02'}, { amount: 50, category: 'Salary', type: 'Income', date: '2022-08-05'}, { amount: 123, category: 'Car', type: 'Expense', date: '2022-08-06'}, { amount: 50, category: 'Pets', type: 'Expense', date: '2022-08-22'}, { amount: 500, category: 'Travel', type: 'Expense', date: '2022-08-06'}, { amount: 50, category: 'Investments', type: 'Income', date: '2022-08-21' }, { amount: 500, category: 'Savings', type: 'Income', date: '2022-08-03' }, { amount: 5, category: 'Savings', type: 'Income', date: '2022-08-07' }];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
