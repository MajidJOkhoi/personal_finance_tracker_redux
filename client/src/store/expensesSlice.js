import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
  const response = await axios.get('http://localhost:3001/financial-records/records');
  return response.data.data; // Ensure this is an array
});

export const addExpense = createAsyncThunk('expenses/addExpense', async (newExpense) => {
  const response = await axios.post('http://localhost:3001/financial-records/addrecord', newExpense);
  return response.data;
});

export const updateExpense = createAsyncThunk('expenses/updateExpense', async ({ id, updatedExpense }) => {
  const response = await axios.put(`http://localhost:3001/financial-records/records/${id}`, updatedExpense);
  return response.data;
});

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
  await axios.delete(`http://localhost:3001/financial-records/records/${id}`);
  return id;
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(expense => expense._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(expense => expense._id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;
