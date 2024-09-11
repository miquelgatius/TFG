import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../../styles/PropertyMain.css";
import CreateNewPropertyButton from "./CreateNewPropertyButton";
import DeletePropertyButton from "./DeletePropertyButton";
import UpdatePropertyButton from "./UpdatePropertyButton";
import { useNavigate } from "react-router-dom";

const PropertyMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const navigateToInvoice = (passedRegistry) => {
    navigate(`/properties/${passedRegistry}`);
  };

  useEffect(() => {
    if (username && username !== "null") {
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
    }
  }, []);

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
      <section className="properties-main">
        <h1 className="properties-title">Properties page</h1>
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
                    <button
                      onClick={() => navigateToInvoice(property.registry)}
                      className="action-button"
                    >
                      <img src="../assets/enter.svg" alt="Enter image" />
                    </button>
                    <UpdatePropertyButton property={property} />
                    <DeletePropertyButton registry={property.registry} />
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

export default PropertyMain;
