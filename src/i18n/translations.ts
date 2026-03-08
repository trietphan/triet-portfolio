export type Locale = "en" | "vi";

type NavLink = { label: string; href: string };
type ExperienceItem = { title: string; company: string; period: string; highlights: string[]; color: string };
type ProjectItem = {
  title: string;
  tagline: string;
  description: string;
  longDescription: string | null;
  tags: string[];
  color: string;
  icon: string;
  stats: string[];
  url: string | null;
};
type NowItem = { icon: string; label: string; value: string; color: string };
type Education = { degree: string; school: string };
type Award = { label: string; color: string };

type Translations = {
  nav: { links: NavLink[]; language: string; english: string; vietnamese: string };
  hero: {
    hello: string;
    summary: { a: string; b: string; c: string; d: string; e: string; f: string; g: string };
    roles: string[];
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    title: string;
    titleAccent: string;
    location: string;
    status: string;
    paragraph1: string;
    paragraph2: string;
    stats: { value?: string; countTo?: number; suffix?: string; label: string; sub: string; color?: string }[];
    educationTitle: string;
    education: Education[];
    honorsTitle: string;
    awards: Award[];
  };
  experience: { title: string; titleAccent: string; items: ExperienceItem[] };
  projects: { title: string; titleAccent: string; subtitle: string; items: ProjectItem[]; expandHint: string };
  now: { badge: string; title: string; titleAccent: string; subtitle: string; items: NowItem[] };
  blog: { title: string; titleAccent: string; subtitle: string; read: string };
  contact: {
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    footerTech: string;
  };
  blogPost: {
    back: string;
    getInTouch: string;
    allPosts: string;
    authorBio: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      links: [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Thoughts", href: "#blog" },
        { label: "Contact", href: "#contact" },
      ],
      language: "Language",
      english: "EN",
      vietnamese: "VI",
    },
    hero: {
      hello: "Hello, World",
      summary: {
        a: "I craft",
        b: "tools that empower",
        c: ", build",
        d: "systems that scale",
        e: ", and inspire the",
        f: "next generation to dream bigger",
        g: ".",
      },
      roles: ["AI Agent Architect", "Full-Stack Developer", "Open Source Builder", "Educator & Mentor"],
      ctaProjects: "See What I've Built",
      ctaContact: "Let's Connect",
    },
    about: {
      title: "About",
      titleAccent: "Me",
      location: "AI Enthusiast · Chicago, IL",
      status: "Open to opportunities",
      paragraph1:
        "I believe technology should empower people to pursue their dreams. From shipping marketplace apps used by hundreds at Airbnb, to architecting AI agent swarms that autonomously write, review, and deploy code, I thrive at the intersection of creativity and engineering.",
      paragraph2:
        "When I'm not coding, I'm tutoring the next generation of developers and helping people discover the power of building with code.",
      stats: [
        { value: "MS", label: "Computer Science", sub: "CSU Fullerton" },
        { countTo: 10, suffix: "+", label: "Projects shipped", sub: "Web, AI & marketplace" },
        { value: "AI-First", label: "Developer", sub: "Agent architecture" },
        { value: "∞", label: "Curiosity level", sub: "Always learning", color: "#b347ff" },
      ],
      educationTitle: "Education",
      education: [
        { degree: "M.S. Computer Science", school: "California State University, Fullerton" },
        { degree: "B.S. Computer Science", school: "Illinois Institute of Technology" },
        { degree: "A.S. Computer Science", school: "Wilbur Wright College" },
      ],
      honorsTitle: "Honors & Awards",
      awards: [
        { label: "IIT Presidential Scholarship", color: "#f5ff00" },
        { label: "Class Salutatorian", color: "#00fff5" },
        { label: "Phi Theta Kappa", color: "#b347ff" },
        { label: "All Illinois Academic Team", color: "#00ff88" },
        { label: "Presidential Scholar Semi-finalist", color: "#ffaa33" },
      ],
    },
    experience: {
      title: "Where I've",
      titleAccent: "Been",
      items: [
        {
          title: "Computer Information Systems Tutor",
          company: "Wilbur Wright College — City Colleges of Chicago",
          period: "Oct 2025 — Present",
          color: "#00fff5",
          highlights: [
            "Individual and group tutoring across CIS subjects",
            "Embedded tutor in classrooms, leading workshops on study skills and learning strategies",
            "Develop personalized learning plans tailored to each student's strengths",
          ],
        },
        {
          title: "JavaScript Developer I",
          company: "AXANEXA",
          period: "Feb 2023 — Nov 2023",
          color: "#ff6b2b",
          highlights: [
            "Built a resource management application for Airbnb on monday.com, adopted by 200+ team members",
            "Launched the company's first Dependent Dropdown application on the Monday.com Marketplace",
            "Created role assignment system handling hundreds of tasks with smart API rate-limit management",
            "Pioneered UI/UX design strategy with reactive programming across devices",
          ],
        },
        {
          title: "Teaching Assistant — Intro to Computer Science",
          company: "Illinois Institute of Technology",
          period: "Aug 2016 — Dec 2017",
          color: "#b347ff",
          highlights: [
            "Assisted professor during lab sessions and graded assignments",
            "Held office hours for one-on-one mentoring and small group discussions",
          ],
        },
        {
          title: "Digital Communications, Institutional Advancement",
          company: "Illinois Institute of Technology",
          period: "Nov 2015 — Dec 2017",
          color: "#ffaa33",
          highlights: [
            "Administered IIT Alumni and Mies Van der Rohe Society websites",
            "Migrated media database to external storage, improving speed by 40%",
            "Produced Giving Day 2016 video and in-house content",
          ],
        },
        {
          title: "Mathematics Tutor",
          company: "Wilbur Wright College — City Colleges of Chicago",
          period: "Jun 2014 — May 2015",
          color: "#00ff88",
          highlights: [
            "Motivated students in STEM through personalized tutoring",
            "Guided students with Khan Academy and online resources for independent learning",
          ],
        },
      ],
    },
    projects: {
      title: "Things I've",
      titleAccent: "Built",
      subtitle: "Live sites open directly. Others expand on click.",
      expandHint: "Tap to expand",
      items: [],
    },
    now: {
      badge: "Now — March 2026",
      title: "What I'm",
      titleAccent: "Up To",
      subtitle: "A living snapshot. Updated regularly.",
      items: [
        { icon: "🧠", label: "Building", value: "ClawSwarm v2 — multi-agent orchestration", color: "#b347ff" },
        { icon: "⚡", label: "Shipping", value: "AgentAwake — AI productivity SaaS", color: "#ff6b2b" },
        { icon: "📚", label: "Teaching", value: "CIS at Wilbur Wright College", color: "#00fff5" },
        { icon: "🔍", label: "Exploring", value: "LLM reasoning, agent memory & RAG systems", color: "#ffaa33" },
        { icon: "🌐", label: "Learning", value: "Web3, smart contracts & on-chain apps", color: "#00ff88" },
        { icon: "🎯", label: "Goal", value: "Ship tools that genuinely change how people work", color: "#f5ff00" },
      ],
    },
    blog: {
      title: "Thoughts &",
      titleAccent: "Writing",
      subtitle: "Lessons from building, teaching, and thinking out loud.",
      read: "Read",
    },
    contact: {
      title: "Let's Build",
      titleAccent: "Something",
      subtitle:
        "Whether you're looking for a developer, collaborator, or just want to chat about AI agents, I'd love to hear from you.",
      cta: "Get In Touch",
      footerTech: "Built with Next.js, Tailwind CSS & Framer Motion",
    },
    blogPost: {
      back: "Back",
      getInTouch: "Get in touch",
      allPosts: "All posts",
      authorBio: "AI enthusiast · Full-stack developer · Educator",
    },
  },
  vi: {
    nav: {
      links: [
        { label: "Giới thiệu", href: "#about" },
        { label: "Kinh nghiệm", href: "#experience" },
        { label: "Dự án", href: "#projects" },
        { label: "Bài viết", href: "#blog" },
        { label: "Liên hệ", href: "#contact" },
      ],
      language: "Ngôn ngữ",
      english: "EN",
      vietnamese: "VI",
    },
    hero: {
      hello: "Xin chào, Thế giới",
      summary: {
        a: "Mình tạo ra",
        b: "công cụ trao quyền",
        c: ", xây dựng",
        d: "hệ thống có thể mở rộng",
        e: ", và truyền cảm hứng cho",
        f: "thế hệ tiếp theo dám mơ lớn hơn",
        g: ".",
      },
      roles: ["Kiến trúc sư AI Agent", "Lập trình viên Full-Stack", "Người xây dựng mã nguồn mở", "Nhà giáo dục & cố vấn"],
      ctaProjects: "Xem các dự án của mình",
      ctaContact: "Kết nối với mình",
    },
    about: {
      title: "Về",
      titleAccent: "Mình",
      location: "Người yêu thích AI · Chicago, IL",
      status: "Sẵn sàng cho cơ hội mới",
      paragraph1:
        "Mình tin công nghệ nên giúp mọi người theo đuổi ước mơ. Từ việc xây dựng ứng dụng marketplace được hàng trăm người tại Airbnb sử dụng, đến thiết kế hệ thống AI agent swarm có thể tự động viết, review và triển khai code, mình phát triển mạnh ở giao điểm giữa sáng tạo và kỹ thuật.",
      paragraph2:
        "Khi không code, mình dành thời gian kèm cặp thế hệ lập trình viên tiếp theo và giúp mọi người khám phá sức mạnh của việc tự xây dựng bằng code.",
      stats: [
        { value: "MS", label: "Khoa học Máy tính", sub: "CSU Fullerton" },
        { countTo: 10, suffix: "+", label: "Dự án đã triển khai", sub: "Web, AI & marketplace" },
        { value: "AI-First", label: "Nhà phát triển", sub: "Kiến trúc agent" },
        { value: "∞", label: "Mức độ tò mò", sub: "Luôn học hỏi", color: "#b347ff" },
      ],
      educationTitle: "Học vấn",
      education: [
        { degree: "Thạc sĩ Khoa học Máy tính", school: "California State University, Fullerton" },
        { degree: "Cử nhân Khoa học Máy tính", school: "Illinois Institute of Technology" },
        { degree: "Cao đẳng Khoa học Máy tính", school: "Wilbur Wright College" },
      ],
      honorsTitle: "Thành tích & Giải thưởng",
      awards: [
        { label: "Học bổng Tổng thống IIT", color: "#f5ff00" },
        { label: "Á khoa lớp", color: "#00fff5" },
        { label: "Phi Theta Kappa", color: "#b347ff" },
        { label: "All Illinois Academic Team", color: "#00ff88" },
        { label: "Bán kết học giả tổng thống", color: "#ffaa33" },
      ],
    },
    experience: {
      title: "Hành trình",
      titleAccent: "Của mình",
      items: [
        {
          title: "Gia sư Hệ thống Thông tin Máy tính",
          company: "Wilbur Wright College — City Colleges of Chicago",
          period: "10/2025 — Hiện tại",
          color: "#00fff5",
          highlights: [
            "Gia sư cá nhân và nhóm cho các môn CIS",
            "Hỗ trợ trực tiếp trên lớp, tổ chức workshop về kỹ năng học tập",
            "Xây dựng lộ trình học cá nhân theo thế mạnh của từng sinh viên",
          ],
        },
        {
          title: "Lập trình viên JavaScript I",
          company: "AXANEXA",
          period: "02/2023 — 11/2023",
          color: "#ff6b2b",
          highlights: [
            "Xây dựng ứng dụng quản lý tài nguyên cho Airbnb trên monday.com với hơn 200 người dùng",
            "Ra mắt ứng dụng Dependent Dropdown đầu tiên của công ty trên Monday.com Marketplace",
            "Tạo hệ thống phân công vai trò cho hàng trăm nhiệm vụ với quản lý API rate-limit thông minh",
            "Tiên phong chiến lược UI/UX phản hồi linh hoạt trên nhiều thiết bị",
          ],
        },
        {
          title: "Trợ giảng — Nhập môn Khoa học Máy tính",
          company: "Illinois Institute of Technology",
          period: "08/2016 — 12/2017",
          color: "#b347ff",
          highlights: [
            "Hỗ trợ giảng viên trong các buổi lab và chấm bài",
            "Tổ chức office hours để kèm 1-1 và thảo luận nhóm nhỏ",
          ],
        },
        {
          title: "Truyền thông số, Institutional Advancement",
          company: "Illinois Institute of Technology",
          period: "11/2015 — 12/2017",
          color: "#ffaa33",
          highlights: [
            "Quản trị website IIT Alumni và Mies Van der Rohe Society",
            "Di chuyển cơ sở dữ liệu media sang lưu trữ ngoài, cải thiện tốc độ 40%",
            "Sản xuất video Giving Day 2016 và nội dung nội bộ",
          ],
        },
        {
          title: "Gia sư Toán học",
          company: "Wilbur Wright College — City Colleges of Chicago",
          period: "06/2014 — 05/2015",
          color: "#00ff88",
          highlights: [
            "Khuyến khích sinh viên phát triển STEM qua gia sư cá nhân",
            "Hướng dẫn sử dụng Khan Academy và tài nguyên online để tự học",
          ],
        },
      ],
    },
    projects: {
      title: "Những gì mình",
      titleAccent: "Đã xây dựng",
      subtitle: "Trang live sẽ mở trực tiếp. Dự án còn lại bấm để mở rộng.",
      expandHint: "Nhấn để xem thêm",
      items: [],
    },
    now: {
      badge: "Hiện tại — Tháng 3/2026",
      title: "Mình đang",
      titleAccent: "Làm gì",
      subtitle: "Ảnh chụp nhanh theo thời gian thực. Cập nhật thường xuyên.",
      items: [
        { icon: "🧠", label: "Đang xây", value: "ClawSwarm v2 — điều phối đa tác tử", color: "#b347ff" },
        { icon: "⚡", label: "Đang ra mắt", value: "AgentAwake — SaaS năng suất dùng AI", color: "#ff6b2b" },
        { icon: "📚", label: "Đang dạy", value: "CIS tại Wilbur Wright College", color: "#00fff5" },
        { icon: "🔍", label: "Đang khám phá", value: "LLM reasoning, bộ nhớ agent & hệ thống RAG", color: "#ffaa33" },
        { icon: "🌐", label: "Đang học", value: "Web3, smart contracts & ứng dụng on-chain", color: "#00ff88" },
        { icon: "🎯", label: "Mục tiêu", value: "Xây công cụ thật sự thay đổi cách mọi người làm việc", color: "#f5ff00" },
      ],
    },
    blog: {
      title: "Góc nhìn &",
      titleAccent: "Bài viết",
      subtitle: "Bài học từ xây dựng sản phẩm, giảng dạy và chia sẻ góc nhìn.",
      read: "Đọc",
    },
    contact: {
      title: "Cùng xây",
      titleAccent: "Điều gì đó",
      subtitle: "Nếu bạn đang tìm một developer, cộng sự, hoặc chỉ muốn trò chuyện về AI agents, mình rất sẵn lòng kết nối.",
      cta: "Liên hệ với mình",
      footerTech: "Xây dựng với Next.js, Tailwind CSS & Framer Motion",
    },
    blogPost: {
      back: "Quay lại",
      getInTouch: "Liên hệ",
      allPosts: "Tất cả bài viết",
      authorBio: "Người yêu thích AI · Lập trình viên full-stack · Nhà giáo dục",
    },
  },
};
