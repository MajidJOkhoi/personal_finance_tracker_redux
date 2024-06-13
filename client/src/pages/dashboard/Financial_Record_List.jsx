import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../store/expensesSlice';
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Financial_Record_List = () => {
  const dispatch = useDispatch();
  const { items: records, status } = useSelector(state => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

 

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Financial Records</h2>
      <div className="mb-4">
        <Link
          to="/financial-records/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Record
        </Link>
      </div>
      {records.length === 0 ? (
        <p>No financial records available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Payment Method</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{record.description}</td>
                  <td
                    className={`px-4 py-2 ${
                      record.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {record.amount}
                  </td>
                  <td className="px-4 py-2">{record.category}</td>
                  <td className="px-4 py-2">{record.paymentMethod}</td>
                  <td className="px-4 py-2 inline-flex">
                    <Link
                      to={`/financial-records/edit/${record._id}`}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>

                    <Link
                      to={`/financial-records/delete/${record._id}`}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <AiOutlineDelete size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Financial_Record_List;
