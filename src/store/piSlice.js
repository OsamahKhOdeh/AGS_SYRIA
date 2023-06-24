/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
const initialPiState = {
  piProducts: [],
  piInfo: {
    invoiceNo: 0,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    exporter: "AGS INTERNATIONAL GENERAL TRADING LLC DEIRA NAIF,AL MAKTOUM HOSPITAL ROAD CONTACT:+971 558952656, Email: info@jalil.ae",
    buyerAdress: "AL SHARK TRADING COMPANY",
    consignee: "AL SHARK TRADING COMPANY",
    notifyParty: "HMC INTERNATIONAL FZCO JEBEL ALI FREE ZONE- DUBAI- UNITED ARAB EMIRATES CONTACT : +971565527684, EMAIL : info@HMCFZ.CO",
    partyOfDischarge: "JABAL ALI , DUBAI",
    finalDistination: "JABAL ALI , DUBAI",
    discount: 0,
    additions: 0,
    terms: "EXWAREHOUSE",
    employee: "",
    employeePhone: "",
    phoneNumber: "+971 501993008",
    note: "",
    currency: "USD",
    location: "freezone",
    bankDetails: ["AGS USD"],
    paymentPercentage: "100",
    documentCharges: 0,
    deliveryDate: 7,
    discountDescription: " ",
    additionsDescription: " ",
  },
  isPi: true,
};
export const piSlice = createSlice({
  name: "pi",
  initialState: initialPiState,
  reducers: {
    clearPi: (state, action) => {
      state.piInfo = initialPiState.piInfo;
      state.piProducts = initialPiState.piProducts;
      state.isPi = initialPiState.isPi;
    },

    setPiExporter: (state, action) => {
      state.piInfo.exporter = action.payload;
    },
    setPiBuyerAdress: (state, action) => {
      state.piInfo.buyerAdress = action.payload;
    },
    setPiConsignee: (state, action) => {
      state.piInfo.consignee = action.payload;
    },
    setPinNotifyParty: (state, action) => {
      state.piInfo.notifyParty = action.payload;
    },
    setPiPartyOfDischarge: (state, action) => {
      state.piInfo.partyOfDischarge = action.payload;
    },
    setPiFinalDistination: (state, action) => {
      state.piInfo.finalDistination = action.payload;
    },
    setPiDiscount: (state, action) => {
      state.piInfo.discount = action.payload;
    },
    setPiAdditions: (state, action) => {
      state.piInfo.additions = action.payload;
    },
    setPiTerms: (state, action) => {
      state.piInfo.terms = action.payload;
    },
    setPiPhoneNumber: (state, action) => {
      state.piInfo.phoneNumber = action.payload;
    },
    setPiNote: (state, action) => {
      state.piInfo.note = action.payload;
    },
    setPaymentPercentage: (state, action) => {
      state.piInfo.paymentPercentage = action.payload;
    },
    setDocumentCharges: (state, action) => {
      state.piInfo.documentCharges = action.payload;
    },
    setDeliveryDate: (state, action) => {
      state.piInfo.deliveryDate = action.payload;
    },
    setDiscountDescription: (state, action) => {
      state.piInfo.discountDescription = action.payload;
    },
    setAdditionsDescription: (state, action) => {
      state.piInfo.additionsDescription = action.payload;
    },
    setPICurrencyLocation: (state, action) => {
      state.piInfo.currency = action.payload.currency;
      state.piInfo.location = action.payload.location;
    },

    setIsPI: (state, action) => {
      state.isPi = action.payload;
    },
    setPiProudcts: (state, action) => {
      state.piProducts = action.payload;
    },
    setPiInfo: (state, action) => {
      state.piInfo = action.payload;
    },
    setPiBankDetails: (state, action) => {
      state.piInfo.bankDetails = action.payload;
    },
    setPiNo: (state, action) => {
      state.piInfo.invoiceNo = action.payload + 1;
    },
    setPiEmployee: (state, action) => {
      state.piInfo.employee = action.payload.employeeName;
      state.piInfo.employeePhone = action.payload.employeePhone;
    },

    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push(action.payload);
    },
  },
});

export const {
  setDocumentCharges,
  setPiExporter,
  setPiAdditions,
  setPiBuyerAdress,
  setPiConsignee,
  setPiDiscount,
  setPiFinalDistination,
  setPiNote,
  setPiPartyOfDischarge,
  setPinNotifyParty,
  setPiPhoneNumber,
  setPiTerms,
  setPiInfo,
  setPiProudcts,
  setPiNo,
  setPiEmployee,
  setIsPI,
  setPICurrencyLocation,
  setPiBankDetails,
  setPaymentPercentage,
  setDeliveryDate,
  clearPi,
  setAdditionsDescription,
  setDiscountDescription,
} = piSlice.actions;

export default piSlice.reducer;
