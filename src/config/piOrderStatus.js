export const orderStatus1 = {
  CONFIRMED: "CONFIRMED",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  BOOKED: "BOOKED",
  FULL_PAYMENT: "FULL_PAYMENT",
  INVOICE_READY: "INVOICE_READY",
  PAKINGLIST_READY: "PAKINGLIST_READY",
  DONE_DEAL: "DONE_DEAL",
};

export const orderStatus = [
  { status: "CONFIRMED", stage_no: 0, stage_department: "sales" },
  { status: "DEPOSIT_PAID", stage_no: 1, stage_department: "acounting" },
  { status: "BOOKED", stage_no: 2, stage_department: "logistics" },
  { status: "FULL_PAYMENT", stage_no: 3, stage_department: "acounting" },
  { status: "INVOICE_READY", stage_no: 4, stage_department: "acounting" },
  { status: "PAKINGLIST_READY", stage_no: 5, stage_department: "logistics" },
  { status: "DONE_DEAL", stage_no: 6, stage_department: "logistics" },
];
export const processStatusesEnum = {
  STARTED: "STARTED",
  APPROVED_BY_SALES_MANAGER: "APPROVED_BY_SALES_MANAGER",
  APPROVED_BY_FINANCE: "APPROVED_BY_FINANCE",
  STAMPED_BY_CUSTOMER: "STAMPED_BY_CUSTOMER",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  BOOKED: "BOOKED",
  FULL_PAYMENT: "FULL_PAYMENT",
  INVOICE_READY: "INVOICE_READY",
  PKL_READY: "PKL_READY",
  DONE_DEAL: "DONE_DEAL",
};
export const ordersModel = [
  { status: processStatusesEnum.STARTED,name: "Started"},
  { status: processStatusesEnum.APPROVED_BY_SALES_MANAGER,name: "Arrpoved by Sales Manager"},
  { status: processStatusesEnum.APPROVED_BY_FINANCE,name: "Approved by Finance"},
  { status: processStatusesEnum.STAMPED_BY_CUSTOMER,name: "Sramped by Customer"},
  { status: processStatusesEnum.DEPOSIT_PAID,name: "Deposit paid"},
  { status: processStatusesEnum.BOOKED,name: "Booked"},
  { status: processStatusesEnum.FULL_PAYMENT,name: "Full Payment"},
  { status: processStatusesEnum.INVOICE_READY,name: "Invoice Ready"},
  { status: processStatusesEnum.PKL_READY,name: "Pkl Ready"},
  { status: processStatusesEnum.DONE_DEAL,name: "Done Deal"},
];
export const orderStatusFinance = [
  { status: "DEPOSIT_PAID", stage_no: 1, stage_department: "acounting" },
  { status: "BOOKED", stage_no: 2, stage_department: "logistics" },
  { status: "FULL_PAYMENT", stage_no: 3, stage_department: "acounting" },
];

