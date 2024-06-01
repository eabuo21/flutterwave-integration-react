import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { showErrorNotification, showSuccessNotification } from "./Toastify";

const Modal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("Junior");
  const [months, setMonths] = useState(1);
  const [totalAmount, setTotalAmount] = useState(20000); // Initial amount for Junior plan

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    calculateTotalAmount(selectedPlan, months);
  };

  const handleMonthChange = (e) => {
    const selectedMonths = parseInt(e.target.value);
    setMonths(selectedMonths);
    calculateTotalAmount(plan, selectedMonths);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const calculateTotalAmount = (selectedPlan, selectedMonths) => {
    let amount = 0;
    switch (selectedPlan) {
      case "Junior":
        amount = 20000 * selectedMonths;
        break;
      case "Senior":
        amount = 40000 * selectedMonths;
        break;
      case "Elite":
        amount = 50000 * selectedMonths;
        break;
      default:
        break;
    }
    setTotalAmount(amount);
  };

  const config = {
    public_key: "FLWPUBK_TEST-f14a4be6600fa27af61e048f3322f8b3-X", // Replace with your Flutterwave public key
    tx_ref: Date.now().toString(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "MEEC TECHNOLOGIES",
      description: "Payment for subscription",
      logo: "https://t-ventures.tongston.com/assets/tongstonlogo-9da5bf12.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent form submission
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          showSuccessNotification("Payment successful");
        } else {
          showErrorNotification("Payment failed, try again");
        }
        setTimeout(() => {
          closePaymentModal(); // This will close the modal programmatically after 10 seconds
          history.push("/")
        }, 1000); // 10 seconds delay
      },
      onClose: () => {},
    });
  };

  return (
    <div className="modal-container fixed inset-0 z-50 flex items-center justify-center bg-transparent w-full">
      <div className="modal-sub-container inset-0 bg-gray-300 p-4 w-full h-full">
        <div className="modal-content relative top-5 bg-white flex flex-col gap-4 p-3 rounded-md shadow-xl py-4 h-[fixed] w-[550px] mx-auto">
          <button
            onClick={onClose}
            className="close-modal-btn bg-transparent text-red text-base rounded-[50%] ml-auto"
          >
            Close
          </button>
          <hr style={{ border: "2px solid red", width: "120px" }}></hr>
          <hr style={{ border: "2px solid grey", width: "80px" }}></hr>
          <form
            className="booking-form flex flex-col justify-start items-start gap-4 p-3 px-4"
            onSubmit={handlePayment}
          >
            <h4 className="text-gray-700 font-semibold text-base text-center mx-auto">
              Data Capture
            </h4>
            <section className="grid grid-cols-2 gap-6 w-full">
              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Name
                </p>
                <input
                  type="text"
                  value={name}
                  placeholder="Full name"
                  onChange={handleNameChange}
                  className="text-sm font-normal p-2 w-full border border-red"
                />
              </label>

              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Email
                </p>
                <input
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={handleEmailChange}
                  className="text-sm font-normal p-2 w-full border border-red"
                />
              </label>

              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Phone Number
                </p>
                <input
                  type="tel"
                  value={phone}
                  placeholder="Phone number"
                  onChange={handlePhoneChange}
                  className="text-sm font-normal p-2 w-full border border-red"
                />
              </label>

              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Select Plan
                </p>
                <select
                  value={plan}
                  onChange={handlePlanChange}
                  className="text-sm font-normal p-2 w-full border border-red text-gray-500"
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Elite">Elite</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Number of Months
                </p>
                <input
                  type="number"
                  min="1"
                  placeholder="Number of months"
                  value={months}
                  onChange={handleMonthChange}
                  className="text-sm font-normal p-2 w-full border border-red text-gray-500"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-normal text-left ">
                  Amount Due
                </p>
                <p className="text-sm font-normal p-2 w-full border border-red text-gray-500">
                  Total = &#8358;{totalAmount}
                </p>
              </label>
            </section>
            <button
              type="submit"
              className="bg-red text-white text-center font-normal text-base mx-auto p-2 w-full h-auto"
            >
              Pay &#8358;{totalAmount}
            </button>
          </form>
          <hr
            style={{
              border: "2px solid grey",
              width: "120px ",
              marginLeft: "auto",
            }}
          ></hr>
          <hr
            style={{
              border: "2px solid red",
              width: "80px",
              marginLeft: "auto",
            }}
          ></hr>
        </div>
      </div>
    </div>
  );
};

export default Modal;
