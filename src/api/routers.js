import axios from "axios";
import {api, config} from "./api";

// Category
export const getCategory = (setCategory) => {
    axios.get(api + "category").then(res => setCategory(res.data.body));
}

export function getGroup(setGroup) {
    axios.get(api + "user/teacher", config)
        .then(t => {
            let group = [];
            axios.get(api + "group?page=0&size=10", config)
                .then(res => {
                    for (const g of res.data.body.object)
                        group.push({
                            id: g.id,
                            name: g.name,
                            teacher: teacherById(g.teacherId)
                        });
                    setGroup(group);
                });

            function teacherById(id) {
                for (const teacher of t.data.body) if (teacher.id === id) return teacher.firstName;
            }
        });
}

export const getTeacher = (setTeacher) => {
    axios.get(api + "user/teacher", config)
        .then(res => setTeacher(res.data.body));
}
