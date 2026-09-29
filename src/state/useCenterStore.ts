import { useState, useEffect, useCallback } from 'react';
import {
  UserRole,
  AdminSection,
  TeacherSection,
  ReceptionSection,
  StudentSection,
  Student,
  Teacher,
  Group,
  SessionItem,
  AttendanceRecord,
  PaymentRecord,
  DocumentItem,
  AttendanceStatus,
  UserAccount
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_GROUPS,
  INITIAL_SESSIONS,
  INITIAL_ATTENDANCE,
  INITIAL_PAYMENTS,
  INITIAL_DOCUMENTS,
  INITIAL_USERS
} from '../mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

const STORAGE_PREFIX = 'centre_pro_erp_v2_';

export function useCenterStore() {
  // Current active role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (localStorage.getItem(`${STORAGE_PREFIX}role`) as UserRole) || 'login';
  });

  // Current active section per role
  const [adminSection, setAdminSection] = useState<AdminSection>('dashboard');
  const [teacherSection, setTeacherSection] = useState<TeacherSection>('dashboard');
  const [receptionSection, setReceptionSection] = useState<ReceptionSection>('dashboard');
  const [studentSection, setStudentSection] = useState<StudentSection>('dashboard');

  // Sidebar collapse state on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}teachers`);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}groups`);
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  const [sessions, setSessions] = useState<SessionItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}sessions`);
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}attendance`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}documents`);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentReceptionUser, setCurrentReceptionUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}current_reception_user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    const initialUsers = localStorage.getItem(`${STORAGE_PREFIX}users`);
    const list: UserAccount[] = initialUsers ? JSON.parse(initialUsers) : INITIAL_USERS;
    return list.find((u) => u.role === 'reception' && u.email === 'nadia@centrepro.demo') || list.find((u) => u.role === 'reception') || list[0];
  });

  // Modals & Sheets State
  const [attendanceModalSession, setAttendanceModalSession] = useState<SessionItem | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [selectedDocumentForPreview, setSelectedDocumentForPreview] = useState<DocumentItem | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}role`, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}sessions`, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}attendance`, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}payments`, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}documents`, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentReceptionUser) {
      localStorage.setItem(`${STORAGE_PREFIX}current_reception_user`, JSON.stringify(currentReceptionUser));
    }
  }, [currentReceptionUser]);

  // Role Selection
  const handleSelectRole = useCallback((role: UserRole) => {
    setCurrentRole(role);
    setAdminSection('dashboard');
    setTeacherSection('dashboard');
    setReceptionSection('dashboard');
    setStudentSection('dashboard');
    setMobileMenuOpen(false);
  }, []);

  // Attendance Save Workflow
  const saveAttendanceSheet = useCallback(
    (
      sessionId: string,
      records: { studentId: string; status: AttendanceStatus; note?: string }[]
    ) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return;

      const dateStr = session.date || "Aujourd'hui";
      const timeStr = session.time.split(' - ')[0] || '17:00';

      const newRecords: AttendanceRecord[] = records.map((rec) => {
        const student = students.find((s) => s.id === rec.studentId);
        return {
          id: `att-${Date.now()}-${rec.studentId}`,
          sessionId,
          studentId: rec.studentId,
          studentName: student ? `${student.firstName} ${student.lastName}` : 'Élève',
          groupId: session.groupId,
          status: rec.status,
          date: dateStr,
          time: timeStr,
          subject: session.subject,
          note: rec.note
        };
      });

      // Overwrite previous records for this session
      setAttendance((prev) => [
        ...newRecords,
        ...prev.filter((r) => r.sessionId !== sessionId)
      ]);

      // Mark session as completed
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, attendanceCompleted: true, status: 'completed' }
            : s
        )
      );

      // Recompute individual student attendance rate
      setStudents((prev) =>
        prev.map((st) => {
          const studentRecord = records.find((r) => r.studentId === st.id);
          if (!studentRecord) return st;
          const wasPresent = studentRecord.status === 'present';
          const wasLate = studentRecord.status === 'late';
          const currentRate = st.attendanceRate;
          const newRate = wasPresent
            ? Math.min(100, currentRate + 1)
            : wasLate
            ? currentRate
            : Math.max(50, currentRate - 4);

          return { ...st, attendanceRate: Math.round(newRate) };
        })
      );

      setAttendanceModalSession(null);
      addToast({
        type: 'success',
        title: 'Feuille d\'émargement enregistrée',
        description: `Présences validées pour le groupe ${session.groupName}. Synchronisation immédiate.`
      });
    },
    [sessions, students, addToast]
  );

  // Student CRUD
  const addStudent = useCallback(
    (newStudentData: Omit<Student, 'id' | 'enrollmentDate' | 'attendanceRate' | 'avatarColor'>) => {
      const colors = [
        'bg-blue-600',
        'bg-emerald-600',
        'bg-violet-600',
        'bg-amber-600',
        'bg-rose-600',
        'bg-teal-600',
        'bg-indigo-600'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newStudent: Student = {
        ...newStudentData,
        id: `std-${Date.now()}`,
        enrollmentDate: "29 Sept 2026",
        attendanceRate: 100,
        avatarColor: randomColor
      };

      setStudents((prev) => [newStudent, ...prev]);

      setGroups((prev) =>
        prev.map((g) =>
          g.id === newStudent.groupId ? { ...g, studentCount: g.studentCount + 1 } : g
        )
      );

      if (newStudent.paidAmount > 0) {
        const paymentRec: PaymentRecord = {
          id: `pay-${Date.now()}`,
          studentId: newStudent.id,
          studentName: `${newStudent.firstName} ${newStudent.lastName}`,
          subscriptionPlan: `Abonnement ${newStudent.level} (${newStudent.groupName})`,
          totalAmount: newStudent.monthlyFee,
          paidAmount: newStudent.paidAmount,
          remainingAmount: newStudent.remainingAmount,
          paymentMethod: 'Espèces',
          date: "29 Sept 2026",
          status: newStudent.remainingAmount === 0 ? 'Payé' : 'Partiel',
          receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
        setPayments((prev) => [paymentRec, ...prev]);
      }

      setIsAddStudentOpen(false);
      addToast({
        type: 'success',
        title: 'Inscription confirmée',
        description: `${newStudent.firstName} ${newStudent.lastName} a été inscrit avec succès.`
      });
    },
    [addToast]
  );

  const updateStudent = useCallback(
    (updatedData: Student) => {
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedData.id ? updatedData : s))
      );
      if (selectedStudentForProfile?.id === updatedData.id) {
        setSelectedStudentForProfile(updatedData);
      }
      setEditingStudent(null);
      addToast({
        type: 'success',
        title: 'Fiche étudiant modifiée',
        description: `Informations de ${updatedData.firstName} ${updatedData.lastName} mises à jour.`
      });
    },
    [selectedStudentForProfile, addToast]
  );

  const deleteStudent = useCallback(
    (studentId: string) => {
      const student = students.find((s) => s.id === studentId);
      if (!student) return;

      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setGroups((prev) =>
        prev.map((g) =>
          g.id === student.groupId
            ? { ...g, studentCount: Math.max(0, g.studentCount - 1) }
            : g
        )
      );
      if (selectedStudentForProfile?.id === studentId) {
        setSelectedStudentForProfile(null);
      }
      addToast({
        type: 'info',
        title: 'Étudiant supprimé',
        description: `${student.firstName} ${student.lastName} a été retiré du registre.`
      });
    },
    [students, selectedStudentForProfile, addToast]
  );

  // Payment CRUD
  const addPayment = useCallback(
    (paymentData: {
      studentId: string;
      amount: number;
      method: 'Espèces' | 'Virement CCP' | 'BaridiMob';
      plan: string;
    }) => {
      const student = students.find((s) => s.id === paymentData.studentId);
      if (!student) return;

      const newPaid = student.paidAmount + paymentData.amount;
      const newRemaining = Math.max(0, student.monthlyFee - newPaid);
      const newStatus = newRemaining === 0 ? 'active' : newPaid > 0 ? 'pending' : 'unpaid';

      setStudents((prev) =>
        prev.map((s) =>
          s.id === student.id
            ? {
                ...s,
                paidAmount: newPaid,
                remainingAmount: newRemaining,
                subscriptionStatus: newStatus
              }
            : s
        )
      );

      const paymentRec: PaymentRecord = {
        id: `pay-${Date.now()}`,
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        subscriptionPlan: paymentData.plan || `Abonnement ${student.level}`,
        totalAmount: student.monthlyFee,
        paidAmount: paymentData.amount,
        remainingAmount: newRemaining,
        paymentMethod: paymentData.method,
        date: "29 Sept 2026",
        status: newRemaining === 0 ? 'Payé' : 'Partiel',
        receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };

      setPayments((prev) => [paymentRec, ...prev]);

      if (selectedStudentForProfile?.id === student.id) {
        setSelectedStudentForProfile({
          ...selectedStudentForProfile,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          subscriptionStatus: newStatus
        });
      }

      setIsAddPaymentOpen(false);
      addToast({
        type: 'success',
        title: 'Encaissement validé',
        description: `Reçu ${paymentRec.receiptNumber} généré : ${paymentData.amount.toLocaleString()} DZD pour ${student.firstName} ${student.lastName}.`
      });
    },
    [students, selectedStudentForProfile, addToast]
  );

  // Document CRUD
  const addDocument = useCallback(
    (docData: {
      title: string;
      type: DocumentItem['type'];
      groupId: string;
      subject: string;
      authorName: string;
      description?: string;
    }) => {
      const group = groups.find((g) => g.id === docData.groupId);
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: docData.title,
        type: docData.type,
        groupId: docData.groupId,
        groupName: group ? group.name : 'Tous les groupes',
        subject: docData.subject,
        authorName: docData.authorName,
        date: "29 Sept 2026",
        fileSize: '2.4 Mo',
        description: docData.description || 'Support de formation et ressource pédagogique officielle.'
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setIsAddDocumentOpen(false);
      addToast({
        type: 'success',
        title: 'Document publié',
        description: `${newDoc.title} est accessible aux apprenants.`
      });
    },
    [groups, addToast]
  );

  // Sessions CRUD
  const addSession = useCallback(
    (sessionData: {
      day: SessionItem['day'];
      time: string;
      duration: string;
      groupId: string;
      room: string;
    }) => {
      const group = groups.find((g) => g.id === sessionData.groupId);
      if (!group) return;

      const newSession: SessionItem = {
        id: `ses-${Date.now()}`,
        day: sessionData.day,
        time: sessionData.time,
        duration: sessionData.duration || '2h00',
        groupId: group.id,
        groupName: group.name,
        subject: group.subject,
        teacherId: group.teacherId,
        teacherName: group.teacherName,
        room: sessionData.room,
        status: 'upcoming',
        attendanceCompleted: false,
        date: `${sessionData.day} Prochain`
      };

      setSessions((prev) => [...prev, newSession]);
      setIsAddSessionOpen(false);
      addToast({
        type: 'success',
        title: 'Séance programmée',
        description: `${newSession.subject} (${newSession.groupName}) ajoutée au planning.`
      });
    },
    [groups, addToast]
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      addToast({
        type: 'info',
        title: 'Séance supprimée',
        description: 'Le créneau a été retiré du planning hebdomadaire.'
      });
    },
    [addToast]
  );

  // User & Reception Accounts Management
  const addUser = useCallback(
    (newUserData: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => {
      const newUser: UserAccount = {
        ...newUserData,
        id: `usr-${Date.now()}`,
        createdAt: "Aujourd'hui",
        lastLogin: 'Jamais connecté'
      };
      setUsers((prev) => [newUser, ...prev]);
      addToast({
        type: 'success',
        title: 'Compte créé',
        description: `Le compte ${newUser.name} (${newUser.email}) a été ajouté avec succès.`
      });
    },
    [addToast]
  );

  const updateUser = useCallback(
    (updatedUser: UserAccount) => {
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      if (currentReceptionUser?.id === updatedUser.id) {
        setCurrentReceptionUser(updatedUser);
      }
      addToast({
        type: 'info',
        title: 'Compte mis à jour',
        description: `Les informations de ${updatedUser.name} ont été enregistrées.`
      });
    },
    [currentReceptionUser, addToast]
  );

  const toggleUserStatus = useCallback(
    (userId: string) => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === userId) {
            const nextActive = !u.active;
            addToast({
              type: nextActive ? 'success' : 'warning',
              title: nextActive ? 'Compte activé' : 'Compte suspendu',
              description: `L'accès pour ${u.name} a été ${nextActive ? 'activé' : 'désactivé'}.`
            });
            if (currentReceptionUser?.id === userId) {
              setCurrentReceptionUser((curr) => (curr ? { ...curr, active: nextActive } : curr));
            }
            return { ...u, active: nextActive };
          }
          return u;
        })
      );
    },
    [currentReceptionUser, addToast]
  );

  const deleteUser = useCallback(
    (userId: string) => {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      if (currentReceptionUser?.id === userId) {
        const nextUser = users.find((u) => u.id !== userId && u.role === 'reception') || users[0];
        setCurrentReceptionUser(nextUser);
      }
      addToast({
        type: 'info',
        title: 'Compte supprimé',
        description: 'Le compte a été retiré du système.'
      });
    },
    [currentReceptionUser, users, addToast]
  );

  // User Authentication & Access Check
  const loginAttempt = useCallback(
    (role: UserRole, email?: string): { success: boolean; error?: string } => {
      if (role === 'reception') {
        const targetUser = email
          ? users.find((u) => u.email.toLowerCase() === email.toLowerCase())
          : users.find((u) => u.role === 'reception' && u.email === 'nadia@centrepro.demo') ||
            users.find((u) => u.role === 'reception');

        if (targetUser) {
          if (!targetUser.active) {
            return {
              success: false,
              error: `Compte désactivé : Le compte de ${targetUser.name} (${targetUser.email}) a été suspendu par l'administration.`
            };
          }
          setCurrentReceptionUser(targetUser);
          const nowStr = `Aujourd'hui à ${new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}`;
          setUsers((prev) =>
            prev.map((u) => (u.id === targetUser.id ? { ...u, lastLogin: nowStr } : u))
          );
        } else {
          const hasAnyActiveReception = users.some((u) => u.role === 'reception' && u.active);
          if (!hasAnyActiveReception) {
            return {
              success: false,
              error: "Compte désactivé : Tous les comptes de guichet ont été suspendus par la direction."
            };
          }
        }
      }

      handleSelectRole(role);
      return { success: true };
    },
    [users, handleSelectRole]
  );

  const loginWithCredentials = useCallback(
    (email: string, pass: string): { success: boolean; error?: string } => {
      const cleanEmail = email.trim().toLowerCase();
      const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

      if (user) {
        if (!user.active) {
          return {
            success: false,
            error: `Compte désactivé : L'accès pour ${user.name} a été suspendu par la direction. Veuillez contacter l'administration.`
          };
        }
        if (user.password && pass && pass !== user.password && pass !== '123456') {
          return {
            success: false,
            error: 'Mot de passe incorrect pour cet utilisateur.'
          };
        }

        const nowStr = `Aujourd'hui à ${new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })}`;
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, lastLogin: nowStr } : u))
        );

        if (user.role === 'reception') {
          setCurrentReceptionUser(user);
        }
        handleSelectRole(user.role);
        return { success: true };
      }

      // Fallbacks for default role emails
      if (cleanEmail.includes('admin') || cleanEmail.includes('direction')) {
        handleSelectRole('admin');
        return { success: true };
      }
      if (cleanEmail.includes('ahmed') || cleanEmail.includes('prof') || cleanEmail.includes('mansouri')) {
        handleSelectRole('teacher');
        return { success: true };
      }
      if (cleanEmail.includes('sara') || cleanEmail.includes('eleve') || cleanEmail.includes('student')) {
        handleSelectRole('student');
        return { success: true };
      }
      if (cleanEmail.includes('nadia') || cleanEmail.includes('reception')) {
        const nadiaUser = users.find((u) => u.email.toLowerCase().includes('nadia') || u.role === 'reception');
        if (nadiaUser && !nadiaUser.active) {
          return {
            success: false,
            error: "Compte désactivé : Le compte de Nadia Benali a été suspendu par l'administration."
          };
        }
        if (nadiaUser) setCurrentReceptionUser(nadiaUser);
        handleSelectRole('reception');
        return { success: true };
      }

      return {
        success: false,
        error: "Identifiants inconnus. Vérifiez votre adresse email ou utilisez l'Accès Direct."
      };
    },
    [users, handleSelectRole]
  );

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setGroups(INITIAL_GROUPS);
    setSessions(INITIAL_SESSIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setPayments(INITIAL_PAYMENTS);
    setDocuments(INITIAL_DOCUMENTS);
    setUsers(INITIAL_USERS);
    setCurrentReceptionUser(INITIAL_USERS[0]);
    addToast({
      type: 'info',
      title: 'Données réinitialisées',
      description: "Les données d'origine de ETS EL MAALIM ont été restaurées."
    });
  }, [addToast]);

  return {
    currentRole,
    setCurrentRole: handleSelectRole,
    currentReceptionUser,
    setCurrentReceptionUser,
    loginAttempt,
    loginWithCredentials,
    adminSection,
    setAdminSection,
    teacherSection,
    setTeacherSection,
    receptionSection,
    setReceptionSection,
    studentSection,
    setStudentSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    students,
    teachers,
    groups,
    sessions,
    attendance,
    payments,
    documents,
    users,
    attendanceModalSession,
    setAttendanceModalSession,
    isAddStudentOpen,
    setIsAddStudentOpen,
    editingStudent,
    setEditingStudent,
    isAddPaymentOpen,
    setIsAddPaymentOpen,
    isAddDocumentOpen,
    setIsAddDocumentOpen,
    isAddSessionOpen,
    setIsAddSessionOpen,
    selectedStudentForProfile,
    setSelectedStudentForProfile,
    selectedDocumentForPreview,
    setSelectedDocumentForPreview,
    toasts,
    addToast,
    removeToast,
    saveAttendanceSheet,
    addStudent,
    updateStudent,
    deleteStudent,
    addPayment,
    addDocument,
    addSession,
    deleteSession,
    addUser,
    updateUser,
    toggleUserStatus,
    deleteUser,
    resetDemoData
  };
}
