import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PropertyMain.css";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import DeleteInvoiceButton from "../invoicePage/DeleteInvoiceButton";
import UpdatePropertyButton from "../propertyPage/UpdatePropertyButton";
import InvoiceTableDate from "../invoicePage/InvoiceTableDate";

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
        <h1>Invoice page for the flat with registry: {registry}</h1>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>InvoiceID</th>
                <th>Invoice Description</th>
                <th>Type</th>
                <th>Date</th>
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
                  <InvoiceTableDate invoiceDate={invoice.invoiceDate} />
                  <td>{invoice.invoiceAmount}</td>
                  <td>
                    <UpdatePropertyButton property={invoice} />
                    <DeleteInvoiceButton
                      registry={registry}
                      invoiceID={invoice.invoiceID}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>You own no invoices.</span>
        )}
        <CreateNewInvoiceButton registry={registry} />
      </section>
    </main>
  );
};

export default InvoicesMain;
