import React from 'react';
import { useCenterStore } from './state/useCenterStore';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginView } from './components/roles/LoginView';
import { AdminView } from './components/roles/AdminView';
import { ReceptionView } from './components/roles/ReceptionView';
import { TeacherView } from './components/roles/TeacherView';
import { StudentView } from './components/roles/StudentView';
import { AttendanceModal } from './components/modals/AttendanceModal';
import { AddStudentModal } from './components/modals/AddStudentModal';
import { EditStudentModal } from './components/modals/EditStudentModal';
import { AddPaymentModal } from './components/modals/AddPaymentModal';
import { AddDocumentModal } from './components/modals/AddDocumentModal';
import { AddSessionModal } from './components/modals/AddSessionModal';
import { DocumentViewerModal } from './components/modals/DocumentViewerModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';

export default function App() {
  const store = useCenterStore();

  // Demo student for student role: Sara Benali
  const demoStudent = store.students.find((s) => s.id === 'std-1') || store.students[0];

  // If on login view, render the modern web authentication & role selector
  if (store.currentRole === 'login') {
    return (
      <>
        <LoginView onSelectRole={(role) => store.setCurrentRole(role)} />
        <ToastContainer toasts={store.toasts} onRemove={store.removeToast} />
      </>
    );
  }

  // Derive page title for the header
  const getHeaderTitle = () => {
    switch (store.currentRole) {
      case 'admin': {
        const titles: Record<string, string> = {
          dashboard: 'Tableau de bord Général',
          students: 'Gestion des Étudiants',
          teachers: 'Corps Enseignant & Formateurs',
          groups: 'Groupes & Classes de Soutien',
          subjects: 'Matières & Modules',
          rooms: 'Gestion des Salles de Cours',
          planning: 'Planning & Emploi du Temps Hebdomadaire',
          attendance: 'Registres des Présences & Émargements',
          subscriptions: 'Formules d’Abonnements',
          payments: 'Trésorerie & Encaissements',
          documents: 'Médiathèque & Supports Pédagogiques',
          reports: 'Rapports & Statistiques Analytiques',
          users: 'Gestion des Utilisateurs & Comptes Réception',
          settings: 'Paramètres du Centre'
        };
        return titles[store.adminSection] || 'Administration';
      }
      case 'reception':
        return 'Guichet d’Accueil & Inscriptions · Nadia Benali';
      case 'teacher':
        return 'Espace Formateur · Ahmed Mansouri';
      case 'student':
        return 'Espace Élève · Sara Benali';
      default:
        return 'ETS EL MAALIM';
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-row font-sans antialiased text-slate-800 bg-slate-100 m-0 p-0">
      {/* Left Sidebar (In-flow on desktop, overlay on mobile) */}
      <Sidebar
        currentRole={store.currentRole}
        adminSection={store.adminSection}
        setAdminSection={store.setAdminSection}
        teacherSection={store.teacherSection}
        setTeacherSection={store.setTeacherSection}
        receptionSection={store.receptionSection}
        setReceptionSection={store.setReceptionSection}
        studentSection={store.studentSection}
        setStudentSection={store.setStudentSection}
        collapsed={store.sidebarCollapsed}
        onToggleCollapse={() => store.setSidebarCollapsed(!store.sidebarCollapsed)}
        onLogout={() => store.setCurrentRole('login')}
        mobileMenuOpen={store.mobileMenuOpen}
        onCloseMobileMenu={() => store.setMobileMenuOpen(false)}
      />

      {/* Main Content Column: 100% of remaining width and height */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-100">
        {/* Full-width Top Header */}
        <TopHeader
          currentRole={store.currentRole}
          title={getHeaderTitle()}
          subtitle="ETS EL MAALIM · Système de gestion pour centre de formation"
          onSelectRole={store.setCurrentRole}
          onResetData={store.resetDemoData}
          onOpenMobileMenu={() => store.setMobileMenuOpen(true)}
        />

        {/* Scrollable Viewport: Full remaining width with smooth scrolling */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full bg-slate-100/90">
            {store.currentRole === 'admin' && (
              <AdminView
                currentSection={store.adminSection}
                setSection={store.setAdminSection}
                students={store.students}
                teachers={store.teachers}
                groups={store.groups}
                sessions={store.sessions}
                attendance={store.attendance}
                payments={store.payments}
                documents={store.documents}
                users={store.users}
                onOpenAddStudent={() => store.setIsAddStudentOpen(true)}
                onEditStudent={(st) => store.setEditingStudent(st)}
                onDeleteStudent={store.deleteStudent}
                onOpenAddPayment={() => store.setIsAddPaymentOpen(true)}
                onOpenAddDocument={() => store.setIsAddDocumentOpen(true)}
                onOpenAddSession={() => store.setIsAddSessionOpen(true)}
                onDeleteSession={store.deleteSession}
                onSelectStudent={store.setSelectedStudentForProfile}
                onPreviewDocument={store.setSelectedDocumentForPreview}
                onAddUser={store.addUser}
                onUpdateUser={store.updateUser}
                onToggleUserStatus={store.toggleUserStatus}
                onDeleteUser={store.deleteUser}
              />
            )}

            {store.currentRole === 'reception' && (
              <ReceptionView
                currentTab={store.receptionSection}
                students={store.students}
                payments={store.payments}
                sessions={store.sessions}
                groups={store.groups}
                onOpenAddStudent={() => store.setIsAddStudentOpen(true)}
                onOpenAddPayment={() => store.setIsAddPaymentOpen(true)}
                onSelectStudent={store.setSelectedStudentForProfile}
                onSelectRole={store.setCurrentRole}
              />
            )}

            {store.currentRole === 'teacher' && (
              <TeacherView
                currentSection={store.teacherSection}
                setSection={store.setTeacherSection}
                sessions={store.sessions}
                students={store.students}
                groups={store.groups}
                documents={store.documents}
                attendance={store.attendance}
                onTakeAttendance={(session) => store.setAttendanceModalSession(session)}
                onOpenAddDocument={() => store.setIsAddDocumentOpen(true)}
                onPreviewDocument={store.setSelectedDocumentForPreview}
              />
            )}

            {store.currentRole === 'student' && (
              <StudentView
                currentTab={store.studentSection}
                student={demoStudent}
                sessions={store.sessions}
                attendance={store.attendance}
                payments={store.payments}
                documents={store.documents}
                onPreviewDocument={store.setSelectedDocumentForPreview}
                onSelectRole={store.setCurrentRole}
              />
            )}
          </main>
        </div>

      {/* Global Modals */}

      {/* 1. Interactive Teacher/Admin Attendance Session Sheet */}
      {store.attendanceModalSession && (
        <AttendanceModal
          session={store.attendanceModalSession}
          students={store.students}
          existingAttendance={store.attendance}
          onClose={() => store.setAttendanceModalSession(null)}
          onSave={(sessionId, records) => {
            store.saveAttendanceSheet(sessionId, records);
          }}
        />
      )}

      {/* 2. New Student Enrollment Modal */}
      {store.isAddStudentOpen && (
        <AddStudentModal
          groups={store.groups}
          onClose={() => store.setIsAddStudentOpen(false)}
          onAdd={(newStudentData) => {
            store.addStudent(newStudentData);
          }}
        />
      )}

      {/* 3. Edit Student Record Modal */}
      {store.editingStudent && (
        <EditStudentModal
          student={store.editingStudent}
          groups={store.groups}
          onClose={() => store.setEditingStudent(null)}
          onSave={(updatedStudent) => {
            store.updateStudent(updatedStudent);
          }}
        />
      )}

      {/* 4. Payment Collection Modal */}
      {store.isAddPaymentOpen && (
        <AddPaymentModal
          students={store.students}
          onClose={() => store.setIsAddPaymentOpen(false)}
          onAddPayment={(paymentData) => {
            store.addPayment(paymentData);
          }}
        />
      )}

      {/* 5. Document Upload Modal */}
      {store.isAddDocumentOpen && (
        <AddDocumentModal
          groups={store.groups}
          authorName={store.currentRole === 'teacher' ? 'Ahmed Mansouri' : 'Direction'}
          onClose={() => store.setIsAddDocumentOpen(false)}
          onAddDocument={(docData) => {
            store.addDocument(docData);
          }}
        />
      )}

      {/* 6. Schedule Planning Session Modal */}
      {store.isAddSessionOpen && (
        <AddSessionModal
          groups={store.groups}
          onClose={() => store.setIsAddSessionOpen(false)}
          onAddSession={(sessionData) => {
            store.addSession(sessionData);
          }}
        />
      )}

      {/* 7. Comprehensive Student Profile Modal */}
      {store.selectedStudentForProfile && (
        <StudentProfileModal
          student={store.selectedStudentForProfile}
          attendanceHistory={store.attendance.filter(
            (a) => a.studentId === store.selectedStudentForProfile?.id
          )}
          paymentHistory={store.payments.filter(
            (p) => p.studentId === store.selectedStudentForProfile?.id
          )}
          documents={store.documents}
          onClose={() => store.setSelectedStudentForProfile(null)}
          onOpenPayment={() => {
            store.setSelectedStudentForProfile(null);
            store.setIsAddPaymentOpen(true);
          }}
          onEditStudent={() => {
            const st = store.selectedStudentForProfile;
            store.setSelectedStudentForProfile(null);
            if (st) store.setEditingStudent(st);
          }}
        />
      )}

      {/* 8. Interactive Document Viewer Modal */}
      {store.selectedDocumentForPreview && (
        <DocumentViewerModal
          document={store.selectedDocumentForPreview}
          onClose={() => store.setSelectedDocumentForPreview(null)}
          onTriggerToast={(toast) => {
            store.addToast(toast);
          }}
        />
      )}

      {/* Toast Feedback Notifications */}
      <ToastContainer toasts={store.toasts} onRemove={store.removeToast} />
    </div>
  );
}
