import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

const BackButton = ({ destination }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(destination)}
      className="text-blue-600 hover:underline"
    >
      <IoArrowBackCircle className="mr-2 size-8" />
     
    </button>
  );
};

export default BackButton;
