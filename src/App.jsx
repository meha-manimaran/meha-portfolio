import React, { useState, useEffect, useRef } from 'react';
import instaToolMockup1 from './assets/instantTool/InstaTool_mockup1.png';
import instaToolMockup2 from './assets/instantTool/InstaTool_mockup2.png';
import instaToolMockup3 from './assets/instantTool/InstaTool_mockup3.png';
import instaToolMockup4 from './assets/instantTool/InstaTool_mockup4.png';
import instaToolMockup5 from './assets/instantTool/InstaTool_mockup5.png';
import instaToolMockup6 from './assets/instantTool/InstaTool_mockup6.png';
import instaToolMockup7 from './assets/instantTool/InstaTool_mockup7.png';
import instaToolMockup8 from './assets/instantTool/InstaTool_mockup8.png';
import instaToolMockup9 from './assets/instantTool/InstaTool_mockup9.png';
import slugMatesScreen01 from './assets/slugmates/SlugMates_Screen_01.png';
import slugMatesScreen02 from './assets/slugmates/SlugMates_Screen_02.png';
import slugMatesScreen03 from './assets/slugmates/SlugMates_Screen_03.png';
import slugMatesScreen04 from './assets/slugmates/SlugMates_Screen_04.png';
import slugMatesScreen05 from './assets/slugmates/SlugMates_Screen_05.png';
import slugMatesScreen06 from './assets/slugmates/SlugMates_Screen_06.png';
import slugMatesScreen07 from './assets/slugmates/SlugMates_Screen_07.png';
import slugMatesScreen08 from './assets/slugmates/SlugMates_Screen_08.png';
import slugMatesPrd from './assets/slugmates/SlugMates_PRD.docx.pdf';
import tallyrusMockup1 from './assets/Tallyrus_mockups/tallyrus_mockup.png';
import tallyrusMockup2 from './assets/Tallyrus_mockups/tallyrus_mockup_2.png';
import tallyrusMockup3 from './assets/Tallyrus_mockups/tallyrus_mockup_3.png';
import tallyrusMockup4 from './assets/Tallyrus_mockups/tallyrus_mockup_4.png';
import headshot from './assets/Headshot.JPG';
import boxsyLogo from './assets/boxsy_logo.png';
import tallyrusLogo from './assets/tallyrus_logo.png';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// Reveal on scroll
const RevealOnScroll = ({ children, delay = 0, direction = 'up', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = { up: 'translateY(60px)', down: 'translateY(-60px)', left: 'translateX(60px)', right: 'translateX(-60px)', scale: 'scale(0.8)' };

  return (
    <div ref={ref} style={{ ...style, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translate(0) scale(1)' : transforms[direction], transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
};

// Text reveal
const TextReveal = ({ text, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(100%)', transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 30}ms` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// Case study section (non-collapsible)
const CollapsibleSection = ({ title, number, color, children }) => (
  <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(212,132,154,0.1)' }}>
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        background: `${color}10`,
        borderBottom: '1px solid rgba(212,132,154,0.08)',
        fontFamily: '"Outfit", sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: color }}>{number}</span>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229', margin: 0 }}>{title}</h3>
      </div>
    </div>
    <div style={{ padding: '0 1.5rem 1.5rem' }}>
      {children}
    </div>
  </div>
);

// Magnetic element
const MagneticElement = ({ children, style, strength = 0.3 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: (e.clientX - rect.left - rect.width / 2) * strength, y: (e.clientY - rect.top - rect.height / 2) * strength });
  };

  return (
    <div ref={ref} style={{ ...style, transform: `translate(${position.x}px, ${position.y}px)`, transition: position.x === 0 ? 'transform 0.5s ease-out' : 'none' }} onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })}>
      {children}
    </div>
  );
};

// Case Studies Data - Gold Standard Format
const caseStudiesData = [
  {
    id: 'instatools', title: 'InstaTools', emoji: '🛡️', badge: 'B2B SaaS Product',
    subtitle: 'Pay-per-use compliance tools for early-stage startups',
    color: '#d4849a',
    overview: { role: 'Product Manager', timeline: 'Sep 2025 - Dec 2025 (4 months)', team: '1 PM (me), 1 Engineer', tools: ['Figma', 'Replit'], status: 'Completed & Launched' },
    links: { prototype: null, prd: null, live: 'https://instatools.co/' },
    
    // 1. Problem Statement
    problemStatement: {
      user: 'Startup founders and operations leads at early-stage companies (Seed to Series A) who handle compliance as part of their broader responsibilities.',
      problem: 'These teams need enterprise-grade compliance tools (OFAC sanctions screening, PII detection, contract analysis) but are locked out by expensive subscriptions ($500+/month), complex implementations requiring dedicated personnel, and rigid annual contracts that don\'t match their variable usage patterns.',
      whyExistingFail: 'Existing solutions like Jumio, Onfido, and Persona are built for enterprises with dedicated compliance teams and predictable high-volume needs. They require sales calls, lengthy onboarding, annual commitments, and offer no self-serve option. Startups either overpay for unused capacity or skip compliance entirely—risking regulatory issues.',
      quote: {
        text: '"I ran one OFAC check last quarter but I\'m paying $500/month for a tool designed for banks processing thousands daily. It\'s insane."',
        author: 'Ops Lead, 15-person fintech startup'
      }
    },
    
    // 2. User & Context
    userContext: {
      personas: [
        {
          name: 'Sarah - Startup Ops Lead',
          description: 'Wears many hats at a 20-person startup. Handles compliance alongside HR, finance, and office management. Not a compliance expert.',
          jtbd: 'When I need to verify a new vendor or contractor, I want to quickly check them against sanctions lists so I can close deals without compliance anxiety.',
          constraints: ['No compliance background', 'Limited budget (<$100/month)', 'Needs results in minutes, not days', 'Can\'t justify enterprise sales process']
        },
        {
          name: 'Marcus - Fintech Founder',
          description: 'Technical founder building a payments app. Understands APIs but doesn\'t have time to build compliance infrastructure.',
          jtbd: 'When processing user data, I need to detect and redact PII automatically so I can stay compliant without building custom tooling.',
          constraints: ['Time-strapped (coding 60+ hrs/week)', 'Needs API-first solution', 'SOC2 audit coming up', 'Variable usage month-to-month']
        }
      ],
      interviewQuote: {
        text: '"I spent 3 hours last week manually checking names against the OFAC list in a spreadsheet. There has to be a better way."',
        author: 'Founder, seed-stage startup'
      }
    },
    
    // 3. Success Metrics
    successMetrics: {
      northStar: {
        metric: 'Weekly Active Compliance Checks',
        rationale: 'Measures core value delivery—users actively using the platform to run compliance checks indicates we\'re solving their problem.'
      },
      supporting: [
        { metric: 'Time-to-first-check', target: '< 5 minutes', rationale: 'Self-serve promise requires instant value' },
        { metric: 'Check completion rate', target: '> 90%', rationale: 'Users who start a check should finish it' },
        { metric: 'Credit purchase repeat rate', target: '> 40% within 30 days', rationale: 'Indicates ongoing value, not one-time use' }
      ],
      measurement: 'Track via Mixpanel events on check initiation, completion, and credit purchases. Weekly cohort analysis to monitor retention.'
    },
    
    // 4. Solution Overview
    solutionOverview: {
      whatWeBuilt: 'A self-serve compliance platform with four core tools (OFAC screening, PII detection, contract analysis, email verification) unified by a credit-based pricing system. Users buy credits and spend them across any tool—no subscriptions, no minimums, no expiration.',
      whyThisSolution: 'Credit-based pricing directly addresses the "unpredictable usage" pain point. Self-serve removes the enterprise sales cycle barrier. Four tools in one platform solves fragmentation.',
      tradeoffs: [
        { decision: 'Credits over subscription', why: '73% of interviewed users preferred pay-per-use. Subscriptions would recreate the exact problem we\'re solving.' },
        { decision: 'Breadth over depth', why: 'Users were juggling 5+ tools. One platform with good-enough features beats 5 best-in-class tools they can\'t afford.' },
        { decision: 'Self-serve only (no enterprise tier at launch)', why: 'Enterprise sales cycle is 3-6 months. Self-serve lets us validate and iterate in weeks.' }
      ],
      notBuilt: [
        'Real-time monitoring/alerts (added complexity, not core need)',
        'Custom integrations (API access planned for v2)',
        'White-labeling (enterprise feature, not MVP)',
        'Mobile app (desktop-first workflow for compliance tasks)'
      ]
    },
    
    // 5. MVP Scope & Prioritization
    mvpScope: {
      framework: 'RICE (Reach, Impact, Confidence, Effort)',
      mvpFeatures: [
        { feature: 'OFAC Sanctions Screening', priority: 'P0 - MVP', rice: 'High reach (every startup needs this), high impact, high confidence, low effort (Treasury API is free)' },
        { feature: 'PII Detection', priority: 'P0 - MVP', rice: 'High reach (privacy regulations universal), high impact, medium confidence, medium effort' },
        { feature: 'Credit purchase flow', priority: 'P0 - MVP', rice: 'Required for monetization—no credits, no business' },
        { feature: 'Contract Analysis', priority: 'P1 - V1.1', rice: 'Medium reach, high impact, medium confidence, high effort (AI complexity)' },
        { feature: 'Email Verification', priority: 'P1 - V1.1', rice: 'High reach but low differentiation (many free tools exist)' },
        { feature: 'Team workspaces', priority: 'P2 - V2', rice: 'Blocks enterprise expansion but not needed for initial users' },
        { feature: 'API access', priority: 'P2 - V2', rice: 'Developer persona wants this but self-serve UI validates faster' }
      ],
      killed: [
        { feature: 'Real-time monitoring dashboard', reason: 'Added complexity without improving core metric. Users need point-in-time checks, not ongoing monitoring.' },
        { feature: 'Slack integration', reason: 'Nice-to-have that would delay launch by 2+ weeks. Can add post-validation.' },
        { feature: 'Custom risk scoring', reason: 'Premature optimization. Standard scoring sufficient for MVP users.' }
      ]
    },
    
    // 6. PRD Lite
    prdLite: {
      goals: [
        'Enable startups to run compliance checks in under 5 minutes with zero setup',
        'Provide transparent, predictable pricing that scales with actual usage',
        'Deliver enterprise-grade accuracy without enterprise complexity'
      ],
      nonGoals: [
        'Replacing dedicated compliance teams at large enterprises',
        'Providing legal advice or compliance consulting',
        'Building custom integrations for individual customers',
        'Real-time continuous monitoring'
      ],
      functionalRequirements: [
        'User can create account with email (no sales call required)',
        'User can purchase credits via Stripe ($10 minimum)',
        'User can upload file (CSV, PDF, DOCX) up to 100MB for PII detection',
        'User can input single name or batch upload for OFAC screening',
        'System returns results with confidence scores and match details',
        'User can export results as CSV, JSON, or PDF',
        'User can view credit balance and usage history'
      ],
      edgeCases: [
        'Partial name matches in OFAC (fuzzy matching with confidence threshold)',
        'Corrupted file uploads (graceful error handling, refund credits)',
        'Rate limiting for abuse prevention (100 checks/minute cap)',
        'Credit balance reaches zero mid-batch (queue remaining, prompt for purchase)'
      ],
      outOfScope: [
        'Multi-language support (English only for MVP)',
        'Offline access',
        'Bulk enterprise pricing negotiations',
        'Custom retention policies'
      ]
    },
    
    // 7. Wireframes/UI
    wireframes: {
      description: 'UI mockups and user flow diagrams available in Figma.',
      linkPlaceholder: '#', // Replace with actual Figma link
      keyFlows: [
        'Signup → Purchase Credits → Run First Check → View Results → Export',
        'Return User → Select Tool → Upload/Input → Results → Export'
      ],
      designDecisions: [
        { decision: 'Single-page tool interface', rationale: 'Minimize clicks to value. User should see results without navigating away.' },
        { decision: 'Credit balance always visible', rationale: 'Transparency builds trust. No surprise charges.' },
        { decision: 'Inline results (no email delivery)', rationale: 'Instant gratification. Users want answers now, not in their inbox.' }
      ]
    },
    
    // 8. Technical Implementation + AI + Architecture
    technicalImplementation: {
      platform: 'Full-stack SaaS built on Replit',
      stack: 'React + TypeScript, Express + Node.js, PostgreSQL + Drizzle ORM',
      deployment: 'Replit integrated hosting with continuous deployment',
      whyReplit: [
        'Went from concept to live beta in 4 months instead of an estimated 8-12 months with traditional infra setup.',
        'Real-time collaboration reduced local setup overhead and accelerated daily product-engineering syncs.',
        'Integrated PostgreSQL provisioning and migrations removed weeks of DevOps setup.',
        'Shipped 60+ beta updates without custom deployment configuration.'
      ]
    },
    aiIntegration: [
      {
        title: 'PII Detection & Redaction',
        challenge: 'Detect 20+ PII types across mixed file formats while minimizing false positives.',
        approach: 'Hybrid pipeline: regex for structured data + LLM validation for context-sensitive matches.',
        implementation: 'OCR -> entity extraction -> policy-based redaction with format-preserving output.',
        impact: '94% precision and 98% recall on 2,000+ beta documents.'
      },
      {
        title: 'Contract Clause Analysis',
        challenge: 'Founders needed fast risk review of legal terms without manual line-by-line review.',
        approach: 'LLM-based clause classification, term extraction, and confidence scoring for human review.',
        implementation: 'Prompt templates classify clause risk and extract key terms like notice periods and liability limits.',
        impact: 'Reduced standard SaaS contract review from ~2 hours to ~15 minutes.'
      },
      {
        title: 'OFAC Sanctions Screening',
        challenge: 'Name matching required handling transliteration and spelling variance.',
        approach: 'Fuzzy/phonetic matching with adjustable sensitivity levels by use case.',
        implementation: 'Cross-referenced against 15,000+ sanctioned entities with confidence scoring.',
        impact: '99.7% match rate on published OFAC test cases.'
      },
      {
        title: 'AI-Assisted Development',
        challenge: 'Move fast without sacrificing quality during rapid beta iteration.',
        approach: 'Used Replit AI + ChatGPT for boilerplate generation, test scaffolding, and documentation drafts.',
        implementation: 'AI-generated initial endpoint tests and OpenAPI drafts, then manually refined.',
        impact: 'Estimated 6-8 weeks of development time saved.'
      }
    ],
    systemArchitecture: [
      {
        title: 'Multi-Tenant Workspace Model',
        detail: 'Company -> Workspace -> Users with workspace-scoped queries and RBAC (owner/admin/member).',
        impact: 'Supports SMB to mid-market expansion without re-architecting the core data model.'
      },
      {
        title: 'Plugin Tool Architecture',
        detail: 'Each tool ships with its own definition, processor, and validator; frontend has tool-specific result adapters.',
        impact: 'Added three new tools in five weeks, with 1-2 week delivery per tool.'
      },
      {
        title: 'File Processing Pipeline',
        detail: 'Upload -> scan -> parse/OCR -> AI processing -> annotation/redaction -> exports (PDF/CSV/JSON).',
        impact: 'Unified processing across PDF, DOCX, XLSX, and images with consistent output quality.'
      },
      {
        title: 'Provider Failover + Resilience',
        detail: 'Primary/fallback providers with circuit breakers, retries, and health checks.',
        impact: 'Maintained high API reliability during upstream provider instability.'
      },
      {
        title: 'Async Job Processing',
        detail: 'Long-running analyses moved to background jobs with status tracking and webhook callbacks.',
        impact: 'Prevented request blocking for 30-60 second workloads.'
      },
      {
        title: 'Transactional Credit Ledger',
        detail: 'Credit deductions handled with DB transactions and audit logging to avoid race conditions.',
        impact: 'Billing remained accurate and auditable under concurrent usage.'
      }
    ],
    
    // 9. Launch & GTM
    launchGtm: {
      first100Users: [
        'Posted in 5 startup Slack communities (Indie Hackers, On Deck, South Park Commons)',
        'Direct outreach to 20 founders from my network who mentioned compliance pain',
        'Product Hunt launch (drove 60% of initial signups)',
        'LinkedIn post sharing the "why" story (3,000+ impressions)'
      ],
      channelPriority: 'Startup communities first. These users have immediate pain and low switching costs. Enterprise marketing would be premature.',
      onboarding: [
        'No signup friction (email + password only)',
        'Immediate free trial (10 credits, no card required)',
        'Interactive first-check walkthrough',
        'Results explanation tooltip (what does this match score mean?)'
      ]
    },
    
    // 10. Results & Learnings
    results: {
      launched: true,
      metrics: [
        { metric: 'Beta signups', target: '20', actual: '32', status: '+60%', context: 'Exceeded initial acquisition target' },
        { metric: 'Time-to-first-check', target: '< 5 min', actual: '4.2 min', status: 'Met', context: 'Validated self-serve onboarding goal' },
        { metric: 'Checks completed', target: '150', actual: '247', status: '+65%', context: 'Strong early usage across tools' },
        { metric: 'Repeat purchase rate', target: '40%', actual: '32%', status: 'Below target', context: 'Retention improvement opportunity' },
        { metric: 'Multi-tool adoption', target: '25%', actual: '18%', status: 'Below target', context: 'Discovery and upsell need work' },
        { metric: 'API uptime', target: '99.5%', actual: '99.8%', status: 'Met', context: 'Reliable beta operations' }
      ],
      feedback: [
        { quote: '"This is what I wished enterprise compliance tools were. I spent $12 and got exactly what I needed."', author: 'Founder, Series A fintech startup' },
        { quote: '"PII detection saved us roughly 40 hours before our audit."', author: 'Ops Lead, B2B SaaS company' },
        { quote: '"We integrated OFAC screening in two days instead of building from scratch."', author: 'CTO, API customer' }
      ],
      learnings: [
        { learning: 'Pay-per-use pricing removed adoption friction', detail: 'Most beta users cited "no commitment" as the reason they tried InstaTools over subscription competitors.' },
        { learning: 'Self-serve onboarding worked', detail: 'Most users completed their first check without support, confirming UX simplicity was sufficient for MVP.' },
        { learning: 'Retention needs active re-engagement', detail: 'Repeat purchase trailed target, likely due to episodic compliance usage. Next bets: reminders + workspace notifications.' }
      ]
    },
    
    // 11. What's Next
    whatsNext: {
      immediate: [
        'Email reminder system (14-day inactivity + unused credits trigger) to improve repeat purchases.',
        'Slack workspace integration for check completion and low-credit alerts.',
        'Post-check upsell flow to increase cross-tool adoption.'
      ],
      longTerm: [
        'Contract analysis v2 (risk scoring, clause-level summaries, negotiation suggestions).',
        'Team workspace expansion (shared credit pools, usage reporting, role permissions).',
        'Enterprise/API expansion (SSO, SDKs, webhooks v2, audit export controls).'
      ],
      risks: [
        'OpenAI pricing changes could squeeze margins',
        'Larger players could add bundled compliance features',
        'Regulatory changes could shift compliance requirements'
      ]
    }
  },
  
  {
    id: 'slugmates', title: 'Slugmates', emoji: '🏠', badge: 'Personal Project',
    subtitle: 'Roommate matching platform for college students',
    color: '#d4849a',
    overview: { role: 'PM & Developer', timeline: 'Nov 2025 - Present', team: 'Solo (PM + Dev)', tools: ['Figma', 'Notion', 'Firebase', 'React Native'], status: 'In Development' },
    links: { prototype: null, prd: slugMatesPrd, live: null },
    
    // 1. Problem Statement
    problemStatement: {
      user: 'College students at UC Santa Cruz (and eventually other UCs) who need to find roommates for on-campus or off-campus housing.',
      problem: 'Students face a stressful, high-stakes decision with inadequate tools. University random assignments ignore lifestyle compatibility (sleep schedules, cleanliness, social habits), leading to conflicts that affect academic performance and mental health. Facebook groups are the main alternative but are chaotic, time-consuming, and raise safety concerns.',
      whyExistingFail: 'University housing portals offer basic questionnaires but no intelligent matching. Facebook groups have no verification (scam risk), no filtering (scroll through 100s of posts), and no structured way to assess compatibility. Apps like Roomi exist but aren\'t college-focused—they\'re designed for working professionals in cities.',
      quote: {
        text: '"I spent hours scrolling through the UCSC housing Facebook group. Half the posts were sketchy, and I had no way to know if someone would actually be a good fit."',
        author: 'UCSC Junior, Transfer Student'
      }
    },
    
    // 2. User & Context
    userContext: {
      personas: [
        {
          name: 'Emma - Incoming Freshman',
          description: 'Nervous about starting college. Has never lived away from home. Wants a roommate with similar sleep schedule and study habits.',
          jtbd: 'When I get my housing assignment, I want to find a compatible roommate before move-in so I can start college without social anxiety.',
          constraints: ['No existing network at UCSC', 'Parents concerned about safety', 'Limited time (busy with orientation prep)', 'Doesn\'t know what questions to ask']
        },
        {
          name: 'Jordan - Transfer Student',
          description: 'Transferring from community college. Needs off-campus housing. Doesn\'t know anyone at UCSC.',
          jtbd: 'When looking for an apartment, I want to find verified roommates who can share the lease so I don\'t end up with strangers from Craigslist.',
          constraints: ['Zero social network at UCSC', 'Needs to sign lease remotely before moving', 'Budget-conscious (needs to split rent)', 'Worried about scams']
        }
      ],
      interviewQuote: {
        text: '"My freshman year roommate and I had completely opposite schedules. She\'d come back at 2am when I had 8am classes. We barely spoke by winter quarter."',
        author: 'UCSC Sophomore'
      }
    },
    
    // 3. Success Metrics
    successMetrics: {
      northStar: {
        metric: 'Successful Roommate Matches',
        rationale: 'A "match" is when two users mutually express interest and exchange contact info. This is the core value moment—everything else leads to this.'
      },
      supporting: [
        { metric: 'Quiz completion rate', target: '> 80%', rationale: 'If users drop off during quiz, we\'re asking too much' },
        { metric: 'Match response rate', target: '> 50%', rationale: 'High-quality matches should generate responses' },
        { metric: 'User satisfaction (post-match survey)', target: '> 4/5 stars', rationale: 'Qualitative signal that matches are actually compatible' }
      ],
      measurement: 'Firebase Analytics for funnel events. Post-match survey sent 1 week after match. Follow-up survey after move-in to measure actual compatibility.'
    },
    
    // 4. Solution Overview
    solutionOverview: {
      whatWeBuilt: 'A mobile-first roommate matching app for UCSC students. Users complete a compatibility quiz (sleep, cleanliness, social habits, etc.), get matched with compatible students, and chat in-app. All users verified via .edu email.',
      whyThisSolution: 'Quiz-based matching addresses the "random assignment" problem directly. .edu verification solves safety concerns. Mobile-first because students live on their phones. UCSC-only focus ensures enough users in one place for network effects.',
      tradeoffs: [
        { decision: 'Mobile app over web', why: 'Students check phones 50+ times/day. Web would have lower engagement.' },
        { decision: '.edu verification required', why: 'Safety was #1 concern in research. Worth the friction.' },
        { decision: 'UCSC only at launch', why: 'Network effects require density. Better to have 500 UCSC users than 50 users across 10 schools.' }
      ],
      notBuilt: [
        'Lease/rental listings integration (not core to matching problem)',
        'Rent splitting tools (plenty of existing solutions)',
        'Landlord connections (out of scope for student-to-student matching)',
        'Social features beyond matching (not a social network)'
      ]
    },
    
    // 5. MVP Scope & Prioritization
    mvpScope: {
      framework: 'Impact/Effort matrix (simple 2x2) appropriate for solo project',
      mvpFeatures: [
        { feature: 'Compatibility quiz (15 factors)', priority: 'P0 - MVP', rice: 'Core value prop. No quiz = no matching.' },
        { feature: '.edu email verification', priority: 'P0 - MVP', rice: 'Non-negotiable for safety. #1 user concern.' },
        { feature: 'Match feed with compatibility %', priority: 'P0 - MVP', rice: 'Primary interface. Users need to see matches.' },
        { feature: 'In-app messaging', priority: 'P0 - MVP', rice: 'Users need to communicate without sharing personal contact.' },
        { feature: 'Profile with photo', priority: 'P1 - V1.1', rice: 'Important for trust but not blocking core flow.' },
        { feature: 'Group matching (3+ roommates)', priority: 'P2 - V2', rice: 'Complex feature. Validate 1:1 matching first.' },
        { feature: 'Multi-campus expansion', priority: 'P2 - V2', rice: 'Blocked by network effects. UCSC first.' }
      ],
      killed: [
        { feature: 'Swipe-based interface', reason: 'Roommate search is deliberate, not impulsive. Tinder-style swiping trivializes important decision.' },
        { feature: 'AI chat suggestions', reason: 'Overengineered. Users can figure out how to say "hey, want to be roommates?"' },
        { feature: 'Roommate agreement generator', reason: 'Nice-to-have that doesn\'t affect matching quality. Post-match problem.' }
      ]
    },
    
    // 6. PRD Lite
    prdLite: {
      goals: [
        'Help UCSC students find compatible roommates faster than Facebook groups',
        'Provide safety through verification (no anonymous users)',
        'Explain WHY users are matched (transparency builds trust)'
      ],
      nonGoals: [
        'Replacing university housing systems',
        'Providing housing listings or rental search',
        'Becoming a general social network for students',
        'Matching for non-housing purposes (study buddies, etc.)'
      ],
      functionalRequirements: [
        'User signs up with .edu email and verifies',
        'User completes compatibility quiz (15 questions, ~3 minutes)',
        'System generates match score based on weighted compatibility factors',
        'User sees ranked list of matches with compatibility % and key factors',
        'User can "like" a match to express interest',
        'When both users like each other, messaging unlocks',
        'User can block/report other users'
      ],
      edgeCases: [
        'User changes preferences after matching (re-calculate scores, notify matches?)',
        'Low match pool (< 10 users) → show all users with lower threshold',
        'Reported user investigation workflow',
        'User wants to unmatch after conversation'
      ],
      outOfScope: [
        'Matching algorithm explainability beyond "you both prefer X"',
        'Integration with UCSC housing portal',
        'Background checks',
        'Payment processing for deposits'
      ]
    },
    
    // 7. Wireframes/UI
    wireframes: {
      description: 'UI mockups and user flows available in Figma.',
      linkPlaceholder: '#', // Replace with actual Figma link
      keyFlows: [
        'Download → Signup → Verify Email → Complete Quiz → See Matches',
        'View Match → Read Profile → Like → Mutual Like → Chat'
      ],
      designDecisions: [
        { decision: 'Compatibility % prominently displayed', rationale: 'Transparency about WHY you matched builds trust in the algorithm.' },
        { decision: 'Key compatibility factors shown on profile', rationale: '"You both prefer quiet hours after 10pm" is more compelling than just "85% match".' },
        { decision: 'Icebreaker prompts in chat', rationale: 'Reduces awkwardness of first message. "Ask Emma about her study habits!"' }
      ]
    },
    
    // 8. Technical/System Awareness
    technical: {
      architecture: 'React Native app with Firebase backend (Firestore, Auth, Cloud Functions). Chosen for speed of solo development.',
      apisUsed: [
        { api: 'Firebase Auth', purpose: 'Email verification and authentication' },
        { api: 'Firestore', purpose: 'User profiles, matches, messages' },
        { api: 'Firebase Cloud Messaging', purpose: 'Push notifications for new matches/messages' },
        { api: 'Expo', purpose: 'React Native build and deployment' }
      ],
      dataModel: [
        'Users (uid, email, profile, quiz_responses, created_at)',
        'Matches (user1_id, user2_id, compatibility_score, factors, status)',
        'Messages (match_id, sender_id, content, timestamp)',
        'Reports (reporter_id, reported_id, reason, status)'
      ],
      constraints: [
        'Solo developer = limited velocity',
        'Firebase free tier has limits (will need to upgrade if >10K users)',
        'React Native has platform-specific bugs (testing on both iOS and Android)'
      ],
      risks: [
        { risk: 'Low initial user base (chicken-and-egg)', mitigation: 'Launch during housing season, partner with UCSC housing groups' },
        { risk: 'Matching algorithm feels "wrong"', mitigation: 'Show reasoning, allow feedback, iterate on weights' },
        { risk: 'Fake .edu emails', mitigation: 'Verify domain + manual review of suspicious accounts' }
      ]
    },
    
    // 9. Launch & GTM
    launchGtm: {
      first100Users: [
        'Partner with UCSC Housing Facebook group admins (post announcement)',
        'Flyers in campus housing office and dorms',
        'Instagram/TikTok content about "how I found my roommate"',
        'Word of mouth through personal network at UCSC'
      ],
      channelPriority: 'Facebook housing groups first—that\'s where the pain is most acute. Then Instagram for broader awareness.',
      onboarding: [
        'App store → Download → .edu signup → Email verification',
        'Progress bar during quiz ("3 minutes to find your match!")',
        'Immediate match results after quiz (instant gratification)',
        'Push notification when someone likes you (engagement hook)'
      ]
    },
    
    // 10. Results & Learnings
    results: {
      launched: false,
      currentStatus: 'In development. Core matching algorithm implemented. React Native frontend ~60% complete. Targeting working app by March 2026 for spring housing season.',
      validationSoFar: [
        { metric: 'Survey responses', value: '52', context: 'Validated demand and identified key pain points' },
        { metric: 'User interviews', value: '8', context: 'Deep understanding of roommate search process' },
        { metric: 'Would use this app', value: '87%', context: 'Strong intent signal from survey' },
        { metric: 'Safety as #1 concern', value: '91%', context: 'Validates .edu verification decision' }
      ],
      learnings: [
        { learning: 'Safety > convenience', detail: 'Initially thought speed was the differentiator. Research showed safety/verification mattered much more.' },
        { learning: 'Transparency builds trust', detail: 'Users wanted to know WHY they matched. "You both prefer X" is more compelling than just a percentage.' },
        { learning: 'Solving my own problem helps', detail: 'Having experienced this pain firsthand makes user research more intuitive and keeps me motivated.' }
      ]
    },
    
    // 11. What's Next
    whatsNext: {
      immediate: [
        'Complete React Native frontend (target: Feb 2026)',
        'Beta test with 20-30 UCSC students',
        'Iterate on matching algorithm based on feedback',
        'Prepare for spring 2026 housing season launch'
      ],
      longTerm: [
        'Expand to UC Berkeley and UCLA',
        'Group matching for apartments (3+ roommates)',
        'Partner with university housing offices'
      ],
      risks: [
        'Housing season timing—miss spring 2026 and wait until fall',
        'Network effects—need critical mass at single campus before expanding',
        'Competition from university building their own solution'
      ]
    }
  },
  {
    id: 'tallyrus', title: 'Tallyrus', emoji: '📚', badge: 'AI EdTech Platform',
    subtitle: 'Bulk AI-powered document analysis for educators and organizations',
    color: '#d4849a',
    overview: { role: 'Product Manager', timeline: 'Sep 2024 - Mar 2025 (7 months)', team: '1 PM (me), 3 Engineers', tools: ['Vercel AI SDK', 'LangChain', 'Next.js', 'TypeScript'], status: 'Completed & Deployed' },
    links: { prototype: null, prd: null, live: 'https://tallyrus.com/' },

    problemStatement: {
      user: 'Educators, administrators, and organizations evaluating large volumes of student or applicant documents.',
      problem: 'Manual grading and review consumed too much time, varied by evaluator, and broke down at scale when teams had to review document batches with nuanced criteria.',
      whyExistingFail: 'Most tools were either single-document workflows or rigid rubric systems. Teams needed bulk processing plus flexible evaluation logic without sacrificing consistency.',
      quote: {
        text: '"We spend more time reviewing docs than coaching students. We needed a way to scale evaluation without losing quality."',
        author: 'Program Administrator'
      }
    },

    userContext: {
      personas: [
        {
          name: 'Priya - High School Teacher',
          description: 'Grades essays and project submissions across multiple sections every week.',
          jtbd: 'When I receive dozens of submissions, I want consistent first-pass analysis so I can focus on high-value feedback.',
          constraints: ['Limited grading hours', 'Needs consistent criteria application', 'Cannot adopt complex enterprise tooling']
        },
        {
          name: 'Daniel - Program Coordinator',
          description: 'Reviews large sets of applications and supporting documents for admissions and scholarships.',
          jtbd: 'When ranking candidates, I want structured comparisons across many documents without reading each file start-to-finish.',
          constraints: ['High seasonal volume spikes', 'Requires auditable decisions', 'Needs exportable summaries for committees']
        }
      ]
    },

    solutionOverview: {
      whatBuilt: [
        'Bulk document upload and parallel processing pipeline',
        'Custom evaluation criteria and rubric interpretation',
        'AI-generated per-document analysis with reasoning transparency',
        'Comparative insights across document sets and exportable reports'
      ],
      tradeoffs: [
        { decision: 'Prioritized rubric flexibility over deep LMS integrations', why: 'Validated core PMF around evaluation quality and speed first.' },
        { decision: 'Shipped broad document support before advanced dashboards', why: 'Unblocked immediate user value across mixed file formats.' },
        { decision: 'Implemented robust CI/CD early', why: 'Needed fast iteration without regressions as AI prompts and logic evolved.' }
      ],
      notBuilt: [
        'Custom model fine-tuning in MVP',
        'Multi-language support in MVP',
        'Native LMS integrations (Canvas/Blackboard) in first release'
      ]
    },

    wireframes: {
      description: 'Workflow and architecture designs were documented in Figma and engineering docs.',
      designDecisions: [
        { decision: 'Batch-first upload experience', rationale: 'Users consistently worked in bulk, so the product optimized for multi-file throughput instead of single-document flows.' },
        { decision: 'Criteria builder with plain-language inputs', rationale: 'Reduced setup friction and made rubric creation usable for non-technical educators.' },
        { decision: 'Transparent output formatting', rationale: 'Included clear reasoning structure so evaluators could trust and audit AI recommendations.' }
      ]
    },

    results: {
      metrics: [
        { metric: 'Time savings', value: '70-80%', context: 'Reduction in average document evaluation time reported by pilot users' },
        { metric: 'Bug-fix turnaround', value: '12-16 hours avg', context: 'Down from 48+ hours after CI/CD rollout' },
        { metric: 'Deployment cadence', value: 'Daily', context: 'Improved from weekly releases through automated pipelines' },
        { metric: 'Test coverage', value: '85%+', context: 'Sustained high code quality with zero critical production incidents post-rollout' }
      ],
      learnings: [
        { learning: 'Agile rigor creates speed', detail: 'Two-week sprint discipline improved delivery predictability and stakeholder trust.' },
        { learning: 'Architecture choices shape product strategy', detail: 'Choosing Vercel AI SDK + LangChain enabled faster iteration on advanced analysis experiences.' },
        { learning: 'Quality infrastructure is a product advantage', detail: 'CI/CD and test automation shortened feedback loops and improved reliability for users.' }
      ]
    },

    whatsNext: {
      immediate: [
        'Expand support for multilingual document evaluation',
        'Launch deeper comparative analytics for cohort-level insights',
        'Integrate with Canvas and Blackboard for workflow continuity'
      ],
      longTerm: [
        'Offer organization-specific model tuning by evaluation standards',
        'Add longitudinal performance and outcome prediction dashboards',
        'Build enterprise governance features for compliance and audit controls'
      ],
      risks: [
        'AI model cost volatility affecting margins',
        'Need for institution-specific policy customization at scale',
        'Competitive pressure from larger EdTech platforms adding AI review features'
      ]
    }
  }
];


// Case Study Page (separate "route" inside this single file)
const CaseStudyPage = ({ caseStudiesData, activeCaseStudy, setActiveCaseStudy, onBack, styles, setCursorText }) => {
  const activeCS = caseStudiesData.find(cs => cs.id === activeCaseStudy) || caseStudiesData[0];
  const isInstaTools = activeCS.id === 'instatools';
  const isSlugmates = activeCS.id === 'slugmates';
  const isTallyrus = activeCS.id === 'tallyrus';
  const conciseCopy = {
    tldr: isInstaTools
      ? "Early-stage startups need compliance tools like OFAC screening and PII detection, but enterprise pricing and sales-led onboarding block adoption. I led the product strategy for a self-serve, credit-based platform that lets founders run checks in minutes without long contracts."
      : isSlugmates
        ? "Students need safe, compatible roommates, but random housing assignments and Facebook groups create friction and risk. I built a mobile-first, .edu-verified matching product that uses a compatibility quiz to deliver trusted, transparent matches."
        : "Educators and organizations needed to evaluate large document sets faster without sacrificing consistency. I led product strategy and delivery for an AI platform that supports bulk processing, customizable evaluation criteria, and structured insights.",
    note: isInstaTools
      ? "Note: I led product discovery, UX direction, prioritization, and go-to-market strategy. Engineering execution was handled by a dedicated engineer."
      : isSlugmates
        ? "Note: I led product strategy and execution as a solo builder (PM + dev)."
        : "Note: I led product direction from discovery through deployment, including Agile delivery, AI architecture decisions, and CI/CD quality systems.",
    painPoints: isInstaTools
      ? [
          "Too expensive ($500+/month minimums).",
          "Overbuilt for low, unpredictable usage.",
          "Locked behind sales-led onboarding and annual contracts."
        ]
      : isSlugmates
        ? [
            "Random assignments ignore lifestyle compatibility.",
            "Facebook groups are chaotic and unsafe.",
            "No structured way to assess fit or verify users."
          ]
        : [
            "Manual review consumed 40-60% of educator time.",
            "Evaluation quality varied across reviewers.",
            "Existing tools did not support flexible bulk analysis."
          ],
    insight: isInstaTools
      ? "Compliance usage for startups is episodic, not recurring. Pricing - not features - is the primary blocker to adoption."
      : isSlugmates
        ? "Matching only works when trust and compatibility are explicit. Verification and transparency drive real adoption."
        : "The winning wedge was not just AI grading - it was combining bulk throughput with customizable criteria and transparent reasoning.",
    strategy: isInstaTools
      ? [
          "Replace subscriptions with pay-per-use credits.",
          "Deliver a fully self-serve experience with instant value.",
          "Design for time-to-first-check under 5 minutes."
        ]
      : isSlugmates
        ? [
            "Use a compatibility quiz to drive better matches.",
            "Require .edu verification to build trust.",
            "Go mobile-first for daily engagement."
          ]
        : [
            "Optimize for batch document workflows first.",
            "Enable customizable criteria instead of fixed rubrics.",
            "Invest early in CI/CD to ship AI improvements safely and quickly."
          ],
    scope: isInstaTools
      ? [
          "OFAC sanctions screening.",
          "PII detection.",
          "Contract analysis (post-MVP).",
          "Email verification.",
          "Shared credit wallet across tools.",
          "Self-serve onboarding to first check."
        ]
      : isSlugmates
        ? [
            "Compatibility quiz (15 factors).",
            "Match feed with compatibility %.",
            "In-app messaging post-match.",
            ".edu email verification."
          ]
        : [
            "Bulk upload and parallel document processing.",
            "Custom rubric and criteria interpretation.",
            "Per-document reasoning and structured scoring output.",
            "Comparative analytics and exportable reporting."
          ],
    flow: isInstaTools
      ? "Signup -> Purchase credits -> Run check -> View results -> Export"
      : isSlugmates
        ? "Download -> Signup -> Verify email -> Complete quiz -> See matches"
        : "Upload docs -> Define criteria -> Run batch analysis -> Review insights -> Export",
    tradeoffs: activeCS.solutionOverview?.tradeoffs || [],
    outOfScope: activeCS.solutionOverview?.notBuilt || [],
    results: isSlugmates ? activeCS.results?.validationSoFar || [] : activeCS.results?.metrics || [],
    learnings: activeCS.results?.learnings || [],
    nextImmediate: activeCS.whatsNext?.immediate || [],
    nextLongTerm: activeCS.whatsNext?.longTerm || [],
    whyMatters: isInstaTools
      ? [
          "Identify non-obvious pain: pricing as the core blocker.",
          "Make principled MVP tradeoffs under time constraints.",
          "Lead UX and product strategy without engineering execution.",
          "Define and evaluate success using real metrics.",
          "Iterate based on user behavior, not assumptions."
        ]
      : isSlugmates
        ? [
            "Translate messy user problems into a clear product strategy.",
            "Balance trust, safety, and adoption in a student market.",
            "Ship a full MVP solo with measurable validation.",
            "Design for transparency to improve match quality.",
            "Use research to guide product tradeoffs."
          ]
        : [
            "Translate user pain into a scalable AI product strategy.",
            "Drive architecture decisions that directly improved UX and delivery speed.",
            "Build quality infrastructure as a competitive product capability.",
            "Balance technical ambition with focused MVP scope.",
            "Operationalize Agile to accelerate predictable outcomes."
          ],
    mockups: isInstaTools
      ? [
          { label: 'UI mockup 1', image: instaToolMockup1 },
          { label: 'UI mockup 2', image: instaToolMockup2 },
          { label: 'UI mockup 3', image: instaToolMockup3 },
          { label: 'UI mockup 4', image: instaToolMockup4 },
          { label: 'UI mockup 5', image: instaToolMockup5 },
          { label: 'UI mockup 6', image: instaToolMockup6 },
          { label: 'UI mockup 7', image: instaToolMockup7 },
          { label: 'UI mockup 8', image: instaToolMockup8 },
          { label: 'UI mockup 9', image: instaToolMockup9 }
        ]
      : isSlugmates
        ? [
            {
              label: '1. Welcome Screen',
              image: slugMatesScreen01
            },
            {
              label: '2. Profile Creation',
              image: slugMatesScreen02
            },
            {
              label: '3. Compatibility Quiz',
              image: slugMatesScreen03
            },
            {
              label: '4. Discover Screen',
              image: slugMatesScreen04
            },
            {
              label: '5. Match Celebration',
              image: slugMatesScreen05
            },
            {
              label: '6. Matches List',
              image: slugMatesScreen06
            },
            {
              label: '7. Chat Screen',
              image: slugMatesScreen07
            },
            {
              label: '8. Profile Screen',
              image: slugMatesScreen08
            }
          ]
        : [
            {
              label: '1. Batch Upload Workflow',
              image: tallyrusMockup1
            },
            {
              label: '2. Criteria Builder',
              image: tallyrusMockup2
            },
            {
              label: '3. AI Analysis Output',
              image: tallyrusMockup3
            },
            {
              label: '4. Comparative Insights Dashboard',
              image: tallyrusMockup4
            }
          ]
  };

  return (
    <section style={{...styles.section, background: 'linear-gradient(180deg, #fff8f6 0%, #fffbf8 100%)'}} className="section">
      <div style={styles.sectionInner} className="section-inner">
        <RevealOnScroll>
          <button
            onClick={onBack}
            style={styles.backBtn}
            onMouseEnter={() => setCursorText('Back')}
            onMouseLeave={() => setCursorText('')}
          >
            ← Back to Projects
          </button>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={styles.sectionLabel}>
            <span style={styles.labelNum}>📄</span><span style={styles.labelLine} /><span>Case Study</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div style={styles.csTabs} className="cs-tabs">
            {caseStudiesData.map(cs => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseStudy(cs.id)}
                className="cs-tab"
                style={{...styles.csTab, ...(activeCS && activeCS.id === cs.id ? { background: cs.color, borderColor: cs.color, color: 'white' } : {})}}
              >
                {cs.emoji} {cs.title}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {activeCS && (
          <div style={styles.csCard}>
            {/* Header */}
            <div
              style={{...styles.csHeader, background: `linear-gradient(135deg, ${activeCS.color} 0%, ${activeCS.color}dd 100%)`}}
              className="cs-header"
            >
              <div style={styles.csHeaderLeft} className="cs-header-left">
                <span style={styles.csBadge}>{activeCS.badge}</span>
                <h2 style={styles.csTitle}>{activeCS.title}</h2>
                <p style={styles.csSubtitle}>{activeCS.subtitle}</p>
              </div>
            </div>

            {/* Body (kept identical to your existing case study layout) */}
            <div style={styles.csBody}>
              <div style={styles.csBodyInner}>
                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Project Overview</h3>
                  <div style={styles.csMetaGrid}>
                    <div>
                      <span style={styles.csMetaLabelDark}>Role</span>
                      <span style={styles.csMetaValueDark}>{activeCS.overview.role}</span>
                    </div>
                    <div>
                      <span style={styles.csMetaLabelDark}>Timeline</span>
                      <span style={styles.csMetaValueDark}>{activeCS.overview.timeline}</span>
                    </div>
                    <div>
                      <span style={styles.csMetaLabelDark}>Team</span>
                      <span style={styles.csMetaValueDark}>{activeCS.overview.team}</span>
                    </div>
                    <div>
                      <span style={styles.csMetaLabelDark}>Tools</span>
                      <span style={styles.csMetaValueDark}>
                        {activeCS.id === 'instatools'
                          ? `Built using Replit, ${activeCS.overview.tools.filter((t) => t !== 'Replit').join(', ')}`
                          : activeCS.overview.tools.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div style={styles.csLinkRow}>
                    {activeCS.links.prototype && <a href={activeCS.links.prototype} style={styles.csLinkInline}>?? View Prototype</a>}
                    {activeCS.links.prd && <a href={activeCS.links.prd} style={styles.csLinkInline}>Read PRD</a>}
                    {activeCS.links.live && <a href={activeCS.links.live} style={styles.csLinkInline}>Live Product</a>}
                  </div>
                  <p style={styles.csNote}>{conciseCopy.note}</p>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>TL;DR</h3>
                  <p style={styles.csText}>{conciseCopy.tldr}</p>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>The Problem</h3>
                  <p style={styles.csText}><strong>User:</strong> {activeCS.problemStatement.user}</p>
                  <p style={styles.csText}><strong>Pain:</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.painPoints.map((p, i) => <li key={i} style={styles.csBulletItem}>{p}</li>)}
                  </ul>
                  <p style={styles.csText}>{activeCS.problemStatement.problem}</p>
                  <div style={styles.csQuoteBox}>
                    <p style={styles.csQuoteText}>{activeCS.problemStatement.quote.text}</p>
                    <span style={styles.csQuoteAuthor}>- {activeCS.problemStatement.quote.author}</span>
                  </div>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Key Insight</h3>
                  <p style={styles.csText}>{conciseCopy.insight}</p>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Product Strategy</h3>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.strategy.map((s, i) => <li key={i} style={styles.csBulletItem}>{s}</li>)}
                  </ul>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Product Scope & Experience</h3>
                  <p style={styles.csText}><strong>What I defined:</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.scope.map((s, i) => <li key={i} style={styles.csBulletItem}>{s}</li>)}
                  </ul>
                  <p style={styles.csText}><strong>Primary flow:</strong> {conciseCopy.flow}</p>
                </div>

                {isInstaTools && activeCS.technicalImplementation && (
                  <div style={styles.csSectionBox}>
                    <h3 style={styles.csSectionTitle}>Technical Implementation</h3>
                    <p style={styles.csText}><strong>Platform:</strong> {activeCS.technicalImplementation.platform}</p>
                    <p style={styles.csText}><strong>Stack:</strong> {activeCS.technicalImplementation.stack}</p>
                    <p style={styles.csText}><strong>Deployment:</strong> {activeCS.technicalImplementation.deployment}</p>
                    <p style={styles.csText}><strong>Why Replit:</strong></p>
                    <ul style={styles.csBulletList}>
                      {activeCS.technicalImplementation.whyReplit.map((item, i) => <li key={i} style={styles.csBulletItem}>{item}</li>)}
                    </ul>
                  </div>
                )}

                {isInstaTools && Array.isArray(activeCS.aiIntegration) && (
                  <div style={styles.csSectionBox}>
                    <h3 style={styles.csSectionTitle}>AI Integration</h3>
                    <p style={{ ...styles.csText, marginBottom: '0.9rem' }}>How I built AI features at InstaTools.</p>
                    <div>
                      <div style={styles.aiCardGrid} className="ai-card-grid">
                        {activeCS.aiIntegration.map((item, i) => {
                          const icon = ['🛡️', '📜', '🌍', '⚡'][i] || '🤖';
                          return (
                            <div key={i} style={styles.aiCard}>
                              <div style={styles.aiCardTitle}>{icon} {item.title}</div>
                              <div style={styles.aiItem}><strong>Challenge ▼</strong> {item.challenge}</div>
                              <div style={styles.aiItem}><strong>Approach ▼</strong> {item.approach}</div>
                              <div style={styles.aiItem}><strong>Implementation ▼</strong> {item.implementation}</div>
                              <div style={styles.aiImpact}><strong>Impact ⭐ ▲</strong> {item.impact}</div>
                            </div>
                          );
                        })}
                      </div>

                      <div style={styles.aiMetricsWrap}>
                        <div style={styles.aiMetricsTitle}>Key Metrics</div>
                        <div style={styles.aiMetricsRow} className="ai-metrics-row">
                          {['94% precision', '98% recall', '88% faster review', '99.7% OFAC match', 'Faster dev cycles'].map((m, i) => (
                            <span key={i} style={styles.aiMetricChip}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isInstaTools && Array.isArray(activeCS.systemArchitecture) && (
                  <div style={styles.csSectionBox}>
                    <h3 style={styles.csSectionTitle}>System Architecture & Key Decisions</h3>
                    <ul style={styles.csBulletList}>
                      {activeCS.systemArchitecture.map((item, i) => (
                        <li key={i} style={styles.csBulletItem}>
                          <strong>{item.title}:</strong> {item.detail} <em>Impact:</em> {item.impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Wireframes & UX</h3>
                  {isInstaTools ? (
                    <>
                      {[[0, 1], [2, 3], [4, 5]].map((pair, rowIdx) => (
                        <div
                          key={`insta-row-${rowIdx}`}
                          style={{
                            border: '1px solid rgba(212,132,154,0.28)',
                            borderRadius: 16,
                            padding: '0.9rem',
                            background: 'rgba(255,255,255,0.72)',
                            marginBottom: '0.9rem'
                          }}
                        >
                          <div style={styles.csMockupGridTwo} className="cs-mockup-grid">
                            {pair.map((idx) => {
                              const m = conciseCopy.mockups[idx];
                              const mockupLabel = [
                                '1️⃣ Landing Page',
                                '2️⃣ Tool Page - Upload State',
                                '3️⃣ File Uploaded',
                                '4️⃣ Processing State',
                                '5️⃣ Results - Download',
                                '6️⃣ Checkout Modal'
                              ][idx] || '';

                              if (typeof m === 'string') {
                                return (
                                  <div key={`mockup-stack-${idx}`} style={styles.csMockupBox}>
                                    <span style={styles.csMockupLabel}>{m}</span>
                                  </div>
                                );
                              }

                              return (
                                <figure key={`mockup-stack-${idx}`} style={styles.csMockupFigure}>
                                  <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#6b5e50', fontSize: '0.9rem' }}>
                                    {mockupLabel}
                                  </div>
                                  <div
                                    style={{
                                      ...styles.csMockupImageFrame,
                                      padding: '2%',
                                      aspectRatio: '16 / 10',
                                      border: '1px solid rgba(212,132,154,0.2)',
                                      borderRadius: 12,
                                      background: 'rgba(255,255,255,0.96)'
                                    }}
                                  >
                                    <img
                                      src={m.image}
                                      alt={m.label}
                                      style={styles.csMockupImage}
                                      loading="lazy"
                                    />
                                  </div>
                                </figure>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                      <div
                        style={{
                          border: '1px solid rgba(212,132,154,0.28)',
                          borderRadius: 16,
                          padding: '0.9rem',
                          background: 'rgba(255,255,255,0.72)'
                        }}
                      >
                        <div style={{ marginBottom: '0.6rem', fontWeight: 600, color: '#6b5e50', fontSize: '0.92rem' }}>
                          7️⃣ Mobile Responsive Views
                        </div>
                        <div style={styles.csMockupGridTight} className="cs-mockup-grid">
                          {conciseCopy.mockups.slice(6).map((m, i) => {
                            if (typeof m === 'string') {
                              return (
                                <div key={`mockup-grid-${i}`} style={styles.csMockupBox}>
                                  <span style={styles.csMockupLabel}>{m}</span>
                                </div>
                              );
                            }

                            return (
                              <figure key={`mockup-grid-${i}`} style={styles.csMockupFigure}>
                                <div
                                  style={{
                                    ...styles.csMockupImageFrame,
                                    padding: '4%',
                                    aspectRatio: '9 / 16',
                                    border: '1px solid rgba(212,132,154,0.2)',
                                    borderRadius: 12,
                                    background: 'rgba(255,255,255,0.96)'
                                  }}
                                >
                                  <img
                                    src={m.image}
                                    alt={m.label}
                                    style={{ ...styles.csMockupImage, width: '80%', height: '80%', margin: '0 auto' }}
                                    loading="lazy"
                                  />
                                </div>
                              </figure>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : isSlugmates ? (
                    <div
                      style={{
                        border: '1px solid rgba(212,132,154,0.28)',
                        borderRadius: 16,
                        padding: '0.9rem',
                        background: 'rgba(255,255,255,0.72)'
                      }}
                    >
                      <div style={styles.csMockupGridTight} className="cs-mockup-grid">
                        {conciseCopy.mockups.map((m, i) => {
                          const mockupLabel = [
                            '1️⃣ Welcome Screen',
                            '2️⃣ Profile Creation',
                            '3️⃣ Compatibility Quiz',
                            '4️⃣ Discover Screen',
                            '5️⃣ Match Celebration',
                            '6️⃣ Matches List',
                            '7️⃣ Chat Screen',
                            '8️⃣ Profile Screen'
                          ][i] || '';

                          if (typeof m === 'string') {
                            return (
                              <div key={`mockup-grid-${i}`} style={styles.csMockupBox}>
                                <span style={styles.csMockupLabel}>{m}</span>
                              </div>
                            );
                          }

                          return (
                            <figure key={`mockup-grid-${i}`} style={styles.csMockupFigure}>
                              <div style={{ marginBottom: '0.45rem', fontWeight: 600, color: '#6b5e50', fontSize: '0.84rem' }}>
                                {mockupLabel}
                              </div>
                              <div
                                style={{
                                  ...styles.csMockupImageFrame,
                                  padding: '4%',
                                  aspectRatio: '9 / 16',
                                  border: '1px solid rgba(212,132,154,0.2)',
                                  borderRadius: 12,
                                  background: 'rgba(255,255,255,0.96)'
                                }}
                              >
                                <img
                                  src={m.image}
                                  alt={m.label}
                                  style={{ ...styles.csMockupImage, width: '80%', height: '80%', margin: '0 auto' }}
                                  loading="lazy"
                                />
                              </div>
                            </figure>
                          );
                        })}
                      </div>
                    </div>
                  ) : isTallyrus ? (
                    <div style={styles.csMockupGridStack} className="cs-mockup-grid">
                      {conciseCopy.mockups.map((m, i) => {
                        const mockupLabel = [
                          '1️⃣ Batch Upload Workflow',
                          '2️⃣ Criteria Builder',
                          '3️⃣ AI Analysis Output',
                          '4️⃣ Comparative Insights Dashboard'
                        ][i] || '';

                        if (typeof m === 'string') {
                          return (
                            <div key={`mockup-stack-${i}`} style={styles.csMockupBox}>
                              <span style={styles.csMockupLabel}>{m}</span>
                            </div>
                          );
                        }

                        return (
                          <figure
                            key={`mockup-stack-${i}`}
                            style={{
                              ...styles.csMockupFigure,
                              border: '1px solid rgba(212,132,154,0.28)',
                              borderRadius: 16,
                              padding: '0.9rem',
                              background: 'rgba(255,255,255,0.72)'
                            }}
                          >
                            {mockupLabel ? (
                              <div style={{ marginBottom: '0.6rem', fontWeight: 600, color: '#6b5e50', fontSize: '0.92rem' }}>
                                {mockupLabel}
                              </div>
                            ) : null}
                            <div
                              style={{
                                ...styles.csMockupImageFrame,
                                padding: '2%',
                                aspectRatio: '16 / 9',
                                border: '1px solid rgba(212,132,154,0.2)',
                                borderRadius: 12,
                                background: 'rgba(255,255,255,0.96)'
                              }}
                            >
                              <img
                                src={m.image}
                                alt={m.label}
                                style={styles.csMockupImage}
                                loading="lazy"
                              />
                            </div>
                          </figure>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={styles.csMockupGridStack} className="cs-mockup-grid">
                      {conciseCopy.mockups.map((m, i) => {
                        if (typeof m === 'string') {
                          return (
                            <div key={i} style={styles.csMockupBox}>
                              <span style={styles.csMockupLabel}>{m}</span>
                            </div>
                          );
                        }

                        return (
                          <figure key={i} style={styles.csMockupFigure}>
                            <div style={styles.csMockupImageFrame}>
                              <img
                                src={m.image}
                                alt={m.label}
                                style={styles.csMockupImage}
                                loading="lazy"
                              />
                            </div>
                          </figure>
                        );
                      })}
                    </div>
                  )}
                  <p style={styles.csText}><strong>Design decisions:</strong></p>
                  <ul style={styles.csBulletList}>
                    {activeCS.wireframes.designDecisions.map((d, i) => (
                      <li key={i} style={styles.csBulletItem}>
                        <strong>{d.decision}:</strong> {d.rationale}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Prioritization & Tradeoffs</h3>
                  <p style={styles.csText}><strong>Why I chose this approach:</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.tradeoffs.map((t, i) => (
                      <li key={i} style={styles.csBulletItem}>
                        <strong>{t.decision}:</strong> {t.why}
                      </li>
                    ))}
                  </ul>
                  <p style={styles.csText}><strong>Out of scope (MVP):</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.outOfScope.map((o, i) => <li key={i} style={styles.csBulletItem}>{o}</li>)}
                  </ul>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Metrics & Outcomes</h3>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.results.map((m, i) => (
                      <li key={i} style={styles.csBulletItem}>
                        <strong>{m.metric}:</strong>{' '}
                        {m.target
                          ? `Target ${m.target} | Actual ${m.actual} | ${m.status}`
                          : m.value}
                        {m.context ? ` - ${m.context}` : ''}
                      </li>
                    ))}
                  </ul>
                  {isInstaTools && activeCS.results?.feedback?.length > 0 && (
                    <>
                      <p style={styles.csText}><strong>User feedback highlights:</strong></p>
                      <ul style={styles.csBulletList}>
                        {activeCS.results.feedback.map((f, i) => (
                          <li key={i} style={styles.csBulletItem}>
                            {f.quote} - {f.author}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Learnings</h3>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.learnings.map((l, i) => (
                      <li key={i} style={styles.csBulletItem}>
                        <strong>{l.learning}:</strong> {l.detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>What I'd Do Next</h3>
                  <p style={styles.csText}><strong>Near-term:</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.nextImmediate.map((n, i) => <li key={i} style={styles.csBulletItem}>{n}</li>)}
                  </ul>
                  <p style={styles.csText}><strong>Long-term:</strong></p>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.nextLongTerm.map((n, i) => <li key={i} style={styles.csBulletItem}>{n}</li>)}
                  </ul>
                </div>

                <div style={styles.csSectionBox}>
                  <h3 style={styles.csSectionTitle}>Why This Case Study Matters</h3>
                  <ul style={styles.csBulletList}>
                    {conciseCopy.whyMatters.map((w, i) => <li key={i} style={styles.csBulletItem}>{w}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState('instatools');
  const [view, setView] = useState('main');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const toolIcons = {
    Figma: '🎨',
    Notion: '📝',
    Replit: '🧩',
    PostgreSQL: '🐘',
    Firebase: '🔥',
    'React Native': '⚛️'
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hash routing: #case-studies/<case-study-id>
  useEffect(() => {
    const applyHashRoute = () => {
      const h = window.location.hash || '';
      const match = h.match(/^#case-studies\/([^/]+)$/i);

      if (match) {
        const id = decodeURIComponent(match[1]).toLowerCase().trim();
        const matchCase = caseStudiesData.find(
          (cs) => cs.id.toLowerCase().trim() === id
        );
        if (matchCase) {
          setActiveCaseStudy(matchCase.id);
          setView('caseStudy');
          // Feels like a real page navigation.
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        // Feels like a real page navigation.
      }

      // Not on a case study hash route → main site.
      setView('main');
    };

    applyHashRoute();
    window.addEventListener('hashchange', applyHashRoute);
    return () => window.removeEventListener('hashchange', applyHashRoute);
  }, []);

  const clearHash = () => {
    if (window.location.hash) {
      window.history.pushState(null, document.title, window.location.pathname + window.location.search);
    }
  };

  const goToCaseStudy = (caseStudyId) => {
    // Hash routing: #case-studies/instatools or #case-studies/slugmates
    // Use a leading '#' to avoid browser-specific behavior.
    const safeId = encodeURIComponent(caseStudyId);
    window.location.hash = `#case-studies/${safeId}`;
    // Fallback: update state immediately (in case hashchange doesn't fire, e.g., same hash).
    setActiveCaseStudy(caseStudyId);
    setView('caseStudy');

    setMobileMenuOpen(false);
    setCaseMenuOpen(false);

    // Feels like a real page navigation.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    // Any main-page navigation clears case-study hash.
    clearHash();
    // If we're on the case study page, switch back to the main page first.
    if (view !== 'main') {
      setView('main');
      // Wait a tick so the section exists in the DOM again.
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }, 50);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const activeCS = caseStudiesData.find(cs => cs.id === activeCaseStudy);
  const projectNavItems = [
    { id: 'instatools', label: 'InstaTool', caseStudyId: 'instatools' },
    { id: 'slugmates', label: 'Slugmates', caseStudyId: 'slugmates' },
    { id: 'tallyrus', label: 'Tallyrus', caseStudyId: 'tallyrus' }
  ];
  const projectDisplayOrder = ['instatools', 'tallyrus', 'slugmates'];
  const orderedProjects = [...caseStudiesData].sort(
    (a, b) => projectDisplayOrder.indexOf(a.id) - projectDisplayOrder.indexOf(b.id)
  );

  const workExperience = [
    {
      company: 'Boxsy',
      logo: '📦',
      logoType: 'emoji',
      role: 'Product Manager',
      type: 'Current',
      period: 'Apr 2025 - Present',
      location: 'Remote',
      color: '#d4849a',
      description: 'Owning the AI product roadmap for an early-stage startup, shipping features from 0→1.',
      highlights: [
        'Led AI product strategy for 8+ ML + AI-powered features reducing research time by over 80%',
        'Collaborated with the distributed ML team to ship classification models for startup evaluation achieving over a 95% accuracy score and conducted A/B testing increasing adoption by 35%',
        'Managed sprint planning across backend/frontend/AI teams with 40+ user stories; implemented Jira automation reducing manual maintenance by 60%'
      ]
    },
    {
      company: 'Tallyrus',
      logo: tallyrusLogo,
      logoType: 'image',
      role: 'Product Manager',
      type: 'Full-Time',
      period: 'Sep 2024 - March 2025',
      location: 'Remote',
      color: '#c9a87c',
      description: 'Led product delivery for a fast-moving startup team.',
      highlights: [
        'Led Agile development establishing sprint planning and backlog grooming to accelerate product delivery',
        'Architected AI agent frameworks using Vercel AI SDK and LangChain for tool-calling and document analysis',
        'Deployed CI/CD pipeline with automated testing and linting, reducing regression issues and cutting bug-fix turnaround by over 300%'
      ]
    },
    {
      company: 'City of Livermore',
      logo: '🏛️',
      logoType: 'emoji',
      role: 'Program Analyst Intern',
      type: 'Two Consecutive Summers',
      period: 'Jun 2023 - Sep 2024',
      location: 'Livermore, CA',
      color: '#6b8e9f',
      description: 'Led cross-functional automation initiatives for a municipal government serving 90,000+ residents.',
      highlights: [
        'Saved 15+ hours/week by building automated SharePoint pipelines for regulatory compliance reporting',
        'Eliminated 85% of manual SQL queries by scoping and delivering sensor-data automation workflows',
        'Accelerated project delivery by 2 months through proactive stakeholder alignment across 4 departments',
        'Proposed and architected ML flood-risk prediction system (Random Forest, 80% accuracy) to inform $2M+ infrastructure planning'
      ]
    },
    {
      company: 'News Focus LLC',
      logo: '📰',
      logoType: 'emoji',
      role: 'Product Manager Intern',
      type: 'Full-Time',
      period: 'Jan 2023 - May 2023',
      location: 'Remote',
      color: '#8fa89a',
      description: 'Launched MVP analytics platform for YouTube creators, driving adoption and measurable efficiency gains.',
      highlights: [
        'Shipped MVP in 4 months, onboarding 15+ creators within first 2 weeks of launch',
        'Cut content review time by 50% through automated moderation using Python and YouTube API',
        'Drove 3x increase in creator engagement by implementing real-time sentiment analysis dashboards',
        'Defined product roadmap and prioritized 12 features based on user feedback and business impact'
      ]
    }
  ];

  return (
    <div style={styles.container}>
      {/* Custom Cursor */}
      <div style={{ ...styles.cursor, left: mousePos.x, top: mousePos.y, transform: `translate(-4px, -4px) scale(${cursorText ? 1.2 : 1})` }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#d4849a" stroke="#c27489" strokeWidth="1"/>
        </svg>
        {cursorText && <span style={styles.cursorLabel}>{cursorText}</span>}
      </div>

      {/* Background Shapes */}
      <div style={styles.bgShapes}>
        <div style={{...styles.shape, top: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(212,132,154,0.12) 0%, transparent 70%)'}} />
        <div style={{...styles.shape, bottom: '20%', left: '5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(201,168,124,0.1) 0%, transparent 70%)', animationDelay: '-5s'}} />
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <MagneticElement><span style={styles.logo}>Meha<span style={styles.logoDot} /></span></MagneticElement>
          <div style={styles.navLinks} className="nav-links">
            <MagneticElement strength={0.2}>
              <button
                onClick={() => scrollToSection('home')}
                style={{ ...styles.navLink, ...(activeSection === 'home' ? styles.navLinkActive : {}) }}
              >
                Home
              </button>
            </MagneticElement>

            <MagneticElement strength={0.2}>
              <button
                onClick={() => scrollToSection('experience')}
                style={{ ...styles.navLink, ...(activeSection === 'experience' ? styles.navLinkActive : {}) }}
              >
                Experience
              </button>
            </MagneticElement>

            {/* Projects + Case Studies dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setCaseMenuOpen(true)}
              onMouseLeave={() => setCaseMenuOpen(false)}
            >
              <MagneticElement strength={0.2}>
                <button
                  onClick={() => setCaseMenuOpen((v) => !v)}
                  style={{
                    ...styles.navLink,
                    ...((activeSection === 'projects' || view === 'caseStudy') ? styles.navLinkActive : {}),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Projects <span style={{ fontSize: '0.85em', opacity: 0.7 }}>v</span>
                </button>
              </MagneticElement>

              {caseMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '14px',
                    padding: '8px',
                    minWidth: '240px',
                    boxShadow: '0 18px 50px rgba(0,0,0,0.10)',
                    zIndex: 9999
                  }}
                >
                  {projectNavItems.map((project) => (
                    <div key={project.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 4px' }}>
                      <button
                        onClick={() => { setCaseMenuOpen(false); scrollToSection('projects'); }}
                        style={{
                          flex: 1,
                          textAlign: 'left',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontSize: '14px'
                        }}
                        onMouseEnter={() => setCursorText('Open')}
                        onMouseLeave={() => setCursorText('')}
                      >
                        {project.label}
                      </button>
                      <button
                        onClick={() => {
                          setCaseMenuOpen(false);
                          if (project.caseStudyId) goToCaseStudy(project.caseStudyId);
                          else scrollToSection('projects');
                        }}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '10px',
                          border: '1px solid rgba(212,132,154,0.3)',
                          background: 'rgba(212,132,154,0.08)',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#6b5e50'
                        }}
                      >
                        Case Study
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <MagneticElement strength={0.2}>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ ...styles.navLink, ...(activeSection === 'contact' ? styles.navLinkActive : {}) }}
              >
                Contact
              </button>
            </MagneticElement>
          </div>
          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuBtn}
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{...styles.menuLine, transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'}} />
            <span style={{...styles.menuLine, opacity: mobileMenuOpen ? 0 : 1}} />
            <span style={{...styles.menuLine, transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'}} />
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <button onClick={() => scrollToSection('home')} style={{...styles.mobileMenuItem, ...(activeSection === 'home' ? styles.mobileMenuItemActive : {})}}>Home</button>
            <button onClick={() => scrollToSection('experience')} style={{...styles.mobileMenuItem, ...(activeSection === 'experience' ? styles.mobileMenuItemActive : {})}}>Experience</button>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, opacity: 0.7, padding: '6px 12px' }}>Projects</div>
              {projectNavItems.map((project) => (
                <div key={project.id} style={{ display: 'flex', gap: 8, padding: '0 8px 6px' }}>
                  <button onClick={() => { scrollToSection('projects'); setMobileMenuOpen(false); }} style={{...styles.mobileMenuItem, flex: 1, margin: 0}}>{project.label}</button>
                  <button
                    onClick={() => {
                      if (project.caseStudyId) goToCaseStudy(project.caseStudyId);
                      else { scrollToSection('projects'); setMobileMenuOpen(false); }
                    }}
                    style={{...styles.mobileMenuItem, margin: 0, whiteSpace: 'nowrap'}}
                  >
                    Case Study
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => scrollToSection('contact')} style={{...styles.mobileMenuItem, ...(activeSection === 'contact' ? styles.mobileMenuItemActive : {})}}>Contact</button>
          </div>
        )}
      </nav>

      {view === 'main' && (
        <>
      {/* Hero */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroGrid} className="hero-grid">
          <div style={styles.heroContent}>
            <div style={{...styles.statusPill, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.2s'}}>
              <span style={styles.statusDot} />
              <span>Actively Seeking PM / PgM / BSA Roles</span>
            </div>
            <h1 style={styles.heroTitle}>
              <span style={{...styles.heroLine, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.8s ease 0.3s'}}>Hell I&apos;m</span>
              <span style={{...styles.heroName, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', transition: 'all 1s ease 0.5s'}}>Meha M</span>
            </h1>
            <p style={{...styles.heroDesc, opacity: isLoaded ? 1 : 0, transition: 'all 0.8s ease 0.7s'}}>
              I am a Product Manager with over 3 years of experience, with focused experience, building AI-driven, user-focused products in both startup environments and enterprise-scale organizations.
            </p>
            <div style={{...styles.heroBtns, opacity: isLoaded ? 1 : 0, transition: 'all 0.8s ease 0.9s'}} className="hero-btns">
              <MagneticElement>
                <button style={styles.primaryBtn} onClick={() => scrollToSection('projects')} onMouseEnter={() => setCursorText('View')} onMouseLeave={() => setCursorText('')}>
                  View Case Studies <span>→</span>
                </button>
              </MagneticElement>
              <MagneticElement>
                <button style={styles.secondaryBtn} onClick={() => scrollToSection('contact')} onMouseEnter={() => setCursorText('👋')} onMouseLeave={() => setCursorText('')}>
                  Get in Touch
                </button>
              </MagneticElement>
            </div>
          </div>
          <div style={{...styles.heroVisual, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'scale(1)' : 'scale(0.8)', transition: 'all 1.2s ease 0.4s'}} className="hero-visual">
            <div style={styles.heroHeadshotWrap}>
              <img src={headshot} alt="Portrait of Meha" style={styles.heroHeadshot} />
            </div>
          </div>
        </div>
        <div style={styles.scrollHint}>
          <span style={styles.scrollText}>Scroll to explore</span>
          <div style={styles.scrollLine}><div style={styles.scrollDot} /></div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" style={{...styles.section, background: 'linear-gradient(180deg, #fff8f6 0%, #fffbf8 100%)'}} className="section">
        <div style={styles.sectionInner} className="section-inner">
          <RevealOnScroll>
            <div style={styles.sectionLabel}><span style={styles.labelNum}>01</span><span style={styles.labelLine} /><span>Experience</span></div>
          </RevealOnScroll>
          
          <div style={styles.experienceContainer} className="exp-container">
            {/* Timeline line */}
            <div style={styles.timelineLine} className="timeline-line" />
            
            {workExperience.map((exp, i) => (
              <RevealOnScroll key={i} delay={i * 150} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div 
                  style={{...styles.expCard, '--accent-color': exp.color}}
                  className="exp-card"
                  onMouseEnter={() => setCursorText('👀')}
                  onMouseLeave={() => setCursorText('')}
                >
                  {/* Timeline dot */}
                  <div style={{...styles.expTimelineDot, background: exp.color}} className="exp-timeline-dot" />
                  
                  {/* Header */}
                  <div style={styles.expHeader} className="exp-header">
                    <div style={{...styles.expLogo, background: `${exp.color}15`, borderColor: `${exp.color}30`}} className="exp-logo">
                      {exp.company === 'Boxsy' ? (
                        <img src={boxsyLogo} alt="Boxsy logo" style={{width: 40, height: 40, objectFit: 'contain'}} />
                      ) : exp.logoType === 'emoji' ? (
                        <span style={{fontSize: '2rem'}}>{exp.logo}</span>
                      ) : (
                        <img src={exp.logo} alt={exp.company} style={{width: 40, height: 40, objectFit: 'contain'}} />
                      )}
                    </div>
                    <div style={styles.expHeaderInfo}>
                      <div style={styles.expCompanyRow}>
                        <h3 style={styles.expCompany}>{exp.company}</h3>
                        {exp.company === 'Boxsy' && (
                          <span style={{...styles.expType, background: `${exp.color}15`, color: exp.color}}>AI SaaS startup</span>
                        )}
                        {exp.company === 'Tallyrus' && (
                          <span style={{...styles.expType, background: `${exp.color}15`, color: exp.color}}>AI Ed-tech startup</span>
                        )}
                        {exp.company === 'News Focus LLC' && (
                          <span style={{...styles.expType, background: `${exp.color}15`, color: exp.color}}>Social media firm</span>
                        )}
                        <span style={{...styles.expType, background: `${exp.color}15`, color: exp.color}}>{exp.type}</span>
                      </div>
                      <p style={styles.expRole}>{exp.role}</p>
                      <div style={styles.expMeta} className="exp-meta">
                        <span style={styles.expPeriod}>📅 {exp.period}</span>
                        <span style={styles.expLocation}>📍 {exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p style={styles.expDescription}>{exp.description}</p>
                  
                  {/* Highlights */}
                  <div style={styles.expHighlights}>
                    {exp.highlights.map((h, j) => (
                      <div key={j} style={styles.expHighlight}>
                        <span style={{...styles.expHighlightDot, background: exp.color}} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={styles.section} className="section">
        <div style={styles.sectionInner} className="section-inner">
          <RevealOnScroll>
            <div style={styles.sectionLabel}><span style={styles.labelNum}>02</span><span style={styles.labelLine} /><span>Projects</span></div>
          </RevealOnScroll>
          
          <div style={styles.projectsList}>
            {orderedProjects.map((p, i) => (
              <RevealOnScroll key={p.id} delay={i * 150}>
                <div style={{...styles.projectCardNew, borderLeft: `4px solid ${p.color}`}}>
                      <div style={styles.projectCardHeader}>
                        <div style={styles.projectCardLeft}>
                          <div style={styles.projectTitleRow}>
                            <span style={styles.projectEmojiNew}>{p.emoji}</span>
                            <h3 style={styles.projectTitleNew}>{p.title}</h3>
                            <span style={{...styles.projectBadgeNew, background: `${p.color}15`, color: p.color}}>{p.badge}</span>
                          </div>
                          <p style={styles.projectDescNew}>{p.subtitle}</p>
                          <ul style={styles.projectBulletList}>
                            <li style={styles.projectBulletItem}>
                              <strong>Role:</strong> {p.overview.role}
                            </li>
                          </ul>
                          <div style={styles.projectToolsLine}>
                            <span style={styles.projectToolsLabel}>Tools:</span>
                            <span style={styles.projectToolInline}>
                              {p.overview.tools.map((tool, j) => (
                                <span key={j} style={styles.projectToolInlineItem}>
                                  <span style={styles.projectToolIcon}>{toolIcons[tool] || '🛠️'}</span>
                                  {tool}
                                </span>
                              ))}
                            </span>
                          </div>
                        </div>
                        <div style={{...styles.projectStatusBadge, background: p.overview.status === 'In Development' ? '#f5b94220' : '#8fa89a20', color: p.overview.status === 'In Development' ? '#c99a2c' : '#6a8a72'}}>
                          <span style={{...styles.projectStatusDotNew, background: p.overview.status === 'In Development' ? '#c99a2c' : '#6a8a72'}} />
                          {p.overview.status}
                        </div>
                      </div>

                  <div style={styles.projectActions}>
                    <button 
                      style={{...styles.projectActionBtn, background: p.color, color: 'white'}}
                      onClick={() => goToCaseStudy(p.id)}
                      onMouseEnter={() => setCursorText('View')}
                      onMouseLeave={() => setCursorText('')}
                    >
                      <span>📄</span> View Case Study
                    </button>
                    {p.links.live ? (
                      <a 
                        href={p.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{...styles.projectActionBtn, ...styles.projectActionBtnOutline, borderColor: p.color, color: p.color}}
                        onMouseEnter={() => setCursorText('Open')}
                        onMouseLeave={() => setCursorText('')}
                      >
                        <span>🚀</span> View Project
                      </a>
                    ) : (
                      <span style={{...styles.projectActionBtn, ...styles.projectActionBtnDisabled}}>
                        <span>🚀</span> Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {view === 'caseStudy' && (
        <CaseStudyPage
          caseStudiesData={caseStudiesData}
          activeCaseStudy={activeCaseStudy}
          setActiveCaseStudy={setActiveCaseStudy}
          onBack={() => { clearHash(); setView('main'); setTimeout(() => scrollToSection('projects'), 50); }}
          styles={styles}
          setCursorText={setCursorText}
        />
      )}

      {view === 'main' && (
        <>
      {/* Contact */}
      <section id="contact" style={styles.contactSection} className="section">
        <div style={styles.contactInner}>
          <RevealOnScroll>
            <div style={{...styles.sectionLabel, justifyContent: 'center'}}><span style={styles.labelNum}>03</span><span style={styles.labelLine} /><span>Contact</span></div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}><h2 style={styles.contactTitle}><TextReveal text="Let's work together" delay={400} /></h2></RevealOnScroll>
          <RevealOnScroll delay={400}><p style={styles.contactDesc}>I'm actively seeking PM, PgM, or Technical BSA roles where I can make an impact.</p></RevealOnScroll>
          <RevealOnScroll delay={500}>
            <div style={styles.openTo}>
              <span style={styles.openToLabel}>Open to:</span>
              <div style={styles.openToTags} className="open-to-tags">{['Product Manager', 'Associate PM', 'Program Manager', 'Technical BSA'].map(r => <span key={r} style={styles.openToTag}>{r}</span>)}</div>
            </div>
          </RevealOnScroll>
          <div style={styles.contactCards} className="contact-cards">
            {[{i: '✉', l: 'Email', v: 'mehacapri2004@gmail.com', h: 'mailto:mehacapri2004@gmail.com', c: '#d4849a'}, {i: 'in', l: 'LinkedIn', v: 'meha-manimaran', h: 'https://www.linkedin.com/in/meha-manimaran-017ba2183', c: '#c9a87c'}, {i: '◐', l: 'GitHub', v: 'meha-manimaran', h: 'https://github.com/meha-manimaran', c: '#8fa89a'}].map((c, i) => (
              <RevealOnScroll key={c.l} delay={600 + i * 100} direction="scale">
                <MagneticElement>
                  <a href={c.h} target="_blank" rel="noopener noreferrer" style={styles.contactCard} className="contact-card" onMouseEnter={() => setCursorText('Open')} onMouseLeave={() => setCursorText('')}>
                    <span style={{...styles.contactIcon, background: `${c.c}20`, color: c.c}}>{c.i}</span>
                    <div><span style={styles.contactCardLabel}>{c.l}</span><span style={styles.contactCardValue}>{c.v}</span></div>
                    <span style={styles.contactArrow}>→</span>
                  </a>
                </MagneticElement>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer} className="footer">
        <span style={styles.footerLogo}>Meha<span style={styles.logoDot} /></span>
        <span style={styles.footerText}>Designed with ♡ © 2025</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        @media (min-width: 769px) {
          * { cursor: none; }
          a, button { cursor: none; }
        }
        
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes scrollDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        @keyframes morph { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-visual { display: flex !important; justify-content: center !important; margin-top: 1.5rem !important; }
          .hero-content { padding: 0 1rem; }
          .hero-btns { flex-direction: column !important; align-items: center; }
          .hero-btns button { width: 100%; max-width: 280px; }
          
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          
          .exp-container { margin-left: 0 !important; }
          .exp-card { margin-left: 0 !important; padding: 1.25rem !important; }
          .timeline-line { display: none !important; }
          .exp-timeline-dot { display: none !important; }
          .exp-header { flex-direction: column !important; gap: 1rem !important; }
          .exp-logo { width: 60px !important; height: 60px !important; }
          .exp-meta { flex-direction: column !important; gap: 0.5rem !important; }
          
          .projects-grid { grid-template-columns: 1fr !important; }
          .project-meta-grid { grid-template-columns: 1fr 1fr !important; }
          .project-card-header { flex-direction: column !important; }
          
          .cs-header { grid-template-columns: 1fr !important; padding: 1.5rem !important; }
          .cs-header-right { margin-top: 1.5rem; }
          .cs-meta { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
          .cs-links { justify-content: center; }
          .cs-body { padding: 1.5rem !important; }
          .cs-tabs { flex-wrap: wrap !important; justify-content: center; }
          .cs-tab { flex: 1 1 auto; min-width: 140px; justify-content: center; }
          .cs-mockup-grid { grid-template-columns: 1fr !important; }
          .ai-layout { grid-template-columns: 1fr !important; }
          .ai-card-grid { grid-template-columns: 1fr !important; }
          .ai-role-sidebar { position: static !important; }
          
          .cs-context-grid { grid-template-columns: 1fr !important; }
          .cs-pain-grid { grid-template-columns: 1fr !important; }
          .cs-method-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-findings-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-persona-grid { grid-template-columns: 1fr !important; }
          .cs-feature-grid { grid-template-columns: 1fr !important; }
          .cs-arch-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-timeline { flex-direction: column !important; border-left: none !important; padding-left: 0 !important; margin-left: 0 !important; gap: 1.5rem !important; }
          .cs-timeline-item { padding-left: 0 !important; }
          .cs-timeline-dot { display: none !important; }
          .cs-decision-grid { grid-template-columns: 1fr !important; }
          .cs-tradeoff-grid { grid-template-columns: 1fr !important; }
          .cs-results-grid { grid-template-columns: 1fr 1fr !important; }
          .cs-learnings-grid { grid-template-columns: 1fr !important; }
          
          .cs-supporting-grid { grid-template-columns: 1fr !important; }
          .cs-killed-grid { grid-template-columns: 1fr !important; }
          .cs-prd-grid { grid-template-columns: 1fr !important; }
          .cs-api-grid { grid-template-columns: 1fr !important; }
          .cs-priority-row { grid-template-columns: 80px 1fr !important; }
          .cs-priority-row .cs-priority-reason { display: none; }
          
          .skills-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          
          .contact-cards { max-width: 100% !important; }
          .contact-card { padding: 1rem !important; }
          
          .nav { padding: 0.75rem 1rem !important; }
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          
          .section { padding: 3rem 1.25rem !important; }
          .section-inner { padding: 0 !important; }
          
          .footer { flex-direction: column !important; gap: 1rem !important; text-align: center; padding: 1.5rem 1rem !important; }
        }
        
        @media (max-width: 480px) {
          .cs-method-grid { grid-template-columns: 1fr !important; }
          .cs-findings-grid { grid-template-columns: 1fr !important; }
          .cs-arch-grid { grid-template-columns: 1fr !important; }
          .cs-results-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .cs-meta { grid-template-columns: 1fr !important; }
          .open-to-tags { flex-direction: column !important; align-items: center; }
          .project-meta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { fontFamily: '"Outfit", sans-serif', background: '#fffbf8', color: '#3d3229', minHeight: '100vh', position: 'relative', overflowX: 'hidden' },
  cursor: { position: 'fixed', width: 24, height: 24, pointerEvents: 'none', zIndex: 9999, transition: 'transform 0.15s ease', filter: 'drop-shadow(0 2px 4px rgba(212,132,154,0.3))' },
  cursorLabel: { position: 'absolute', top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: 8, fontSize: 12, fontWeight: 600, color: '#d4849a', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)', padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(212,132,154,0.3)' },
  bgShapes: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },
  shape: { position: 'absolute', borderRadius: '50%', animation: 'morph 15s ease-in-out infinite, float 10s ease-in-out infinite' },
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 3rem', background: 'rgba(255,251,248,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,132,154,0.1)' },
  navInner: { maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.75rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229' },
  logoDot: { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#d4849a', marginLeft: 4, animation: 'pulse 2s ease-in-out infinite' },
  navLinks: { display: 'flex', gap: '0.25rem' },
  navLink: { background: 'none', border: 'none', padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 500, color: '#6b5e50', fontFamily: '"Outfit", sans-serif', textTransform: 'capitalize', borderRadius: 100, transition: 'all 0.3s ease' },
  navLinkActive: { color: '#3d3229', background: 'rgba(212,132,154,0.15)' },
  mobileMenuBtn: { display: 'none', flexDirection: 'column', gap: 4, background: 'none', border: 'none', padding: 8, cursor: 'pointer' },
  menuLine: { width: 24, height: 2, background: '#3d3229', borderRadius: 2, transition: 'all 0.3s ease' },
  mobileMenu: { position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(255,251,248,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,132,154,0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  mobileMenuItem: { background: 'none', border: 'none', padding: '1rem', fontSize: '1rem', fontWeight: 500, color: '#6b5e50', fontFamily: '"Outfit", sans-serif', textTransform: 'capitalize', textAlign: 'left', borderRadius: 12, transition: 'all 0.3s ease' },
  mobileMenuItemActive: { background: 'rgba(212,132,154,0.15)', color: '#3d3229' },
  hero: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 3rem 4rem', position: 'relative', zIndex: 1 },
  heroGrid: { maxWidth: 1400, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' },
  heroContent: {},
  statusPill: { display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.25rem', background: 'rgba(212,132,154,0.1)', border: '1px solid rgba(212,132,154,0.25)', borderRadius: 100, fontSize: '0.8rem', fontWeight: 500, color: '#d4849a', marginBottom: '2rem' },
  statusDot: { width: 8, height: 8, background: '#d4849a', borderRadius: '50%', animation: 'blink 2s ease-in-out infinite' },
  heroTitle: { marginBottom: '1.5rem', overflow: 'hidden' },
  heroLine: { display: 'block', fontSize: '1.1rem', fontWeight: 400, color: '#8b7d6b', letterSpacing: '0.05em', marginBottom: '0.5rem' },
  heroName: { display: 'block', fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 400, fontStyle: 'italic', color: '#3d3229', lineHeight: 1 },
  heroDesc: { fontSize: '1.1rem', lineHeight: 1.8, color: '#6b5e50', marginBottom: '2rem', maxWidth: 500 },
  highlight: { color: '#d4849a', fontWeight: 600 },
  heroBtns: { display: 'flex', gap: '1rem' },
  primaryBtn: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: '#3d3229', border: 'none', borderRadius: 100, fontSize: '0.9rem', fontWeight: 600, color: '#fffbf8', fontFamily: '"Outfit", sans-serif' },
  secondaryBtn: { padding: '1rem 2rem', background: 'transparent', border: '2px solid rgba(61,50,41,0.2)', borderRadius: 100, fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', fontFamily: '"Outfit", sans-serif' },
  heroVisual: { position: 'relative', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  heroHeadshotWrap: { width: 'min(360px, 80vw)', aspectRatio: '1 / 1', borderRadius: '32px', padding: '10px', background: 'linear-gradient(135deg, rgba(212,132,154,0.3), rgba(201,168,124,0.3))', boxShadow: '0 24px 70px rgba(0,0,0,0.12)' },
  heroHeadshot: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', display: 'block' },
  heroCard: { position: 'absolute', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 1.75rem', background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(212,132,154,0.2)', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.06)', animation: 'float 6s ease-in-out infinite' },
  scrollHint: { position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  scrollText: { fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b5a799' },
  scrollLine: { width: 1, height: 50, background: 'rgba(212,132,154,0.3)', position: 'relative' },
  scrollDot: { position: 'absolute', top: 0, left: -3, width: 7, height: 7, borderRadius: '50%', background: '#d4849a', animation: 'scrollDown 2s ease-in-out infinite' },
  section: { padding: '6rem 3rem', position: 'relative', zIndex: 1 },
  sectionInner: { maxWidth: 1200, margin: '0 auto' },
  sectionLabel: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b7d6b' },
  labelNum: { fontSize: '0.8rem', fontWeight: 700, color: '#d4849a' },
  labelLine: { width: 60, height: 1, background: 'linear-gradient(90deg, #d4849a, transparent)' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', marginBottom: '3rem' },
  aboutTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.3, color: '#3d3229', marginBottom: '1.25rem' },
  aboutAccent: { fontStyle: 'italic', color: '#d4849a' },
  aboutText: { fontSize: '1rem', lineHeight: 1.8, color: '#6b5e50' },
  valuesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  valueCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.8)', border: '2px solid', borderRadius: 16, transition: 'all 0.3s ease' },
  valueIcon: { fontSize: '1.5rem', marginBottom: '0.75rem', display: 'block' },
  valueTitle: { fontSize: '0.95rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.3rem' },
  valueDesc: { fontSize: '0.8rem', color: '#8b7d6b', lineHeight: 1.5 },
  skillsBox: { padding: '2.5rem', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,132,154,0.15)', borderRadius: 20 },
  skillsTitle: { fontSize: '1rem', fontWeight: 600, color: '#3d3229', marginBottom: '1.5rem' },
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' },
  skillCat: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  skillCatTitle: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4849a', marginBottom: '0.5rem' },
  skillPill: { padding: '0.4rem 0.8rem', background: 'rgba(212,132,154,0.08)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, color: '#5c5043' },
  projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' },
  
  // New project card styles
  projectsList: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  projectCardNew: { background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '2rem', border: '1px solid rgba(212,132,154,0.1)', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' },
  projectCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' },
  projectCardLeft: { flex: 1 },
  projectTitleRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' },
  projectEmojiNew: { fontSize: '1.5rem' },
  projectTitleNew: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229', margin: 0 },
  projectBadgeNew: { padding: '0.3rem 0.75rem', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  projectDescNew: { fontSize: '0.95rem', lineHeight: 1.6, color: '#6b5e50', maxWidth: 600 },
  projectStatusBadge: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 },
  projectStatusDotNew: { width: 8, height: 8, borderRadius: '50%' },
  projectBulletList: { margin: '0.75rem 0 0', paddingLeft: '1.1rem', color: '#6b5e50', lineHeight: 1.7 },
  projectBulletItem: { marginBottom: '0.35rem', fontSize: '0.9rem' },
  projectToolInline: { display: 'inline-flex', flexWrap: 'wrap', gap: '0.5rem', marginLeft: '0.25rem' },
  projectToolInlineItem: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,132,154,0.15)', borderRadius: 999, padding: '0.2rem 0.5rem' },
  projectToolIcon: { fontSize: '0.9rem', lineHeight: 1 },
  projectToolsLine: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' },
  projectToolsLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#6b5e50' },
  projectMetaGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: 12, marginBottom: '1.5rem' },
  projectMetaItem: {},
  projectMetaLabel: { display: 'block', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b7d6b', marginBottom: '0.35rem' },
  projectMetaValue: { fontSize: '0.9rem', fontWeight: 500, color: '#3d3229' },
  projectToolsRow: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  projectToolPill: { padding: '0.25rem 0.6rem', background: 'rgba(212,132,154,0.1)', borderRadius: 6, fontSize: '0.75rem', fontWeight: 500, color: '#5c5043' },
  projectActions: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  projectActionBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, border: 'none', fontFamily: '"Outfit", sans-serif', transition: 'all 0.3s ease', textDecoration: 'none' },
  projectActionBtnOutline: { background: 'transparent', border: '2px solid' },
  projectActionBtnDisabled: { background: 'rgba(0,0,0,0.05)', color: '#8b7d6b', border: '2px solid transparent' },
  projectCard: { background: 'rgba(255,255,255,0.9)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(212,132,154,0.15)', transition: 'all 0.4s ease' },
  projectHeader: { position: 'relative', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  projectEmoji: { fontSize: '4rem', animation: 'float 6s ease-in-out infinite' },
  projectBadge: { position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', background: 'rgba(255,255,255,0.95)', border: '1px solid', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600 },
  projectDot: { width: 6, height: 6, borderRadius: '50%' },
  projectBody: { padding: '1.75rem' },
  projectTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229', marginBottom: '0.5rem' },
  projectDesc: { fontSize: '0.9rem', lineHeight: 1.6, color: '#6b5e50', marginBottom: '0.75rem' },
  projectMeta: { fontSize: '0.8rem', color: '#8b7d6b', marginBottom: '1rem' },
  projectLink: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#3d3229' },
  csTabs: { display: 'flex', gap: '0.75rem', marginBottom: '2rem' },
  backBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'rgba(212,132,154,0.1)', border: '1px solid rgba(212,132,154,0.2)', borderRadius: 100, fontSize: '0.85rem', fontWeight: 500, color: '#6b5e50', fontFamily: '"Outfit", sans-serif', marginBottom: '1.5rem', transition: 'all 0.3s ease' },
  csTab: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'transparent', border: '2px solid rgba(212,132,154,0.3)', borderRadius: 100, fontSize: '0.9rem', fontWeight: 500, color: '#6b5e50', fontFamily: '"Outfit", sans-serif', transition: 'all 0.3s ease' },
  csCard: { background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(212,132,154,0.15)', borderRadius: 24, overflow: 'hidden' },
  csHeader: { padding: '3rem', color: 'white', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' },
  csHeaderLeft: {},
  csBadge: { display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' },
  csTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: '0.75rem' },
  csSubtitle: { fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '1.5rem' },
  csLinks: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
  csLink: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: '0.85rem', fontWeight: 500, color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' },
  csHeaderRight: { display: 'flex', alignItems: 'center' },
  csMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  csMetaLabel: { display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.25rem' },
  csMetaValue: { fontSize: '0.9rem', fontWeight: 500 },
  csBody: { padding: '3rem' },
  csSectionBox: { background: '#fff0f3', border: '1px solid rgba(212,132,154,0.2)', borderRadius: 18, padding: '1.5rem', marginBottom: '1.5rem' },
  csSectionTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229', marginBottom: '0.75rem' },
  csMetaGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' },
  csMetaLabelDark: { display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9a7b85', marginBottom: '0.25rem' },
  csMetaValueDark: { display: 'block', fontSize: '0.9rem', color: '#3d3229', fontWeight: 500 },
  csLinkRow: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' },
  csLinkInline: { display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.8rem', background: 'rgba(212,132,154,0.12)', borderRadius: 999, fontSize: '0.8rem', color: '#6b4b55', textDecoration: 'none' },
  csNote: { fontSize: '0.85rem', color: '#6b5e50', marginTop: '0.5rem' },
  csBulletList: { margin: '0.5rem 0 1rem', paddingLeft: '1.1rem', color: '#6b5e50', lineHeight: 1.6 },
  csBulletItem: { marginBottom: '0.35rem' },
  aiLayout: { display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '1rem', alignItems: 'start' },
  aiCardGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.9rem' },
  aiCard: { border: '1px solid rgba(212,132,154,0.3)', borderRadius: 14, padding: '0.9rem', background: 'rgba(255,255,255,0.85)' },
  aiCardTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#4a3b33', marginBottom: '0.45rem' },
  aiItem: { fontSize: '0.82rem', color: '#6b5e50', lineHeight: 1.5, marginBottom: '0.35rem' },
  aiImpact: { fontSize: '0.83rem', color: '#4f4439', lineHeight: 1.55, marginTop: '0.4rem', paddingTop: '0.45rem', borderTop: '1px dashed rgba(212,132,154,0.25)' },
  aiMetricsWrap: { border: '1px solid rgba(212,132,154,0.3)', borderRadius: 12, background: 'rgba(255,255,255,0.85)', padding: '0.8rem' },
  aiMetricsTitle: { fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7f6570', marginBottom: '0.5rem' },
  aiMetricsRow: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' },
  aiMetricChip: { fontSize: '0.78rem', fontWeight: 600, color: '#5a4a42', padding: '0.3rem 0.55rem', borderRadius: 999, background: 'rgba(212,132,154,0.12)', border: '1px solid rgba(212,132,154,0.25)' },
  aiRoleSidebar: { position: 'sticky', top: '1rem', border: '1px solid rgba(212,132,154,0.3)', borderRadius: 14, background: 'rgba(255,255,255,0.9)', padding: '0.9rem' },
  aiRoleTitle: { fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7f6570', marginBottom: '0.6rem' },
  aiRoleList: { margin: 0, paddingLeft: '1rem', color: '#5f5246', fontSize: '0.82rem', lineHeight: 1.65 },
  csMockupGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '0.75rem 0 1rem' },
  csMockupGridTwo: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', margin: '0.75rem 0 1rem' },
  csMockupGridStack: { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', margin: '0.75rem 0 1rem' },
  csMockupGridTight: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '0.02rem 0 1rem' },
  csMockupBox: { border: '1px dashed rgba(212,132,154,0.5)', background: 'rgba(255,255,255,0.6)', borderRadius: 14, padding: '1.25rem', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  csMockupLabel: { fontSize: '0.8rem', color: '#8b7d6b', fontWeight: 500 },
  csMockupFigure: { margin: 0, borderRadius: 14, overflow: 'visible', border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column' },
  csMockupImageFrame: { width: '100%', aspectRatio: '16 / 10', padding: '5%', paddingTop: '14%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', position: 'relative' },
  csMockupImage: { width: '100%', height: '100%', display: 'block', objectFit: 'contain' },
  csMockupBadgeWrap: { position: 'absolute', top: -6, left: 10, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' },
  csMockupBadgeNum: { padding: '0.35rem 0.6rem', borderRadius: 999, background: 'rgba(212,132,154,0.9)', color: 'white', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em' },
  csMockupBadgeText: { color: '#6b5e50', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.01em' },
  csMockupInlineLabel: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: '0 0 0.35rem 0', paddingLeft: '20%', paddingRight: '20%', width: '100%', boxSizing: 'border-box' },
  csMockupInlineText: { color: '#6b5e50', fontSize: '0.8rem', fontWeight: 600 },
  csMockupSubhead: { margin: '0.5rem 0 0.25rem', color: '#6b5e50', fontSize: '0.85rem', fontWeight: 600, paddingLeft: 10, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' },
  csMockupSubheadNum: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(212,132,154,0.9)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 },
  csMockupImageFrameSmall: { width: '100%', aspectRatio: '16 / 10', padding: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' },
  csMockupImageSmall: { width: '100%', height: '100%', display: 'block', objectFit: 'contain' },
  csSection: { marginBottom: '4rem' },
  csSectionHead: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
  csSectionNum: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' },
  csSectionTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229' },
  csText: { fontSize: '0.95rem', lineHeight: 1.8, color: '#6b5e50' },
  csSubhead: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', marginBottom: '1rem', marginTop: '2rem' },
  csContextGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
  csContextLabel: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8b7d6b', marginBottom: '0.5rem' },
  csProblem: { fontSize: '1.05rem', lineHeight: 1.8, color: '#3d3229', marginBottom: '2rem', fontWeight: 500 },
  csPainGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' },
  csPainCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 16 },
  csPainIcon: { fontSize: '1.5rem', marginBottom: '0.75rem', display: 'block' },
  csPainTitle: { fontSize: '0.95rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.4rem' },
  csPainDesc: { fontSize: '0.85rem', color: '#6b5e50', lineHeight: 1.5 },
  csHmw: { display: 'flex', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.5)', border: '2px solid', borderRadius: 16, alignItems: 'flex-start' },
  csHmwBadge: { padding: '0.3rem 0.75rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, color: 'white', flexShrink: 0 },
  csHmwText: { fontSize: '1rem', fontStyle: 'italic', color: '#3d3229', lineHeight: 1.7, margin: 0 },
  csMethodGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  csMethodCard: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12, textAlign: 'center' },
  csMethodCount: { fontSize: '1.75rem', fontWeight: 700, display: 'block' },
  csMethodType: { fontSize: '0.85rem', fontWeight: 600, color: '#3d3229', display: 'block', marginBottom: '0.5rem' },
  csMethodDesc: { fontSize: '0.75rem', color: '#8b7d6b', lineHeight: 1.4 },
  csFindingsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  csFindingCard: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', border: '1px solid', borderRadius: 12, textAlign: 'center' },
  csFindingStat: { fontSize: '1.75rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' },
  csFindingText: { fontSize: '0.8rem', color: '#6b5e50', lineHeight: 1.4 },
  csPersonaGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  csPersonaCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 16 },
  csPersonaName: { fontSize: '1rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.5rem' },
  csPersonaDesc: { fontSize: '0.85rem', color: '#6b5e50', lineHeight: 1.6, marginBottom: '1rem' },
  csPersonaCols: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  csPersonaLabel: { fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b7d6b', display: 'block', marginBottom: '0.5rem' },
  csPersonaList: { fontSize: '0.8rem', color: '#6b5e50', lineHeight: 1.6, paddingLeft: '1rem', margin: 0 },
  csSolutionOverview: { fontSize: '1.05rem', lineHeight: 1.8, color: '#3d3229', marginBottom: '1rem' },
  csFeatureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  csFeatureCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', border: '1px solid', borderRadius: 16 },
  csFeatureHead: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  csFeatureIcon: { fontSize: '1.5rem' },
  csFeatureTitle: { fontSize: '1rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.25rem' },
  csFeatureDesc: { fontSize: '0.85rem', color: '#6b5e50' },
  csFeatureList: { fontSize: '0.85rem', color: '#6b5e50', lineHeight: 1.7, paddingLeft: '1.25rem', margin: '0 0 1rem 0' },
  csFeatureMetric: { display: 'inline-block', padding: '0.4rem 0.75rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 },
  csArchGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  csArchCard: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csArchTitle: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.4rem' },
  csArchDesc: { fontSize: '0.8rem', color: '#6b5e50', lineHeight: 1.5 },
  csTimeline: { display: 'flex', gap: '0', borderLeft: '2px solid rgba(212,132,154,0.3)', marginLeft: '1rem', paddingLeft: '2rem' },
  csTimelineItem: { position: 'relative', flex: 1 },
  csTimelineDot: { position: 'absolute', left: '-2.55rem', top: 0, width: 12, height: 12, borderRadius: '50%' },
  csTimelineContent: {},
  csTimelinePhase: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', display: 'block' },
  csTimelineDuration: { fontSize: '0.75rem', color: '#8b7d6b', display: 'block', marginBottom: '0.5rem' },
  csTimelineTasks: { fontSize: '0.8rem', color: '#6b5e50', lineHeight: 1.6, paddingLeft: '1rem', margin: 0 },
  csDecisionCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 16, marginBottom: '1rem' },
  csDecisionTitle: { fontSize: '1rem', fontWeight: 600, color: '#3d3229', marginBottom: '1rem' },
  csDecisionGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' },
  csDecisionLabel: { fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b7d6b', display: 'block', marginBottom: '0.4rem' },
  csDecisionList: { fontSize: '0.85rem', color: '#6b5e50', lineHeight: 1.6, paddingLeft: '1rem', margin: 0 },
  csTradeoffGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  csTradeoffCard: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12, borderLeft: '3px solid' },
  csTradeoffLabel: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', display: 'block', marginBottom: '0.75rem' },
  csResultsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' },
  csResultCard: { padding: '1.5rem', borderRadius: 16, textAlign: 'center', color: 'white' },
  csResultValue: { fontSize: '2rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' },
  csResultLabel: { fontSize: '0.75rem', opacity: 0.9 },
  csOutcomeList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 },
  csOutcomeItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: '#3d3229' },
  csOutcomeCheck: { width: 20, height: 20, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginTop: 2 },
  csTestimonial: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', border: '2px solid', borderRadius: 16, marginTop: '2rem' },
  csTestimonialQuote: { fontSize: '1.1rem', fontStyle: 'italic', color: '#3d3229', lineHeight: 1.7, marginBottom: '1rem' },
  csTestimonialAuthor: { fontSize: '0.85rem', fontWeight: 600, color: '#6b5e50' },
  csStatus: { padding: '1.5rem', border: '1px solid', borderRadius: 16, marginTop: '2rem' },
  csLearningsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  csLearningCard: { padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: 16 },
  csLearningTitle: { fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' },
  csNextList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  csNextItem: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csNextNum: { width: 28, height: 28, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 },
  
  // Gold Standard Case Study Styles
  csGoldSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  csGoldItem: { marginBottom: '1.5rem' },
  csGoldLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.5rem', display: 'block' },
  csQuoteBox: { padding: '1.5rem', background: 'rgba(255,255,255,0.7)', borderLeft: '4px solid', borderRadius: '0 12px 12px 0', marginTop: '1rem' },
  csQuoteText: { fontSize: '1rem', fontStyle: 'italic', color: '#3d3229', lineHeight: 1.7, marginBottom: '0.75rem' },
  csQuoteAuthor: { fontSize: '0.85rem', fontWeight: 500, color: '#6b5e50' },
  csPersonaCardNew: { padding: '1.5rem', background: 'rgba(255,255,255,0.7)', borderRadius: 16, border: '1px solid' },
  csJtbdBox: { padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: 8, marginTop: '1rem', marginBottom: '1rem' },
  csJtbdLabel: { fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b7d6b', display: 'block', marginBottom: '0.5rem' },
  csJtbdText: { fontSize: '0.9rem', fontStyle: 'italic', color: '#3d3229', margin: 0 },
  csConstraintsLabel: { fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8b7d6b', display: 'block', marginBottom: '0.5rem' },
  csConstraintsList: { fontSize: '0.85rem', color: '#6b5e50', lineHeight: 1.7, paddingLeft: '1.25rem', margin: 0 },
  csNorthStar: { padding: '1.5rem', borderRadius: 16, border: '2px solid', marginBottom: '1.5rem' },
  csNorthStarLabel: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' },
  csNorthStarMetric: { fontSize: '1.25rem', fontWeight: 600, color: '#3d3229', marginBottom: '0.5rem' },
  csSupportingGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' },
  csSupportingCard: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csSupportingMetric: { fontSize: '0.95rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' },
  csSupportingTarget: { fontSize: '0.8rem', fontWeight: 500, color: '#6b5e50', display: 'block', marginBottom: '0.5rem' },
  csMeasurement: { marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(0,0,0,0.02)', borderRadius: 12 },
  csNotBuiltList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  csNotBuiltItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: '#6b5e50' },
  csNotBuiltX: { color: '#c97b7b', fontWeight: 600 },
  csPriorityTable: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' },
  csPriorityRow: { display: 'grid', gridTemplateColumns: '100px 1fr 2fr', gap: '1rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 8 },
  csPriorityBadge: { padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 600, color: 'white', textAlign: 'center' },
  csPriorityFeature: { fontSize: '0.9rem', fontWeight: 500, color: '#3d3229' },
  csPriorityReason: { fontSize: '0.8rem', color: '#6b5e50' },
  csKilledGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' },
  csKilledCard: { padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12, borderTop: '3px solid #c97b7b' },
  csKilledFeature: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', display: 'block', marginBottom: '0.5rem' },
  csPrdGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' },
  csPrdSection: { padding: '1.25rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csPrdList: { fontSize: '0.9rem', color: '#6b5e50', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 },
  csFuncReqList: { fontSize: '0.9rem', color: '#6b5e50', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 1.5rem 0' },
  csEdgeCaseList: { fontSize: '0.85rem', color: '#8b7d6b', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' },
  csOutOfScopeList: { fontSize: '0.85rem', color: '#8b7d6b', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 },
  csWireframeLink: { margin: '1.5rem 0' },
  csFlowList: { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' },
  csFlowItem: { display: 'flex', alignItems: 'center', gap: '1rem' },
  csFlowNum: { width: 24, height: 24, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 },
  csFlowText: { fontSize: '0.9rem', color: '#3d3229', fontFamily: 'monospace', background: 'rgba(0,0,0,0.03)', padding: '0.5rem 1rem', borderRadius: 6, flex: 1 },
  csDesignDecisions: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  csDesignDecision: { padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csDesignDecisionTitle: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', display: 'block', marginBottom: '0.5rem' },
  csApiGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' },
  csApiCard: { padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12 },
  csApiName: { fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' },
  csDataModel: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' },
  csDataModelItem: { fontSize: '0.85rem', fontFamily: 'monospace', background: 'rgba(0,0,0,0.05)', padding: '0.5rem 1rem', borderRadius: 6, color: '#5c5043' },
  csRiskGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  csRiskCard: { padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 12, borderLeft: '3px solid' },
  csRiskTitle: { fontSize: '0.9rem', fontWeight: 600, color: '#3d3229', display: 'block', marginBottom: '0.5rem' },
  csGtmList: { fontSize: '0.9rem', color: '#6b5e50', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 1.5rem 0' },
  csOnboardingFlow: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  csOnboardingStep: { display: 'flex', alignItems: 'center', gap: '1rem' },
  csOnboardingNum: { width: 24, height: 24, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 },
  csResultCardNew: { padding: '1.25rem', background: 'rgba(255,255,255,0.7)', borderRadius: 12, border: '2px solid', textAlign: 'center' },
  csResultContext: { fontSize: '0.75rem', color: '#8b7d6b', display: 'block', marginTop: '0.25rem' },
  csStatusBanner: { padding: '1.5rem', borderRadius: 16, border: '2px solid', display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' },
  csStatusIcon: { fontSize: '1.5rem' },
  csLongTermList: { fontSize: '0.9rem', color: '#6b5e50', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 1.5rem 0' },
  csRiskWatchList: { fontSize: '0.9rem', color: '#6b5e50', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0, listStyle: 'none' },
  contactSection: { padding: '6rem 3rem', background: 'linear-gradient(180deg, #fffbf8 0%, #fff5f3 100%)', textAlign: 'center' },
  contactInner: { maxWidth: 800, margin: '0 auto' },
  contactTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#3d3229', marginBottom: '1rem' },
  contactDesc: { fontSize: '1.1rem', color: '#6b5e50', marginBottom: '2rem' },
  openTo: { marginBottom: '3rem' },
  openToLabel: { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b5a799', marginBottom: '1rem' },
  openToTags: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' },
  openToTag: { padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(212,132,154,0.25)', borderRadius: 100, fontSize: '0.85rem', fontWeight: 500, color: '#5c5043' },
  contactCards: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400, margin: '0 auto' },
  contactCard: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(212,132,154,0.2)', borderRadius: 16, textDecoration: 'none', color: '#3d3229', transition: 'all 0.3s ease' },
  contactIcon: { width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, fontSize: '1.1rem', fontWeight: 700 },
  contactCardLabel: { display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b5a799', marginBottom: '0.15rem' },
  contactCardValue: { fontSize: '0.9rem', fontWeight: 500, color: '#3d3229' },
  contactArrow: { marginLeft: 'auto', fontSize: '1.1rem', color: '#b5a799' },
  footer: { padding: '2rem 3rem', background: '#fff5f3', borderTop: '1px solid rgba(212,132,154,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1400, margin: '0 auto' },
  footerLogo: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontStyle: 'italic', color: '#3d3229', display: 'flex', alignItems: 'center' },
  footerText: { fontSize: '0.8rem', color: '#b5a799' },
  
  // Experience section styles
  experienceContainer: { position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' },
  timelineLine: { position: 'absolute', left: 47, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, rgba(212,132,154,0.3) 0%, rgba(201,168,124,0.3) 50%, rgba(143,168,154,0.3) 100%)', zIndex: 0 },
  expCard: { position: 'relative', background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(212,132,154,0.15)', borderRadius: 20, padding: '2rem', marginLeft: 70, transition: 'all 0.3s ease', zIndex: 1 },
  expTimelineDot: { position: 'absolute', left: -35, top: '2rem', width: 16, height: 16, borderRadius: '50%', border: '3px solid #fffbf8', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  expHeader: { display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' },
  expLogo: { width: 72, height: 72, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', flexShrink: 0 },
  expHeaderInfo: { flex: 1 },
  expCompanyRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' },
  expCompany: { fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 500, fontStyle: 'italic', color: '#3d3229', margin: 0 },
  expType: { padding: '0.25rem 0.75rem', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  expRole: { fontSize: '1rem', fontWeight: 600, color: '#5c5043', marginBottom: '0.5rem' },
  expMeta: { display: 'flex', gap: '1.25rem', flexWrap: 'wrap' },
  expPeriod: { fontSize: '0.85rem', color: '#8b7d6b' },
  expLocation: { fontSize: '0.85rem', color: '#8b7d6b' },
  expDescription: { fontSize: '0.95rem', lineHeight: 1.7, color: '#6b5e50', marginBottom: '1.25rem' },
  expHighlights: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  expHighlight: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: '#5c5043' },
  expHighlightDot: { width: 6, height: 6, borderRadius: '50%', marginTop: 7, flexShrink: 0 }
};
