import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/CreateNewPropertyButton.css";

const UpdateInvoiceButton = (parameter) => {
  //function to change the date format to make it work in the input
  //otherwise it doesn't show the default date from the database.
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const invoiceID = parameter.invoice.invoiceID;

  const [invoiceDescription, setInvoiceDescription] = useState(
    parameter.invoice.invoiceDescription
  );
  const [invoiceType, setInvoiceType] = useState(parameter.invoice.invoiceType);
  const [invoiceDate, setInvoiceDate] = useState(
    String(formatDateForInput(parameter.invoice.invoiceDate))
  );
  const [invoiceAmount, setInvoiceAmount] = useState(
    parameter.invoice.invoiceAmount
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const registry = parameter.registry;
  const regexAmountDecimal = /^\d+\.\d{2}$/;
  const URI = "http://localhost:8080/invoices/updateInvoice";
  const username = localStorage.getItem("username");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updateInvoice = async (e) => {
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
      const invoice = {
        invoiceID: invoiceID,
        invoiceDescription: invoiceDescription,
        invoiceType: Number(invoiceType),
        invoiceDate: invoiceDate,
        invoiceAmount: invoiceAmount,
      };

      try {
        const response = await axios.put(URI, {
          username,
          registry,
          invoice,
        });

        console.log("Updated an invoice succesfully", response.data);

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
    <>
      <button onClick={openModal} className="action-button">
        <img src="../../assets/edit.png" alt="Delete image" />
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
          <form className="form" onSubmit={updateInvoice}>
            <div className="form-group">
              <label htmlFor="invoiceID">InvoiceID:</label>
              <input type="number" id="invoiceID" value={invoiceID} readOnly />
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
                onClick={updateInvoice}
              >
                Add
              </button>
            </div>
          </form>
        }
      </Modal>
    </>
  );
};

export default UpdateInvoiceButton;
