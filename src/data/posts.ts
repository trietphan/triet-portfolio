export const posts = [
  {
    slug: "building-clawswarm-app",
    title: "Building ClawSwarm: From CLI to Production SaaS",
    excerpt: "How a side experiment in multi-agent coordination became a full platform — and what we learned about shipping AI infrastructure in public.",
    date: "Apr 2026",
    readTime: "7 min read",
    color: "#b347ff",
    tag: "AI",
    content: `What started as a local script to orchestrate a few AI agents has become something I'm genuinely excited to put in front of people: ClawSwarm — a multi-agent AI platform where specialized agents collaborate, critique each other's work, and ship real results.

Here's the honest story of how we got here.

The core idea was frustratingly simple: single AI agents fail at complex tasks not because they're dumb, but because they can't disagree with themselves. They have no peer review. They have no specialization. They just... try everything at once and hope.

So I built a system where agents have defined roles. CodeClaw handles implementation. ResearchClaw handles analysis and investigation. OpsClaw handles infrastructure and deployment. Each agent is good at exactly one thing and hands off when it reaches its edge.

The quality gate was the real unlock. Every agent output gets scored 0–10 by a separate review layer. Scores of 8 or higher auto-approve and continue the pipeline. Scores between 5 and 7 escalate to a human via Discord — a quick judgment call that takes 30 seconds. Scores below 5 trigger automatic rework with specific feedback, looping back through the agent until it gets it right. We cap rework cycles at 3 to prevent infinite loops.

The result? About 65% of all tasks auto-complete without any human intervention. The other 35% get a quick human touch that takes under a minute. Complex software tasks that used to take hours now run overnight.

What surprised me most was how much better the outputs got when agents stopped trying to do everything. Specialization isn't just an engineering pattern — it's how high-performing teams actually work.

We built the OSS CLI (clawswarm on npm) first so other developers can run this locally against their own agents and models. The hosted platform at clawswarm.app adds a real-time streaming dashboard, team management, blueprint templates, and persistent run history.

The next frontier is agent memory — teaching these systems not just to complete tasks, but to learn from each run, recognize patterns, and get measurably better over time. That's what we're building toward.

If you're thinking about how to structure AI agents for real work — not demos, not toys, but actual production pipelines — come try ClawSwarm. The OSS version is free and the platform has a free tier. I want to hear where it breaks for your use case.`,
  },
  {
    slug: "ai-agent-swarms",
    title: "Why I'm Betting on AI Agent Swarms",
    excerpt: "Single AI agents hit a ceiling fast. Swarms of specialized agents with quality gates can go much further.",
    date: "Mar 2026",
    readTime: "5 min read",
    color: "#ff6b2b",
    tag: "AI",
    content: `The moment I started building ClawSwarm, I realized something most people miss about AI: a single agent, no matter how powerful, will always be limited by its context window and single perspective.

That's why I went all-in on swarm architecture. ClawSwarm uses specialized chiefs for coding, research, and operations, each feeding a shared quality gate system.

The key is scoring. High scores auto-approve, medium scores escalate to human review, and low scores trigger automatic rework with targeted feedback.

This keeps humans in the loop while removing bottlenecks on routine work. The result is faster delivery without sacrificing quality.

I believe swarm architectures will become the default way we build with AI because specialization plus peer review beats a lone model in most real workflows.`,
  },
  {
    slug: "monday-marketplace",
    title: "Shipping Your First Monday.com Marketplace App",
    excerpt: "Building workflow tools for 200+ users taught me to solve one problem exceptionally well.",
    date: "Feb 2026",
    readTime: "4 min read",
    color: "#ffaa33",
    tag: "Dev",
    content: `At AXANEXA, our Dependent Dropdown app was the first marketplace app we shipped.

The idea was simple: options in one dropdown depend on the value selected in another. But implementing it at scale required careful state management and API usage.

Monday.com's GraphQL API is strict on rate limits, so I built a request queue that batches intelligently and keeps performance stable.

The biggest lesson wasn't technical: user requests are often symptoms. Watching real workflows revealed what mattered most.

Don't build a Swiss Army knife. Build the best screwdriver for a painful problem.`,
  },
  {
    slug: "teaching-code",
    title: "Teaching Code Changed How I Write It",
    excerpt: "Teaching CIS students made my production code clearer, more intentional, and easier to maintain.",
    date: "Jan 2026",
    readTime: "3 min read",
    color: "#00fff5",
    tag: "Education",
    content: `Teaching forces precision. When students ask why a loop or data structure was chosen, vague answers don't work.

I learned to explain intent, tradeoffs, and readability—not just syntax.

The embedded tutoring model is powerful because you see confusion exactly where abstraction meets implementation.

My rule is simple: don't give answers too early. Ask guiding questions so students discover the solution.

That same approach made my own code cleaner: clearer names, stronger error handling, and simpler architecture decisions.`,
  },
];

export type Post = (typeof posts)[0];
