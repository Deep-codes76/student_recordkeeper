
import { students, type Student, type InsertStudent } from "@shared/schema";

export interface IStorage {
  getStudents(): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  deleteStudent(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private students: Map<number, Student>;
  private currentId: number;

  constructor() {
    this.students = new Map();
    this.currentId = 1;
    
    // Seed data in memory
    this.createStudent({ name: "Deepanshu", email: "deepanshu@example.com", phone: "1234567890" });
    this.createStudent({ name: "Deemak", email: "deemak@example.com", phone: "0987654321" });
    this.createStudent({ name: "John Doe", email: "john@example.com", phone: "5555555555" });
  }

  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentId++;
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async deleteStudent(id: number): Promise<void> {
    this.students.delete(id);
  }
}

export const storage = new MemStorage();
