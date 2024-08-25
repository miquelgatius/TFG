import Header from "../header/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Bills = () => {
  const [data, setData] = useState(null); // Step 1: State to store the API response
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080"); // Step 2: Axios GET request
        console.log(response.data);
        const normalizedData = Array.isArray(response.data)
          ? response.data
          : [response.data]; // Convert to array if not already an array

        setData(normalizedData); // Step 3: Set the response data to state
      } catch (err) {
        setError(err); // Handle any errors
      } finally {
        setLoading(false); // Stop loading when the request is complete
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array to run once on mount

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>Error: {error.message}</div>; // Show error message if there's an error

  // const apiCallInfo = apiCall();
  // console.log(apiCallInfo);
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
              <th>Square meters</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.registry}>
                <td>{item.registry}</td>
                <td>{item.address}</td>
                <td>{item.meters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div> // Handle case where there's no data
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
              import: 123,
            },
            {
              billId: 2,
              billDescription: "factura random 2",
              type: 1,
              import: 321,
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
              import: 666,
            },
            {
              billId: 12,
              billDescription: "factura xd 2",
              type: 1,
              import: 8888,
            },
          ],
        },
      ],
    },
  ];
  */
