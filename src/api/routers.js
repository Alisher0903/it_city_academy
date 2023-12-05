import axios from "axios";
import {api, config} from "./api";

// Category
export const getCategory = (setCategory) => {
    axios.get(api + "category?page=0&size=100", config)
        .then(res => setCategory(res.data.body))
        .catch((err) => console.log(err));
}

// Group
export function getGroup(setGroup) {
    axios.get(api + "user/teacher", config)
        .then(t => {
            let group = [];
            console.log('teacher: ' + t)
            axios.get(api + "group?page=0&size=100", config)
                .then(res => {
                    for (const g of res.data.body.object)
                        group.push({
                            id: g.id,
                            name: g.name,
                            teacher: teacherById(g.teacherId)
                        });
                    setGroup(group);
                }).catch((err) => {
                    console.log(err);
                });

            function teacherById(id) {
                for (const teacher of t.data.body) if (teacher.id === id) return teacher.firstName;
            }
        })
}

// User
export const getTeacher = (setTeacher) => {
    axios.get(api + "user/teacher", config)
        .then(res => setTeacher(res.data.body))
        .catch(() => {})
}

// Test
export function getUserCategory(setCategory) {
    axios.get(api + "test/by/category", config).then(res => setCategory(res.data))
        .catch(() => {
            console.log("Xatolik yuz berdi");
        })
}

export function getCategoryByTest(setTest, categoryId) {
    // console.log(categoryId)
    axios.get(api + `test/by/${categoryId}/test`, config).then(res => setTest(res.data))
        .catch(() => {});
}
