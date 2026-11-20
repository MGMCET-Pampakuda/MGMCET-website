"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Award,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveFaculty,
  saveFacultyMember,
  deleteFacultyMember,
} from "@/lib/firebase-services";
import { faculty as staticFaculty } from "@/content/faculty";
import type { FacultyMember } from "@/types/faculty";
import type { DepartmentLevel } from "@/types/department";

const DEPARTMENTS_LIST = [
  "Computer Science & Engineering",
  "Science & Humanities",
  "Mechanical Engineering",
  "Electrical & Electronics Engineering",
  "Electronics & Communication Engineering",
  "Civil Engineering",
  "Automobile Engineering",
  "Artificial Intelligence & Machine Learning",
];

const LEADERSHIP_AVATARS = [
  { name: "Principal Dr. Dhanya G.", url: "/images/leadership/principal-dr-dhanya-g.webp" },
  { name: "Poly Principal Er. N.K. Rajan", url: "/images/leadership/principal-poly-er-nk-rajan.webp" },
  { name: "Chairman Dr. Geevarghese Yohannan", url: "/images/leadership/chairman-dr-geevarghese-yohannan.webp" },
  { name: "Director H. Ahinus", url: "/images/leadership/director-h-ahinus.webp" },
  { name: "General Faculty Avatar", url: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp" },
];

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminFacultyPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get("action");

  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(() => initialAction === "new");
  const [editingItem, setEditingItem] = useState<FacultyMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS_LIST[0]);
  const [departmentLevel, setDepartmentLevel] = useState<DepartmentLevel>("btech");
  const [image, setImage] = useState("https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp");
  const [email, setEmail] = useState("mail@mgmcet.ac.in");
  const [specialization, setSpecialization] = useState("");
  const [isHOD, setIsHOD] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setDesignation("Assistant Professor");
    setQualification("M.Tech");
    setDepartment(DEPARTMENTS_LIST[0]);
    setDepartmentLevel("btech");
    setImage("https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp");
    setEmail("mail@mgmcet.ac.in");
    setSpecialization("");
    setIsHOD(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: FacultyMember) => {
    setEditingItem(item);
    setName(item.name);
    setDesignation(item.designation);
    setQualification(item.qualification || "");
    setDepartment(item.department);
    setDepartmentLevel(item.departmentLevel);
    setImage(item.image || "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp");
    setEmail(item.email || "mail@mgmcet.ac.in");
    setSpecialization(item.specialization || "");
    setIsHOD(Boolean(item.isHOD));
    setIsModalOpen(true);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLiveFaculty((items) => {
      setFacultyList(items.length > 0 ? items : staticFaculty);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !designation.trim()) {
      alert("Please enter Name and Designation.");
      return;
    }

    await saveFacultyMember({
      ...(editingItem?.id ? { id: editingItem.id } : {}),
      name: name.trim(),
      designation: designation.trim(),
      qualification: qualification.trim() || undefined,
      department,
      departmentLevel,
      image,
      email: email.trim() || undefined,
      specialization: specialization.trim() || undefined,
      isHOD,
    });

    setIsModalOpen(false);
    showToast(
      editingItem
        ? "Faculty profile updated successfully!"
        : "New faculty member added!"
    );
  };

  const handleDelete = async (id: string) => {
    await deleteFacultyMember(id);
    setDeleteConfirmId(null);
    showToast("Faculty profile deleted.");
  };

  const filtered = useMemo(() => {
    return facultyList.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        levelFilter === "all" || item.departmentLevel === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [facultyList, searchQuery, levelFilter]);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Faculty & Staff Directory"
        subtitle="Manage leadership, professors, and departmental faculty profiles"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-accent-400" />
            <span>+ Add Faculty Member</span>
          </button>
        }
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { label: "All Levels", val: "all" },
              { label: "B.Tech Faculty", val: "btech" },
              { label: "M.Tech Faculty", val: "mtech" },
              { label: "Polytechnic Faculty", val: "polytechnic" },
            ].map((tab) => (
              <button
                key={tab.val}
                type="button"
                onClick={() => setLevelFilter(tab.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  levelFilter === tab.val
                    ? "bg-brand-800 text-white"
                    : "bg-canvas text-ink-600 hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or department..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-surface rounded-2xl border border-border p-5 shadow-xs hover:border-brand-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-brand-50 shrink-0 border-2 border-brand-200">
                  <Image
                    src={member.image || "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  {member.isHOD && (
                    <span
                      className="absolute bottom-0 right-0 p-1 rounded-full bg-accent-500 text-white shadow-xs"
                      title="Head of Department"
                    >
                      <Award className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-brand-50 text-brand-800 border border-brand-200">
                      {member.departmentLevel}
                    </span>
                    {member.isHOD && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-accent-100 text-accent-900">
                        HOD
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-sm text-ink-900 truncate">
                    {member.name}
                  </h4>

                  <p className="text-xs text-brand-800 font-semibold truncate">
                    {member.designation}
                  </p>

                  <p className="text-[11px] text-ink-500 truncate">
                    {member.department}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-ink-400 text-[11px] truncate max-w-[160px]">
                  {member.qualification || member.email}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="p-1.5 rounded-lg text-brand-800 hover:bg-brand-50 border border-brand-200"
                    title="Edit profile"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(member.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50"
                    title="Delete profile"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full p-12 text-center text-xs text-ink-500 bg-surface rounded-2xl border border-border">
              No faculty profiles match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface rounded-2xl p-6 max-w-sm w-full border border-border shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <h4 className="font-heading font-bold text-base text-ink-900">
                Delete Faculty Profile
              </h4>
            </div>
            <p className="text-xs text-ink-600">
              Are you sure you want to remove this faculty record from the website directory?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-ink-700 hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Faculty Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                {editingItem ? "Edit Faculty Profile" : "Add Faculty Member"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Full Name &amp; Title *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Dhanya G. or Prof. Shajahan C.M"
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Assistant Professor & NSS Officer"
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. Ph.D, M.Tech (VLSI), B.Tech"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Department Level *
                  </label>
                  <select
                    value={departmentLevel}
                    onChange={(e) => setDepartmentLevel(e.target.value as DepartmentLevel)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="btech">B.Tech Engineering</option>
                    <option value="mtech">M.Tech Post-Graduation</option>
                    <option value="polytechnic">Polytechnic Diploma</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {DEPARTMENTS_LIST.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Avatar picker */}
              <div className="space-y-2">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Profile Photo URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/... or https://..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                  {image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-brand-50 shrink-0">
                      <Image
                        src={image}
                        alt="Avatar Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Quick Avatar Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-ink-500 self-center">
                    Leadership Presets:
                  </span>
                  {LEADERSHIP_AVATARS.map((av) => (
                    <button
                      key={av.name}
                      type="button"
                      onClick={() => setImage(av.url)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${
                        image === av.url
                          ? "bg-brand-800 text-white border-brand-800"
                          : "bg-surface text-ink-700 border-border hover:bg-canvas"
                      }`}
                    >
                      {av.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@mgmcet.ac.in"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-ink-900">
                    <input
                      type="checkbox"
                      checked={isHOD}
                      onChange={(e) => setIsHOD(e.target.checked)}
                      className="rounded border-border text-brand-700 focus:ring-brand-600"
                    />
                    <span>Head of Department (HOD) Badge</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Specialization / Recognitions (optional)
                </label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. National NSS Award Winner, 15+ years research in Microelectronics"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {editingItem ? "Save Profile" : "Add Faculty Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
