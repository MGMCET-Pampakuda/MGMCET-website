import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "MGM College of Engineering and Technology",
  shortName: "MGMCET",
  group: "MGM Group of Institutions",
  taglines: [
    "Excellence Since 1994",
    "Spark Your Future at MGM College of Engineering and Technology",
  ],
  affiliationText: "AICTE Approved • Affiliated to APJ Abdul Kalam Technological University (KTU)",
  collegeCode: "MGE",
  foundedYear: 1994,
  contact: {
    address: "Pampakuda",
    district: "Ernakulam (Dist.)",
    state: "Kerala",
    pincode: "686667",
    phones: ["9946485111", "7902995111"],
    email: "principal@mgmcet.ac.in", // TODO(content): verify email address
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.580213190807!2d76.55018697576579!3d9.907998974288006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07dfb91811a2f1%3A0xe54b9d038a8e104!2sMGM%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
  },
  social: {
    facebook: "https://www.facebook.com/mgmcetkerala", // TODO(content): verify URL
    instagram: "https://www.instagram.com/mgmcetkerala", // TODO(content): verify URL
    youtube: "https://www.youtube.com/@mgmcet", // TODO(content): verify URL
    linkedin: "https://www.linkedin.com/school/mgmcet", // TODO(content): verify URL
  },
  // TODO(content): replace with the real Google Form "Apply Now" URL from the original site
  applyNowUrl: "https://forms.google.com/mgmcet-admission",
  // TODO(content): replace with actual prospectus PDF URL or path
  prospectusUrl: "/documents/prospectus.pdf",
  // TODO(content): replace with real scholarship URL
  scholarshipUrl: "https://vidyamrutham.mgmcet.ac.in",
  // TODO(content): replace with real YouTube embed URL for campus tour
  tourVideoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  announcements: [
    {
      id: "admission-2026",
      text: "Admissions Open for 2026 – Apply Now!",
      linkText: "Apply Now",
      linkHref:
        "https://forms.google.com/mgmcet-admission", // TODO(content): replace with real form URL
      isExternal: true,
      active: true,
    },
    {
      id: "vidyamrutham-scholarship",
      text: "Mammooty's Vidyamrutham Scholarship is live now!",
      linkText: "Click Here to Apply",
      linkHref:
        "https://vidyamrutham.mgmcet.ac.in", // TODO(content): replace with real scholarship URL
      isExternal: true,
      active: true,
    },
  ],
  credits: "© {year} MGM College of Engineering and Technology. All rights reserved.",
};
