// import { Label } from "recharts"

// export const DEPARTMENTS = [
//     'CS', 'Math', 'English'
// ]

// export const DEPARTMENT_OPTIONS = DEPARTMENTS.
// map((dept) =>
// ({
//     value: dept,
//     label: dept
// }))

// i dont get this this is no different from
// for dept of DEPARTMENTS this is js btw
// {value:dept , label: dept}  so its

// import { Label } from "recharts"

// export const DEPARTMENTS = [
//     'CS', 'Math', 'English'
// ]

// export const DEPARTMENT_OPTIONS = DEPARTMENTS.
// map((dept) =>
// ({
//     value: dept,
//     label: dept
// }))

// [
//   { value: 'CS', label: 'CS' },
//   { value: 'Math', label: 'Math' },
//   { value: 'English', label: 'English' }
// ]
// i did not see it so i ask gpt but know that gpt show my the output 
// i can see why no they want to dispay the name and give to the backend the value
// so that this is a clear sperateion if that was me i would just have value and label as one
// not flixible but in my mind its better









import { createDataProvider } from "@refinedev/rest";
import { SortingColumn } from "@tanstack/react-table";
import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.STUDENT,
        label: "Student",
        icon: GraduationCap,
    },
    {
        value: USER_ROLES.TEACHER,
        label: "Teacher",
        icon: School,
    },
];


// if i want to connect this into the backend i just need this to show the data, but how
export const DEPARTMENTS =async ()=>{
    const dept= await fetch('http://localhost:8000/api/departments').then(res=>res.json());
    const arrDept=[]
    const arr = arrDept.push(dept.data.name)
     return arrDept
}

// /remove for now ebcuase i want to show real department in subejcts filter
export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const getEnvVar = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};


// ok the cause of break(ui not showing) is becuase of cloudinary is not not define which in
// ts is not allowed, simple saying the value for it does not exist
    // -always watch the console.log, may its good to create a alert that can be seen easily, but that not good for user side
// export const CLOUDINARY_UPLOAD_URL = getEnvVar("VITE_CLOUDINARY_UPLOAD_URL");
// export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");
export const BACKEND_BASE_URL = getEnvVar("VITE_BACKEND_BASE_URL");

export const BASE_URL =  import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

// export const CLOUDINARY_UPLOAD_PRESET = getEnvVar("VITE_CLOUDINARY_UPLOAD_PRESET");

// export const teachers = [
//     {
//         id: "1",
//         name: "John Doe",
//     },
//     {
//         id: "2",
//         name: "Jane Smith",
//     },
//     {
//         id: "3",
//         name: "Dr. Alan Turing",
//     },
// ];

// export const subjects = [
//     {
//         id: 1,
//         name: "Mathematics",
//         code: "MATH",
//     },
//     {
//         id: 2,
//         name: "Computer Science",
//         code: "CS",
//     },
//     {
//         id: 3,
//         name: "Physics",
//         code: "PHY",
//     },
//     {
//         id: 4,
//         name: "Chemistry",
//         code: "CHEM",
//     },
// ];