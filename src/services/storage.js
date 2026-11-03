const STORAGE_KEY = 'freelanser_data';

// Engineering categories definition with icons and Arabic labels
export const ENGINEERING_CATEGORIES = [
  { id: 'civil', name: 'هندسة مدنية وإنشائية', nameEn: 'Civil & Structural', icon: 'Building2', count: 120 },
  { id: 'architecture', name: 'هندسة معمارية وتخطيط', nameEn: 'Architecture & Planning', icon: 'Compass', count: 95 },
  { id: 'mechanical', name: 'هندسة ميكانيكية وHVAC', nameEn: 'Mechanical & MEP', icon: 'Wrench', count: 78 },
  { id: 'electrical', name: 'هندسة كهربائية وتيار خفيف', nameEn: 'Electrical & Power', icon: 'Zap', count: 85 },
  { id: 'interior', name: 'تصميم داخلي وديكور', nameEn: 'Interior Design', icon: 'Home', count: 64 },
  { id: 'structural', name: 'دراسات تربة وفحص منشآت', nameEn: 'Geotechnical & Structural', icon: 'ShieldCheck', count: 42 },
  { id: 'software', name: 'برمجيات ونظم مدمجة IoT', nameEn: 'Software & Embedded', icon: 'Code2', count: 110 },
  { id: 'environmental', name: 'طاقة متجددة وبيئة', nameEn: 'Renewable & Environmental', icon: 'Leaf', count: 36 },
];

export const SPECIALTY_LABELS = {
  civil: 'مهندس مدني وإنشائي',
  architecture: 'مهندس معماري ومصمم واجهات',
  mechanical: 'مهندس ميكانيكا وHVAC',
  electrical: 'مهندس كهرباء وتيار خفيف',
  interior: 'مهندس تصميم داخلي وديكور',
  structural: 'مهندس إنشائي وفحص منشآت',
  software: 'مهندس برمجيات ونظم ذكية',
  environmental: 'مهندس طاقة متجددة وبيئة',
  frontend: 'مهندس Front-End',
  backend: 'مهندس Back-End',
  fullstack: 'مهندس Full-Stack',
  mobile: 'مهندس تطبيقات Mobile',
  devops: 'مهندس DevOps وسحابيات',
  ai: 'مهندس ذكاء اصطناعي وتعلم آلة',
  data: 'مهندس علم بيانات وتحليل',
  other: 'مهندس متخصص',
};

// Rich Seed Data
const initialEngineers = [
  {
    id: 'eng-1',
    fullName: 'م. أحمد كمال عبد العزيز',
    email: 'ahmed.kamal@example.com',
    phone: '01012345678',
    password: 'password123',
    specialty: 'civil',
    hourlyRate: 350,
    experience: 8,
    bio: 'مهندس مدني استشاري معتمد لدى نقابة المهندسين المصرية. خبرة أكثر من 8 سنوات في التصميم الإنشائي للأبراج السكنية والمصانع وإعداد النوت الحسابية وجداول حصر الكميات باستخدام ETABS, SAP2000, SAFE وRevit Structure.',
    skills: ['ETABS', 'SAP2000', 'Revit Structure', 'حساب كميات', 'تصميم خرسانة مسلحة', 'إشراف هندسي', 'AutoCAD'],
    linkedin: 'https://linkedin.com/in/ahmed-kamal',
    github: 'https://github.com/ahmed-kamal',
    status: 'approved',
    rating: 4.9,
    reviewCount: 28,
    availability: 'available',
    location: 'القاهرة، مصر',
    title: 'مهندس مدني استشاري ومصمم إنشائي',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 34,
    profileViews: 1420,
    certifications: ['عضو نقابة المهندسين المصرية', 'محترف معتمد Autodesk Revit Structural', 'دبلوم التصميم الزلزالي للمنشآت'],
    projects: [
      {
        title: 'برج الأندلس السكني (18 طابقاً)',
        description: 'تصميم إنشائي كامل ومراجعة أحمال الرياح والزلازل وإعداد اللوحات التنفيذية والنوتة الحسابية المعتمدة.',
        category: 'civil',
        skills: ['ETABS', 'SAFE', 'Revit Structure'],
        link: 'https://example.com/project-1',
        year: '2025'
      },
      {
        title: 'مجمع مستودعات وجمالونات العاشر من رمضان',
        description: 'تصميم قطاعات Steel Structures وحسابات القواعد الخرسانية مع تقليل تكلفة المواد بنسبة 14%.',
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
    fullName: 'م. سارة محمود الشناوي',
    email: 'sara.shennawy@example.com',
    phone: '01123456789',
    password: 'password123',
    specialty: 'architecture',
    hourlyRate: 400,
    experience: 6,
    bio: 'مهندسة معمارية متخصصة في التصميم المعماري الحديث والواجهات المودرن ومخططات الفلل السكنية المعتمدة طبقا للكود المصري والسعودي. إتقان تام لبرامج Revit Architecture, Lumion, 3ds Max وتقديم رندرات واقعية فائقة الدقة.',
    skills: ['Revit Architecture', 'Lumion', '3ds Max', 'تصميم معماري', 'واجهات خارجية', 'مخططات تنفيذية', 'Photoshop'],
    linkedin: 'https://linkedin.com/in/sara-shennawy',
    github: 'https://github.com/sara-arch',
    status: 'approved',
    rating: 5.0,
    reviewCount: 32,
    availability: 'available',
    location: 'الإسكندرية، مصر',
    title: 'مهندسة معمارية ومصممة واجهات وفلل فاخرة',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 41,
    profileViews: 1890,
    certifications: ['عضو نقابة المهندسين المصرية', 'شهادة تصميم معماري مستدام LEED GA', 'Autodesk Certified Professional'],
    projects: [
      {
        title: 'فيلا نيوكلاسيك - التجمع الخامس',
        description: 'تصميم معماري متكامل للفيلا مع لاندسكيب ومخططات رخص البناء ورندرات ليلية ونهارية بدقة 4K.',
        category: 'architecture',
        skills: ['Revit', 'Lumion', 'Photoshop'],
        link: 'https://example.com/project-villa',
        year: '2025'
      },
      {
        title: 'مقر شركة تكنولوجية - العاصمة الإدارية',
        description: 'تصميم واجهة ذكية زجاجية موفرة للطاقة مع توزيع داخلي Open Space وخدمات مستدامة.',
        category: 'architecture',
        skills: ['Revit Architecture', '3ds Max', 'AutoCAD'],
        link: 'https://example.com/project-hq',
        year: '2024'
      }
    ],
    createdAt: '2025-01-15T09:30:00Z',
  },
  {
    id: 'eng-3',
    fullName: 'م. يوسف طارق المنشاوي',
    email: 'youssef.manshawy@example.com',
    phone: '01234567890',
    password: 'password123',
    specialty: 'mechanical',
    hourlyRate: 320,
    experience: 7,
    bio: 'مهندس ميكانيكا قوى خبير في تصميم أنظمة التكييف المركزي HVAC ومكافحة الحريق Fire Fighting وشبكات التغذية والصرف الصحي للمستشفيات والمباني الإدارية باستخدام HAP, Elite, Revit MEP.',
    skills: ['HVAC', 'Fire Fighting', 'HAP', 'Revit MEP', 'شبكات صرف وتغذية', 'NFPA', 'حساب أحمال حرارية'],
    linkedin: 'https://linkedin.com/in/youssef-mep',
    github: 'https://github.com/youssef-mep',
    status: 'approved',
    rating: 4.8,
    reviewCount: 19,
    availability: 'busy',
    location: 'الجيزة، مصر',
    title: 'مهندس ميكانيكا استشاري أنظمة MEP ومكافحة حريق',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 26,
    profileViews: 980,
    certifications: ['عضو الجمعية الأمريكية لمهندسي التكييف ASHRAE', 'شهادة NFPA لأنظمة الإطفاء'],
    projects: [
      {
        title: 'نظام HVAC لمستشفى بسعة 120 سرير',
        description: 'حسابات الأحمال الحرارية بغرف العمليات والعناية المركزة وتصميم مجاري الهواء وفق معايير ASHRAE.',
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
    fullName: 'م. مريم حسام الدين',
    email: 'mariam.hossam@example.com',
    phone: '01512345678',
    password: 'password123',
    specialty: 'interior',
    hourlyRate: 380,
    experience: 5,
    bio: 'مهندسة ديكور وتصميم داخلي حاصلة على جوائز تصميم. متخصصة في الفرش الفندقي، الشقق الدوبلكس والمطاعم والكافيهات مع تقديم جداول خامات دقيقة ومخططات إنارة وجبس بورد تنفيذية.',
    skills: ['3ds Max', 'V-Ray', 'Corona Renderer', 'تصميم داخلي', 'مخططات إضاءة', 'اختيار خامات', 'AutoCAD'],
    linkedin: 'https://linkedin.com/in/mariam-interior',
    github: 'https://github.com/mariam-design',
    status: 'approved',
    rating: 4.9,
    reviewCount: 24,
    availability: 'available',
    location: 'القاهرة الجديدة، مصر',
    title: 'مهندسة تصميم داخلي وديكور ومخططات تنفيذية',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 30,
    profileViews: 1350,
    certifications: ['عضو نقابة مصممي الفنون التطبيقية', 'دبلوم الإخراج المعماري الاحترافي V-Ray'],
    projects: [
      {
        title: 'تصميم داخلي لمطعم وكافيه بوهيمي بالشيخ زايد',
        description: 'دراسة كاملة لرحلة العميل والإضاءة وتوزيع المقاعد واختيار خامات مقاومة للحريق.',
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
    fullName: 'م. عمر عبد الرحمن الشريف',
    email: 'omar.sherif@example.com',
    phone: '01098765432',
    password: 'password123',
    specialty: 'electrical',
    hourlyRate: 330,
    experience: 9,
    bio: 'مهندس كهرباء قوى وتيار خفيف واستشاري أنظمة الطاقة الشمسية الكهروضوئية. خبرة في تصميم لوحات التوزيع MDB/SMDB وأنظمة الإنذار وكاميرات المراقبة وتصميم محطات الطاقة الشمسية On-Grid وOff-Grid.',
    skills: ['DIALux evo', 'AutoCAD Electrical', 'PVSyst', 'تيار خفيف', 'طاقة شمسية', 'لوحات توزيع', 'BMS'],
    linkedin: 'https://linkedin.com/in/omar-electrical',
    github: 'https://github.com/omar-electrical',
    status: 'approved',
    rating: 4.9,
    reviewCount: 22,
    availability: 'available',
    location: 'طنطا، مصر',
    title: 'مهندس كهرباء قوى وتيار خفيف وأنظمة طاقة شمسية',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 38,
    profileViews: 1120,
    certifications: ['عضو نقابة المهندسين', 'شهادة تصميم محطات طاقة شمسية معتمدة NREA', 'Schneider Electric EcoXpert'],
    projects: [
      {
        title: 'محطة طاقة شمسية 250 ك.و لمصنع غذائي',
        description: 'تصميم المحطة وحسابات العائد الاستثماري وخفض فاتورة الكهرباء الشهرية بنسبة 65%.',
        category: 'electrical',
        skills: ['PVSyst', 'AutoCAD', 'Electrical Sizing'],
        link: 'https://example.com/solar-plant',
        year: '2024'
      }
    ],
    createdAt: '2025-02-14T10:00:00Z',
  },
  {
    id: 'eng-6',
    fullName: 'م. خالد إبراهيم سالم',
    email: 'khaled.salem@example.com',
    phone: '01065432198',
    password: 'password123',
    specialty: 'software',
    hourlyRate: 450,
    experience: 7,
    bio: 'مهندس نظم وبرمجيات متقدمة وبناء منصات سحابية وحلول إنترنت الأشياء الصناعية (IIoT). خبرة واسعة في React, Node.js, Python, Docker وهندسة الأنظمة الموزعة الآمنة.',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'IoT', 'Tailwind CSS', 'PostgreSQL'],
    linkedin: 'https://linkedin.com/in/khaled-salem',
    github: 'https://github.com/khaled-salem',
    status: 'approved',
    rating: 5.0,
    reviewCount: 35,
    availability: 'available',
    location: 'المعادي، القاهرة',
    title: 'Senior Software & IoT Solutions Engineer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    completedProjectsCount: 45,
    profileViews: 2100,
    certifications: ['AWS Certified Solutions Architect', 'Professional Scrum Master PSM I'],
    projects: [
      {
        title: 'منصة إدارة استهلاك الطاقة والمعدات الصناعية IoT',
        description: 'بناء داشبورد تفاعلية آنية ترتبط بمجسات المصنع عبر MQTT وتتنبأ بالأعطال باستخدام الذكاء الاصطناعي.',
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
    fullName: 'م. مصطفى نور الدين',
    email: 'mostafa.nour@example.com',
    phone: '01033445566',
    password: 'password123',
    specialty: 'civil',
    hourlyRate: 280,
    experience: 4,
    bio: 'مهندس موقع ومكتب فني متخصص في حساب كميات وإعداد مستخلصات المقاولين والمخططات التنفيذية Shop Drawings.',
    skills: ['AutoCAD', 'Excel Advanced', 'Shop Drawings', 'حساب كميات'],
    linkedin: 'https://linkedin.com/in/mostafa-nour',
    github: 'https://github.com/mostafa-nour',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    availability: 'available',
    location: 'المنصورة، مصر',
    title: 'مهندس مكتب فني وحصر كميات',
    completedProjectsCount: 0,
    profileViews: 45,
    certifications: ['عضو نقابة المهندسين'],
    projects: [],
    cvName: 'Mostafa_Nour_CV_Civil.pdf',
    createdAt: '2026-03-01T12:00:00Z',
  }
];

const initialClients = [
  {
    id: 'client-1',
    fullName: 'م. طارق فاروق الباز',
    email: 'tarek.baz@elrawda.com',
    phone: '01011122233',
    password: 'password123',
    company: 'شركة الروضة للاستثمار العقاري والتطوير',
    city: 'القاهرة',
    createdAt: '2025-01-05T10:00:00Z',
  },
  {
    id: 'client-2',
    fullName: 'د. منى عبد السلام',
    email: 'mona.salam@gmail.com',
    phone: '01144455566',
    password: 'password123',
    company: 'مجموعة عيادات النخبة الطبية',
    city: 'الإسكندرية',
    createdAt: '2025-01-20T14:30:00Z',
  }
];

const initialProjects = [
  {
    id: 'proj-1',
    title: 'تصميم إنشائي كامل لفيلا سكنية دورين ورووف بالشيخ زايد',
    description: 'مطلوب مهندس مدني إنشائي محترف لإعداد التصميم الإنشائي والنوتة الحسابية المعتمدة لفيلا مساحة الأرض 600 متر مربع ومساحة المبنى 320 متر مربع. تشمل المخرجات لوحات القواعد، الأعمدة، الأسقف، خزان المياه، والسور الخارجي بصيغتي DWG وPDF مع جدول حصر كميات الخرسانة وحديد التسليح.',
    category: 'civil',
    requiredSkills: ['تصميم إنشائي', 'ETABS', 'AutoCAD', 'حساب كميات', 'كود البناء المصري'],
    budget: 15000,
    duration: '10 أيام',
    deadline: '2026-04-15',
    clientId: 'client-1',
    clientName: 'م. طارق فاروق (شركة الروضة)',
    clientCity: 'القاهرة',
    status: 'open',
    proposalsCount: 3,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'تصميم داخلي ومعماري لمقر شركة تسويق رقمي 250م²',
    description: 'نبحث عن مهندس ديكور أو معماري لتصميم مقر شركتنا الجديد بنظام Modern Industrial. يشمل العمل قاعة اجتماعات رئيسية، 4 غرف مدراء، مساحة عمل مفتوحة لـ 20 موظفاً، كافتيريا ومنطقة استراحة. مطلوب مخططات 3D واقعية ومخططات توزيع الإضاءة والتكييف وجدول الخامات.',
    category: 'interior',
    requiredSkills: ['تصميم داخلي', '3ds Max', 'مخططات تنفيذية', 'اختيار خامات', 'توزيع إضاءة'],
    budget: 22000,
    duration: '14 يوماً',
    deadline: '2026-04-20',
    clientId: 'client-2',
    clientName: 'د. منى عبد السلام (مجموعة النخبة)',
    clientCity: 'الإسكندرية',
    status: 'open',
    proposalsCount: 4,
    createdAt: '2026-03-02T15:30:00Z',
  },
  {
    id: 'proj-3',
    title: 'دراسة وتصميم شبكة تكييف مركزي HVAC ومكافحة حريق لمجمع طبي',
    description: 'مطلوب إعداد مخططات أنظمة التكييف VRF ومجاري الهواء وشبكة رشاشات الحريق وكبائن الإطفاء ومضخات الحريق لمجمع طبي مكون من 3 طوابق طبقاً لاشتراطات الدفاع المدني وكود NFPA.',
    category: 'mechanical',
    requiredSkills: ['HVAC', 'Fire Fighting', 'HAP', 'NFPA', 'Revit MEP'],
    budget: 35000,
    duration: '21 يوماً',
    deadline: '2026-04-28',
    clientId: 'client-2',
    clientName: 'د. منى عبد السلام (مجموعة النخبة)',
    clientCity: 'الإسكندرية',
    status: 'open',
    proposalsCount: 2,
    createdAt: '2026-03-03T09:00:00Z',
  },
  {
    id: 'proj-4',
    title: 'تصميم محطة طاقة شمسية كهروضوئية 100 كيلوواط لمصنع بلاستيك',
    description: 'مطلوب مهندس كهرباء متخصص لإعداد دراسة الجدوى وتصميم محطة طاقة شمسية سطحية On-Grid وربطها مع شبكة الكهرباء العامة واختيار أفضل الألواح والإنفرترات.',
    category: 'electrical',
    requiredSkills: ['طاقة شمسية', 'PVSyst', 'AutoCAD Electrical', 'دراسة جدوى طاقة'],
    budget: 18000,
    duration: '12 يوماً',
    deadline: '2026-04-10',
    clientId: 'client-1',
    clientName: 'م. طارق فاروق (شركة الروضة)',
    clientCity: 'القاهرة',
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
    engineerName: 'م. أحمد كمال عبد العزيز',
    engineerSpecialty: 'civil',
    engineerRating: 4.9,
    engineerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    proposedBudget: 14000,
    deliveryDays: 8,
    coverLetter: 'تحياتي بشمهندس طارق، اطلعت على متطلبات الفيلا بدقة. قمت بتصميم أكثر من 40 فيلا سكنية مماثلة بالشيخ زايد والتجمع. سأقوم بتسليم النوتة الحسابية المعتمدة ولوحات الـ DWG وجداول الحصر بدقة توفر في حديد التسليح.',
    status: 'pending',
    createdAt: '2026-03-01T14:00:00Z',
  },
  {
    id: 'prop-2',
    projectId: 'proj-2',
    engineerId: 'eng-4',
    engineerName: 'م. مريم حسام الدين',
    engineerSpecialty: 'interior',
    engineerRating: 4.9,
    engineerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    proposedBudget: 21000,
    deliveryDays: 12,
    coverLetter: 'أهلاً دكتورة منى. يسعدني العمل على مقر شركتكم. لدي خبرة واسعة في مساحات العمل الابتكارية بتصميم Industrial مريح يزيد من إنتاجية الموظفين. سأقدم لقطات واقعية 3D ومخططات تنفيذية دقيقة للمقاولين.',
    status: 'pending',
    createdAt: '2026-03-02T18:00:00Z',
  }
];

const initialReviews = [
  {
    id: 'rev-1',
    engineerId: 'eng-1',
    clientId: 'client-1',
    clientName: 'م. طارق فاروق',
    rating: 5,
    comment: 'مهندس قمة في الاحترافية والدقة في المواعيد. التصميم الإنشائي كان ممتازاً والنوتة الحسابية معتمدة دون أي تعديل من جهاز المدينة.',
    createdAt: '2025-12-10T12:00:00Z',
  },
  {
    id: 'rev-2',
    engineerId: 'eng-2',
    clientId: 'client-1',
    clientName: 'م. طارق فاروق',
    rating: 5,
    comment: 'م. سارة أبدعت في تصميم واجهات مشروعنا السكني. الرندرات كانت فائقة الواقعية والعملاء انبهروا بالنتيجة.',
    createdAt: '2026-01-15T15:20:00Z',
  },
  {
    id: 'rev-3',
    engineerId: 'eng-3',
    clientId: 'client-2',
    clientName: 'د. منى عبد السلام',
    rating: 5,
    comment: 'دراسة أنظمة التكييف كانت دقيقة جداً ووفرت علينا كثيراً في تكلفة المعدات. أنصح بالتعامل معه بشدة.',
    createdAt: '2026-02-05T09:10:00Z',
  }
];

const initialConversations = [
  {
    id: 'conv-1',
    clientId: 'client-1',
    clientName: 'م. طارق فاروق',
    engineerId: 'eng-1',
    engineerName: 'م. أحمد كمال',
    lastMessage: 'تمام بشمهندس، تم مراجعة تقرير التربة وسأبدأ بحسابات القواعد المسلحة.',
    lastMessageTime: '2026-03-02T16:45:00Z',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'client-1', text: 'السلام عليكم بشمهندس أحمد، أرسلت لك تقرير جسات التربة على الإيميل.', timestamp: '2026-03-02T16:30:00Z' },
      { id: 'm2', senderId: 'eng-1', text: 'وعليكم السلام بشمهندس طارق، استلمته وجاري الفحص.', timestamp: '2026-03-02T16:35:00Z' },
      { id: 'm3', senderId: 'eng-1', text: 'تمام بشمهندس، تم مراجعة تقرير التربة وسأبدأ بحسابات القواعد المسلحة.', timestamp: '2026-03-02T16:45:00Z' }
    ]
  }
];

const initialNotifications = [
  {
    id: 'notif-1',
    userId: 'client-1',
    title: 'عرض جديد على مشروعك',
    message: 'قدم م. أحمد كمال عرضاً لتنفيذ مشروع "التصميم الإنشائي للفيلا".',
    type: 'proposal',
    read: false,
    createdAt: '2026-03-01T14:05:00Z',
  },
  {
    id: 'notif-2',
    userId: 'eng-1',
    title: 'تم اعتماد حسابك بنجاح',
    message: 'تهانينا! قامت إدارة منصة مهندسPro باعتماد ملفك الشخصي كمهندس معتمد.',
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
    name: 'مدير المنصة',
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
    // Ensure all critical arrays exist
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
    throw new Error('البريد الإلكتروني أو رقم الهاتف مسجل مسبقاً');
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
    title: 'طلب انضمام مهندس جديد',
    message: `قدم ${newEngineer.fullName} طلب انضمام كمهندس جديد وهو بانتظار المراجعة.`,
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
  if (index === -1) throw new Error('المهندس غير موجود');
  
  data.engineers[index].status = status;
  if (reason) data.engineers[index].statusReason = reason;
  data.engineers[index].updatedAt = new Date().toISOString();
  
  // Notify engineer
  data.notifications.push({
    id: generateId(),
    userId: id,
    title: status === 'approved' ? 'تهانينا! تم اعتماد حسابك' : 'تحديث بخصوص طلب التسجيل',
    message: status === 'approved' 
      ? 'تمت مراجعة ملفك الشخصي واعتماده بنجاح. يمكنك الآن استقبال طلبات المشاريع وعرض خدماتك.' 
      : `للأسف لم يتم قبول الطلب: ${reason || 'يرجى مراجعة البيانات واستكمال السيرة الذاتية.'}`,
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
  if (index === -1) throw new Error('المهندس غير موجود');
  data.engineers[index] = { ...data.engineers[index], ...updates };
  saveData(data);
  return data.engineers[index];
}

export function addEngineerProject(engineerId, project) {
  const data = loadData();
  const index = data.engineers.findIndex((e) => e.id === engineerId);
  if (index === -1) throw new Error('المهندس غير موجود');
  
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
  if (index === -1) throw new Error('المهندس غير موجود');
  
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
    throw new Error('البريد الإلكتروني أو رقم الهاتف مسجل مسبقاً');
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
  if (!client) throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  return client;
}

export function loginEngineer(email, password) {
  const data = loadData();
  const engineer = data.engineers.find(
    (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
  );
  if (!engineer) throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  if (engineer.status === 'pending') {
    throw new Error('حسابك قيد المراجعة والتدقيق من قبل الإدارة الهندسية.');
  }
  if (engineer.status === 'rejected') {
    throw new Error(engineer.statusReason ? `تم رفض الطلب: ${engineer.statusReason}` : 'تم رفض طلب التسجيل الخاص بك.');
  }
  return engineer;
}

export function loginAdmin(username, password) {
  const data = loadData();
  if (data.admin.username === username && data.admin.password === password) {
    return { ...data.admin };
  }
  throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
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

export function createProject(projectData, clientId, clientName, clientCity = 'مصر') {
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
      title: 'مشروع جديد يناسب تخصصك!',
      message: `تم نشر مشروع "${newProject.title}" بميزانية ${newProject.budget} ج.م في تخصصك.`,
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
  if (!project) throw new Error('المشروع غير موجود');
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
  if (!project) throw new Error('المشروع غير موجود');

  // Check if already applied
  const existing = (data.proposals || []).find(
    (p) => p.projectId === proposalData.projectId && p.engineerId === proposalData.engineerId
  );
  if (existing) {
    throw new Error('لقد قمت بتقديم عرض على هذا المشروع مسبقاً.');
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
    title: 'عرض جديد على مشروعك',
    message: `قدم المهندس ${proposalData.engineerName} عرضاً جديداً بقيمة ${proposalData.proposedBudget} ج.م على مشروعك "${project.title}".`,
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
  if (!proposal) throw new Error('العرض غير موجود');

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
    title: status === 'accepted' ? 'تهانينا! تم قبول عرضك' : 'تحديث بشأن عرضك',
    message: status === 'accepted'
      ? `قام العميل بقبول عرضك على مشروع "${project?.title}". يمكنك الآن بدء التنفيذ والتواصل معه.`
      : `تم رفض عرضك على مشروع "${project?.title}". لا تقلق، هناك العديد من الفرص المتاحة.`,
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
  const client = data.clients.find((c) => c.id === clientId) || { fullName: 'عميل المنصة' };
  
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
    title: 'تقييم جديد على ملفك الشخصي ⭐',
    message: `حصلت على تقييم ${rating} من 5 من العميل ${client.fullName}.`,
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
  if (!conv) throw new Error('المحادثة غير موجودة');

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
      lastMessage: 'بدء المحادثة',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      messages: [
        {
          id: generateId(),
          senderId: clientId,
          text: `مرحباً مهندس ${engineerName}، يسعدني التواصل معك بخصوص تفاصيل العمل.`,
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
      { month: 'أكتوبر', engineers: 12, clients: 18, projects: 10 },
      { month: 'نوفمبر', engineers: 24, clients: 32, projects: 22 },
      { month: 'ديسمبر', engineers: 38, clients: 50, projects: 35 },
      { month: 'يناير', engineers: 55, clients: 72, projects: 48 },
      { month: 'فبراير', engineers: 75, clients: 95, projects: 68 },
      { month: 'مارس', engineers: 95, clients: 125, projects: 92 },
    ],
    categoryDistribution: [
      { name: 'هندسة مدنية', value: 34, color: '#2563EB' },
      { name: 'معمارية', value: 26, color: '#06B6D4' },
      { name: 'ميكانيكا', value: 18, color: '#10B981' },
      { name: 'كهرباء', value: 22, color: '#F59E0B' },
      { name: 'تصميم داخلي', value: 16, color: '#8B5CF6' },
      { name: 'برمجيات وIoT', value: 28, color: '#EC4899' },
    ]
  };
}

// ====================== AI FEATURES ENGINE ======================

export function aiMatchEngineers(projectRequirements) {
  const data = loadData();
  const approvedEngineers = data.engineers.filter((e) => e.status === 'approved');

  const { title = '', description = '', category = '', requiredSkills = [] } = projectRequirements;
  const targetText = `${title} ${description} ${category} ${requiredSkills.join(' ')}`.toLowerCase();

  const scored = approvedEngineers.map((engineer) => {
    let score = 50; // base score
    let reasons = [];

    // Category match (+25)
    if (engineer.specialty === category) {
      score += 25;
      reasons.push(`تخصص مطابق: ${SPECIALTY_LABELS[engineer.specialty]}`);
    }

    // Skills match (+5 per matched skill)
    const matchedSkills = (engineer.skills || []).filter((s) =>
      targetText.includes(s.toLowerCase())
    );
    if (matchedSkills.length > 0) {
      score += Math.min(20, matchedSkills.length * 5);
      reasons.push(`يمتلك مهارات رئيسية: ${matchedSkills.slice(0, 3).join(', ')}`);
    }

    // Experience bonus
    if (engineer.experience >= 5) {
      score += 5;
      reasons.push(`خبرة قوية (${engineer.experience} سنوات)`);
    }

    // High rating bonus
    if (engineer.rating >= 4.8) {
      score += 5;
      reasons.push(`تقييم ممتاز من العملاء (${engineer.rating} ⭐)`);
    }

    // Availability
    if (engineer.availability === 'available') {
      score += 5;
      reasons.push('متفرغ ومستعد للبدء فوراً');
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
  // Simulates high-grade AI Project Assistant
  const specialTemplates = {
    civil: {
      suggestedTitle: `تصميم إنشائي متكامل ونوتة حسابية معتمدة لـ ${roughTitle || 'المشروع'}`,
      refinedDescription: `المشروع يتطلب إعداد دراسة وتصميم إنشائي كامل وفق أحدث اشتراطات الكود الهندسي المعتمد.\n\nالمخرجات المتوقعة تشمل:\n1. نمذجة إنشائية ثلاثية الأبعاد على برامج ETABS / SAP2000.\n2. لوحات إنشائية تنفيذية تفصيلية (محاور، أعمدة، أسقف، أساسات).\n3. نوتة حسابية معتمدة جاهزة لتقديمها للجهات المختصة.\n4. جداول حصر كميات دقيقة للخرسانة وحديد التسليح لترشيد تكاليف التنفيذ.`,
      recommendedSkills: ['تصميم إنشائي', 'ETABS', 'AutoCAD', 'حساب كميات', 'كود البناء'],
      suggestedDuration: '10 إلى 14 يوماً'
    },
    architecture: {
      suggestedTitle: `تصميم معماري ومخططات واجهات ورخص بناء لـ ${roughTitle || 'المشروع'}`,
      refinedDescription: `المشروع بحاجة إلى تصميم معماري مبتكر يجمع بين الجمالية الوظيفية واستغلال المساحات بأعلى كفاءة.\n\nالمخرجات المتوقعة:\n1. مخططات معمارية تنفيذية كاملة بمقياس رسم مناسب.\n2. تصميم واجهات معمارية خارجية مودرن مع لقطات 3D ورندرات واقعية 4K.\n3. مقترح توزيع الفراغات الداخلية والتهوية الطبيعية.\n4. جدول المواصفات والمواد الإنشائية المقترحة.`,
      recommendedSkills: ['تصميم معماري', 'Revit Architecture', 'Lumion', '3ds Max', 'مخططات تنفيذية'],
      suggestedDuration: '12 إلى 18 يوماً'
    },
    interior: {
      suggestedTitle: `تصميم داخلي وديكور فاخر مع لوحات تنفيذية لـ ${roughTitle || 'المشروع'}`,
      refinedDescription: `المشروع يتضمن تصميماً داخلياً راقياً بأسلوب معاصر يتناسب مع هوية الفراغ.\n\nالمخرجات المتوقعة:\n1. لوحات Moodboards للمفاهيم اللونية وتناغم الخامات.\n2. لقطات منظور ثلاثي الأبعاد واقعية (3D Renderings) لكافة الزوايا.\n3. مخططات تنفيذية لأعمال الجبس، توزيع الإضاءة، والفرش.\n4. جدول تفصيلي بالأثاث ومواصفات الخامات وأكواد الدهانات.`,
      recommendedSkills: ['تصميم داخلي', '3ds Max', 'Corona / V-Ray', 'مخططات إضاءة', 'Moodboards'],
      suggestedDuration: '10 إلى 15 يوماً'
    }
  };

  const template = specialTemplates[category] || {
    suggestedTitle: roughTitle ? `مشروع هندسي متكامل: ${roughTitle}` : 'مشروع هندسي واستشاري متكامل',
    refinedDescription: `المطلوب تنفيذ عمل هندسي احترافي بالمواصفات القياسية:\n\n${roughDescription || 'تنفيذ كافة المتطلبات الهندسية طبقاً للمخططات المعتمدة وتزويد العميل بكافة ملفات العمل القابلة للتعديل والتقارير الفنية.'}\n\nالمخرجات المتوقعة:\n1. ملفات العمل المصدرية والرسومات الهندسية المعتمدة.\n2. تقرير فني شامل بالمواصفات وجداول التنفيذ.\n3. دعم فني واستشارات أثناء مرحلة التنفيذ.`,
    recommendedSkills: ['إشراف هندسي', 'AutoCAD', 'إدارة مشاريع', 'مواصفات قياسية'],
    suggestedDuration: '14 يوماً'
  };

  return template;
}

export function aiEnhanceProfile(currentBio, specialty, skills = []) {
  const specLabel = SPECIALTY_LABELS[specialty] || 'مهندس محترف';
  return {
    enhancedBio: `أنا ${specLabel} معتمد، بخبرة عملية مثبتة في إدارة وتنفيذ المشاريع الهندسية بجودة قياسية ودقة متناهية. أحرص على تسليم مخرجات هندسية متكاملة طبقاً للأكواد المعمارية والإنشائية، مع تقديم حلول ابتكارية تخفض من التكاليف التشغيلية ومواد البناء بنسبة تصل إلى 15%. أسعى دائماً لتحقيق أعلى درجات الرضا لعملائي وتوفير متابعة دورية طوال فترة المشروع.`,
    suggestedSkills: ['إدارة مشاريع هندسية', 'AutoCAD', 'Revit', 'حساب كميات', 'مواصفات الجودة', 'BIM'],
    profileTips: [
      'أضف صوراً عالية الجودة ونماذج ثلاثية الأبعاد لمشاريعك في Portfolio.',
      'اذكر الشهادات الهندسية وعضويات النقابة لرفع ثقة العملاء.',
      'حدد سعراً تنافسياً للساعة وتأكد من تفعيل حالة التفرغ (Available).'
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
