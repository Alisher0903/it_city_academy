export const api = "http://142.93.209.179:8080/"
export const imgUrl = api + "attachment/getFile/"

export const config = {
    headers: { Authorization: sessionStorage.getItem('jwtTokin') }
};
