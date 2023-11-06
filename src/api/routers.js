import axios from "axios";
import {api, config} from "./api";

// Category
export const getCategory = (setCategory) => {
    axios.get(api + "category").then(res => setCategory(res.data.body));
}

export function getGroup(setGroup) {
    axios.get(api + "group?page=0&size=10", config)
        .then(res => {
            setGroup(res.data.body.object)
        })
}
