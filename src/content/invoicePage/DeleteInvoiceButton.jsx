import axios from "axios";
import "../../styles/PropertyMain.css";

const DeleteInvoiceButton = (parameter) => {
  const username = localStorage.getItem("username");
  const URI = "http://localhost:8080/invoices/deleteInvoice";
  const registry = parameter.registry;
  const invoiceID = parameter.invoiceID;

  const deleteButton = async () => {
    try {
      const response = await axios.patch(URI, {
        username: username,
        registry: registry,
        invoiceID: invoiceID,
      });

      console.log("Property deleted sucessfully.", response.data);

      //reload the page to see the changes
      window.location.reload();
    } catch (error) {
      console.error("Error during deleting property:", error);
    }
  };

  return (
    <button className="action-button">
      <img
        onClick={deleteButton}
        src="../../assets/delete.svg"
        alt="Delete image"
      />
    </button>
  );
};

export default DeleteInvoiceButton;
