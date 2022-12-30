import { doGet } from "../utils/ajax";

export async function adminCensus(limitDate) {
    const url = "/census?limitDate=" + limitDate;
    let data = await doGet(url);
    return data;
}

export async function userCensus(limitDate) {
    const url = "/userCensus?limitDate=" + limitDate;
    let data = await doGet(url);
    return data;
}
