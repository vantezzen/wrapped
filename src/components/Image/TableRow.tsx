import React from "react";

function TableRow({ title, value }: { title: string; value: string | number }) {
  return (
    <tr
      style={{
        fontFamily: "Inter",
        fontWeight: 900,
        fontSize: "40px",
        width: "800px",
      }}
    >
      <td
        style={{
          color: "#A1A1AA",
          marginRight: "40px",
        }}
      >
        {title}
      </td>
      <td
        style={{
          color: "#E4E4E7",
          textAlign: "right",
          marginLeft: "auto",
        }}
      >
        {value}
      </td>
    </tr>
  );
}

export default TableRow;
