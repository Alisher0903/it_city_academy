import axios from "axios";

export const api = "http://142.93.209.179/";

// message url
export const messageAdd = "message/save";

// gidts url
export const giftAdd = "gift/save";
export const giftDelete = "gift/delete/";
export const giftEdit = "gift/update/";

// file url
export const imgUrl = api + "attachment/getFile/";

// category url
export const categoryAdd = "category/save";
export const categoryEdit = "category/update/";
export const categoryDelete = "/category/active/";

// group url
export const groupAdd = "group/save";
export const groupEdit = "group/update/";
export const groupDelete = "group/isactive/";

// autinficatsiya jwt tokin
export const config = {
    headers: {Authorization: sessionStorage.getItem('jwtTokin')}
};

export async function addImage(image, setImageId) {
    axios.post(api + "attachment/upload", image, config)
        .then(res => setImageId(res.data.body));
}
