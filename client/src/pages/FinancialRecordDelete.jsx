import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, deleteExpense } from "../store/expensesSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const DeleteFinancialRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const record = useSelector((state) =>
    state.expenses.items.find((record) => record._id === id)
  );
  const status = useSelector((state) => state.expenses.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExpenses());
    }
  }, [dispatch, status]);

  const handleDeleteRecord = () => {
    dispatch(deleteExpense(id))
      .then(() => {
        toast.success("Financial record deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("An error occurred. Please check the console.");
        console.error("Error deleting financial record:", error);
      });
  };

  if (status === "loading") {
    return <Spinner />;
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
          <h1 className="text-2xl mb-8 font-bold text-gray-900 text-center">Delete Financial Record</h1>
          <div className="text-center">
            <p className="mb-4">Are you sure you want to delete the following financial record?</p>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {record.description}</p>
              <p><strong>Amount:</strong> ${record.amount.toFixed(2)}</p>
              <p><strong>Category:</strong> {record.category}</p>
              <p><strong>Payment Method:</strong> {record.paymentMethod}</p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteRecord}
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFinancialRecord;
