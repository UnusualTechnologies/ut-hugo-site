---
title: "Scheduler"
type: "projects"
project_type: "In-house"
tags: ["web", "ai", "real-time", "multi-tenant"]
prominence: -5
featured_image: "/images/projects/scheduler.jpg"

overview: "We run our agency on software we built. Scheduler is a four-panel production platform covering staff task management, multi-tenant client portals, AI-assisted design workflows, and guest access — all from a single codebase. Every project, every tracked hour, every client feedback ticket flows through it daily."

technologies: ["Laravel", "Filament", "Vue.js", "WebSockets", "NeuronAI", "Gemini 2.5 Flash", "Anthropic Claude", "AWS"]

overview_image:
  src: "/images/projects/scheduler/admin-panel.png"
  caption: "The staff admin panel — task management, time tracking, and project organisation for the full team."
---

![The admin panel showing projects list with tracked hours and budgets](/images/projects/scheduler/projects-list.png)

## The Problem

Running a creative and software agency means managing projects across multiple clients simultaneously, tracking time accurately, collecting feedback without it getting lost in email threads, and keeping clients informed without flooding them with Slack messages.

Every off-the-shelf tool solved part of the problem and created a different one. Project management tools didn't speak the language of client deliverables and approval cycles. Time trackers weren't connected to projects in any meaningful way. Client portals were too generic to customise. Nothing connected the staff workflow to the client-facing workflow in a coherent way.

So we built our own.

### Four Panels, One Codebase

The platform serves four completely different audiences from a single Laravel application, each with its own interface, permissions, and purpose.

**Staff** get a full admin panel: task management, time tracking per project, project organisation, and every operational tool the team needs day to day.

**Clients** get a multi-tenant portal where each client sees only their own projects. They can review work orders, track approval status, raise change requests and bug reports, and see exactly what UT's team is working on.

**Designers** get a separate interface for AI-assisted document collaboration: uploading briefs, reading project documents, and triggering the AI agent to propose edits.

**Guest users** can access relevant project views without creating an account, via a signed token. Useful for sharing progress with stakeholders who won't create a login.

Building one system that serves four audiences with completely different interfaces and permission models requires careful thinking about data scoping, session handling, and what each user type should and should not see.

---

## The Real-Time Task Sheet

![The Vue.js task sheet with drag-to-reorder and live multi-user presence](/images/projects/scheduler/task-sheet.png)

The task management interface is a full Vue.js application embedded inside the Filament admin panel. It supports drag-to-reorder, context menus, multi-select, and rich task notes with image attachments.

What makes it unusual is the real-time layer. Multiple staff members can have the task sheet open simultaneously and see which tasks their colleagues have selected, live, without refreshing. Hours update across all connected tabs the moment they change. The system broadcasts events over WebSockets so every open browser window stays in sync.

Most Filament-based admin panels use Livewire for interactivity, which handles most cases well. For the task sheet, we needed genuine continuous real-time collaboration. That's where embedding a dedicated Vue.js app inside the Filament shell made sense: use the framework where it fits, replace it where it doesn't.

---

## The DesignerAgent

The DesignerAgent is not a chat interface. It is an AI agent with seven tools: read, create, update, and delete project sections; list and read uploaded attachments. When a client uploads a design brief or PDF, the agent can read it and propose changes directly to the project document.

Proposed changes appear as pending diffs. Humans review and approve or reject each one individually before anything is committed. While the agent is working, it broadcasts its real-time status ("thinking...", "editing overview section...") over WebSocket to every connected browser tab.

This is the pattern most AI integrations skip: tool use, state management, approval gates, and real-time feedback to the user. The agent does real work on real documents, and nothing changes without a human saying yes.

Most AI integrations are a chat box bolted onto the side of an existing product. The DesignerAgent is woven into the core workflow: it reads the same project documents staff and clients read, it proposes edits in the same structure, and its changes flow through the same approval process as any other edit.

---

## AI-Reviewed Bug Reports

One of the most consistent operational pain points in agency work is receiving bug reports that are impossible to reproduce. "The button didn't work" tells you nothing useful.

Before a client submits a bug report, Gemini 2.5 Flash reviews it for vagueness, missing reproduction steps, and unclear references to specific work items. Suggestions appear inline — the client can apply them or ignore them and submit anyway. The AI suggestions are also stored on the ticket for staff reference, so even if the client ignores them, the reviewer knows what context was missing.

![Admin view of all feedback tickets](/images/projects/scheduler/admin-feedback.png)

The goal is not to make the client feel reviewed. It is to get better information into the hands of the people who need to act on it.

---

## Cycle-Based Approval Workflow

![Work order cycle management with dual approval status](/images/projects/scheduler/cycle-management.png)

Projects are broken into cycles: scoped units of work with their own status, timeline, and approval chain. Each cycle goes through a defined workflow — active, awaiting client review, client-approved, complete — and both the client and UT staff must sign off before a cycle closes.

The client sees the cycle in their portal with a clear status indicator. Staff see it in the admin panel alongside all other active work. A scheduled cron job handles auto-completion for cycles where all conditions are met, so nothing stalls because someone forgot to click a button.

The cycle structure also replaces status update emails. The work order is the status update.

---

## Client Impersonation

Staff can switch into any client's view and see exactly what the client sees. No separate test accounts, no guesswork about what the portal looks like for a specific user.

This is useful for support, for QA before a release, and for onboarding. It is also a signal to clients that UT understands the service relationship: if we build something for you to use, we look at it through your eyes.

---

## Write-Up & Learnings

### The Engineering Decisions That Made This Work

Building a multi-panel platform on a single Laravel codebase required a few non-obvious choices.

**Multi-tenancy without a multi-tenancy package.** Rather than adding a third-party multi-tenancy library, the platform scopes client data by using the project itself as the Filament tenant. Each client session is bound to a specific project context, and all queries run through that scope automatically. It keeps the codebase simple and eliminates an entire category of data-leak bugs.

**Real-time without a dedicated real-time service.** WebSocket broadcasting runs through Laravel's built-in broadcasting layer. Events like `TaskListUpdated`, `HoursUpdated`, `SelectedRowsUpdated`, and `ProjectUpdated` are fired from the server and consumed by the Vue.js frontend. No separate real-time service, no additional infrastructure to manage.

**AI agents with actual tool use.** The DesignerAgent and FeedbackReviewAgent are built on NeuronAI with Gemini and Anthropic as providers. The agents have defined tool schemas rather than open-ended chat, which means the AI's actions are predictable, auditable, and reversible. Bounded AI in production is a different discipline from open-ended AI experimentation, and the human approval gate is what makes it viable in a real workflow.

**Vue.js inside Filament.** The task sheet is a full Vue.js application served inside a Filament admin page. The Vue app authenticates via Laravel Sanctum, talks to a dedicated JSON API, and handles its own state. Filament handles the shell, navigation, and everything outside the task sheet. Each tool does what it does well.

The platform has been in daily production use since its initial release. It has grown through real operational demands: features exist because UT's team or clients needed them, not because they seemed like good ideas in a planning session. That is a different kind of quality signal than a demo environment, and it is what makes this a genuine engineering case study rather than a feature list.
