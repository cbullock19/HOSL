import { z } from "zod"

export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "VOLUNTEER"]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const volunteerProfileSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  smsOptIn: z.boolean().default(false),
  preferredDays: z.array(z.string()),
  vehicleCapacity: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const sourceSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Source name is required"),
  address: z.string().min(1, "Address is required"),
  contact: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const recipientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Recipient name is required"),
  address: z.string().min(1, "Address is required"),
  contact: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const taskSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Task title is required"),
  date: z.date(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  type: z.enum(["PICKUP", "DELIVERY"]),
  sourceId: z.string().cuid().optional(),
  recipientId: z.string().cuid().optional(),
  capacity: z.number().int().positive().default(1),
  status: z.enum(["OPEN", "FILLED", "DONE"]).default("OPEN"),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const signupSchema = z.object({
  id: z.string().cuid(),
  taskId: z.string().cuid(),
  userId: z.string().cuid(),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).default("PENDING"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const foodLogSchema = z.object({
  id: z.string().cuid(),
  taskId: z.string().cuid(),
  pounds: z.number().positive("Pounds must be positive"),
  items: z.string().optional(),
  sourceId: z.string().cuid().optional(),
  recipientId: z.string().cuid().optional(),
  completedBy: z.string().cuid(),
  completedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const announcementSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  scheduledAt: z.date().optional(),
  sentAt: z.date().optional(),
  createdBy: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// API Request Schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  date: z.string().transform((str) => new Date(str)),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  type: z.enum(["PICKUP", "DELIVERY"]),
  sourceId: z.string().cuid().optional(),
  recipientId: z.string().cuid().optional(),
  capacity: z.number().int().positive().default(1),
  notes: z.string().optional(),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string().cuid(),
  status: z.enum(["OPEN", "FILLED", "DONE"]).optional(),
})

export const claimTaskSchema = z.object({
  taskId: z.string().cuid(),
  userId: z.string().cuid(),
})

export const completeTaskSchema = z.object({
  taskId: z.string().cuid(),
  pounds: z.number().positive("Pounds must be positive"),
  items: z.string().optional(),
  sourceId: z.string().cuid().optional(),
  recipientId: z.string().cuid().optional(),
})

export const createVolunteerProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  smsOptIn: z.boolean().default(false),
  preferredDays: z.array(z.string()),
  vehicleCapacity: z.string().optional(),
  notes: z.string().optional(),
})

export const reportQuerySchema = z.object({
  from: z.string().transform((str) => new Date(str)),
  to: z.string().transform((str) => new Date(str)),
})

export const csvImportSchema = z.object({
  csvData: z.string(),
  columnMapping: z.record(z.string(), z.string()),
})
