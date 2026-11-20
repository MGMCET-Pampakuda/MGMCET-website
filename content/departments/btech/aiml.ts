import type { DepartmentDetail } from "@/types";

export const aimlBtech: DepartmentDetail = {
  id: "btech-aiml",
  slug: "aiml",
  level: "btech",
  name: "Artificial Intelligence & Machine Learning",
  shortName: "AI & ML",
  intake: 60,
  duration: "4 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-aiml.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-aiml.webp",
  href: "/departments/btech/aiml",
  tagline: "Building Intelligent Systems for Tomorrow",
  overview:
    "Artificial Intelligence and Machine Learning comprise the science that studies and develops methods of making computers more intelligent and capable of learning from data without explicit programming. The focus of this course is on AI fundamentals, alongside Machine Learning techniques for data analysis, pattern recognition, predictive modeling, and designing intelligent systems. The primary objective is to introduce the basic principles, algorithms, and applications of both AI and ML, preparing students to create innovative, data-driven solutions in a rapidly evolving field.",
  vision:
    "To emerge as a Center of Excellence in Engineering, Technology and Management by imparting quality education, focussing on empowerment and innovation.",
  mission:
    "Impart quality professional education for total upliftment of the society; create a congenial academic ambience that kindles innovative thinking and research; and mould competent professionals who are socially committed and responsible citizens.",
  programOutcomes: [
    { code: "PO1", description: "Engineering Knowledge: Apply knowledge of mathematics, science, engineering fundamentals, and engineering specialization." },
    { code: "PO2", description: "Problem Analysis: Identify, formulate, review research literature, and analyze complex engineering problems." },
    { code: "PO3", description: "Design/Development of Solutions: Design solutions for complex engineering problems and system components." },
    { code: "PO4", description: "Conduct Investigations of Complex Problems: Use research-based knowledge and methods including design of experiments and data interpretation." },
    { code: "PO5", description: "Modern Tool Usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools." },
    { code: "PO6", description: "The Engineer and Society: Apply reasoning informed by contextual knowledge to assess societal, health, safety, and legal issues." },
    { code: "PO7", description: "Environment and Sustainability: Understand the impact of professional engineering solutions in societal and environmental contexts." },
    { code: "PO8", description: "Ethics: Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice." },
    { code: "PO9", description: "Individual and Team Work: Function effectively as an individual, and as a member or leader in diverse teams and multidisciplinary settings." },
    { code: "PO10", description: "Communication: Communicate effectively on complex engineering activities with the engineering community and society." },
    { code: "PO11", description: "Project Management and Finance: Demonstrate knowledge and understanding of engineering and management principles." },
    { code: "PO12", description: "Life-long Learning: Recognize the need for, and have the preparation and ability to engage in independent and lifelong learning." },
  ],
  labs: [
    {
      name: "AI & Machine Learning Computing Lab",
      description:
        "Equipped with modern high-performance desktop systems featuring Intel Core i5 processors, 8 GB RAM, high-speed SSD storage, and LED displays. Connected to high-speed Gigabit LAN with continuous campus internet access and centralized UPS power backup. The lab supports dual-boot environments with Ubuntu Linux and Windows, pre-installed with Python, TensorFlow, PyTorch, Scikit-learn, and essential data science frameworks.",
    },
    {
      name: "Programming & Data Structures Lab",
      description:
        "Modern computer laboratory powered by Intel Core i5 workstations with 8 GB RAM and high-speed network connectivity. Provides complete software suites including GCC/G++, Python, Java Development Kit, modern IDEs, and debugging tools running on both Linux and Windows operating systems.",
    },
    {
      name: "Data Analytics & Algorithm Development Lab",
      description:
        "Dedicated computational facility equipped with Intel Core i5 systems and 8 GB RAM connected over Gigabit Ethernet. Configured with database engines, scientific computing libraries, data visualization tools, and statistical analysis packages for hands-on algorithm design and experimental data processing.",
    },
    {
      name: "Advanced Computing & Project Lab",
      description:
        "Specialized lab environment featuring Intel Core i5 processors, 8 GB RAM, and dual-boot systems designed for student project development, deep learning experimentation, intelligent agent modelling, and capstone engineering solutions.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University Curriculum & Syllabi", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Active student participation in national hackathons and robotics challenges.",
    "Specialized technical workshops conducted on Machine Learning and Deep Learning.",
  ],
  placements: {
    description: "Career avenues span AI Solutions Architect, Machine Learning Engineer, MLOps Engineer, Computer Vision Engineer, NLP Scientist, AI Research Scientist, Data Scientist, and Robotics Engineer.",
    topRecruiters: ["TCS", "Infosys", "Wipro Technologies", "Cognizant (CTS)", "Mphasis", "UST Global", "IBS Software", "Poornam Infovision", "VVDN Technologies", "Comstream Technologies"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
