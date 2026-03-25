import { Label } from "recharts"

export const DEPARTMENTS = [
    'CS', 'Math', 'English'
]

export const DEPARTMENT_OPTIONS = DEPARTMENTS.
map((dept) =>
({
    value: dept,
    label: dept
}))

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