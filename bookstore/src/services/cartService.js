import { doGet } from "../utils/ajax";

export async function getCartItems() {
    const url = "/getCartItems";
    let cartInfo = await doGet(url);
    return cartInfo;
}

export async function joinCart(bookID) {
    const url="/joinCart?bookID=" + bookID;
    let result = await doGet(url);
    return result;
}
