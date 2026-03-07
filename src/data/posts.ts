export const posts = [
  {
    slug: "ai-agent-swarms",
    title: "Why I'm Betting on AI Agent Swarms",
    excerpt:
      "Single AI agents hit a ceiling fast. Swarms of specialized agents, each with a narrow focus and quality gates, can accomplish what no single model can.",
    date: "Mar 2026",
    readTime: "5 min read",
    color: "#b347ff",
    tag: "AI",
    content: `The moment I started building ClawSwarm, I realized something most people miss about AI: a single agent, no matter how powerful, will always be limited by its context window, its single perspective, and its inability to self-review.

That's why I went all-in on swarm architecture. ClawSwarm uses three specialized chiefs — CodeClaw for writing code, ResearchClaw for gathering context and analysis, and OpsClaw for infrastructure and deployment. Each chief operates independently but feeds into a shared quality gate system.

The magic is in the scoring. Every output gets evaluated on a 1-10 scale. Scores of 8 or above are auto-approved and deployed. Scores between 5-7 get escalated to human review — that's where I step in to provide feedback. Anything below 5 gets automatically reworked with specific notes on what went wrong.

This three-tier system means the swarm is self-correcting for most tasks, but humans stay in the loop for edge cases. After running 50+ soak tests, the auto-approve rate sits around 65%, which means most work flows through without bottlenecks while maintaining quality.

The real breakthrough was adding real-time WebSocket streaming. Watching agents think, write, and review each other's work in real-time isn't just useful for debugging — it fundamentally changes how you trust AI systems. When you can see the reasoning, you can trust the output.

I believe swarm architectures will become the default way we build with AI. Not because any single model isn't good enough, but because specialization and peer review produce better outcomes than any lone genius — artificial or otherwise.`,
  },
  {
    slug: "monday-marketplace",
    title: "Shipping Your First Monday.com Marketplace App",
    excerpt:
      "From idea to marketplace listing, building workflow tools for 200+ users taught me that the best developer tools solve one problem extraordinarily well.",
    date: "Feb 2026",
    readTime: "4 min read",
    color: "#ffaa33",
    tag: "Dev",
    content: `When I joined AXANEXA, nobody at the company had shipped a marketplace app before. The Dependent Dropdown was our first — and the journey from "this would be useful" to "200+ people use this daily" taught me more about product development than any course ever could.

The core idea was simple: let users create dropdown menus where the options in one dropdown depend on what you selected in another. If you pick "Engineering" as the department, the role dropdown should only show engineering roles. Monday.com didn't have this natively, and teams were building hacky workarounds everywhere.

The technical challenge was managing state across hundreds of items while respecting Monday.com's API rate limits. Their GraphQL API is powerful but strict — hammer it too hard and you'll get throttled. I built a queuing system that batches requests intelligently, loading hundreds of tasks without hitting the ceiling.

But the hardest part wasn't technical. It was understanding what users actually needed versus what they asked for. Early feedback was all over the place — "add more customization," "make it simpler," "support nested dependencies three levels deep." The breakthrough came when I started watching how people actually used the tool in their workflows rather than listening to feature requests.

The key lesson: solve one problem so well that people can't imagine going back to the old way. Don't build a Swiss Army knife. Build the world's best screwdriver.

Getting listed on the Monday.com Marketplace was its own adventure — documentation, review processes, security checks. But seeing that first notification that a team you've never met installed your app? That feeling is why I build things.`,
  },
  {
    slug: "teaching-code",
    title: "Teaching Code Changed How I Write It",
    excerpt:
      "Tutoring CIS students forced me to rethink everything I thought I knew. When you have to explain recursion to someone who's never seen a for-loop, your own code gets clearer too.",
    date: "Jan 2026",
    readTime: "3 min read",
    color: "#00fff5",
    tag: "Education",
    content: `There's a moment in every tutoring session where the student's eyes shift from confusion to understanding. It's subtle — a slight nod, a pause where they were previously rushing, the first time they say "oh wait, I think I get it" and actually mean it.

I've been tutoring in some form since 2014, starting with math at Wilbur Wright College, then CS at IIT, and now back at Wright as a CIS tutor. Each round has made me a fundamentally better developer — not because I'm practicing syntax, but because teaching forces you to understand why things work, not just how.

When a student asks "why do we use a for-loop here instead of a while-loop?" you can't just say "because it's cleaner." You have to articulate the actual reasoning: we know exactly how many iterations we need, the loop variable has a clear lifecycle, and the intent is immediately readable. That kind of reasoning, done hundreds of times, rewires how you think about your own code.

The embedded tutoring model at Wright has been particularly impactful. Instead of waiting for students to come to office hours (most won't), I'm in the classroom during instruction. I can see exactly where confusion starts — it's almost always at the point where abstract concepts meet concrete implementation.

My approach: never give the answer. Ask the next question. "What do you think this line does?" "What would happen if we changed this value?" "Where do you think the bug is?" Students who discover solutions retain them. Students who are told solutions forget them by next week.

The unexpected side effect: my production code has gotten dramatically better. When you spend hours explaining why clear variable names matter, you stop writing cryptic one-liners. When you teach error handling, you actually implement it.

Teaching isn't a side gig for me — it's how I stay sharp.`,
  },
];

export type Post = (typeof posts)[0];
