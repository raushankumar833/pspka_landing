import { CustomFile } from 'src/components/upload';

export interface ClientInterface {
  id?: number;
  companyId?: number;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  inactive?: string;
  wallet_type?: string;
  w1?: number;
  w2?: number;
  w1_hold?: number;
  w2_hold?: number;
  status?: any;
  zsm?: any;
  asm?: any;
  md?: any;
  ad?: any;
  parent?: any;
  tds_rate?: number;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  pan?: any;
  isPanVerified?: boolean;
  aadhaar?: any;
  isAadhaarVerified?: boolean;
  createdAt?: any;
  lastModifiedAt?: any;
  createdBy?: any;
  lastModifiedBy?: any;
  companyName?: string;
  companyGst?: string;
  isGstVerified?: boolean;
  companyAddress?: string;
  companyMobile?: string;
  companyEmail?: string;
  password?: string;
  gst?: string;
  address?: string;
  logo?: CustomFile | string | null;
  favicon?: CustomFile | string | null;
  squareLogo?: CustomFile | string | null;
  created_at?: any;
  updated_at?: any;
  user_detail?: any;
  business_type?: string;
  business_name?: string;
  parent_role?: string;
  tpin: any;
}

export interface TransactionInterface {
  id: number;
  platform: string;
  user_id: number;
  companyId: number;
  number: string;
  amount: string;
  service_type: string;
  route: string;
  mop: null;
  op_code: string;
  operator:any;
  wallet: string;
  ret_tds:any;
  w1: number;
  w2: number;
  admin_comm: number;
  ad_comm: number;
  md_comm: number;
  ret_comm: number;
  dd_comm: number;
  ret_charge: number;
  dd_charge: number;
  ad_closing: number;
  md_closing: null;
  order_id: string;
  op_id: string;
  status: string;
  info: null;
  api_response: string;
  created_at: Date;
  updated_at: Date;
  gst?: string;
  tds?: string;
}



// ///////////////////
export interface AdUsersInterface {
  id:                number;
  company_id:        number;
  name:              string;
  gender:            null;
  username:          number;
  email:             string;
  tpin_retries:      number;
  role:              string;
  wallet_type:       string;
  w1:                number;
  w2:                number;
  w1_hold:           number;
  w2_hold:           number;
  status:            string;
  zsm:               null;
  asm:               null;
  md:                number;
  ad:                number;
  parent:            null;
  tds_rate:          number;
  instId:            string;
  remember_token:    null;
  api_token:         string;
  created_at:        Date;
  updated_at:        Date;
  user_detail:       UserDetail;
  user_subscription: UserSubscription;
  user_service:      UserService;
}

export interface AdTransactionInterface {
  id: number;
  platform: string;
  user_id: number;
  companyId: number;
  number: string;
  amount: string;
  service_type: string;
  route: string;
  mop: null;
  op_code: string;
  wallet: string;
  w1: number;
  w2: number;
  admin_comm: number;
  ad_comm: number;
  md_comm: number;
  ret_comm: number;
  dd_comm: number;
  ret_charge: number;
  dd_charge: number;
  ad_closing: number;
  md_closing: null;
  order_id: string;
  op_id: string;
  status: string;
  info: null;
  api_response: string;
  created_at: Date;
  updated_at: Date;
  gst?: string;
  tds?: string;
  user_business_name?: string;
}

export interface UserDetail {
  id:            number;
  user_id:       number;
  business_name: string;
  business_type: string;
  domain_name:   string;
  logo:          null;
  squareLogo:    null;
  favicon:       null;
  profile_image: null;
  created_at:    Date;
  updated_at:    Date;
}

export interface UserService {
  id:               number;
  user_id:          number;
  dmt:              number;
  dmt2:             number;
  acc_verification: number;
  payout:           number;
  prepaid:          number;
  dth:              number;
  card_bill:        number;
  wallet_transfer:  number;
  bbps:             number;
  aeps:             number;
  utility:          number;
  created_at:       Date;
  updated_at:       Date;
}

export interface UserSubscription {
  id:         number;
  user_id:    number;
  yearly:     number;
  monthly:    number;
  weekly:     number;
  created_at: Date;
  updated_at: Date;
}
// //////////////////////


export interface AsmUsersInterface {
  id:                number;
  company_id:        number;
  name:              string;
  gender:            null;
  username:          number;
  email:             string;
  tpin_retries:      number;
  role:              string;
  wallet_type:       string;
  w1:                number;
  w2:                number;
  w1_hold:           number;
  w2_hold:           number;
  status:            string;
  zsm:               null;
  asm:               null;
  md:                number;
  ad:                number;
  parent:            null;
  tds_rate:          number;
  instId:            string;
  remember_token:    null;
  api_token:         string;
  created_at:        Date;
  updated_at:        Date;
  user_detail:       UserDetail;
  user_subscription: UserSubscription;
  user_service:      UserService;
}


export interface AsmTransactionInterface {
  id: number;
  platform: string;
  user_id: number;
  companyId: number;
  number: string;
  amount: string;
  service_type: string;
  route: string;
  mop: null;
  op_code: string;
  wallet: string;
  w1: number;
  w2: number;
  admin_comm: number;
  ad_comm: number;
  md_comm: number;
  ret_comm: number;
  dd_comm: number;
  ret_charge: number;
  dd_charge: number;
  ad_closing: number;
  md_closing: null;
  order_id: string;
  op_id: string;
  status: string;
  info: null;
  api_response: string;
  created_at: Date;
  updated_at: Date;
  gst?: string;
  tds?: string;
  user_business_name?: string;
}