export const api = "http://142.93.209.179:8080/";

// file url
export const imgUrl = api + "attachment/getFile/";

// category url
export const categoryAdd = "category/save";
export const categoryEdit = "category/update";
export const categoryDelete = "category/active";

// group url
export const groupAdd = "group/save";
export const groupEdit = "group/update";
export const groupDelete = "group/isactive";

// autinficatsiya jwt tokin
export const config = {
    headers: { Authorization: sessionStorage.getItem('jwtTokin') }
};