import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/InvoiceMain.css";

const InvoiceMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(username);
        const response = await axios.get(
          "http://localhost:8080/realEstate/realEstateByUser",
          {
            params: { username: username },
          }
        );
        console.log(response);
        const allFlats = response.data.flats.flatMap((item) => item.flat);
        console.log(allFlats);
        setData(allFlats);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="main">
      <section className="invoice-main">
        <h1 className="flat-title">Real estate page</h1>

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
              {data.map((flat) => (
                <tr key={flat.registry}>
                  <td>{flat.registry}</td>
                  <td>{flat.address}</td>
                  <td>{flat.meters}</td>
                  <td>
                    <button className="action-button">
                      <img
                        src="../assets/edit-1479-svgrepo-com.svg"
                        alt="Edit image"
                      />
                    </button>
                    <button className="action-button">
                      <img src="../assets/delete.svg" alt="Delete image" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data available</div>
        )}
      </section>
    </main>
  );
};

export default InvoiceMain;

/* const information = [
    {
      username: "miquel",
      flat: [
        {
          registry: 1237812387213,
          address: "123 Main St, Apt 101",
          bills: [
            {
              billId: 1,
              billDescription: "factura random 1",
              type: 10,
              amount: 123,
            },
            {
              billId: 2,
              billDescription: "factura random 2",
              type: 1,
              amount: 321,
            },
          ],
        },
      ],
    },
    {
      username: "ramon",
      flat: [
        {
          registry: 66666666,
          address: "123 666666 St, Apt 666",
          bills: [
            {
              billId: 22,
              billDescription: "factura xd 1",
              type: 30,
              amount: 666,
            },
            {
              billId: 12,
              billDescription: "factura xd 2",
              type: 1,
              amount: 8888,
            },
          ],
        },
      ],
    },
  ];
  */
