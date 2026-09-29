export type UserRole = 'login' | 'admin' | 'reception' | 'teacher' | 'student';

export type AttendanceStatus = 'present' | 'absent' | 'late';

export type AdminSection =
  | 'dashboard'
  | 'students'
  | 'teachers'
  | 'groups'
  | 'subjects'
  | 'rooms'
  | 'planning'
  | 'attendance'
  | 'subscriptions'
  | 'payments'
  | 'documents'
  | 'reports'
  | 'users'
  | 'settings';

export type TeacherSection =
  | 'dashboard'
  | 'sessions'
  | 'groups'
  | 'documents'
  | 'attendance'
  | 'profile';

export type ReceptionSection =
  | 'dashboard'
  | 'register'
  | 'students'
  | 'inscriptions'
  | 'payments'
  | 'groups'
  | 'planning';

export type StudentSection =
  | 'dashboard'
  | 'planning'
  | 'attendance'
  | 'documents'
  | 'payments'
  | 'profile';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'reception' | 'teacher';
  active: boolean;
  permissions: {
    canRegisterStudents: boolean;
    canCollectPayments: boolean;
    canViewPlanning: boolean;
    canExportReports: boolean;
  };
  lastLogin: string;
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  parentPhone: string;
  level: string; // e.g., '3AS', '2AS', 'BEM'
  groupId: string;
  groupName: string;
  subscriptionPlan?: string;
  subscriptionStatus: 'active' | 'pending' | 'unpaid';
  monthlyFee: number; // in DZD
  paidAmount: number;
  remainingAmount: number;
  enrollmentDate: string;
  attendanceRate: number; // e.g. 95%
  avatarColor: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  phone: string;
  email: string;
  groups: string[];
  color: string;
  experience: string;
}

export interface Group {
  id: string;
  name: string;
  level: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
  scheduleTime: string;
  scheduleDays: string;
  studentCount: number;
  maxCapacity: number;
}

export interface SessionItem {
  id: string;
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  time: string;
  duration: string;
  groupId: string;
  groupName: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  attendanceCompleted: boolean;
  date: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  groupId: string;
  status: AttendanceStatus;
  date: string;
  time: string;
  subject: string;
  note?: string;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  subscriptionPlan: string;
  subscription?: string; // alias
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentMethod: 'Espèces' | 'Virement CCP' | 'BaridiMob';
  date: string;
  status: 'Payé' | 'Partiel' | 'En retard';
  receiptNumber: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'PDF' | 'Word' | 'PowerPoint' | 'Exercices' | 'Tests' | 'Image';
  groupId: string;
  groupName: string;
  subject: string;
  authorName: string;
  date: string;
  fileSize: string;
  downloadUrl?: string;
  description?: string;
}
