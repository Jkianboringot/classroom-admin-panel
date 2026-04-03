// validate form input for ui , its a ts validation at run time





// =============================================================================
// SCHEMA VALIDATION FILE — uses Zod for RUNTIME validation
// -----------------------------------------------------------------------------
// WHY THIS FILE EXISTS:
//   TypeScript only checks types at BUILD time (while coding).
//   Once the app runs in the browser, TypeScript is gone — it becomes plain JS.
//   Zod fills that gap by validating actual user input VALUES while the app runs.
//
// HOW TO USE THESE SCHEMAS (quick reminder):
//   import { facultySchema } from "@/lib/schemas";
//
//   const result = facultySchema.safeParse(formData);
//   if (!result.success) {
//     result.error.errors  // ← array of { path, message } to show in the form
//   } else {
//     result.data          // ← clean, validated data — safe to send to the DB
//   }
// =============================================================================

import * as z from "zod";

// -----------------------------------------------------------------------------
// FACULTY SCHEMA
// Used when: creating or updating a user (admin, teacher, or student)
// Connected to: the faculty/user creation form
// -----------------------------------------------------------------------------
export const facultySchema = z.object({
    // Must be at least 2 chars — prevents single-letter or empty names
    name: z.string().min(2, "Name must be at least 2 characters"),

    // Zod checks for a proper email format (e.g. rejects "hello" or "hello@")
    email: z.string().email("Invalid email address"),

    // z.enum locks the value to ONLY these 3 strings — nothing else passes
    // If you add a new role in the future, add it here too or it will be rejected
    role: z.enum(["admin", "teacher", "student"], {
        required_error: "Please select a role",
    }),

    // No min length here — department can be any non-empty string
    department: z.string().min(1, "Department is required"),

    // .optional() means this field can be undefined/missing entirely
    // These are Cloudinary image fields — only present after an image is uploaded
    image: z.string().optional(),
    imageCldPubId: z.string().optional(), // Cloudinary public ID for deletion/replacement
});

// -----------------------------------------------------------------------------
// SUBJECT SCHEMA
// Used when: creating or editing a school subject (e.g. "Mathematics - MATH101")
// Connected to: the subject creation form
// -----------------------------------------------------------------------------
export const subjectSchema = z.object({
    // Min 3 chars — prevents saving subjects with a name like "Go" or blank
    name: z.string().min(3, "Subject name must be at least 3 characters"),

    // Subject code (e.g. "CS101") — min 5 chars enforces a proper code format
    code: z.string().min(5, "Subject code must be at least 5 characters"),

    // Min 5 chars — prevents saving a subject with a one-word or empty description
    description: z
        .string()
        .min(5, "Subject description must be at least 5 characters"),

    // Which department this subject belongs to
    department: z
        .string()
        .min(2, "Subject department must be at least 2 characters"),
});

// -----------------------------------------------------------------------------
// SCHEDULE SCHEMA (internal — not exported)
// Used by: classSchema below (a class can have multiple schedules)
// This is NOT exported because it's only used as a building block inside classSchema
// -----------------------------------------------------------------------------
const scheduleSchema = z.object({
    // Day of the week (e.g. "Monday") — min 1 just ensures it's not blank
    day: z.string().min(1, "Day is required"),

    // Time strings (e.g. "09:00") — exact format depends on the form's time picker
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
});

// -----------------------------------------------------------------------------
// CLASS SCHEMA
// Used when: creating or editing a class/course
// Connected to: the class creation form
// NOTE: This is the most complex schema — read the z.coerce notes below
// -----------------------------------------------------------------------------
export const classSchema = z.object({
    // Class display name — capped at 50 chars to prevent overflow in UI
    name: z
        .string()
        .min(2, "Class name must be at least 2 characters")
        .max(50, "Class name must be at most 50 characters"),

    description: z
        .string({ required_error: "Description is required" })
        .min(5, "Description must be at least 5 characters"),

    // WHY z.coerce.number() instead of z.number()?
    // HTML form inputs always return STRINGS (even for number fields).
    // z.coerce.number() converts "5" → 5 automatically before validating.
    // Without coerce, submitting "5" would fail because it's not a number type.
    subjectId: z.coerce
        .number({
            required_error: "Subject is required",
            invalid_type_error: "Subject is required", // shown if coercion fails (e.g. value is "abc")
        })
        .min(1, "Subject is required"), // min 1 prevents 0 or negative IDs from passing

    // Teacher is identified by a string ID (likely a UUID or Clerk user ID)
    teacherId: z.string().min(1, "Teacher is required"),

    // Same coerce pattern as subjectId — form sends "30", Zod converts to 30
    capacity: z.coerce
        .number({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity is required",
        })
        .min(1, "Capacity must be at least 1"), // a class of 0 people makes no sense

    // Only "active" or "inactive" are valid — controls enrollment availability
    status: z.enum(["active", "inactive"]),

    // These two go together — bannerUrl is the image link, bannerCldPubId is
    // Cloudinary's reference ID (needed to delete/replace the image later)
    bannerUrl: z
        .string({ required_error: "Class banner is required" })
        .min(1, "Class banner is required"),
    bannerCldPubId: z
        .string({ required_error: "Banner reference is required" })
        .min(1, "Banner reference is required"),

    // Auto-generated invite code — optional because it may be generated server-side
    inviteCode: z.string().optional(),

    // A class can have 0 or more schedule entries (Mon 9am-11am, Wed 1pm-3pm, etc.)
    // z.array(scheduleSchema) means each item in the array must pass scheduleSchema
    // .optional() because schedules might be added after the class is created
    schedules: z.array(scheduleSchema).optional(),
});

// -----------------------------------------------------------------------------
// ENROLLMENT SCHEMA
// Used when: enrolling a student into a class
// Connected to: the enrollment action (likely a server action or API route)
// Intentionally minimal — just the two IDs needed to create the relationship
// -----------------------------------------------------------------------------
export const enrollmentSchema = z.object({
    // z.coerce.number() again — classId comes from a form/select input as a string
    classId: z.coerce
        .number({
            required_error: "Class ID is required",
            invalid_type_error: "Class ID is required",
        })
        .min(1, "Class ID is required"),

    // Student ID — string type (likely a UUID or auth provider ID like Clerk)
    studentId: z.string().min(1, "Student ID is required"),
});