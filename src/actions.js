let nextBillId = 0;
export const addBill = text => ({
    type: "ADD_BILL",
    id: nextBillId++,
    text
})