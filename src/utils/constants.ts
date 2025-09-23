export const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); //24hrs

export const USERROLES: any = {
  admin: 'admin',
  retailer: 'ret',
  sub_admin: 'subadmin',
  zsm: 'zsm',
  asm: 'asm',
  md: 'md',
  ad: 'ad',
  direct_dealer: 'dd',
  api: 'api',
};

export const TXNFILTER: any = {
  today: '0',
  this: '1',
  last: '2',
};
export const OPERATOR_CATEGORY: any = {
  prepaid: 'prepaid',
  postpaid: 'postpaid',
  dth: 'dth',
};
export const SERVICE_TYPE: any = {
  recharge: 'RECHARGE',
  utility: 'UTILITY',
  money_transfer: 'MONEY_TRANSFER',
  bbps:"BBPS",
  travel: 'TRAVEL',
};
export const SERVICE_SUBTYPE: any = {
  mobile: 'PREPAID',
  dth: 'DTH',
  electricity: 'ELECTRICITY',
};
export const MONEY_TRANSFER = {
  "DMT1": { value: 'dmt1', label: 'DMT 1'},
  "DMT2": { value: 'dmt2', label: 'DMT 2' },
  "UPI TRANSFER": { value: 'upi', label: 'UPI' },
  "NEPAL TRANSFER": { value: 'nepal', label: 'Nepal' },
  "VENDOR PAYMENTS": { value: 'vp', label: 'Vendor Payments' },
  "SUPER TRANSFER": { value: 'super', label: 'Super' },
};
export const TRAVEL_TYPE: any = {
  "IRCTC": { value: 'train', label: 'IRCTC'},
  "FLIGHT": { value: 'flight', label: 'FLIGHT'},
  "BUS": { value: 'bus', label: 'BUS'},
};
export const AEPS_TYPE: any = {
  aeps1: 'aeps 1',
  aeps2: 'aeps 2',
  cw: 'cash withdrawal',
  be: 'balance enquiry',
  ms: 'mini statement',
  ap: 'aadhaar pay',
};
export const PROFILE_TYPE: any = {
  personal: 'personal',
  business: 'business',
  bank: 'bank',
  documents: 'documents',
  twofa: 'two fa',
  bc_auth: 'bc',
};


export const RDDeviceStatus = {
  UNKNOWN: "UNKNOWN",
  NOT_READY: "NOTREADY",
  READY: "READY",
  SCANNING: "SCANNING",
  SCAN_SUCCESS: "SUCCESS",
  SCAN_FAILED: "FAILED",
};
export const AEPS = {
  CASH_WITHDRAWAL: "WAP",
  BALANCE_ENQUIRY: "BAP",
  STATEMENT: "SAP",
  APAY: "MZZ",
};