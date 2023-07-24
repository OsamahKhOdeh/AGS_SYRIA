import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Invoice from "../../Invoice/Invoice";
import { setPiEmployee, setPiProudcts } from "../../../../store/piSlice";
import useAuth from "../../../../hooks/useAuth";

const ProformaInvoice = ({ adminPi }) => {
  const cart = useSelector((state) => state.cart.cart);
  const { username, status, phone } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPiProudcts(cart));
    dispatch(setPiEmployee({ employeeName: username, employeePhone: phone }));
  }, []);

  const pi = useSelector((state) => state.pi);
  const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  let newPi = {};
  if (adminPi) {
    newPi = {
      piProducts: adminPi.products,
      piInfo: {
        pi_no: adminPi.pi_no,
        invoiceNo: adminPi.no,
        date: new Date(adminPi.date).toLocaleDateString({ year: "numeric", month: "numeric", day: "numeric" }),
        exporter: adminPi.exporter,
        buyerAdress: adminPi.buyer_address,
        consignee: adminPi.consignee,
        notifyParty: adminPi.notify_party,
        partyOfDischarge: adminPi.party_of_discharge,
        finalDistination: adminPi.final_distination,
        discount: adminPi.discount,
        additions: adminPi.additions,
        terms: adminPi.terms,
        employee: adminPi.employee,
        employeePhone: adminPi.phone_number,
        note: adminPi.note,
        bankDetails: adminPi.bankDetails,
        paymentPercentage: adminPi.paymentPercentage,
        deliveryDate: adminPi.deliveryDate,
        documentCharges: adminPi.documentCharges,
        currency: adminPi.currency,
        location: adminPi.location,
        manager: adminPi.manager,
        additionsDescription: adminPi.additionsDescription,
        discountDescription: adminPi.discountDescription,
      },
      isPi: true,
    };
  }

  return (
    <div style={{ width: "100%" }}>
      <PDFViewer width="80%" height="1200" className="app">
        {/*<Invoice pi={pi} currency={currency} location={location}  usdToAedRate={usdToAedRate} /> */}
        {adminPi ? (
          <Invoice pi={newPi} currency={adminPi.currency} location={adminPi.location} usdToAedRate={usdToAedRate} />
        ) : (
          <Invoice pi={pi} currency={currency} location={location} usdToAedRate={usdToAedRate} />
        )}
      </PDFViewer>
    </div>
  );
};

export default ProformaInvoice;

/*
   
<PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>

*/
