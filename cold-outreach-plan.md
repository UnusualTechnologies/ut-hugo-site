# Cold Outreach Plan — Unusual Technologies

## Background

UT currently acquires work through grants and word-of-mouth. This plan adds a cold outreach channel: targeted email campaigns to industries where UT already has proven case studies, using AI to personalise at scale while keeping costs low.

## Target Industries and Campaign Angles

Based on UT's existing portfolio of 35 case studies, six campaign types make sense. Three are recommended for the initial prototype.

### Priority Campaigns (workshop these Friday)

| Campaign | Target Contacts | The Angle | Why It Works |
|---|---|---|---|
| Museums and Attractions | Museum directors, visitor experience managers, procurement teams | "Do you have a supplier/tender list for interactive installations? We've built projection-mapped exhibits for LEGO Discovery Centers and the RAF Museum." | Tender lists are a normal procurement process. You're asking to be added, not asking for a sale. Low-pressure, high-legitimacy. |
| Universities and Research | Research leads in HCI, health, digital humanities | "We partner on research grants. Would your group be interested in collaborating on a health tech / VR / gamification bid?" | UT already has the track record (Sussex, Surrey, Kent, Hamburg, NHS). Grant partnerships are something academics actively seek. |
| Indie Game Studios | Studio leads found via itch.io, Steam, LinkedIn | "Saw [specific game]. Are you planning anything new? We do Unity dev, porting, and VFX." | Devs always have a backlog they can't resource. Collaboration framing rather than sales pitch. |

### Future Campaigns (once prototype is proven)

| Campaign | Target | Angle |
|---|---|---|
| Healthcare / Dental Clinics | Practice managers, clinical directors | AI-powered admin tools, triage apps, patient-facing tech |
| Construction / Architecture | Firms doing high-end residential or commercial | AR/VR visualisation tools for client walkthroughs |
| Creative Agencies | Agencies without in-house XR capability | Technical partner for AR/VR/interactive builds |

## The Pipeline (4 Layers)

### 1. CRM — Contact and Campaign State

**Recommended: EspoCRM** (open source, self-hosted, free)

- Lightweight, has email templates, campaign tracking, pipeline management
- Alternative: SuiteCRM (heavier, more enterprise-grade, also free and self-hosted)
- Both avoid per-seat pricing of HubSpot/Salesforce

### 2. Lead Discovery — Building Target Lists

**Recommended: n8n** (open source, self-hosted, free)

- 662+ lead generation workflow templates
- Build one workflow per campaign type (e.g. "UK museums", "indie game studios on itch.io")
- Can scrape directories, pull company websites, extract structured data via LLM nodes
- Connects to CRM via API

**Also worth evaluating:**

- OpenOutreach (github.com/eracle/OpenOutreach) for LinkedIn lead discovery. Uses a Bayesian model to learn which profiles match your ICP.

### 3. Company Research and Personalisation

This is the part that makes or breaks the campaign. Two-agent pattern:

1. **Research agent:** scrape the company's website (n8n HTTP node or Firecrawl), pass to an LLM with a prompt: "Given this company's website, extract: what they do, any current exhibitions/projects/games, something specific we could reference, and what pain point from our services list might be relevant."

2. **Review agent:** pass the draft email through a second LLM call acting as a "how would this land?" checker, looking for: does it sound generic? Does it oversell? Would it trigger spam instincts? Does the personalisation feel natural?

3. **Output:** personalised email draft + research summary pushed into CRM for human review before sending.

All buildable as n8n nodes with Claude or GPT API calls.

### 4. Sending — Without Getting Spam-Flagged

Key rules:

- **Use a completely separate domain** (not a subdomain). Subdomain reputation can bleed through to the parent domain if things go wrong. A separate domain like `ut-studios.com` gives total isolation. They cost a few pounds per year.
- **Warm the domain** for 2-3 weeks before sending real campaigns. Start with 5-10 emails/day and ramp gradually.
- **Keep volume low:** 30-50 emails per day per mailbox maximum.
- **Tool for sending:** PaulleDemon/Email-automation (open source, self-hosted, supports scheduled follow-ups and Jinja2 template logic).

## Infrastructure Costs

| Item | Cost |
|---|---|
| Separate sending domain | ~£10/year |
| Mailbox (Google Workspace or Zoho) | £0-5/month |
| Domain warmup tool (Instantly, Warmup Inbox, or DIY) | £15-30/month |
| n8n (self-hosted) | Free |
| EspoCRM (self-hosted) | Free |
| LLM API calls for personalisation (Claude/GPT) | £5-20/month depending on volume |
| **Total** | **~£25-55/month** |

### Domain Warmup Options

| Tool | Price | Notes |
|---|---|---|
| Instantly | ~£30/month | All-in-one: warmup + sending + analytics |
| Warmup Inbox | £15/month | Basic plan, 75 warmup emails/day |
| Mailivery | £29/month | Unlimited inboxes on base plan |
| Manual warmup | Free | Send 5-10 real emails/day for 2-3 weeks, subscribe to newsletters, have colleagues reply |
| Warmer (GitHub) | Free | Open source Python/Selenium script, self-hosted |

## Prototype Plan (1 Month)

**Goal:** one working campaign producing real outreach emails, with data on what converts.

**Week 1:** Self-host n8n and EspoCRM. Buy and configure the sending domain. Start domain warmup.

**Week 2:** Build the n8n workflow for one campaign (e.g. museums): scrape a directory, research each company via LLM, generate personalised email draft, push to CRM. Write and test the two-agent prompt chain (researcher + reviewer).

**Week 3:** Domain warmup continues. Human-review the first batch of generated emails. Refine prompts based on quality. Set up the sending tool with follow-up sequences.

**Week 4:** Send 20-30 manually-reviewed emails as a test batch. Track opens, replies, and bounce rates. Iterate on the approach based on results.

## Key References

- n8n Lead Generation Workflows: https://n8n.io/workflows/categories/lead-generation/
- OpenOutreach (LinkedIn lead discovery): https://github.com/eracle/OpenOutreach
- PaulleDemon Email-automation: https://github.com/PaulleDemon/Email-automation
- Warmer (self-hosted warmup): https://github.com/WKL-Sec/Warmer
- Vibe coding and the future of software agencies (Dawn Capital): https://medium.com/@dawncapitalteam/vibe-coding-and-the-future-of-software-agencies-7daf673b845f
- Cold outreach teardown for software services (Lemlist): https://www.lemlist.com/blog/sell-software-development-services-with-cold-outreach
- Cold email infrastructure pricing guide (Icemail): https://www.icemail.ai/blog/cold-email-infrastructure-pricing-structure-guide/
