const STORAGE_KEY = 'freelanser_data_v2_en';

// Engineering categories definition with Lucide icon names and English labels
export const ENGINEERING_CATEGORIES = [
  { id: 'civil', name: 'Civil & Structural Engineering', nameEn: 'Civil & Structural', icon: 'Building2', count: 128 },
  { id: 'architecture', name: 'Architecture & Urban Planning', nameEn: 'Architecture & Planning', icon: 'Compass', count: 96 },
  { id: 'mechanical', name: 'Mechanical & HVAC Engineering', nameEn: 'Mechanical & MEP', icon: 'Wrench', count: 82 },
  { id: 'electrical', name: 'Electrical & Power Systems', nameEn: 'Electrical & Power', icon: 'Zap', count: 88 },
  { id: 'interior', name: 'Interior & Spatial Design', nameEn: 'Interior Design', icon: 'Home', count: 74 },
  { id: 'structural', name: 'Geotechnical & Site Integrity', nameEn: 'Geotechnical & Structural', icon: 'ShieldCheck', count: 46 },
  { id: 'software', name: 'Software & Embedded IoT', nameEn: 'Software & IoT', icon: 'Code2', count: 114 },
  { id: 'environmental', name: 'Renewable Energy & Sustainability', nameEn: 'Renewable Energy', icon: 'Leaf', count: 39 },
];

export const SPECIALTY_LABELS = {
  civil: 'Civil & Structural Consultant',
  architecture: 'Architectural & Facade Designer',
  mechanical: 'Mechanical & MEP Consultant',
  electrical: 'Electrical & Power Engineer',
  interior: 'Interior & Architectural Designer',
  structural: 'Structural Integrity & Soil Engineer',
  software: 'Software & Industrial IoT Engineer',
  environmental: 'Renewable & Environmental Consultant',
  frontend: 'Front-End Engineer',
  backend: 'Back-End Engineer',
  fullstack: 'Full-Stack Engineer',
  mobile: 'Mobile App Engineer',
  devops: 'DevOps & Cloud Architect',
  ai: 'AI & Machine Learning Engineer',
  data: 'Data Scientist & Analytics',
  other: 'Specialized Engineering Consultant',
};

// Rich English Seed Data
const initialEngineers = [
  {
    id: 'eng-1',
    fullName: 'Eng. Ahmed Kamal, PE',
    email: 'ahmed.kamal@example.com',
    phone: '+20 101 234 5678',
    password: 'password123',
    specialty: 'civil',
    hourlyRate: 75,
    experience: 9,
    bio: 'Licensed Senior Structural Consultant with over 9 years of expertise in high-rise residential towers, industrial warehouses, and seismic analysis. Proficient in ETABS, SAP2000, SAFE, and Revit Structure with proven track record of reducing structural steel costs by up to 14%.',
    skills: ['ETABS', 'SAP2000', 'Revit Structure', 'Quantity Surveying', 'Reinforced Concrete', 'Seismic Design', 'AutoCAD'],
    linkedin: 'https://linkedin.com/in/ahmed-kamal',
    github: 'https://github.com/ahmed-kamal',
    status: 'approved',
    rating: 4.9,
    reviewCount: 34,
    availability: 'available',
    location: 'Cairo, Egypt',
    title: 'Senior Structural & Civil Engineering Consultant',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 38,
    profileViews: 1840,
    certifications: ['Certified Structural Engineer', 'Autodesk Certified Professional - Revit Structure', 'Seismic Design Specialist Certificate'],
    projects: [
      {
        title: 'Al-Andalus Residential Tower (18 Floors)',
        description: 'Complete structural calculation notes, lateral wind & seismic verification, full construction drawings in DWG/BIM formats.',
        category: 'civil',
        skills: ['ETABS', 'SAFE', 'Revit Structure'],
        link: 'https://example.com/project-1',
        year: '2025'
      },
      {
        title: 'Industrial Logistics Park (40,000 sqm)',
        description: 'Design of long-span steel truss hangars and deep foundation optimization, cutting overall material costs by 12%.',
        category: 'civil',
        skills: ['SAP2000', 'Tekla Structures', 'AutoCAD'],
        link: 'https://example.com/project-2',
        year: '2024'
      }
    ],
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'eng-2',
    fullName: 'Eng. Sarah El-Shennawy',
    email: 'sara.shennawy@example.com',
    phone: '+20 112 345 6789',
    password: 'password123',
    specialty: 'architecture',
    hourlyRate: 85,
    experience: 7,
    bio: 'Senior Architectural Designer specializing in contemporary luxury villas, urban landscape, and bioclimatic facade engineering. Expert in Revit Architecture, Lumion, and 3ds Max with ultra-photorealistic 4K visualizations and certified municipal permit documentation.',
    skills: ['Revit Architecture', 'Lumion', '3ds Max', 'Facade Engineering', 'Sustainable Design', 'Executive Drawings', 'Photoshop'],
    linkedin: 'https://linkedin.com/in/sara-shennawy',
    github: 'https://github.com/sara-arch',
    status: 'approved',
    rating: 5.0,
    reviewCount: 42,
    availability: 'available',
    location: 'Alexandria, Egypt',
    title: 'Senior Architectural Designer & Luxury Villa Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 45,
    profileViews: 2210,
    certifications: ['LEED Green Associate', 'Autodesk Certified Professional', 'RIBA International Affiliate'],
    projects: [
      {
        title: 'Modern Neoclassical Villa - New Cairo',
        description: 'Comprehensive architectural concept, landscape master plan, and building permit blueprints with 4K day/night renders.',
        category: 'architecture',
        skills: ['Revit', 'Lumion', 'Photoshop'],
        link: 'https://example.com/project-villa',
        year: '2025'
      },
      {
        title: 'Tech Campus Headquarters - Smart Village',
        description: 'Energy-efficient smart glass envelope with modular open-plan layout and green terraces.',
        category: 'architecture',
        skills: ['Revit Architecture', '3ds Max', 'BIM'],
        link: 'https://example.com/project-hq',
        year: '2024'
      }
    ],
    createdAt: '2025-01-15T09:30:00Z',
  },
  {
    id: 'eng-3',
    fullName: 'Eng. Youssef Manshawy, MEP',
    email: 'youssef.manshawy@example.com',
    phone: '+20 123 456 7890',
    password: 'password123',
    specialty: 'mechanical',
    hourlyRate: 70,
    experience: 8,
    bio: 'Chartered Mechanical & MEP Consultant with extensive background in centralized HVAC systems, NFPA-compliant fire suppression, and building water infrastructure for healthcare facilities and commercial centers using HAP, Elite, and Revit MEP.',
    skills: ['HVAC', 'Fire Fighting', 'HAP', 'Revit MEP', 'Plumbing & Drainage', 'NFPA Codes', 'Thermal Load Calculation'],
    linkedin: 'https://linkedin.com/in/youssef-mep',
    github: 'https://github.com/youssef-mep',
    status: 'approved',
    rating: 4.8,
    reviewCount: 26,
    availability: 'busy',
    location: 'Giza, Egypt',
    title: 'Senior MEP & Fire Suppression Systems Consultant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 31,
    profileViews: 1150,
    certifications: ['ASHRAE Certified Member', 'NFPA Fire Protection Specialist', 'Revit MEP Certified'],
    projects: [
      {
        title: '150-Bed Specialized Medical Center HVAC',
        description: 'Complete thermal modeling for operating suites, negative pressure isolation rooms, and air duct sizing according to ASHRAE 170.',
        category: 'mechanical',
        skills: ['HAP', 'Revit MEP', 'ASHRAE Standards'],
        link: 'https://example.com/project-hospital',
        year: '2025'
      }
    ],
    createdAt: '2025-02-01T11:00:00Z',
  },
  {
    id: 'eng-4',
    fullName: 'Eng. Mariam Hossam',
    email: 'mariam.hossam@example.com',
    phone: '+20 151 234 5678',
    password: 'password123',
    specialty: 'interior',
    hourlyRate: 80,
    experience: 6,
    bio: 'Award-winning Interior Architect and Spatial Designer. Specializing in luxury hospitality, upscale duplexes, and commercial boutique workspaces. Delivers photorealistic 3D renders, detailed material schedules, ceiling & lighting executive layouts.',
    skills: ['3ds Max', 'Corona Renderer', 'V-Ray', 'Spatial Planning', 'Lighting Design', 'Material Schedules', 'AutoCAD'],
    linkedin: 'https://linkedin.com/in/mariam-interior',
    github: 'https://github.com/mariam-design',
    status: 'approved',
    rating: 4.9,
    reviewCount: 31,
    availability: 'available',
    location: 'New Cairo, Egypt',
    title: 'Principal Interior Architect & Spatial Planner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 36,
    profileViews: 1620,
    certifications: ['Interior Design Guild Accredited', 'Master of Architectural Visualization'],
    projects: [
      {
        title: 'Boutique Coffee Roastery & Lounge',
        description: 'Industrial warm interior concept, bespoke acoustic paneling, full joinery details, and mood lighting design.',
        category: 'interior',
        skills: ['3ds Max', 'Corona', 'Moodboards'],
        link: 'https://example.com/cafe-design',
        year: '2025'
      }
    ],
    createdAt: '2025-02-10T14:20:00Z',
  },
  {
    id: 'eng-5',
    fullName: 'Eng. Omar El-Sherif',
    email: 'omar.sherif@example.com',
    phone: '+20 109 876 5432',
    password: 'password123',
    specialty: 'electrical',
    hourlyRate: 75,
    experience: 10,
    bio: 'Principal Power Systems & Solar PV Consultant. Experienced in medium/low voltage distribution networks, main distribution boards (MDB/SMDB), DIALux evo illumination studies, and grid-connected solar power installations.',
    skills: ['DIALux evo', 'PVSyst', 'AutoCAD Electrical', 'Low Voltage Systems', 'Solar PV Design', 'BMS Integration'],
    linkedin: 'https://linkedin.com/in/omar-electrical',
    github: 'https://github.com/omar-electrical',
    status: 'approved',
    rating: 4.9,
    reviewCount: 29,
    availability: 'available',
    location: 'Tanta, Egypt',
    title: 'Principal Electrical Engineer & Solar PV Consultant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 42,
    profileViews: 1380,
    certifications: ['Certified Energy Manager (CEM)', 'Schneider Electric EcoXpert', 'NREA Solar PV Certified'],
    projects: [
      {
        title: '300kW Rooftop Solar Installation - Food Processing Plant',
        description: 'PV system modeling, inverter sizing, grid interconnection study reducing facility grid reliance by 62%.',
        category: 'electrical',
        skills: ['PVSyst', 'AutoCAD Electrical', 'Payback Analysis'],
        link: 'https://example.com/solar-plant',
        year: '2024'
      }
    ],
    createdAt: '2025-02-14T10:00:00Z',
  },
  {
    id: 'eng-6',
    fullName: 'Eng. Khaled Salem',
    email: 'khaled.salem@example.com',
    phone: '+20 106 543 2198',
    password: 'password123',
    specialty: 'software',
    hourlyRate: 90,
    experience: 8,
    bio: 'Lead Software & Industrial IoT Systems Engineer. Building enterprise cloud platforms, digital twin telemetry, building management systems (BMS), and edge computing solutions using React, Node.js, Python, and MQTT protocols.',
    skills: ['React', 'Node.js', 'Python', 'AWS Cloud', 'Docker', 'Industrial IoT', 'MQTT', 'PostgreSQL'],
    linkedin: 'https://linkedin.com/in/khaled-salem',
    github: 'https://github.com/khaled-salem',
    status: 'approved',
    rating: 5.0,
    reviewCount: 38,
    availability: 'available',
    location: 'Maadi, Cairo',
    title: 'Senior Software & Industrial IoT Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 51,
    profileViews: 2450,
    certifications: ['AWS Certified Solutions Architect', 'Professional Scrum Master PSM II'],
    projects: [
      {
        title: 'Smart Energy & Equipment Telemetry Dashboard',
        description: 'Real-time telemetry and predictive failure maintenance dashboard connecting 500+ factory sensors.',
        category: 'software',
        skills: ['React', 'Node.js', 'MQTT', 'Python'],
        link: 'https://example.com/iot-platform',
        year: '2025'
      }
    ],
    createdAt: '2025-02-20T08:30:00Z',
  },
  {
    id: 'eng-pending-1',
    fullName: 'Eng. Mostafa Nour',
    email: 'mostafa.nour@example.com',
    phone: '+20 103 344 5566',
    password: 'password123',
    specialty: 'civil',
    hourlyRate: 60,
    experience: 4,
    bio: 'Site & Technical Office Engineer experienced in quantity surveying, contractor invoicing, submittals, and shop drawing production.',
    skills: ['AutoCAD', 'Advanced Excel', 'Shop Drawings', 'Quantity Surveying'],
    linkedin: 'https://linkedin.com/in/mostafa-nour',
    github: 'https://github.com/mostafa-nour',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    availability: 'available',
    location: 'Mansoura, Egypt',
    title: 'Technical Office & Quantity Surveying Engineer',
    completedProjectsCount: 0,
    profileViews: 65,
    certifications: ['Registered Professional Engineer'],
    projects: [],
    cvName: 'Mostafa_Nour_CV_Civil.pdf',
    createdAt: '2026-03-01T12:00:00Z',
  }
];

const initialClients = [
  {
    id: 'client-1',
    fullName: 'Tarek El-Baz',
    email: 'tarek.baz@elrawda.com',
    phone: '+20 101 112 2233',
    password: 'password123',
    company: 'El-Rawda Real Estate Development & Investment',
    city: 'Cairo, Egypt',
    createdAt: '2025-01-05T10:00:00Z',
  },
  {
    id: 'client-2',
    fullName: 'Dr. Mona Abdel-Salam',
    email: 'mona.salam@gmail.com',
    phone: '+20 114 445 5566',
    password: 'password123',
    company: 'Elite Specialized Medical Centers',
    city: 'Alexandria, Egypt',
    createdAt: '2025-01-20T14:30:00Z',
  }
];

const initialProjects = [
  {
    id: 'proj-1',
    title: 'Full Structural & Seismic Design for Luxury Residential Villa in Sheikh Zayed',
    description: 'Looking for a licensed senior structural engineer to prepare the complete structural design and calculation notes for a 600 sqm land plot (320 sqm built-up footprint, 2 stories + roof). Deliverables must include foundation layout, column schedules, slab reinforcement, water tank details, in both DWG and PDF formats, along with certified concrete and rebar quantity takeoff.',
    category: 'civil',
    requiredSkills: ['Structural Design', 'ETABS', 'AutoCAD', 'Quantity Surveying', 'Building Codes'],
    budget: 3500,
    duration: '10 days',
    deadline: '2026-04-15',
    clientId: 'client-1',
    clientName: 'Tarek El-Baz (El-Rawda Dev)',
    clientCity: 'Cairo, Egypt',
    status: 'open',
    proposalsCount: 3,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Interior Architectural Design for Creative Digital Agency Headquarters (250 sqm)',
    description: 'We are seeking an experienced interior architect to design our new tech marketing office in a modern industrial aesthetic. Scope includes executive boardroom, 4 private cabins, open co-working space for 24 staff, breakout cafeteria, acoustic ceiling plans, and comprehensive FF&E material specifications.',
    category: 'interior',
    requiredSkills: ['Interior Design', '3ds Max', 'Executive Layouts', 'Material Schedules', 'Lighting Design'],
    budget: 4800,
    duration: '14 days',
    deadline: '2026-04-20',
    clientId: 'client-2',
    clientName: 'Dr. Mona Abdel-Salam (Elite Group)',
    clientCity: 'Alexandria, Egypt',
    status: 'open',
    proposalsCount: 4,
    createdAt: '2026-03-02T15:30:00Z',
  },
  {
    id: 'proj-3',
    title: 'HVAC Centralized VRF & NFPA Fire Fighting Engineering for Healthcare Facility',
    description: 'Complete mechanical design for a 3-story specialized clinical hub. Deliverables encompass VRF cooling load calculation, duct layout, fire sprinkler networks, wet riser cabinets, and fire pump room sizing complying strictly with civil defense & NFPA standards.',
    category: 'mechanical',
    requiredSkills: ['HVAC', 'Fire Fighting', 'HAP', 'NFPA Codes', 'Revit MEP'],
    budget: 6500,
    duration: '21 days',
    deadline: '2026-04-28',
    clientId: 'client-2',
    clientName: 'Dr. Mona Abdel-Salam (Elite Group)',
    clientCity: 'Alexandria, Egypt',
    status: 'open',
    proposalsCount: 2,
    createdAt: '2026-03-03T09:00:00Z',
  },
  {
    id: 'proj-4',
    title: '120kW Grid-Tied Solar Photovoltaic Plant Engineering & Interconnection',
    description: 'Design and feasibility assessment for a rooftop solar PV facility on an industrial manufacturing plant. Scope includes solar radiation modeling, module string arrangement, inverter selection, and utility interconnection single-line diagram.',
    category: 'electrical',
    requiredSkills: ['Solar PV', 'PVSyst', 'AutoCAD Electrical', 'Grid Interconnection'],
    budget: 3200,
    duration: '12 days',
    deadline: '2026-04-10',
    clientId: 'client-1',
    clientName: 'Tarek El-Baz (El-Rawda Dev)',
    clientCity: 'Cairo, Egypt',
    status: 'in_progress',
    proposalsCount: 3,
    createdAt: '2026-02-20T11:00:00Z',
  }
];

const initialProposals = [
  {
    id: 'prop-1',
    projectId: 'proj-1',
    engineerId: 'eng-1',
    engineerName: 'Eng. Ahmed Kamal, PE',
    engineerSpecialty: 'civil',
    engineerRating: 4.9,
    engineerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    proposedBudget: 3200,
    deliveryDays: 8,
    coverLetter: 'Greetings Mr. Tarek. I have thoroughly analyzed your villa design brief. I have engineered over 40 luxury villas in Sheikh Zayed and New Cairo. I will provide stamped calculation notes, full DWG sheets, and an optimized rebar schedule that significantly cuts concrete and steel costs.',
    status: 'pending',
    createdAt: '2026-03-01T14:00:00Z',
  },
  {
    id: 'prop-2',
    projectId: 'proj-2',
    engineerId: 'eng-4',
    engineerName: 'Eng. Mariam Hossam',
    engineerSpecialty: 'interior',
    engineerRating: 4.9,
    engineerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    proposedBudget: 4500,
    deliveryDays: 12,
    coverLetter: 'Dear Dr. Mona, I would be delighted to design your agency headquarters. My studio specializes in modern biophilic workspaces that elevate productivity. I will deliver photorealistic 4K renders, contractor-ready lighting and ceiling plans, and full furniture sourcing schedules.',
    status: 'pending',
    createdAt: '2026-03-02T18:00:00Z',
  }
];

const initialReviews = [
  {
    id: 'rev-1',
    engineerId: 'eng-1',
    clientId: 'client-1',
    clientName: 'Tarek El-Baz',
    rating: 5,
    comment: 'Exceptional structural engineer. Precision engineering, strictly on schedule, and calculation notes were approved without a single objection from the municipal board.',
    createdAt: '2025-12-10T12:00:00Z',
  },
  {
    id: 'rev-2',
    engineerId: 'eng-2',
    clientId: 'client-1',
    clientName: 'Tarek El-Baz',
    rating: 5,
    comment: 'Eng. Sarah created breathtaking contemporary facade designs for our project. The 4K visualizations mesmerized our investors.',
    createdAt: '2026-01-15T15:20:00Z',
  },
  {
    id: 'rev-3',
    engineerId: 'eng-3',
    clientId: 'client-2',
    clientName: 'Dr. Mona Abdel-Salam',
    rating: 5,
    comment: 'The HVAC and thermal modeling was extremely rigorous, saving us considerable capital expenditure on chiller equipment.',
    createdAt: '2026-02-05T09:10:00Z',
  }
];

const initialConversations = [
  {
    id: 'conv-1',
    clientId: 'client-1',
    clientName: 'Tarek El-Baz',
    engineerId: 'eng-1',
    engineerName: 'Eng. Ahmed Kamal, PE',
    lastMessage: 'Understood Eng. Tarek. Soil investigation report reviewed; proceeding with shallow foundation sizing.',
    lastMessageTime: '2026-03-02T16:45:00Z',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'client-1', text: 'Hello Eng. Ahmed, I just emailed you the geotechnical soil borehole report.', timestamp: '2026-03-02T16:30:00Z' },
      { id: 'm2', senderId: 'eng-1', text: 'Hello Eng. Tarek, received and currently running the bearing capacity checks.', timestamp: '2026-03-02T16:35:00Z' },
      { id: 'm3', senderId: 'eng-1', text: 'Understood Eng. Tarek. Soil investigation report reviewed; proceeding with shallow foundation sizing.', timestamp: '2026-03-02T16:45:00Z' }
    ]
  }
];

const initialNotifications = [
  {
    id: 'notif-1',
    userId: 'client-1',
    title: 'New Proposal Received',
    message: 'Eng. Ahmed Kamal submitted a proposal for "Full Structural & Seismic Design for Luxury Residential Villa".',
    type: 'proposal',
    read: false,
    createdAt: '2026-03-01T14:05:00Z',
  },
  {
    id: 'notif-2',
    userId: 'eng-1',
    title: 'Credentials Verified',
    message: 'Congratulations! MahandesPro administrators have verified and accredited your consultant profile.',
    type: 'verification',
    read: true,
    createdAt: '2025-01-10T09:00:00Z',
  }
];

const defaultData = {
  engineers: initialEngineers,
  clients: initialClients,
  projects: initialProjects,
  proposals: initialProposals,
  reviews: initialReviews,
  conversations: initialConversations,
  notifications: initialNotifications,
  favoriteEngineers: ['eng-1', 'eng-2'],
  favoriteProjects: ['proj-1'],
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Platform Administrator',
  },
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return { ...defaultData };
    }
    const parsed = JSON.parse(raw);
    return {
      engineers: parsed.engineers?.length ? parsed.engineers : defaultData.engineers,
      clients: parsed.clients?.length ? parsed.clients : defaultData.clients,
      projects: parsed.projects?.length ? parsed.projects : defaultData.projects,
      proposals: parsed.proposals?.length ? parsed.proposals : defaultData.proposals,
      reviews: parsed.reviews?.length ? parsed.reviews : defaultData.reviews,
      conversations: parsed.conversations || defaultData.conversations,
      notifications: parsed.notifications || defaultData.notifications,
      favoriteEngineers: parsed.favoriteEngineers || defaultData.favoriteEngineers,
      favoriteProjects: parsed.favoriteProjects || defaultData.favoriteProjects,
      admin: parsed.admin || defaultData.admin,
    };
  } catch {
    return { ...defaultData };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ====================== ENGINEERS API ======================

export function getEngineers(status = null) {
  const data = loadData();
  if (status) {
    return data.engineers.filter((e) => e.status === status);
  }
  return data.engineers;
}

export function getEngineerById(id) {
  const data = loadData();
  return data.engineers.find((e) => e.id === id) || null;
}

export function registerEngineer(engineer) {
  const data = loadData();
  const exists = data.engineers.some(
    (e) => e.email.toLowerCase() === engineer.email.toLowerCase() || e.phone === engineer.phone
  );
  if (exists) {
    throw new Error('This email address or phone number is already registered.');
  }
  const newEngineer = {
    ...engineer,
    id: generateId(),
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    completedProjectsCount: 0,
    profileViews: 1,
    availability: 'available',
    createdAt: new Date().toISOString(),
  };
  data.engineers.push(newEngineer);
  
  // Create admin notification
  data.notifications.push({
    id: generateId(),
    userId: 'admin',
    title: 'New Engineer Application',
    message: `${newEngineer.fullName} has applied for verified consultant credentials.`,
    type: 'verification',
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  return newEngineer;
}

export function updateEngineerStatus(id, status, reason = '') {
  const data = loadData();
  const index = data.engineers.findIndex((e) => e.id === id);
  if (index === -1) throw new Error('Engineer profile not found.');
  
  data.engineers[index].status = status;
  if (reason) data.engineers[index].statusReason = reason;
  data.engineers[index].updatedAt = new Date().toISOString();
  
  // Notify engineer
  data.notifications.push({
    id: generateId(),
    userId: id,
    title: status === 'approved' ? 'Congratulations! Profile Approved' : 'Application Status Update',
    message: status === 'approved' 
      ? 'Your credentials have been verified and your consultant profile is now live.' 
      : `Application not approved: ${reason || 'Please review your uploaded certifications and CV.'}`,
    type: 'verification',
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  return data.engineers[index];
}

export function updateEngineer(id, updates) {
  const data = loadData();
  const index = data.engineers.findIndex((e) => e.id === id);
  if (index === -1) throw new Error('Engineer not found.');
  data.engineers[index] = { ...data.engineers[index], ...updates };
  saveData(data);
  return data.engineers[index];
}

export function addEngineerProject(engineerId, project) {
  const data = loadData();
  const index = data.engineers.findIndex((e) => e.id === engineerId);
  if (index === -1) throw new Error('Engineer not found.');
  
  const projects = data.engineers[index].projects || [];
  const newProject = {
    ...project,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  projects.unshift(newProject);
  data.engineers[index].projects = projects;
  data.engineers[index].completedProjectsCount = projects.length;
  saveData(data);
  return data.engineers[index];
}

export function deleteEngineerProject(engineerId, projectId) {
  const data = loadData();
  const index = data.engineers.findIndex((e) => e.id === engineerId);
  if (index === -1) throw new Error('Engineer not found.');
  
  data.engineers[index].projects = (data.engineers[index].projects || []).filter(
    (p) => p.id !== projectId && p.title !== projectId
  );
  data.engineers[index].completedProjectsCount = data.engineers[index].projects.length;
  saveData(data);
  return data.engineers[index];
}

// ====================== CLIENTS API ======================

export function registerClient(client) {
  const data = loadData();
  const exists = data.clients.some(
    (c) => c.email.toLowerCase() === client.email.toLowerCase() || c.phone === client.phone
  );
  if (exists) {
    throw new Error('This email address or phone number is already registered.');
  }
  const newClient = {
    ...client,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  data.clients.push(newClient);
  saveData(data);
  return newClient;
}

export function loginClient(email, password) {
  const data = loadData();
  const client = data.clients.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!client) throw new Error('Invalid email or password.');
  return client;
}

export function loginEngineer(email, password) {
  const data = loadData();
  const engineer = data.engineers.find(
    (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
  );
  if (!engineer) throw new Error('Invalid email or password.');
  if (engineer.status === 'pending') {
    throw new Error('Your account is currently under technical review by administration.');
  }
  if (engineer.status === 'rejected') {
    throw new Error(engineer.statusReason ? `Application declined: ${engineer.statusReason}` : 'Your application was not approved.');
  }
  return engineer;
}

export function loginAdmin(username, password) {
  const data = loadData();
  if (data.admin.username === username && data.admin.password === password) {
    return { ...data.admin };
  }
  throw new Error('Invalid admin credentials.');
}

// ====================== PROJECTS & PROPOSALS API ======================

export function getProjects(filterStatus = null, category = null) {
  const data = loadData();
  let list = data.projects || [];
  if (filterStatus && filterStatus !== 'all') {
    list = list.filter((p) => p.status === filterStatus);
  }
  if (category && category !== 'all') {
    list = list.filter((p) => p.category === category);
  }
  return list;
}

export function getProjectById(id) {
  const data = loadData();
  return data.projects?.find((p) => p.id === id) || null;
}

export function createProject(projectData, clientId, clientName, clientCity = 'Cairo, Egypt') {
  const data = loadData();
  const newProject = {
    ...projectData,
    id: generateId(),
    clientId,
    clientName,
    clientCity,
    status: 'open',
    proposalsCount: 0,
    createdAt: new Date().toISOString(),
  };
  data.projects.unshift(newProject);

  // Notify registered engineers with matching specialty
  const matchingEngineers = data.engineers.filter(
    (e) => e.status === 'approved' && e.specialty === newProject.category
  );
  matchingEngineers.forEach((eng) => {
    data.notifications.push({
      id: generateId(),
      userId: eng.id,
      title: 'New Matching Project Opportunity!',
      message: `A new project "${newProject.title}" with a budget of $${newProject.budget} matches your specialty.`,
      type: 'proposal',
      read: false,
      createdAt: new Date().toISOString(),
    });
  });

  saveData(data);
  return newProject;
}

export function updateProjectStatus(projectId, status) {
  const data = loadData();
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) throw new Error('Project not found.');
  project.status = status;
  project.updatedAt = new Date().toISOString();
  saveData(data);
  return project;
}

export function getProposalsForProject(projectId) {
  const data = loadData();
  return (data.proposals || []).filter((p) => p.projectId === projectId);
}

export function getProposalsForEngineer(engineerId) {
  const data = loadData();
  return (data.proposals || []).filter((p) => p.engineerId === engineerId);
}

export function submitProposal(proposalData) {
  const data = loadData();
  const project = data.projects.find((p) => p.id === proposalData.projectId);
  if (!project) throw new Error('Project not found.');

  // Check if already applied
  const existing = (data.proposals || []).find(
    (p) => p.projectId === proposalData.projectId && p.engineerId === proposalData.engineerId
  );
  if (existing) {
    throw new Error('You have already submitted a proposal for this project.');
  }

  const newProposal = {
    ...proposalData,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  data.proposals.push(newProposal);
  project.proposalsCount = (project.proposalsCount || 0) + 1;

  // Notify client
  data.notifications.push({
    id: generateId(),
    userId: project.clientId,
    title: 'New Proposal Received',
    message: `${proposalData.engineerName} submitted a proposal ($${proposalData.proposedBudget}) for "${project.title}".`,
    type: 'proposal',
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  return newProposal;
}

export function updateProposalStatus(proposalId, status) {
  const data = loadData();
  const proposal = data.proposals.find((p) => p.id === proposalId);
  if (!proposal) throw new Error('Proposal not found.');

  proposal.status = status;
  proposal.updatedAt = new Date().toISOString();

  const project = data.projects.find((p) => p.id === proposal.projectId);

  if (status === 'accepted' && project) {
    project.status = 'in_progress';
    project.acceptedEngineerId = proposal.engineerId;
  }

  // Notify engineer
  data.notifications.push({
    id: generateId(),
    userId: proposal.engineerId,
    title: status === 'accepted' ? 'Proposal Accepted!' : 'Proposal Update',
    message: status === 'accepted'
      ? `The client has accepted your proposal for "${project?.title}". You can now proceed and message the client.`
      : `Your proposal for "${project?.title}" was not selected this time.`,
    type: 'status',
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  return proposal;
}

// ====================== REVIEWS API ======================

export function addReview(engineerId, clientId, rating, comment, projectTitle = '') {
  const data = loadData();
  const client = data.clients.find((c) => c.id === clientId) || { fullName: 'Verified Client' };
  
  const review = {
    id: generateId(),
    engineerId,
    clientId,
    clientName: client.fullName,
    rating,
    comment,
    projectTitle,
    createdAt: new Date().toISOString(),
  };
  data.reviews.push(review);

  const engineer = data.engineers.find((e) => e.id === engineerId);
  if (engineer) {
    const engineerReviews = data.reviews.filter((r) => r.engineerId === engineerId);
    const total = engineerReviews.reduce((sum, r) => sum + r.rating, 0);
    engineer.rating = Math.round((total / engineerReviews.length) * 10) / 10;
    engineer.reviewCount = engineerReviews.length;
  }

  // Notify engineer
  data.notifications.push({
    id: generateId(),
    userId: engineerId,
    title: 'New Client Review Received ⭐',
    message: `You received a ${rating}/5 star review from ${client.fullName}.`,
    type: 'status',
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  return review;
}

export function getReviewsForEngineer(engineerId) {
  const data = loadData();
  return data.reviews.filter((r) => r.engineerId === engineerId);
}

// ====================== FAVORITES API ======================

export function toggleFavoriteEngineer(engineerId) {
  const data = loadData();
  let favs = data.favoriteEngineers || [];
  if (favs.includes(engineerId)) {
    favs = favs.filter((id) => id !== engineerId);
  } else {
    favs.push(engineerId);
  }
  data.favoriteEngineers = favs;
  saveData(data);
  return favs.includes(engineerId);
}

export function isFavoriteEngineer(engineerId) {
  const data = loadData();
  return (data.favoriteEngineers || []).includes(engineerId);
}

export function getFavoriteEngineers() {
  const data = loadData();
  const ids = data.favoriteEngineers || [];
  return (data.engineers || []).filter((e) => ids.includes(e.id));
}

// ====================== CHAT & MESSAGING API ======================

export function getConversations(userId) {
  const data = loadData();
  return (data.conversations || []).filter(
    (c) => c.clientId === userId || c.engineerId === userId
  );
}

export function getMessages(conversationId) {
  const data = loadData();
  const conv = (data.conversations || []).find((c) => c.id === conversationId);
  return conv ? conv.messages : [];
}

export function sendMessage(conversationId, senderId, text) {
  const data = loadData();
  let conv = (data.conversations || []).find((c) => c.id === conversationId);
  if (!conv) throw new Error('Conversation not found.');

  const newMsg = {
    id: generateId(),
    senderId,
    text,
    timestamp: new Date().toISOString(),
  };

  conv.messages.push(newMsg);
  conv.lastMessage = text;
  conv.lastMessageTime = newMsg.timestamp;
  conv.unreadCount = (conv.unreadCount || 0) + 1;

  saveData(data);
  return newMsg;
}

export function startOrGetConversation(clientId, clientName, engineerId, engineerName) {
  const data = loadData();
  let conv = (data.conversations || []).find(
    (c) => c.clientId === clientId && c.engineerId === engineerId
  );
  if (!conv) {
    conv = {
      id: generateId(),
      clientId,
      clientName,
      engineerId,
      engineerName,
      lastMessage: 'Conversation started',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      messages: [
        {
          id: generateId(),
          senderId: clientId,
          text: `Hello Eng. ${engineerName}, I would like to discuss project requirements with you.`,
          timestamp: new Date().toISOString(),
        }
      ]
    };
    data.conversations.push(conv);
    saveData(data);
  }
  return conv;
}

// ====================== NOTIFICATIONS API ======================

export function getNotifications(userId) {
  const data = loadData();
  return (data.notifications || [])
    .filter((n) => n.userId === userId || n.userId === 'all')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function markNotificationRead(notifId) {
  const data = loadData();
  const notif = (data.notifications || []).find((n) => n.id === notifId);
  if (notif) notif.read = true;
  saveData(data);
}

export function markAllNotificationsRead(userId) {
  const data = loadData();
  (data.notifications || []).forEach((n) => {
    if (n.userId === userId) n.read = true;
  });
  saveData(data);
}

// ====================== ADMIN & ANALYTICS API ======================

export function getPlatformStats() {
  const data = loadData();
  const engineers = data.engineers || [];
  const clients = data.clients || [];
  const projects = data.projects || [];
  const reviews = data.reviews || [];

  return {
    totalUsers: engineers.length + clients.length,
    totalEngineers: engineers.length,
    activeEngineers: engineers.filter((e) => e.status === 'approved').length,
    pendingApprovals: engineers.filter((e) => e.status === 'pending').length,
    totalClients: clients.length,
    totalProjects: projects.length,
    openProjects: projects.filter((p) => p.status === 'open').length,
    inProgressProjects: projects.filter((p) => p.status === 'in_progress').length,
    completedProjects: projects.filter((p) => p.status === 'completed').length,
    totalReviews: reviews.length,
    avgRating: engineers.length 
      ? (engineers.reduce((acc, e) => acc + (e.rating || 0), 0) / engineers.length).toFixed(1)
      : '5.0',
  };
}

export function getAdminAnalyticsData() {
  return {
    growthData: [
      { month: 'Oct', engineers: 14, clients: 20, projects: 12 },
      { month: 'Nov', engineers: 28, clients: 36, projects: 26 },
      { month: 'Dec', engineers: 42, clients: 54, projects: 40 },
      { month: 'Jan', engineers: 62, clients: 78, projects: 55 },
      { month: 'Feb', engineers: 84, clients: 104, projects: 76 },
      { month: 'Mar', engineers: 110, clients: 138, projects: 102 },
    ],
    categoryDistribution: [
      { name: 'Civil & Structural', value: 34, color: '#2563EB' },
      { name: 'Architecture', value: 26, color: '#06B6D4' },
      { name: 'Mechanical & MEP', value: 18, color: '#0284C7' },
      { name: 'Electrical & Power', value: 22, color: '#38BDF8' },
      { name: 'Interior Design', value: 16, color: '#6366F1' },
      { name: 'Software & IoT', value: 28, color: '#0EA5E9' },
    ]
  };
}

// ====================== AI FEATURES ENGINE (ENGLISH) ======================

export function aiMatchEngineers(projectRequirements) {
  const data = loadData();
  const approvedEngineers = data.engineers.filter((e) => e.status === 'approved');

  const { title = '', description = '', category = '', requiredSkills = [] } = projectRequirements;
  const targetText = `${title} ${description} ${category} ${requiredSkills.join(' ')}`.toLowerCase();

  const scored = approvedEngineers.map((engineer) => {
    let score = 52;
    let reasons = [];

    // Category match
    if (engineer.specialty === category) {
      score += 26;
      reasons.push(`Exact Specialty Alignment: ${SPECIALTY_LABELS[engineer.specialty]}`);
    }

    // Skills match
    const matchedSkills = (engineer.skills || []).filter((s) =>
      targetText.includes(s.toLowerCase())
    );
    if (matchedSkills.length > 0) {
      score += Math.min(18, matchedSkills.length * 6);
      reasons.push(`Proven skills in: ${matchedSkills.slice(0, 3).join(', ')}`);
    }

    // Experience
    if (engineer.experience >= 6) {
      score += 5;
      reasons.push(`Senior track record (${engineer.experience}+ years)`);
    }

    // Top client satisfaction
    if (engineer.rating >= 4.8) {
      score += 5;
      reasons.push(`Outstanding client rating (${engineer.rating} ⭐)`);
    }

    // Availability
    if (engineer.availability === 'available') {
      score += 4;
      reasons.push('Available immediately for project kickoff');
    }

    score = Math.min(99, score);

    return {
      engineer,
      matchScore: score,
      reasons,
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore);
}

export function aiEnhanceProjectDescription(roughTitle, roughDescription, category) {
  const templates = {
    civil: {
      suggestedTitle: `Comprehensive Structural Calculation Notes & Seismic BIM Modeling for ${roughTitle || 'Project'}`,
      refinedDescription: `The project requires complete structural engineering analysis, design validation, and certified submittal documentation.\n\nKey Scope of Deliverables:\n1. 3D structural analysis models generated using ETABS and SAP2000.\n2. Executive structural construction drawings (Foundations, columns, slabs, and shear walls).\n3. Certified calculation notes ready for municipal authority approval.\n4. Detailed concrete and rebar quantity surveying (BOQ) with material cost optimization.`,
      recommendedSkills: ['Structural Engineering', 'ETABS', 'AutoCAD', 'Quantity Surveying', 'Building Code Compliance'],
      suggestedDuration: '10 to 14 days'
    },
    architecture: {
      suggestedTitle: `Architectural Design, 4K Photorealistic Visualizations & Executive Plans for ${roughTitle || 'Project'}`,
      refinedDescription: `Looking for innovative architectural design that optimizes functional spatial circulation while ensuring maximum aesthetic value.\n\nKey Scope of Deliverables:\n1. Full architectural concept plans and regulatory permit layouts.\n2. Contemporary exterior facade elevations with 4K day/dusk photorealistic renderings.\n3. Daylight studies, passive ventilation strategies, and zoning schemes.\n4. Comprehensive architectural specification schedule for construction tendering.`,
      recommendedSkills: ['Architectural Design', 'Revit Architecture', 'Lumion', '3ds Max', 'Permit Documentation'],
      suggestedDuration: '12 to 18 days'
    },
    interior: {
      suggestedTitle: `Interior Spatial Architecture, Lighting Layouts & Executive Specs for ${roughTitle || 'Project'}`,
      refinedDescription: `Seeking luxury interior design and spatial planning tailored to modern lifestyle and functional elegance.\n\nKey Scope of Deliverables:\n1. Cohesive concept moodboards with color palettes and tactile material samples.\n2. Ultra-photorealistic 3D interior renderings covering every functional angle.\n3. Detailed executive reflected ceiling plans (RCP), electrical, and custom joinery drawings.\n4. Comprehensive FF&E specification schedule with paint codes and vendor lists.`,
      recommendedSkills: ['Interior Design', '3ds Max', 'Corona Renderer', 'Lighting Plans', 'FF&E Schedules'],
      suggestedDuration: '10 to 15 days'
    }
  };

  return templates[category] || {
    suggestedTitle: roughTitle ? `Integrated Engineering & Technical Consulting: ${roughTitle}` : 'Comprehensive Technical Engineering Consulting',
    refinedDescription: `The assignment requires certified professional consulting adhering strictly to international standards.\n\n${roughDescription || 'Execute all engineering deliverables according to regulatory codes and furnish editable source files along with signed technical verification reports.'}\n\nDeliverables:\n1. Stamped engineering drawings and calculation notes.\n2. Detailed technical specifications and Bill of Quantities (BOQ).\n3. Technical supervision and contractor RFIs review support.`,
    recommendedSkills: ['Engineering Consulting', 'AutoCAD', 'Project Management', 'Quality Assurance'],
    suggestedDuration: '14 days'
  };
}

export function aiEnhanceProfile(currentBio, specialty, skills = []) {
  const specLabel = SPECIALTY_LABELS[specialty] || 'Certified Consultant';
  return {
    enhancedBio: `I am a licensed ${specLabel} with a proven track record delivering mission-critical engineering projects on time and under budget. I deliver robust, code-compliant blueprints and calculation notes using cutting-edge BIM software, ensuring precision and reducing material over-expenditure by up to 15%. Dedicated to clear communication and seamless milestone delivery.`,
    suggestedSkills: ['Project Management', 'Revit', 'AutoCAD', 'Cost Estimation', 'BIM Coordination', 'Code Compliance'],
    profileTips: [
      'Upload high-resolution 3D renders and detailed technical drawings to your portfolio.',
      'List all professional licenses and engineering society affiliations to maximize client trust.',
      'Set an hourly consulting rate and ensure your availability status is marked "Available for Hire".'
    ]
  };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
