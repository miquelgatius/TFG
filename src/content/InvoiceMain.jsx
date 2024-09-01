import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/InvoiceMain.css";
import CreateNewPropertyButton from "./CreateNewPropertyButton";

const InvoiceMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/properties/propertiesByUser",
          {
            params: { username: username },
          }
        );

        const allProperties = response.data.properties.flatMap(
          (item) => item.properties
        );

        setData(allProperties);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteButton = async (registry) => {
    console.log("registry :" + registry);
    try {
      const response = await axios.patch(
        "http://localhost:8080/properties/deleteProperty",
        {
          username: username,
          registry: registry,
        }
      );

      console.log("Property deleted sucessfully.", response.data);

      //reload the page to see the changes
      window.location.reload();
    } catch (error) {
      console.error("Error during deleting property:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!username || username === "null") {
    return (
      <div>
        <span className="first-login-error">First you must login.</span>
      </div>
    );
  }

  return (
    <main className="main">
      <section className="invoice-main">
        <h1 className="flat-title">Properties page</h1>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Registry</th>
                <th>Address</th>
                <th>Square Meters</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((property) => (
                <tr key={property.registry}>
                  <td>{property.registry}</td>
                  <td>{property.address}</td>
                  <td>{property.meters}</td>
                  <td>
                    <button className="action-button">
                      <img src="../assets/edit.png" alt="Edit image" />
                    </button>
                    <button className="action-button">
                      <img
                        onClick={() => deleteButton(property.registry)}
                        src="../assets/delete.svg"
                        alt="Delete image"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>You own no properties</span>
        )}
        <CreateNewPropertyButton />
      </section>
    </main>
  );
};

export default InvoiceMain;
