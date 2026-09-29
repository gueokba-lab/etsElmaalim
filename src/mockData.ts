import { Student, Teacher, Group, SessionItem, AttendanceRecord, PaymentRecord, DocumentItem, UserAccount } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    firstName: 'Sara',
    lastName: 'Benali',
    email: 'sara.benali@gmail.com',
    phone: '0550 12 34 56',
    parentPhone: '0661 98 76 54',
    level: '3AS',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subscriptionStatus: 'active',
    monthlyFee: 6000,
    paidAmount: 6000,
    remainingAmount: 0,
    enrollmentDate: '05 Sept 2026',
    attendanceRate: 95,
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'std-2',
    firstName: 'Yacine',
    lastName: 'Merad',
    email: 'yacine.merad@gmail.com',
    phone: '0555 78 90 12',
    parentPhone: '0770 45 67 89',
    level: '3AS',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subscriptionStatus: 'active',
    monthlyFee: 6000,
    paidAmount: 6000,
    remainingAmount: 0,
    enrollmentDate: '07 Sept 2026',
    attendanceRate: 88,
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'std-3',
    firstName: 'Lina',
    lastName: 'Boudiaf',
    email: 'lina.boudiaf@yahoo.fr',
    phone: '0560 33 44 55',
    parentPhone: '0662 11 22 33',
    level: '3AS',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subscriptionStatus: 'pending',
    monthlyFee: 6000,
    paidAmount: 3000,
    remainingAmount: 3000,
    enrollmentDate: '10 Sept 2026',
    attendanceRate: 92,
    avatarColor: 'bg-violet-600'
  },
  {
    id: 'std-4',
    firstName: 'Adam',
    lastName: 'Belkacem',
    email: 'adam.belkacem@gmail.com',
    phone: '0540 66 77 88',
    parentPhone: '0771 99 88 77',
    level: '3AS',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subscriptionStatus: 'unpaid',
    monthlyFee: 6000,
    paidAmount: 0,
    remainingAmount: 6000,
    enrollmentDate: '12 Sept 2026',
    attendanceRate: 80,
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'std-5',
    firstName: 'Ines',
    lastName: 'Hamdi',
    email: 'ines.hamdi@hotmail.com',
    phone: '0551 22 44 66',
    parentPhone: '0663 88 55 22',
    level: '3AS',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subscriptionStatus: 'active',
    monthlyFee: 6000,
    paidAmount: 6000,
    remainingAmount: 0,
    enrollmentDate: '08 Sept 2026',
    attendanceRate: 96,
    avatarColor: 'bg-rose-600'
  },
  {
    id: 'std-6',
    firstName: 'Mohamed',
    lastName: 'Dahmani',
    email: 'm.dahmani@outlook.com',
    phone: '0552 99 11 33',
    parentPhone: '0772 33 55 77',
    level: '3AS',
    groupId: 'grp-2',
    groupName: '3AS Groupe B',
    subscriptionStatus: 'active',
    monthlyFee: 5500,
    paidAmount: 5500,
    remainingAmount: 0,
    enrollmentDate: '15 Sept 2026',
    attendanceRate: 90,
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'std-7',
    firstName: 'Amina',
    lastName: 'Khelifi',
    email: 'amina.khelifi@gmail.com',
    phone: '0541 44 77 00',
    parentPhone: '0660 77 44 11',
    level: '2AS',
    groupId: 'grp-3',
    groupName: '2AS Groupe A',
    subscriptionStatus: 'active',
    monthlyFee: 4500,
    paidAmount: 4500,
    remainingAmount: 0,
    enrollmentDate: '18 Sept 2026',
    attendanceRate: 98,
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'std-8',
    firstName: 'Rayane',
    lastName: 'Boumaza',
    email: 'rayane.bmz@gmail.com',
    phone: '0561 88 22 55',
    parentPhone: '0773 12 34 56',
    level: 'BEM',
    groupId: 'grp-4',
    groupName: 'BEM Groupe A',
    subscriptionStatus: 'pending',
    monthlyFee: 4000,
    paidAmount: 2000,
    remainingAmount: 2000,
    enrollmentDate: '20 Sept 2026',
    attendanceRate: 94,
    avatarColor: 'bg-cyan-600'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Ahmed Mansouri',
    subject: 'Mathématiques',
    phone: '0550 44 55 66',
    email: 'a.mansouri@centrepro.dz',
    groups: ['3AS Groupe A', '2AS Groupe A'],
    color: 'from-blue-600 to-indigo-700',
    experience: '12 ans d\'expérience — Enseignant Lycée Pilote'
  },
  {
    id: 'tch-2',
    name: 'Karim Saidi',
    subject: 'Physique',
    phone: '0551 77 88 99',
    email: 'k.saidi@centrepro.dz',
    groups: ['3AS Groupe A', '3AS Groupe B'],
    color: 'from-emerald-600 to-teal-700',
    experience: '9 ans d\'expérience — Spécialiste BAC'
  },
  {
    id: 'tch-3',
    name: 'Amel Benali',
    subject: 'Français',
    phone: '0552 11 33 55',
    email: 'a.benali@centrepro.dz',
    groups: ['BEM Groupe A', '2AS Groupe A'],
    color: 'from-violet-600 to-purple-700',
    experience: '15 ans d\'expérience — Agrégée de l\'Éducation'
  }
];

export const INITIAL_GROUPS: Group[] = [
  {
    id: 'grp-1',
    name: '3AS Groupe A',
    level: '3AS (Terminale)',
    subject: 'Mathématiques & Physique',
    teacherId: 'tch-1',
    teacherName: 'Ahmed Mansouri',
    room: 'Salle 02',
    scheduleTime: '17:00 - 19:00',
    scheduleDays: 'Mardi & Vendredi',
    studentCount: 5,
    maxCapacity: 18
  },
  {
    id: 'grp-2',
    name: '3AS Groupe B',
    level: '3AS (Terminale)',
    subject: 'Physique-Chimie',
    teacherId: 'tch-2',
    teacherName: 'Karim Saidi',
    room: 'Salle 01',
    scheduleTime: '15:00 - 17:00',
    scheduleDays: 'Lundi & Jeudi',
    studentCount: 12,
    maxCapacity: 18
  },
  {
    id: 'grp-3',
    name: '2AS Groupe A',
    level: '2AS (2ème Année)',
    subject: 'Mathématiques',
    teacherId: 'tch-1',
    teacherName: 'Ahmed Mansouri',
    room: 'Salle 03',
    scheduleTime: '17:30 - 19:30',
    scheduleDays: 'Mercredi & Samedi',
    studentCount: 14,
    maxCapacity: 20
  },
  {
    id: 'grp-4',
    name: 'BEM Groupe A',
    level: '4AM (BEM)',
    subject: 'Français & Rédaction',
    teacherId: 'tch-3',
    teacherName: 'Amel Benali',
    room: 'Salle 01',
    scheduleTime: '14:00 - 16:00',
    scheduleDays: 'Mardi & Samedi',
    studentCount: 16,
    maxCapacity: 20
  }
];

export const INITIAL_SESSIONS: SessionItem[] = [
  {
    id: 'ses-1',
    day: 'Mardi',
    time: '17:00 - 19:00',
    duration: '2h00',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subject: 'Mathématiques',
    teacherId: 'tch-1',
    teacherName: 'Ahmed Mansouri',
    room: 'Salle 02',
    status: 'in_progress',
    attendanceCompleted: false,
    date: 'Mardi 29 Sept'
  },
  {
    id: 'ses-2',
    day: 'Lundi',
    time: '15:00 - 17:00',
    duration: '2h00',
    groupId: 'grp-2',
    groupName: '3AS Groupe B',
    subject: 'Physique',
    teacherId: 'tch-2',
    teacherName: 'Karim Saidi',
    room: 'Salle 01',
    status: 'completed',
    attendanceCompleted: true,
    date: 'Lundi 28 Sept'
  },
  {
    id: 'ses-3',
    day: 'Mardi',
    time: '19:00 - 20:30',
    duration: '1h30',
    groupId: 'grp-4',
    groupName: 'BEM Groupe A',
    subject: 'Français',
    teacherId: 'tch-3',
    teacherName: 'Amel Benali',
    room: 'Salle 03',
    status: 'upcoming',
    attendanceCompleted: false,
    date: 'Mardi 29 Sept'
  },
  {
    id: 'ses-4',
    day: 'Mercredi',
    time: '17:30 - 19:30',
    duration: '2h00',
    groupId: 'grp-3',
    groupName: '2AS Groupe A',
    subject: 'Mathématiques',
    teacherId: 'tch-1',
    teacherName: 'Ahmed Mansouri',
    room: 'Salle 03',
    status: 'upcoming',
    attendanceCompleted: false,
    date: 'Mercredi 30 Sept'
  },
  {
    id: 'ses-5',
    day: 'Jeudi',
    time: '15:00 - 17:00',
    duration: '2h00',
    groupId: 'grp-2',
    groupName: '3AS Groupe B',
    subject: 'Physique',
    teacherId: 'tch-2',
    teacherName: 'Karim Saidi',
    room: 'Salle 01',
    status: 'upcoming',
    attendanceCompleted: false,
    date: 'Jeudi 01 Oct'
  },
  {
    id: 'ses-6',
    day: 'Vendredi',
    time: '17:00 - 19:00',
    duration: '2h00',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subject: 'Mathématiques & Physique',
    teacherId: 'tch-1',
    teacherName: 'Ahmed Mansouri',
    room: 'Salle 02',
    status: 'upcoming',
    attendanceCompleted: false,
    date: 'Vendredi 02 Oct'
  },
  {
    id: 'ses-7',
    day: 'Samedi',
    time: '14:00 - 16:00',
    duration: '2h00',
    groupId: 'grp-4',
    groupName: 'BEM Groupe A',
    subject: 'Français',
    teacherId: 'tch-3',
    teacherName: 'Amel Benali',
    room: 'Salle 01',
    status: 'upcoming',
    attendanceCompleted: false,
    date: 'Samedi 03 Oct'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    sessionId: 'ses-2',
    studentId: 'std-6',
    studentName: 'Mohamed Dahmani',
    groupId: 'grp-2',
    status: 'present',
    date: 'Lundi 28 Sept',
    time: '15:05',
    subject: 'Physique'
  },
  {
    id: 'att-2',
    sessionId: 'ses-past-1',
    studentId: 'std-1',
    studentName: 'Sara Benali',
    groupId: 'grp-1',
    status: 'present',
    date: 'Vendredi 25 Sept',
    time: '17:00',
    subject: 'Mathématiques'
  },
  {
    id: 'att-3',
    sessionId: 'ses-past-1',
    studentId: 'std-2',
    studentName: 'Yacine Merad',
    groupId: 'grp-1',
    status: 'present',
    date: 'Vendredi 25 Sept',
    time: '17:00',
    subject: 'Mathématiques'
  },
  {
    id: 'att-4',
    sessionId: 'ses-past-1',
    studentId: 'std-3',
    studentName: 'Lina Boudiaf',
    groupId: 'grp-1',
    status: 'late',
    date: 'Vendredi 25 Sept',
    time: '17:15',
    subject: 'Mathématiques',
    note: 'Retard 15 min'
  },
  {
    id: 'att-5',
    sessionId: 'ses-past-1',
    studentId: 'std-4',
    studentName: 'Adam Belkacem',
    groupId: 'grp-1',
    status: 'absent',
    date: 'Vendredi 25 Sept',
    time: '17:00',
    subject: 'Mathématiques',
    note: 'Non justifié'
  },
  {
    id: 'att-6',
    sessionId: 'ses-past-1',
    studentId: 'std-5',
    studentName: 'Ines Hamdi',
    groupId: 'grp-1',
    status: 'present',
    date: 'Vendredi 25 Sept',
    time: '16:58',
    subject: 'Mathématiques'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    studentId: 'std-1',
    studentName: 'Sara Benali',
    subscriptionPlan: 'Pack BAC Réussite (Maths + Physique)',
    totalAmount: 6000,
    paidAmount: 6000,
    remainingAmount: 0,
    paymentMethod: 'Espèces',
    date: '28 Sept 2026',
    status: 'Payé',
    receiptNumber: 'REC-2026-0842'
  },
  {
    id: 'pay-2',
    studentId: 'std-2',
    studentName: 'Yacine Merad',
    subscriptionPlan: 'Pack BAC Réussite (Maths + Physique)',
    totalAmount: 6000,
    paidAmount: 6000,
    remainingAmount: 0,
    paymentMethod: 'BaridiMob',
    date: '27 Sept 2026',
    status: 'Payé',
    receiptNumber: 'REC-2026-0839'
  },
  {
    id: 'pay-3',
    studentId: 'std-3',
    studentName: 'Lina Boudiaf',
    subscriptionPlan: 'Pack BAC Réussite (Maths + Physique)',
    totalAmount: 6000,
    paidAmount: 3000,
    remainingAmount: 3000,
    paymentMethod: 'Espèces',
    date: '25 Sept 2026',
    status: 'Partiel',
    receiptNumber: 'REC-2026-0825'
  },
  {
    id: 'pay-4',
    studentId: 'std-6',
    studentName: 'Mohamed Dahmani',
    subscriptionPlan: 'Abonnement Mensuel Physique',
    totalAmount: 5500,
    paidAmount: 5500,
    remainingAmount: 0,
    paymentMethod: 'Espèces',
    date: '24 Sept 2026',
    status: 'Payé',
    receiptNumber: 'REC-2026-0811'
  },
  {
    id: 'pay-5',
    studentId: 'std-7',
    studentName: 'Amina Khelifi',
    subscriptionPlan: 'Abonnement 2AS Maths',
    totalAmount: 4500,
    paidAmount: 4500,
    remainingAmount: 0,
    paymentMethod: 'Virement CCP',
    date: '22 Sept 2026',
    status: 'Payé',
    receiptNumber: 'REC-2026-0798'
  },
  {
    id: 'pay-6',
    studentId: 'std-8',
    studentName: 'Rayane Boumaza',
    subscriptionPlan: 'Abonnement BEM Français',
    totalAmount: 4000,
    paidAmount: 2000,
    remainingAmount: 2000,
    paymentMethod: 'Espèces',
    date: '20 Sept 2026',
    status: 'Partiel',
    receiptNumber: 'REC-2026-0785'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Cours Mathématiques — Fonctions Exponentielles & Logarithmes.pdf',
    type: 'PDF',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subject: 'Mathématiques',
    authorName: 'Ahmed Mansouri',
    date: '26 Sept 2026',
    fileSize: '3.4 Mo',
    description: 'Synthèse de cours détaillée avec théorèmes fondamentaux et exercices types du BAC.'
  },
  {
    id: 'doc-2',
    title: 'Exercice 01 — Série Dérivées et Continuité.pdf',
    type: 'Exercices',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subject: 'Mathématiques',
    authorName: 'Ahmed Mansouri',
    date: '24 Sept 2026',
    fileSize: '1.8 Mo',
    description: 'Série de 12 exercices progressifs préparatoires au devoir surveillé.'
  },
  {
    id: 'doc-3',
    title: 'Test Chapitre 2 — Sujet & Corrigé Type.pdf',
    type: 'Tests',
    groupId: 'grp-1',
    groupName: '3AS Groupe A',
    subject: 'Mathématiques',
    authorName: 'Ahmed Mansouri',
    date: '20 Sept 2026',
    fileSize: '2.1 Mo',
    description: 'Évaluation formative avec barème détaillé BAC et conseils de rédaction.'
  },
  {
    id: 'doc-4',
    title: 'Mécanique Newtonienne — Fiche Révision & Formules.pdf',
    type: 'PDF',
    groupId: 'grp-2',
    groupName: '3AS Groupe B',
    subject: 'Physique',
    authorName: 'Karim Saidi',
    date: '22 Sept 2026',
    fileSize: '2.6 Mo',
    description: 'Lois de Newton, mouvements des satellites et des projectiles.'
  },
  {
    id: 'doc-5',
    title: 'Support PowerPoint — Le Texte d\'Histoire & Analyse.pptx',
    type: 'PowerPoint',
    groupId: 'grp-4',
    groupName: 'BEM Groupe A',
    subject: 'Français',
    authorName: 'Amel Benali',
    date: '18 Sept 2026',
    fileSize: '5.2 Mo',
    description: 'Diapositives interactives pour structurer l\'analyse du texte historique.'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Nadia Benali',
    email: 'nadia@centrepro.demo',
    password: '123456',
    role: 'reception',
    active: true,
    permissions: {
      canRegisterStudents: true,
      canCollectPayments: true,
      canViewPlanning: true,
      canExportReports: false
    },
    lastLogin: "Aujourd'hui à 08:30",
    createdAt: '01 Sept 2026'
  },
  {
    id: 'usr-2',
    name: 'Karima Mansour',
    email: 'karima@centrepro.demo',
    password: '123456',
    role: 'reception',
    active: true,
    permissions: {
      canRegisterStudents: true,
      canCollectPayments: true,
      canViewPlanning: true,
      canExportReports: false
    },
    lastLogin: 'Hier à 14:15',
    createdAt: '05 Sept 2026'
  },
  {
    id: 'usr-3',
    name: 'Direction Générale',
    email: 'direction@elmaalim.dz',
    password: '123456',
    role: 'admin',
    active: true,
    permissions: {
      canRegisterStudents: true,
      canCollectPayments: true,
      canViewPlanning: true,
      canExportReports: true
    },
    lastLogin: 'En ligne',
    createdAt: '01 Août 2026'
  }
];
