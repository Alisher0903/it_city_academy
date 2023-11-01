import axios from "axios";

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

export function addImage(image) {
    axios.post(api + "attachment/upload", {file: image}, config)
        .then(res => {
            console.log(res);
            console.log("ha keldi rasim shu kk midi");
        }).catch(err => {
            console.log("kelmadi");
        })
}