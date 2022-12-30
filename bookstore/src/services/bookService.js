import {doGet, doPost} from "../utils/ajax";

export async function getAllBooks() {
    const url = "/getBooks";
    let books = await doGet(url);
    return books;
}

export async function getOneBook(bookId) {
    const url = "/getBook?id=" + bookId;
    let bookInfo = await doGet(url);
    return bookInfo;
}

export async function addNewBook (data) {
    const url = "/addNewBook";
    let result = await doPost(url, data);
    return result;
}

export async function modifyBook(data) {
    const url = "/modifyBook";
    console.log(data);
    let result = await doPost(url, data);
    return result;
}

export async function deleteBook(bookID) {
    const url = "/deleteBook?bookID=" + bookID;
    let result = await doGet(url);
    return result;
}
