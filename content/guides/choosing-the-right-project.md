---
title: "Choosing the Right Project to Build"
description: "A practical framework for picking a project that actually teaches you something, pushes you technically, and gets real users."
category: "Projects & Building"
featured: true
order: 1
date: "2026-08-12"
author: "Midhat Kazmi"
icon: "Compass"
readingTime: "8 min read"
image: "/guides/project-selection-framework.svg"
---

Every year, hundreds of students sit down to pick a "project" and end up building the same to-do app, the same weather dashboard, the same clone of something that already exists. Six months later they have a GitHub repo with zero stars, zero users, and nothing to talk about in an interview. Picking the right project is arguably more important than how well you execute it, because the right project pulls hard work out of you naturally, and the wrong one makes even small tasks feel like a grind.

## 1. Pick for Depth, Not Novelty

Why does technical depth matter more than a "cool" idea?

A project idea is only as good as what it forces you to learn. Before committing, ask yourself, if I actually built this end-to-end, what would I be forced to understand that I don't understand today? Good answers sound like "how large-scale systems handle state," "how to orchestrate infrastructure at scale," "how audio or video generation actually works under the hood," or "how operating systems manage resources when things get complicated."

A useful gut check: could this project reasonably take 4 to 6 months to build properly while you're learning as you go? If you can fully picture the finished product on day one, it's probably not deep enough. Projects worth doing usually involve some combination of:

1. Systems and infrastructure work,clusters, queues, distributed state, scheduling
2. Emerging technical areas,fine-tuning models, generative audio/video, agent orchestration, platform engineering
3. Real engineering trade-offs, not just gluing together existing APIs

And a rule worth repeating to yourself often, the project should use AI, not be AI. If you strip out the AI-powered feature and the remaining system doesn't hold any real engineering weight, you haven't picked a project, you've picked a wrapper.

## 2. Build in a Team, Not Alone

Why is working solo often the wrong call?

The strongest projects rarely come out of one person coding in isolation for months. Small teams, two or three people, ideally mixing seniors and juniors consistently produce better outcomes because they force you to actually design before you build, split real-world systems into real-world components, and defend your decisions to someone else. Juniors get direct exposure to how experienced engineers think, and seniors get pushed to explain their reasoning instead of just knowing it instinctively.

If you're picking a project for a fellowship, capstone, or FYP, treat it the same way you'd treat a startup: gather a short list of ideas, then let people apply to work on them with a clear statement of intent, some early research, and realistic availability. Strong intent up front saves everyone months of misaligned effort later.

## 3. Design for Users From Day One

Why should adoption be a first-class requirement, not an afterthought?

This is the pillar most students skip, and it's the one that separates a portfolio piece from a real project. A system with brilliant architecture and zero users doesn't feel like a good project,not to you, not to an interviewer, not to anyone evaluating it later. Before you write a line of code, have an honest answer to: who is going to use this, and how are they going to find out it exists?

## Projects that pass this test tend to fall into a few recognizable shapes:

Platforms with a built-in feedback loop,a course platform with in-browser code execution and testing, for example, forces you to think about grading pipelines, sandboxed execution, and scale from day one.
Infrastructure-heavy automation tools, systems that run headless agents or browser automation in the cloud, dispatch scheduled work, and let a user control something remotely, teach you real distributed systems thinking.
"Meta" products on top of existing software, tools that pull together insights across many other tools or services (free or paid) into one smarter surface. The hard part of software today usually isn't the implementation, it's getting people to adopt and pay for it,a project that tackles that head on has real depth baked in.
Personalized content or wellness tools,systems that combine a large, constantly growing dataset with fine tuned models to filter, personalize, or surface content for a specific community's needs. These look simple on the surface but hide serious data and ML engineering underneath.

None of these need to be copied exactly, the point is the shape: pick something with enough surface area that "getting people to actually use it" becomes part of the engineering problem, not a footnote after you're done.

## Putting it together

Before you commit to a project, run it through all three filters honestly:

Will this force me to learn something I don't already know, for 4-6 months straight?
Am I building this with the right mix of people, not just by myself?
Have I designed a real path to actual users, not just a demo?

If you can say yes to all three, you're not just picking a project, you're setting yourself up to walk into a conference or an interview with a system you can talk about for an hour, built by a team, used by real people.

_Midhat Kazmi_
_Dev Weekends_
