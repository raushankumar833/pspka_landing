export default interface ComplaintInterface {
    id: number,
    user_id: number,
    establishment: null | string,
    operator: number,
    route: string,
    number: number,
    amount: number,
    txnId: number,
    txn_status: string,
    msg: string,
    status: string,
    remark: string,
    handler: string,
    txn_date: Date,
    created_at: Date,
    updated_at: Date
}