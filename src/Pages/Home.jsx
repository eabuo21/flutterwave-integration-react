import React, { useState } from "react";
import Modal from "../Components/FlutterwaveModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="home-container text-center text-red font-bold text-3xl py-6 flex flex-col gap-6">
        <h1>Welcome to The Flutterwave React Integration</h1>

        <button
          onClick={openModal}
          className="get-started-btn bg-red text-white font-bold w-[50%] h-[40px] rounded-md mx-auto"
        >
         Explore
        </button>

        {isModalOpen && <Modal onClose={closeModal} />}
      </div>
    </>
  );
};

export default Home;
