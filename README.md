<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/HelpDesk.webp" alt="Customer Support Ticketing Platform: A help desk UI with inbox, ticket threads, bulk actions and analytics" width="100%" />

<br />
<br />

# Customer Support Ticketing Platform

### A help desk UI with inbox, ticket threads, bulk actions and analytics

A React and Vite front end for a customer support ticketing platform. It covers an inbox, ticket detail threads, quick replies, tags, bulk actions and an analytics dashboard, all on mock data.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)

[More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

A front-end prototype of a customer support ticketing platform. Agents get an inbox of tickets, a detail view with the full conversation, canned replies, tagging, bulk updates and an analytics dashboard.

There is no backend. Tickets and analytics come from mock data in `src/lib/mockData.ts` and live in React state, so edits last until the page reloads.

## Features

- **Ticket inbox**: list of tickets with status, priority, assignee and tags; filtered by Inbox, Open and Closed views from the sidebar.
- **Ticket detail**: full customer and agent conversation thread with ticket properties.
- **Quick reply**: send a reply, with canned responses to pick from.
- **Bulk actions**: select several tickets and update status, priority, assignee or tags together; new tags are merged with existing ones.
- **Tagging**: a tag modal for adding tags to tickets.
- **Analytics dashboard**: average response and resolution time, total tickets, satisfaction score, ticket volume, priority distribution and agent performance.
- **Team collaboration widget**: a side panel for team activity on a ticket.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [React](https://react.dev) with TypeScript |
| Build tool | [Vite](https://vite.dev) |
| UI | [Radix UI](https://www.radix-ui.com) primitives, [Tailwind CSS](https://tailwindcss.com), [Lucide](https://lucide.dev) icons |
| Charts | [Recharts](https://recharts.org) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |

## Getting started

### Prerequisites

- Node.js 18 or later and npm

### Installation

```bash
git clone https://github.com/Studio1HQ/HelpDesk.git
cd HelpDesk
npm i
```

### Environment variables

None are used.

### Run

```bash
npm run dev
```

Build for production with `npm run build`.

## How it works

`src/App.tsx` holds the ticket list in state and the active view. The sidebar switches between inbox, open, closed and analytics. Selecting a ticket opens `TicketDetail`; bulk changes go through `handleUpdateTickets`, which applies a partial update to every selected ticket.

```text
src/
├── App.tsx
├── components/        # Sidebar, TicketInbox, TicketList, TicketDetail,
│                      # ConversationThread, QuickReply, BulkActionsBar,
│                      # TagModal, AnalyticsDashboard, ...
├── components/ui/     # Radix-based UI primitives
├── lib/mockData.ts    # mock tickets, canned responses, analytics
└── types/ticket.ts    # Ticket, Message, AnalyticsData types
```

## Resources

- [Radix UI](https://www.radix-ui.com): accessible primitives used for the UI components.
- [Recharts](https://recharts.org): charting library for the analytics view.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams.<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
