import Header from "../header/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Bills = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/flats");
        console.log(response);
        const allFlats = response.data.flatMap((item) => item.flat);
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
    <div>
      <Header />
      <h1>Bills Page</h1>

      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Registry</th>
              <th>Address</th>
              <th>Square Meters</th>
            </tr>
          </thead>
          <tbody>
            {data.map((flat) => (
              <tr key={flat.registry}>
                <td>{flat.registry}</td>
                <td>{flat.address}</td>
                <td>{flat.meters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Bills;

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
