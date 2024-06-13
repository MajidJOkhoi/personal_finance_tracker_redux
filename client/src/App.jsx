import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import FinancialRecordForm from "./pages/dashboard/Financial_Record_Form";
import FinancialRecordEdit from "./pages/FinancialRecordEdit";
import FinancialRecordDelete from "./pages/FinancialRecordDelete";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/financial-records/new" element={<FinancialRecordForm />} />
        <Route path="/financial-records/edit/:id" element={<FinancialRecordEdit />} />
        <Route path="/financial-records/delete/:id" element={<FinancialRecordDelete />} />
      </Routes>
    </div>
   
  );
}

export default App;
