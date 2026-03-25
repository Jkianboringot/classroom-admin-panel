import { Subject } from "@/types";



          // subject is type like x string in python, its the hint type
export const MOCK_SUBJECT: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "A foundational course covering core programming concepts, algorithms, and problem-solving techniques using modern programming languages.",
    createdAt:new Date().toISOString()

  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description:
      "An advanced study of integral calculus, sequences and series, and their applications in engineering and the sciences.",
    createdAt:new Date().toISOString()

  },
  {
    id: 3,
    code: "ENG110",
    name: "Technical Writing",
    department: "English",
    description:
      "Develops professional written communication skills with a focus on creating clear, concise technical documents, reports, and proposals.",
    createdAt:new Date().toISOString()

  },
];