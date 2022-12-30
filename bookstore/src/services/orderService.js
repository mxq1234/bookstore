import { doPost, doGet } from "../utils/ajax";

export async function getOrders() {
    const url = "/getOrders";
    let orders = await doGet(url);
    return orders;
}

export async function getAllOrders() {
    const url = "/getAllOrders";
    let orders = await doGet(url);
    return orders;
}

export async function checkout(obj) {
    const url = "/checkout";
    let result = await doPost(url, obj);
    return result;
}
