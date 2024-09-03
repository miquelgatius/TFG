import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PropertyMain.css";
import CreateNewPropertyButton from "../propertyPage/CreateNewPropertyButton";
import DeletePropertyButton from "../propertyPage/DeletePropertyButton";
import UpdatePropertyButton from "../propertyPage/UpdatePropertyButton";

const InvoicesMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const { registry } = useParams();

  useEffect(() => {
    if (username && username !== "null" && registry != undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/invoices/invoicesByUserAndRegistry",
            {
              params: { username: username, registry: registry },
            }
          );
          console.log(response.data.invoices);

          const allInvoices = response.data.invoices.flatMap((item) => item);

          setData(allInvoices);
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
        <h1>Properties page</h1>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>InvoiceID</th>
                <th>Invoice Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((invoice) => (
                <tr key={invoice.invoiceID}>
                  <td>{invoice.invoiceID}</td>
                  <td>{invoice.invoiceDescription}</td>
                  <td>{invoice.invoiceType}</td>
                  <td>{invoice.invoiceAmount}</td>
                  <td>
                    <UpdatePropertyButton property={invoice} />
                    <DeletePropertyButton registry={invoice.registry} />
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

export default InvoicesMain;
