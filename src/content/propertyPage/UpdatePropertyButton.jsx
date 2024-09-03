import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/CreateNewPropertyButton.css";

const UpdatePropertyButton = (parameter) => {
  const [registry, setRegistry] = useState(parameter.property.registry);
  const [address, setAddress] = useState(parameter.property.address);
  const [meters, setMeters] = useState(parameter.property.meters);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const URI = "http://localhost:8080/properties/updateProperty";
  const username = localStorage.getItem("username");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updateProperty = async (e) => {
    e.preventDefault();
    if (registry < 100000) {
      setErrorMessage("Registry is too short.");
    } else if (address.length < 6) {
      setErrorMessage("Address is too short.");
    } else if (meters < 10) {
      setErrorMessage("Meters are too little.");
    } else {
      setErrorMessage("");

      const property = {
        registry: registry,
        address: address,
        meters: meters,
      };
      try {
        const response = await axios.put(URI, {
          username,
          property,
        });

        console.log("Updated a property sucessfully.", response.data);

        setModalIsOpen(false);

        //window.location.reload();
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
        <h2 className="modal-title">Update a property.</h2>
        {
          <form className="form" onSubmit={updateProperty}>
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
                onClick={updateProperty}
              >
                Update
              </button>
            </div>
          </form>
        }
      </Modal>
    </>
  );
};

export default UpdatePropertyButton;
