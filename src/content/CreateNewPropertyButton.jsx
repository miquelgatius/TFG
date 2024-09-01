import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles/CreateNewPropertyButton.css";

const CreateNewPropertyButton = () => {
  const [registry, setRegistry] = useState(0);
  const [address, setAddress] = useState("");
  const [meters, setMeters] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const URI = "http://localhost:8080/properties/addNewProperty";

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const createNewProperty = async (e) => {
    e.preventDefault();
    if (registry < 100000) {
      setErrorMessage("Registry is too short.");
    } else if (address.length < 6) {
      setErrorMessage("Address is too short.");
    } else if (meters < 10) {
      setErrorMessage("Meters are too little.");
    } else {
      setErrorMessage("");
      const username = localStorage.getItem("username");
      const property = {
        registry: registry,
        address: address,
        meters: meters,
      };
      try {
        const response = await axios.patch(URI, {
          username,
          property,
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
        Add new property
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Property"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Create New Property</h2>
        {
          <form className="form" onSubmit={createNewProperty}>
            <div className="form-group">
              <label htmlFor="registry">Registry:</label>
              <input
                type="number"
                id="registry"
                value={registry}
                onChange={(e) => setRegistry(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meters">Meters:</label>
              <input
                type="number"
                id="meters"
                value={meters}
                onChange={(e) => setMeters(e.target.value)}
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
                onClick={createNewProperty}
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

export default CreateNewPropertyButton;
