interface UserDetailInterface {
  business_name: string;
}

interface UserInterface {
  id: number;
  tds_rate: number;
  user_detail: UserDetailInterface;
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
    wallet: string;
    gst: number;
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
    user: UserInterface;
    business_name: string;
    tds?: string;
    ret_tds?: string;
  }