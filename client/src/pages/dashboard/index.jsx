import React from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./Financial_Record_Form";
import FinancialRecordList from "./Financial_Record_List";
import Auth from "../auth/index";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <Auth />
        </nav>
        {isSignedIn ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}! Here are your finances:</h1>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <FinancialRecordForm />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FinancialRecordList />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-gray-700">Please sign in to access your dashboard.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
