export const posts = [
  {
    slug: "ai-agent-swarms",
    title: "Why I'm Betting on AI Agent Swarms",
    titleVi: "Vì sao mình đặt cược vào AI Agent Swarm",
    excerpt: "Single AI agents hit a ceiling fast. Swarms of specialized agents with quality gates can go much further.",
    excerptVi: "Một AI agent đơn lẻ sớm chạm trần. Swarm gồm các agent chuyên biệt và cổng kiểm định có thể đi xa hơn nhiều.",
    date: "Mar 2026",
    dateVi: "Tháng 3/2026",
    readTime: "5 min read",
    readTimeVi: "5 phút đọc",
    color: "#b347ff",
    tag: "AI",
    tagVi: "AI",
    content: `The moment I started building ClawSwarm, I realized something most people miss about AI: a single agent, no matter how powerful, will always be limited by its context window and single perspective.

That's why I went all-in on swarm architecture. ClawSwarm uses specialized chiefs for coding, research, and operations, each feeding a shared quality gate system.

The key is scoring. High scores auto-approve, medium scores escalate to human review, and low scores trigger automatic rework with targeted feedback.

This keeps humans in the loop while removing bottlenecks on routine work. The result is faster delivery without sacrificing quality.

I believe swarm architectures will become the default way we build with AI because specialization plus peer review beats a lone model in most real workflows.`,
    contentVi: `Khi bắt đầu xây ClawSwarm, mình nhận ra điều nhiều người bỏ lỡ về AI: một agent dù mạnh đến đâu vẫn bị giới hạn bởi context window và góc nhìn đơn lẻ.

Vì vậy mình đi theo kiến trúc swarm. ClawSwarm dùng các chief chuyên biệt cho code, research và operations, cùng hội tụ vào một hệ thống quality gate chung.

Mấu chốt nằm ở cơ chế chấm điểm. Điểm cao thì tự duyệt, điểm trung bình thì chuyển sang review bởi con người, điểm thấp thì tự động làm lại kèm phản hồi cụ thể.

Cách này giúp con người vẫn kiểm soát các trường hợp khó nhưng không làm nghẽn các tác vụ thường lệ. Kết quả là tốc độ nhanh hơn mà chất lượng vẫn giữ vững.

Mình tin swarm sẽ trở thành mô hình mặc định khi xây hệ thống AI, vì chuyên môn hóa cộng với peer review thường hiệu quả hơn một mô hình đơn lẻ.`
  },
  {
    slug: "monday-marketplace",
    title: "Shipping Your First Monday.com Marketplace App",
    titleVi: "Ra mắt ứng dụng Monday.com Marketplace đầu tiên",
    excerpt: "Building workflow tools for 200+ users taught me to solve one problem exceptionally well.",
    excerptVi: "Xây công cụ workflow cho hơn 200 người dùng dạy mình rằng: hãy giải quyết một vấn đề thật xuất sắc.",
    date: "Feb 2026",
    dateVi: "Tháng 2/2026",
    readTime: "4 min read",
    readTimeVi: "4 phút đọc",
    color: "#ffaa33",
    tag: "Dev",
    tagVi: "Phát triển",
    content: `At AXANEXA, our Dependent Dropdown app was the first marketplace app we shipped.

The idea was simple: options in one dropdown depend on the value selected in another. But implementing it at scale required careful state management and API usage.

Monday.com's GraphQL API is strict on rate limits, so I built a request queue that batches intelligently and keeps performance stable.

The biggest lesson wasn't technical: user requests are often symptoms. Watching real workflows revealed what mattered most.

Don't build a Swiss Army knife. Build the best screwdriver for a painful problem.`,
    contentVi: `Tại AXANEXA, ứng dụng Dependent Dropdown là sản phẩm Marketplace đầu tiên mà team mình phát hành.

Ý tưởng rất đơn giản: lựa chọn ở dropdown này phụ thuộc vào giá trị của dropdown trước đó. Nhưng để chạy tốt ở quy mô lớn, cần quản lý state và API thật chặt.

GraphQL API của Monday.com có giới hạn rate-limit khá nghiêm, nên mình xây cơ chế queue để gom và xử lý request thông minh, giữ hiệu năng ổn định.

Bài học lớn nhất lại không thuần kỹ thuật: yêu cầu người dùng thường chỉ là biểu hiện bề mặt. Quan sát workflow thực tế mới cho thấy điều họ cần nhất.

Đừng xây dao đa năng cho mọi thứ. Hãy xây chiếc tua-vít tốt nhất cho đúng một nỗi đau lớn.`
  },
  {
    slug: "teaching-code",
    title: "Teaching Code Changed How I Write It",
    titleVi: "Dạy code đã thay đổi cách mình viết code",
    excerpt: "Teaching CIS students made my production code clearer, more intentional, and easier to maintain.",
    excerptVi: "Việc dạy sinh viên CIS khiến code production của mình rõ ràng hơn, có chủ đích hơn và dễ bảo trì hơn.",
    date: "Jan 2026",
    dateVi: "Tháng 1/2026",
    readTime: "3 min read",
    readTimeVi: "3 phút đọc",
    color: "#00fff5",
    tag: "Education",
    tagVi: "Giáo dục",
    content: `Teaching forces precision. When students ask why a loop or data structure was chosen, vague answers don't work.

I learned to explain intent, tradeoffs, and readability—not just syntax.

The embedded tutoring model is powerful because you see confusion exactly where abstraction meets implementation.

My rule is simple: don't give answers too early. Ask guiding questions so students discover the solution.

That same approach made my own code cleaner: clearer names, stronger error handling, and simpler architecture decisions.`,
    contentVi: `Dạy học buộc mình phải chính xác. Khi sinh viên hỏi vì sao chọn vòng lặp hay cấu trúc dữ liệu đó, câu trả lời mơ hồ là không đủ.

Mình học cách giải thích mục đích, đánh đổi và độ dễ đọc — chứ không chỉ cú pháp.

Mô hình hỗ trợ ngay trên lớp rất hiệu quả vì có thể nhìn thấy điểm rối đúng lúc khái niệm trừu tượng chạm vào triển khai cụ thể.

Nguyên tắc của mình: đừng đưa đáp án quá sớm. Hãy đặt câu hỏi dẫn dắt để người học tự tìm ra lời giải.

Cách tiếp cận đó quay lại cải thiện chính code của mình: tên biến rõ hơn, xử lý lỗi tốt hơn, và quyết định kiến trúc đơn giản hơn.`
  },
];

export type Post = (typeof posts)[0];
