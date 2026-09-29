import React from 'react';
import {
  UserRole,
  AdminSection,
  TeacherSection,
  ReceptionSection,
  StudentSection,
  UserAccount
} from '../../types';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  BookOpen,
  DoorOpen,
  Calendar,
  CheckSquare,
  BadgePercent,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  User,
  CalendarCheck,
  UserPlus,
  Banknote,
  FolderOpen
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  receptionUser?: UserAccount | null;
  adminSection: AdminSection;
  setAdminSection: (section: AdminSection) => void;
  teacherSection: TeacherSection;
  setTeacherSection: (section: TeacherSection) => void;
  receptionSection: ReceptionSection;
  setReceptionSection: (section: ReceptionSection) => void;
  studentSection: StudentSection;
  setStudentSection: (section: StudentSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  receptionUser,
  adminSection,
  setAdminSection,
  teacherSection,
  setTeacherSection,
  receptionSection,
  setReceptionSection,
  studentSection,
  setStudentSection,
  collapsed,
  onToggleCollapse,
  onLogout,
  mobileMenuOpen,
  onCloseMobileMenu
}) => {
  if (currentRole === 'login') return null;

  // Determine navigation items depending on current active role
  const getNavItems = () => {
    switch (currentRole) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
          { id: 'students', label: 'Étudiants', icon: Users },
          { id: 'teachers', label: 'Formateurs', icon: GraduationCap },
          { id: 'groups', label: 'Groupes', icon: Layers },
          { id: 'subjects', label: 'Matières', icon: BookOpen },
          { id: 'rooms', label: 'Salles', icon: DoorOpen },
          { id: 'planning', label: 'Planning', icon: Calendar },
          { id: 'attendance', label: 'Présences', icon: CheckSquare },
          { id: 'subscriptions', label: 'Abonnements', icon: BadgePercent },
          { id: 'payments', label: 'Paiements', icon: CreditCard },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'reports', label: 'Rapports', icon: BarChart3 },
          { id: 'users', label: 'Utilisateurs', icon: ShieldCheck },
          { id: 'settings', label: 'Paramètres', icon: Settings }
        ];

      case 'reception':
        return [
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
          { id: 'students', label: 'Étudiants', icon: Users },
          { id: 'inscriptions', label: 'Inscriptions', icon: UserPlus },
          { id: 'payments', label: 'Paiements & Caisse', icon: Banknote },
          { id: 'groups', label: 'Groupes & Effectifs', icon: Layers },
          { id: 'planning', label: 'Planning des Salles', icon: Calendar }
        ];

      case 'teacher':
        return [
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
          { id: 'sessions', label: 'Mes séances', icon: CalendarCheck },
          { id: 'groups', label: 'Mes groupes', icon: Layers },
          { id: 'attendance', label: 'Présences & Appel', icon: CheckSquare },
          { id: 'documents', label: 'Documents & Supports', icon: FolderOpen },
          { id: 'profile', label: 'Mon profil', icon: User }
        ];

      case 'student':
        return [
          { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard },
          { id: 'planning', label: 'Mon planning', icon: Calendar },
          { id: 'attendance', label: 'Mes présences', icon: CheckSquare },
          { id: 'documents', label: 'Mes documents', icon: FileText },
          { id: 'payments', label: 'Mes paiements', icon: CreditCard },
          { id: 'profile', label: 'Mon profil', icon: User }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const isCurrentActive = (id: string) => {
    if (currentRole === 'admin') return adminSection === id;
    if (currentRole === 'reception') return receptionSection === id;
    if (currentRole === 'teacher') return teacherSection === id;
    if (currentRole === 'student') return studentSection === id;
    return false;
  };

  const handleItemClick = (id: any) => {
    if (currentRole === 'admin') setAdminSection(id);
    if (currentRole === 'reception') setReceptionSection(id);
    if (currentRole === 'teacher') setTeacherSection(id);
    if (currentRole === 'student') setStudentSection(id);
    onCloseMobileMenu();
  };

  // Role info badge
  const getRoleInfo = () => {
    switch (currentRole) {
      case 'admin':
        return { name: 'Directeur Général', title: 'Espace Direction', avatar: 'DG', color: 'bg-indigo-600' };
      case 'reception': {
        const name = receptionUser?.name || 'Nadia Benali';
        const initials = name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'NB';
        return { name, title: 'Réception & Guichet', avatar: initials, color: 'bg-emerald-600' };
      }
      case 'teacher':
        return { name: 'Ahmed Mansouri', title: 'Formateur Maths', avatar: 'AM', color: 'bg-blue-600' };
      case 'student':
        return { name: 'Sara Benali', title: 'Élève 3AS Terminale', avatar: 'SB', color: 'bg-purple-600' };
      default:
        return { name: 'Utilisateur', title: 'Invité', avatar: 'U', color: 'bg-slate-600' };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:static md:z-auto bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 h-screen shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand / Logo Top Bar */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-600/30 shrink-0">
              EM
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5 truncate">
                  <span>ETS EL MAALIM</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Système de gestion pour centre de formation
                </div>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={collapsed ? 'Développer le menu' : 'Réduire le menu'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 px-2 space-y-1">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Menu Principal
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full h-10 flex items-center gap-3 px-3 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="w-5 flex items-center justify-center shrink-0">
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      active ? 'stroke-[2.5]' : 'group-hover:scale-110'
                    }`}
                  />
                </span>
                {!collapsed && <span className="truncate text-left flex-1">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom User Profile & Logout section */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/90 shrink-0 space-y-2">
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg ${roleInfo.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
            >
              {roleInfo.avatar}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{roleInfo.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{roleInfo.title}</div>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors ${
              collapsed ? 'justify-center px-0' : ''
            }`}
            title="Changer de rôle / Déconnexion"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
