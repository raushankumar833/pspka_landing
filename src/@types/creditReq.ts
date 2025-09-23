export interface CreditReqInterface {
    id:         number;
    user_id:    string;
    role:       null;
    name:       string;
    username:   number;
    bank:       Bank;
    mode:       string;
    amount:     number;
    ref_id:     string;
    txn_id:     null;
    status:     string;
    remark:     string;
    date:       string;
    created_at: Date;
    updated_at: Date;
}
export interface AsmCreditReqInterface {
    id:         number;
    user_id:    string;
    role:       null;
    name:       string;
    username:   number;
    bank:       Bank;
    mode:       string;
    amount:     number;
    ref_id:     string;
    txn_id:     null;
    status:     string;
    remark:     string;
    date:       string;
    created_at: Date;
    updated_at: Date;
}

export interface Bank {
    id:   number;
    name: string;
}