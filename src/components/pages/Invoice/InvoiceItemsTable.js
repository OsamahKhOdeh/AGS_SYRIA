import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableRowsCount = 7;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
    borderWidth: 1,
    borderColor: "black",
  },
});

const InvoiceItemsTable = ({ products, currency, location, discount, usdToAedRate, additions, note, documentCharges, discountDescription, additionsDescription }) => {
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader currency={currency} />
      <InvoiceTableRow products={products} currency={currency} location={location} usdToAedRate={usdToAedRate} />
      <InvoiceTableFooter
        products={products}
        discount={discount}
        currency={currency}
        usdToAedRate={usdToAedRate}
        location={location}
        additions={additions}
        note={note}
        discountDescription={discountDescription}
        additionsDescription={additionsDescription}
        documentCharges={documentCharges}
      />
    </View>
  );
};

export default InvoiceItemsTable;
