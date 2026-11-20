/**
 * Firebase Services — Full CRUD operations and real-time listeners for MGMCET
 * Handles News, Announcements, Faculty, Enquiries, Photo Gallery, and Settings.
 * Seamlessly supports live Firestore when configured, with safe local fallback.
 */

import { getFirestore, getFirebaseStorage, isFirebaseConfigured } from "./firebase";
import { news as staticNews } from "@/content/news";
import { site } from "@/content/site";
import { faculty as staticFaculty } from "@/content/faculty";
import { gallery as staticGallery } from "@/content/gallery";
import { initialJobApplications } from "@/content/job-applications";
import { defaultIqacMembers, defaultMouPartners } from "@/content/academics";
import { defaultClubsAndAssociations } from "@/content/clubs";
import type { NewsItem } from "@/types/news";
import type { FacultyMember } from "@/types/faculty";
import type { AnnouncementItem } from "@/types/site";
import type { EnquirySubmission } from "@/types/forms";
import type { GalleryItem } from "@/types/gallery";
import type { JobApplication, ApplicationStatus } from "@/types/careers";
import type { IqacMember, MouPartner } from "@/types/academics";
import type { ClubAssociationItem } from "@/types/campus-life";

// Local storage fallback keys for offline / unconfigured demo mode
const LOCAL_STORAGE_KEYS = {
  news: "mgmcet_local_news",
  announcements: "mgmcet_local_announcements",
  faculty: "mgmcet_local_faculty",
  enquiries: "mgmcet_local_enquiries",
  gallery: "mgmcet_local_gallery",
  settings: "mgmcet_local_settings",
  jobApplications: "mgmcet_local_job_applications",
  iqac: "mgmcet_local_iqac_committee",
  mous: "mgmcet_local_mous",
  clubs: "mgmcet_local_clubs",
};

function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(
      new CustomEvent("mgmcet_local_update", { detail: { key } })
    );
  } catch (err) {
    console.error("Local storage error:", err);
  }
}

// ============================================================================
// 1. NEWS & EVENTS SERVICE
// ============================================================================

export async function fetchLiveNews(): Promise<NewsItem[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);

    const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      return getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);
    }

    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as NewsItem));
  } catch (err) {
    console.warn("Error fetching news from Firestore, using local fallback:", err);
    return getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);
  }
}

export function subscribeToLiveNews(callback: (items: NewsItem[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.news) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.news) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { collection, onSnapshot, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "news"), orderBy("date", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as NewsItem));
            callback(items);
          } else {
            notify();
          }
        },
        (error) => {
          console.warn("Firestore snapshot error for news:", error);
          notify();
        }
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveNewsItem(item: Omit<NewsItem, "id"> & { id?: string }): Promise<string> {
  const newsId = item.id || `news-${Date.now()}`;
  const fullItem: NewsItem = {
    ...item,
    id: newsId,
  };
  if (item.gallery && item.gallery.length > 0) {
    fullItem.gallery = item.gallery;
  } else if (item.image) {
    fullItem.gallery = [item.image];
  }

  // Always save locally with existing news fallback
  const currentLocal = getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);
  const filtered = currentLocal.filter((n) => n.id !== newsId);
  setLocalData(LOCAL_STORAGE_KEYS.news, [fullItem, ...filtered]);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "news", newsId), fullItem, { merge: true });
      }
    } catch (err) {
      console.error("Firestore save news error:", err);
    }
  }

  return newsId;
}

export async function deleteNewsItem(id: string): Promise<void> {
  const currentLocal = getLocalData<NewsItem[]>(LOCAL_STORAGE_KEYS.news, staticNews);
  setLocalData(
    LOCAL_STORAGE_KEYS.news,
    currentLocal.filter((n) => n.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "news", id));
      }
    } catch (err) {
      console.error("Firestore delete news error:", err);
    }
  }
}

// ============================================================================
// 2. ANNOUNCEMENTS SERVICE
// ============================================================================

export async function fetchLiveAnnouncements(): Promise<AnnouncementItem[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);

    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "announcements"));
    if (snap.empty) {
      return getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnnouncementItem));
  } catch (err) {
    console.warn("Error fetching announcements:", err);
    return getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);
  }
}

export function subscribeToLiveAnnouncements(callback: (items: AnnouncementItem[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.announcements) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.announcements) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        collection(db, "announcements"),
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnnouncementItem));
            callback(items);
          } else {
            notify();
          }
        },
        () => notify()
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveAnnouncementItem(item: Omit<AnnouncementItem, "id"> & { id?: string }): Promise<string> {
  const annId = item.id || `ann-${Date.now()}`;
  const fullItem: AnnouncementItem = { ...item, id: annId };

  const currentLocal = getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);
  const filtered = currentLocal.filter((a) => a.id !== annId);
  setLocalData(LOCAL_STORAGE_KEYS.announcements, [fullItem, ...filtered]);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "announcements", annId), fullItem, { merge: true });
      }
    } catch (err) {
      console.error("Firestore save announcement error:", err);
    }
  }

  return annId;
}

export async function deleteAnnouncementItem(id: string): Promise<void> {
  const currentLocal = getLocalData<AnnouncementItem[]>(LOCAL_STORAGE_KEYS.announcements, site.announcements);
  setLocalData(
    LOCAL_STORAGE_KEYS.announcements,
    currentLocal.filter((a) => a.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "announcements", id));
      }
    } catch (err) {
      console.error("Firestore delete announcement error:", err);
    }
  }
}

// ============================================================================
// 3. FACULTY SERVICE
// ============================================================================

export async function fetchLiveFaculty(): Promise<FacultyMember[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);

    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "faculty"));
    if (snap.empty) {
      return getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FacultyMember));
  } catch (err) {
    console.warn("Error fetching faculty:", err);
    return getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);
  }
}

export function subscribeToLiveFaculty(callback: (items: FacultyMember[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.faculty) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.faculty) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        collection(db, "faculty"),
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FacultyMember));
            callback(items);
          } else {
            notify();
          }
        },
        () => notify()
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveFacultyMember(member: Omit<FacultyMember, "id"> & { id?: string }): Promise<string> {
  const facId = member.id || `fac-${Date.now()}`;
  const fullItem: FacultyMember = { ...member, id: facId };

  const currentLocal = getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);
  const filtered = currentLocal.filter((f) => f.id !== facId);
  setLocalData(LOCAL_STORAGE_KEYS.faculty, [fullItem, ...filtered]);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "faculty", facId), fullItem, { merge: true });
      }
    } catch (err) {
      console.error("Firestore save faculty error:", err);
    }
  }

  return facId;
}

export async function deleteFacultyMember(id: string): Promise<void> {
  const currentLocal = getLocalData<FacultyMember[]>(LOCAL_STORAGE_KEYS.faculty, staticFaculty);
  setLocalData(
    LOCAL_STORAGE_KEYS.faculty,
    currentLocal.filter((f) => f.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "faculty", id));
      }
    } catch (err) {
      console.error("Firestore delete faculty error:", err);
    }
  }
}

// ============================================================================
// 4. ENQUIRIES & FORMS MANAGEMENT
// ============================================================================

export async function fetchLiveEnquiries(): Promise<EnquirySubmission[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());

    const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      return getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
    }

    return snap.docs.map((d) => {
      const raw = d.data();
      let createdStr = new Date().toISOString();
      if (raw.createdAt && typeof raw.createdAt.toDate === "function") {
        createdStr = raw.createdAt.toDate().toISOString();
      } else if (raw.createdAt) {
        createdStr = String(raw.createdAt);
      }

      return {
        id: d.id,
        fullName: raw.fullName || "",
        email: raw.email || "",
        phone: raw.phone || "",
        district: raw.district || "",
        message: raw.message || "",
        source: raw.source || "website",
        createdAt: createdStr,
        status: raw.status || "new",
        notes: raw.notes || "",
      };
    });
  } catch (err) {
    console.warn("Error fetching enquiries:", err);
    return getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  }
}

export function subscribeToLiveEnquiries(callback: (items: EnquirySubmission[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (!isFirebaseConfigured()) {
    callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()));
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.enquiries) {
        callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()));
      return;
    }

    try {
      const { collection, onSnapshot, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => {
              const raw = d.data();
              let createdStr = new Date().toISOString();
              if (raw.createdAt && typeof raw.createdAt.toDate === "function") {
                createdStr = raw.createdAt.toDate().toISOString();
              } else if (raw.createdAt) {
                createdStr = String(raw.createdAt);
              }
              return {
                id: d.id,
                fullName: raw.fullName || "",
                email: raw.email || "",
                phone: raw.phone || "",
                district: raw.district || "",
                message: raw.message || "",
                source: raw.source || "website",
                createdAt: createdStr,
                status: raw.status || "new",
                notes: raw.notes || "",
              };
            });
            callback(items);
          } else {
            callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()));
          }
        },
        () => callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()))
      );
    } catch {
      callback(getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries()));
    }
  });

  return () => unsubscribe();
}

export async function createEnquirySubmission(data: {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  message: string;
  source?: string;
}): Promise<string> {
  const enqId = `enq-${Date.now()}`;
  const newSubmission: EnquirySubmission = {
    id: enqId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    district: data.district,
    message: data.message,
    source: data.source || "home_page",
    createdAt: new Date().toISOString(),
    status: "new",
  };

  const currentLocal = getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  setLocalData(LOCAL_STORAGE_KEYS.enquiries, [newSubmission, ...currentLocal]);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        const docRef = await addDoc(collection(db, "enquiries"), {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          district: data.district,
          message: data.message,
          source: data.source || "home_page",
          createdAt: serverTimestamp(),
          status: "new",
        });
        return docRef.id;
      }
    } catch (err) {
      console.error("Firestore create enquiry error:", err);
    }
  }

  return enqId;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Pick<EnquirySubmission, "status" | "notes">>
): Promise<void> {
  const current = getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  setLocalData(LOCAL_STORAGE_KEYS.enquiries, updated);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, updateDoc } = await import("firebase/firestore");
        await updateDoc(doc(db, "enquiries", id), updates);
      }
    } catch (err) {
      console.error("Firestore update enquiry error:", err);
    }
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  const current = getLocalData<EnquirySubmission[]>(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  setLocalData(
    LOCAL_STORAGE_KEYS.enquiries,
    current.filter((item) => item.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "enquiries", id));
      }
    } catch (err) {
      console.error("Firestore delete enquiry error:", err);
    }
  }
}

// Sample fallback enquiries for initial dashboard preview
function getSampleEnquiries(): EnquirySubmission[] {
  return [
    {
      id: "enq-101",
      fullName: "Rahul Varma",
      email: "rahul.varma@example.com",
      phone: "+91 94471 23456",
      district: "Ernakulam",
      message: "Inquiring about management quota admission procedures for B.Tech Artificial Intelligence and Data Science for the upcoming academic year.",
      source: "home_page",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: "new",
      notes: "Follow up via telephone before 4 PM.",
    },
    {
      id: "enq-102",
      fullName: "Ananya Nair",
      email: "ananya.nair@example.com",
      phone: "+91 98460 98765",
      district: "Kottayam",
      message: "Please share details on college bus routes covering Muvattupuzha and Piravom, and current hostel room availability.",
      source: "admissions_page",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: "contacted",
      notes: "Transport in-charge sent route map PDF on WhatsApp.",
    },
    {
      id: "enq-103",
      fullName: "Joseph Mathew",
      email: "joseph.m@example.com",
      phone: "+91 97455 11223",
      district: "Idukki",
      message: "Seeking information regarding lateral entry eligibility criteria into Polytechnic Mechanical Engineering.",
      source: "contact_page",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      status: "resolved",
      notes: "Verified DTE guidelines and guided candidate on required documents.",
    },
  ];
}

// ============================================================================
// 5. CAMPUS PHOTO GALLERY SERVICE
// ============================================================================

export async function fetchLiveGallery(): Promise<GalleryItem[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);

    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "gallery"));
    if (snap.empty) {
      return getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
  } catch {
    return getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);
  }
}

export function subscribeToLiveGallery(callback: (items: GalleryItem[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.gallery) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.gallery) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { collection, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        collection(db, "gallery"),
        (snap) => {
          if (!snap.empty) {
            callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem)));
          } else {
            notify();
          }
        },
        () => notify()
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveGalleryItem(item: Omit<GalleryItem, "id"> & { id?: string }): Promise<string> {
  const gId = item.id || `gal-${Date.now()}`;
  const fullItem: GalleryItem = { ...item, id: gId };

  const current = getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);
  const filtered = current.filter((g) => g.id !== gId);
  setLocalData(LOCAL_STORAGE_KEYS.gallery, [fullItem, ...filtered]);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "gallery", gId), fullItem, { merge: true });
      }
    } catch (err) {
      console.error("Firestore save gallery item error:", err);
    }
  }

  return gId;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const current = getLocalData<GalleryItem[]>(LOCAL_STORAGE_KEYS.gallery, staticGallery);
  setLocalData(
    LOCAL_STORAGE_KEYS.gallery,
    current.filter((g) => g.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "gallery", id));
      }
    } catch (err) {
      console.error("Firestore delete gallery error:", err);
    }
  }
}

// ============================================================================
// 6. SITE SETTINGS SERVICE
// ============================================================================

export interface SiteSettingsData {
  admissionsOpen: boolean;
  admissionsNotice?: string;
  emergencyAlertActive: boolean;
  emergencyAlertText?: string;
  admissionsPhone?: string;
  admissionsEmail?: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  admissionsOpen: true,
  admissionsNotice: "Admissions Open 2026-27 for B.Tech, M.Tech & Polytechnic Programmes.",
  emergencyAlertActive: false,
  emergencyAlertText: "",
  admissionsPhone: "+91 94471 23456",
  admissionsEmail: "admissions@mgmcet.ac.in",
};

export async function fetchLiveSettings(): Promise<SiteSettingsData> {
  if (!isFirebaseConfigured()) {
    return getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS);

    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "general"));
    if (snap.exists()) {
      return snap.data() as SiteSettingsData;
    }
    return getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  } catch {
    return getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  }
}

export function subscribeToLiveSettings(callback: (settings: SiteSettingsData) => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (!isFirebaseConfigured()) {
    callback(getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS));
    return () => {};
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      callback(getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS));
      return;
    }

    try {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        doc(db, "settings", "general"),
        (snap) => {
          if (snap.exists()) {
            callback(snap.data() as SiteSettingsData);
          } else {
            callback(getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS));
          }
        },
        () => callback(getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS))
      );
    } catch {
      callback(getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS));
    }
  });

  return () => unsubscribe();
}

export async function saveSiteSettings(settings: Partial<SiteSettingsData>): Promise<void> {
  const current = getLocalData<SiteSettingsData>(LOCAL_STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  const updated = { ...current, ...settings };
  setLocalData(LOCAL_STORAGE_KEYS.settings, updated);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "settings", "general"), updated, { merge: true });
      }
    } catch (err) {
      console.error("Firestore save settings error:", err);
    }
  }
}

// ============================================================================
// 7. JOB APPLICATIONS & RECRUITMENT SERVICE
// ============================================================================

export async function uploadResumeFile(
  file: File,
  applicationId: string
): Promise<{ url: string; fileName: string; fileSize: number; fileType: string }> {
  if (typeof window === "undefined") {
    return {
      url: "",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || "application/octet-stream",
    };
  }

  // 1. Try Firebase Storage if available
  if (isFirebaseConfigured()) {
    try {
      const storage = await getFirebaseStorage();
      if (storage) {
        const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const storageRef = ref(storage, `resumes/${applicationId}/${Date.now()}_${safeName}`);
        const snap = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snap.ref);
        return {
          url,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type || "application/octet-stream",
        };
      }
    } catch (err) {
      console.warn("Firebase Storage upload error, falling back to data URL:", err);
    }
  }

  // 2. Safe Data URL fallback for instant client-side preview & storage
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || "application/octet-stream",
      });
    };
    reader.onerror = () => {
      resolve({
        url: "/documents/sample-resume-faculty.pdf",
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || "application/octet-stream",
      });
    };
    reader.readAsDataURL(file);
  });
}

export async function fetchLiveJobApplications(): Promise<JobApplication[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<JobApplication[]>(
      LOCAL_STORAGE_KEYS.jobApplications,
      initialJobApplications
    );
  }

  try {
    const db = await getFirestore();
    if (!db) {
      return getLocalData<JobApplication[]>(
        LOCAL_STORAGE_KEYS.jobApplications,
        initialJobApplications
      );
    }

    const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
    const q = query(collection(db, "job_applications"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      return getLocalData<JobApplication[]>(
        LOCAL_STORAGE_KEYS.jobApplications,
        initialJobApplications
      );
    }

    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobApplication));
  } catch (err) {
    console.warn("Error fetching job applications from Firestore:", err);
    return getLocalData<JobApplication[]>(
      LOCAL_STORAGE_KEYS.jobApplications,
      initialJobApplications
    );
  }
}

export function subscribeToLiveJobApplications(
  callback: (items: JobApplication[]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(
      getLocalData<JobApplication[]>(
        LOCAL_STORAGE_KEYS.jobApplications,
        initialJobApplications
      )
    );
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.jobApplications) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.jobApplications) notify();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribeFirestore: (() => void) | null = null;
  notify();

  (async () => {
    try {
      const db = await getFirestore();
      if (!db) return;

      const { collection, onSnapshot, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "job_applications"), orderBy("createdAt", "desc"));

      unsubscribeFirestore = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobApplication));
            callback(list);
            setLocalData(LOCAL_STORAGE_KEYS.jobApplications, list);
          } else {
            notify();
          }
        },
        (err) => {
          console.warn("Firestore job applications subscription error:", err);
          notify();
        }
      );
    } catch {
      notify();
    }
  })();

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}

export async function submitJobApplication(
  data: Omit<JobApplication, "id" | "applicationNumber" | "createdAt" | "status">,
  resumeFile?: File | null
): Promise<JobApplication> {
  const appId = `job-${Date.now()}`;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const applicationNumber = `MGM-JOB-${new Date().getFullYear()}-${randomSuffix}`;
  const nowIso = new Date().toISOString();

  let resumeMetadata: { url?: string; fileName?: string; fileSize?: number; fileType?: string } = {
    url: data.resumeUrl,
    fileName: data.resumeFileName,
    fileSize: data.resumeFileSize,
    fileType: data.resumeFileType,
  };

  if (resumeFile) {
    try {
      const uploadResult = await uploadResumeFile(resumeFile, appId);
      resumeMetadata = {
        url: uploadResult.url,
        fileName: uploadResult.fileName,
        fileSize: uploadResult.fileSize,
        fileType: uploadResult.fileType,
      };
    } catch (err) {
      console.warn("Resume upload failed, continuing with application:", err);
    }
  }

  const newApplication: JobApplication = {
    ...data,
    ...resumeMetadata,
    id: appId,
    applicationNumber,
    status: "new",
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  // Local storage save
  const current = getLocalData<JobApplication[]>(
    LOCAL_STORAGE_KEYS.jobApplications,
    initialJobApplications
  );
  setLocalData(LOCAL_STORAGE_KEYS.jobApplications, [newApplication, ...current]);

  // Firestore save
  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "job_applications", appId), newApplication);
      }
    } catch (err) {
      console.error("Firestore submit job application error:", err);
    }
  }

  return newApplication;
}

export async function updateJobApplicationStatus(
  id: string,
  status: ApplicationStatus,
  internalNotes?: string
): Promise<void> {
  const nowIso = new Date().toISOString();
  const current = getLocalData<JobApplication[]>(
    LOCAL_STORAGE_KEYS.jobApplications,
    initialJobApplications
  );

  const updated = current.map((app) => {
    if (app.id !== id) return app;
    return {
      ...app,
      status,
      internalNotes: internalNotes !== undefined ? internalNotes : app.internalNotes,
      updatedAt: nowIso,
    };
  });

  setLocalData(LOCAL_STORAGE_KEYS.jobApplications, updated);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, updateDoc } = await import("firebase/firestore");
        const payload: Record<string, unknown> = {
          status,
          updatedAt: nowIso,
        };
        if (internalNotes !== undefined) {
          payload.internalNotes = internalNotes;
        }
        await updateDoc(doc(db, "job_applications", id), payload);
      }
    } catch (err) {
      console.error("Firestore update job application error:", err);
    }
  }
}

export async function deleteJobApplication(id: string): Promise<void> {
  const current = getLocalData<JobApplication[]>(
    LOCAL_STORAGE_KEYS.jobApplications,
    initialJobApplications
  );
  setLocalData(
    LOCAL_STORAGE_KEYS.jobApplications,
    current.filter((app) => app.id !== id)
  );

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "job_applications", id));
      }
    } catch (err) {
      console.error("Firestore delete job application error:", err);
    }
  }
}

// ============================================================================
// 8. IQAC COMMITTEE SERVICE
// ============================================================================

export async function fetchLiveIqacCommittee(): Promise<IqacMember[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<IqacMember[]>(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<IqacMember[]>(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers);

    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "iqac_committee"));
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.members) && data.members.length > 0) {
        return data.members as IqacMember[];
      }
    }
    return getLocalData<IqacMember[]>(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers);
  } catch (err) {
    console.warn("Firestore fetch IQAC committee error:", err);
    return getLocalData<IqacMember[]>(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers);
  }
}

export function subscribeToLiveIqacCommittee(callback: (members: IqacMember[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<IqacMember[]>(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.iqac) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.iqac) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        doc(db, "settings", "iqac_committee"),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (Array.isArray(data.members) && data.members.length > 0) {
              callback(data.members as IqacMember[]);
              return;
            }
          }
          notify();
        },
        (err) => {
          console.warn("Firestore IQAC committee subscription warning:", err);
          notify();
        }
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveIqacCommittee(members: IqacMember[]): Promise<void> {
  setLocalData(LOCAL_STORAGE_KEYS.iqac, members);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(
          doc(db, "settings", "iqac_committee"),
          {
            members,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("Firestore save IQAC committee error:", err);
    }
  }
}

export async function resetIqacCommittee(): Promise<IqacMember[]> {
  await saveIqacCommittee(defaultIqacMembers);
  return defaultIqacMembers;
}

// ============================================================================
// 9. MOUS PARTNER SERVICE
// ============================================================================

export async function fetchLiveMous(): Promise<MouPartner[]> {
  if (!isFirebaseConfigured()) {
    return getLocalData<MouPartner[]>(LOCAL_STORAGE_KEYS.mous, defaultMouPartners);
  }

  try {
    const db = await getFirestore();
    if (!db) return getLocalData<MouPartner[]>(LOCAL_STORAGE_KEYS.mous, defaultMouPartners);

    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "mous"));
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.partners) && data.partners.length > 0) {
        return data.partners as MouPartner[];
      }
    }
    return getLocalData<MouPartner[]>(LOCAL_STORAGE_KEYS.mous, defaultMouPartners);
  } catch (err) {
    console.warn("Firestore fetch MoUs error:", err);
    return getLocalData<MouPartner[]>(LOCAL_STORAGE_KEYS.mous, defaultMouPartners);
  }
}

export function subscribeToLiveMous(callback: (items: MouPartner[]) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(getLocalData<MouPartner[]>(LOCAL_STORAGE_KEYS.mous, defaultMouPartners));
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.mous) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.mous) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        doc(db, "settings", "mous"),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (Array.isArray(data.partners) && data.partners.length > 0) {
              callback(data.partners as MouPartner[]);
              return;
            }
          }
          notify();
        },
        (err) => {
          console.warn("Firestore MoUs subscription warning:", err);
          notify();
        }
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveMous(items: MouPartner[]): Promise<void> {
  setLocalData(LOCAL_STORAGE_KEYS.mous, items);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(
          doc(db, "settings", "mous"),
          {
            partners: items,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("Firestore save MoUs error:", err);
    }
  }
}

export async function resetMous(): Promise<MouPartner[]> {
  await saveMous(defaultMouPartners);
  return defaultMouPartners;
}

// ============================================================================
// 9c. CLUBS & ASSOCIATIONS SERVICE
// ============================================================================

export async function fetchLiveClubs(): Promise<ClubAssociationItem[]> {
  if (typeof window === "undefined") return defaultClubsAndAssociations;

  if (!isFirebaseConfigured()) {
    return getLocalData<ClubAssociationItem[]>(
      LOCAL_STORAGE_KEYS.clubs,
      defaultClubsAndAssociations
    );
  }

  try {
    const db = await getFirestore();
    if (!db) {
      return getLocalData<ClubAssociationItem[]>(
        LOCAL_STORAGE_KEYS.clubs,
        defaultClubsAndAssociations
      );
    }

    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "clubs_associations"));
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.items) && data.items.length > 0) {
        return data.items as ClubAssociationItem[];
      }
    }
    return getLocalData<ClubAssociationItem[]>(
      LOCAL_STORAGE_KEYS.clubs,
      defaultClubsAndAssociations
    );
  } catch (err) {
    console.warn("Firestore fetch Clubs error:", err);
    return getLocalData<ClubAssociationItem[]>(
      LOCAL_STORAGE_KEYS.clubs,
      defaultClubsAndAssociations
    );
  }
}

export function subscribeToLiveClubs(
  callback: (items: ClubAssociationItem[]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => {
    callback(
      getLocalData<ClubAssociationItem[]>(
        LOCAL_STORAGE_KEYS.clubs,
        defaultClubsAndAssociations
      )
    );
  };

  if (!isFirebaseConfigured()) {
    notify();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.clubs) notify();
    };
    const handleLocal = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === LOCAL_STORAGE_KEYS.clubs) notify();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("mgmcet_local_update", handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("mgmcet_local_update", handleLocal);
    };
  }

  let unsubscribe = () => {};

  getFirestore().then(async (db) => {
    if (!db) {
      notify();
      return;
    }

    try {
      const { doc, onSnapshot } = await import("firebase/firestore");
      unsubscribe = onSnapshot(
        doc(db, "settings", "clubs_associations"),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (Array.isArray(data.items) && data.items.length > 0) {
              callback(data.items as ClubAssociationItem[]);
              return;
            }
          }
          notify();
        },
        (err) => {
          console.warn("Firestore Clubs subscription warning:", err);
          notify();
        }
      );
    } catch {
      notify();
    }
  });

  return () => unsubscribe();
}

export async function saveClubs(items: ClubAssociationItem[]): Promise<void> {
  setLocalData(LOCAL_STORAGE_KEYS.clubs, items);

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(
          doc(db, "settings", "clubs_associations"),
          {
            items,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("Firestore save Clubs error:", err);
    }
  }
}

export async function resetClubs(): Promise<ClubAssociationItem[]> {
  await saveClubs(defaultClubsAndAssociations);
  return defaultClubsAndAssociations;
}

// ============================================================================
// 10. 1-CLICK FIRESTORE INITIAL DATA SEEDER
// ============================================================================

export interface SeedResult {
  success: boolean;
  newsCount: number;
  announcementsCount: number;
  facultyCount: number;
  galleryCount: number;
  jobApplicationsCount?: number;
  iqacCount?: number;
  mousCount?: number;
  clubsCount?: number;
  message: string;
}

/**
 * Seeds static content (news, announcements, faculty, gallery, job applications) into Firestore collections.
 * Essential tool for college admin to easily populate database in 1 click!
 */
export async function seedInitialDataToFirestore(options: {
  newsItems: NewsItem[];
  announcements: AnnouncementItem[];
  facultyMembers: FacultyMember[];
  galleryItems: GalleryItem[];
  jobApplications?: JobApplication[];
}): Promise<SeedResult> {
  const applicationsToSeed = options.jobApplications || initialJobApplications;

  // Always populate local storage first
  setLocalData(LOCAL_STORAGE_KEYS.news, options.newsItems);
  setLocalData(LOCAL_STORAGE_KEYS.announcements, options.announcements);
  setLocalData(LOCAL_STORAGE_KEYS.faculty, options.facultyMembers);
  setLocalData(LOCAL_STORAGE_KEYS.gallery, options.galleryItems);
  setLocalData(LOCAL_STORAGE_KEYS.enquiries, getSampleEnquiries());
  setLocalData(LOCAL_STORAGE_KEYS.jobApplications, applicationsToSeed);
  setLocalData(LOCAL_STORAGE_KEYS.iqac, defaultIqacMembers);
  setLocalData(LOCAL_STORAGE_KEYS.mous, defaultMouPartners);

  let message = "Seeded successfully to Local State (Live offline mode).";

  if (isFirebaseConfigured()) {
    try {
      const db = await getFirestore();
      if (db) {
        const { doc, writeBatch } = await import("firebase/firestore");
        const batch = writeBatch(db);

        // Seed news (first 10 to fit in single batch)
        options.newsItems.slice(0, 10).forEach((item) => {
          const ref = doc(db, "news", item.id);
          batch.set(ref, {
            ...item,
            gallery: item.gallery && item.gallery.length > 0 ? item.gallery : [item.image],
          }, { merge: true });
        });

        // Seed announcements
        options.announcements.forEach((ann) => {
          const ref = doc(db, "announcements", ann.id);
          batch.set(ref, ann, { merge: true });
        });

        // Seed faculty
        options.facultyMembers.forEach((fac) => {
          const ref = doc(db, "faculty", fac.id);
          batch.set(ref, fac, { merge: true });
        });

        // Seed gallery
        options.galleryItems.forEach((gal) => {
          const ref = doc(db, "gallery", gal.id);
          batch.set(ref, gal, { merge: true });
        });

        // Seed job applications
        applicationsToSeed.forEach((job) => {
          const ref = doc(db, "job_applications", job.id);
          batch.set(ref, job, { merge: true });
        });

        // Seed IQAC committee members
        const iqacRef = doc(db, "settings", "iqac_committee");
        batch.set(
          iqacRef,
          {
            members: defaultIqacMembers,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        // Seed MoUs partners
        const mousRef = doc(db, "settings", "mous");
        batch.set(
          mousRef,
          {
            partners: defaultMouPartners,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        // Seed Clubs & Associations
        const clubsRef = doc(db, "settings", "clubs_associations");
        batch.set(
          clubsRef,
          {
            items: defaultClubsAndAssociations,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        await batch.commit();
        message = "Successfully synced all content and job applications to live Firebase Firestore!";
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error("Firestore batch seed error:", err);
      message = `Saved locally, but Firestore write had an issue: ${errMessage}`;
    }
  }

  // Also prime local storage for clubs
  setLocalData(LOCAL_STORAGE_KEYS.clubs, defaultClubsAndAssociations);

  return {
    success: true,
    newsCount: options.newsItems.length,
    announcementsCount: options.announcements.length,
    facultyCount: options.facultyMembers.length,
    galleryCount: options.galleryItems.length,
    jobApplicationsCount: applicationsToSeed.length,
    iqacCount: defaultIqacMembers.length,
    mousCount: defaultMouPartners.length,
    clubsCount: defaultClubsAndAssociations.length,
    message,
  };
}
