export const api = "http://142.93.209.179:8080/";
export const imgUrl = api + "attachment/getFile/";
export const categoryDelete = "category/active";
export const categoryEdit = "category/update";
export const categoryAdd = "category/save";
export const messageAdd = "message/save";
export const giftAdd = "gift/save";

export const config = {
    headers: { Authorization: sessionStorage.getItem('jwtTokin') }
};
