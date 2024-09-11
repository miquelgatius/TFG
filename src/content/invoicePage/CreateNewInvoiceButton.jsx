import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/CreateNewPropertyButton.css";

const CreateNewInvoiceButton = (parameter) => {
  const [invoiceID, setinvoiceID] = useState(1);
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [invoiceType, setInvoiceType] = useState(1);
  const [invoiceDate, setInvoiceDate] = useState("2024-01-01");
  const [invoiceAmount, setInvoiceAmount] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const URI = "http://localhost:8080/invoices/addNewInvoice";
  const registry = parameter.registry;
  const regexAmountDecimal = /^\d+\.\d{2}$/;
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(invoiceDate);
  };

  const createNewInvoice = async (e) => {
    e.preventDefault();

    if (invoiceID < 100000) {
      setErrorMessage("InvoiceID is too short.");
    } else if (invoiceDescription.length < 6) {
      setErrorMessage("Invoice description is too short.");
    } else if (invoiceType < 1 || invoiceType > 3) {
      setErrorMessage("Invoice type is invalid.");
    } else if (invoiceAmount < 0.01) {
      setErrorMessage("Invoice amount is too small.");
    } else if (!regexAmountDecimal.test(invoiceAmount.toString())) {
      setErrorMessage("Invoice amount must have exactly two decimals.");
    } else {
      setErrorMessage("");
      const username = localStorage.getItem("username");
      const newInvoice = {
        invoiceID: invoiceID,
        invoiceDescription: invoiceDescription,
        invoiceType: Number(invoiceType),
        invoiceDate: invoiceDate,
        invoiceAmount: invoiceAmount,
      };

      console.log(invoiceDate);
      try {
        const response = await axios.patch(URI, {
          username,
          registry,
          newInvoice,
        });

        console.log("Added new property succesfully", response.data);

        setModalIsOpen(false);

        window.location.reload();
      } catch (error) {
        if (error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Adding new property has failed.");
        }
        console.error("Error during adding a new property:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} className="new-property-button">
        Add new Invoice
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Property"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Create New Invoice</h2>
        {
          <form className="form" onSubmit={createNewInvoice}>
            <div className="form-group">
              <label htmlFor="invoiceID">InvoiceID:</label>
              <input
                type="number"
                id="invoiceID"
                value={invoiceID}
                onChange={(e) => setinvoiceID(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="invoiceDescription">Invoice Description:</label>
              <input
                type="text"
                id="invoiceDescription"
                value={invoiceDescription}
                onChange={(e) => setInvoiceDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="InvoiceType">Invoice type:</label>
              <select
                id="invoiceType"
                className="select-invoice-type"
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose Invoice Type --
                </option>
                <option value="1">Standard Invoice</option>
                <option value="2">Upgrade or furniture</option>
                <option value="3">Amortization</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice date:</label>
              <input
                type="date"
                id="invoiceDate"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="invoiceAmount">Invoice amount:</label>
              <input
                type="number"
                id="invoiceAmount"
                min="0.00"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                pattern="^\d*(\.\d{0,2})?$"
                required
              />
            </div>
            <div className="error-message">
              <span>{errorMessage}</span>
            </div>
            <div className="button-group">
              <button
                className="modal-button close-button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="modal-button add-button"
                onClick={createNewInvoice}
              >
                Add
              </button>
            </div>
          </form>
        }
      </Modal>
    </div>
  );
};

export default CreateNewInvoiceButton;
