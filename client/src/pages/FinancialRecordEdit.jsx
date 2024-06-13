import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, updateExpense } from '../store/expensesSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const EditFinancialRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(state => state.expenses);
  const record = items.find(item => item._id === id);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenses());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (record) {
      setDate(record.date.split('T')[0]);
      setDescription(record.description);
      setAmount(record.amount.toString());
      setCategory(record.category);
      setPaymentMethod(record.paymentMethod);
    }
  }, [record]);

  const validateForm = () => {
    const newErrors = {};
    if (!date) newErrors.date = 'Date is required';
    if (!description) newErrors.description = 'Description is required';
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      newErrors.amount = 'Amount must be a number';
    }
    if (!category) newErrors.category = 'Category is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    return newErrors;
  };

  const handleSaveRecord = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedExpense = { date, description, amount: parseFloat(amount), category, paymentMethod };

    dispatch(updateExpense({ id, updatedExpense }))
      .unwrap()
      .then(() => {
        toast.success('Financial record updated successfully');
        navigate('/');
      })
      .catch(err => {
        toast.error('An error occurred. Please check the console.');
        console.error(err);
      });
  };

  if (status === 'loading' || status === 'idle') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  if (!record) {
    return <div className="text-center mt-4">Record not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-start p-4">
        <BackButton destination="/" />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <h1 className="text-2xl mb-8 font-bold text-gray-900 text-center">Edit Financial Record</h1>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={`px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.date && <span className="text-red-500">{errors.date}</span>}
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={`px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && <span className="text-red-500">{errors.description}</span>}
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className={`px-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.amount && <span className="text-red-500">{errors.amount}</span>}
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-700">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={`px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              <option value="salary">Salary</option>
              <option value="groceries">Groceries</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <span className="text-red-500">{errors.category}</span>}
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className={`px-4 py-2 border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a payment method</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="mobile_payment">Mobile Payment</option>
              <option value="other">Other</option>
            </select>
            {errors.paymentMethod && <span className="text-red-500">{errors.paymentMethod}</span>}
          </div>
          <button
            onClick={handleSaveRecord}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFinancialRecord;
