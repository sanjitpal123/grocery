import Billing from '../model/Billing.js';
import axios from 'axios';

export const create = async (billingData) => {
    const {firstName , lastName ,phoneNumber }=billingData;
    const customer=await axios.post("http://localhost:3000/api/customer",{firstName , lastName, phoneNumber});
    if(!customer){
        throw new Error("Customer creation failed"); 
    }
    const customerId=customer.data._id;
    billingData.customerId=customerId;
    return await Billing.create(billingData);
};
export const findById = async (id) => {
    return await Billing.findById(id);
};
export const findByCustomerId = async (customerId) => {
    return await Billing.find({ customerId });
};
export const findByShopId = async (shopId) => {
    return await Billing.find({ shopId });
};
export const updatePayment = async (id, paidAmount, dueAmount) => {
    return await Billing.findByIdAndUpdate(id, { paidAmount, dueAmount }, { new: true });
};
