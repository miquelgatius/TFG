const InvoiceTableDate = (props) => {
  const date = new Date(props.invoiceDate);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "2-digit" });
  const year = date.getFullYear();

  return (
    <td>
      {day}/{month}/{year}
    </td>
  );
};

export default InvoiceTableDate;
