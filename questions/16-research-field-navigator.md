---
title: "Research Field Navigator"
difficulty: "hard"
duration: "6-8 hours"
description: "Build a comprehensive research intelligence platform for your research field — from data collection to research proposals"
---

# Research Field Navigator

Build a **Research Field Navigator**: a comprehensive research intelligence platform that takes a research field as input and produces a complete scientific landscape analysis — from paper collection, citation mapping, trend analysis, debate synthesis, to research proposal generation.

**You must use your own research field as the input. All outputs must be grounded in your real research direction.**

---

## Module 1: Data Collection Pipeline (10%)

Build an end-to-end paper data collection pipeline:

- Collect paper metadata (title, authors, abstract, citations, date) from **at least two different public data sources**
- Handle pagination, rate limiting, and format differences across sources
- Clean dirty data (missing fields, encoding issues, duplicates), deduplicate across sources, and persist to unified storage
- Support **incremental updates** (don't re-fetch existing data)
- Collect **at least 200 papers** from your research field (past 1-2 years)

---

## Module 2: Citation Graph Visualization (15%)

Build an interactive citation relationship explorer:

- Starting from a seed paper, recursively expand citation relationships to **at least 2 levels of depth**; handle **200+ nodes** without crashing
- Automatically detect key nodes (highly-cited hubs, cross-subfield bridges)
- Use visual encoding (size, color, position) to convey information hierarchy — **readable without a legend**
- Support interactive exploration: click nodes to view details and AI-generated contribution summaries; filter by time/topic/impact
- Automatically identify and highlight **3-5 key research trajectories**

**Visualization quality is the core evaluation criterion for this module — this is where aesthetic taste is tested.**

---

## Module 3: Trend Analysis & Statistics (10%)

Perform field-level quantitative analysis on collected data:

- Identify trending keywords over time (time series), active authors/institutions, emerging sub-directions
- Automatically cluster papers by topic; visualize cluster sizes and growth rates
- Provide **statistical backing** for key trends with natural language interpretation — accurate, specific, no jargon for jargon's sake (e.g., "This sub-direction grew 47% in the past 6 months, significantly above the field average (p=0.01)")

---

## Module 4: Research Gap Identification & Proposals (15%)

Systematically discover research gaps and generate proposals based on Modules 1-3:

- Use topic modeling, citation network analysis, method-problem matrices, etc. to identify gaps — **every gap must have data evidence** (not random keyword combinations)
- Generate a structured research proposal for each gap (motivation, research question, method outline, expected contribution, challenges) — **at least 3 proposals**
- Design an explainable **novelty scoring** framework for self-evaluation
- Each proposal must link to supporting papers, forming a traceable evidence chain

**Each proposal should fit on one page, read like a formal research proposal, and be convincing.**

---

## Module 5: Controversy Multi-Perspective Analysis (15%)

Choose a controversial question in your research field and perform multi-perspective analysis:

- Decompose the controversial question into debatable sub-issues
- Set up **at least 3 differentiated AI roles** (not just pro/con — include methodological critics, empirical analysts, synthesis reviewers), each arguing based on real literature
- Conduct **multi-round structured debate** — genuine back-and-forth, not parallel monologues
- Output a review-style report with argumentative rhythm, explicit strength-of-evidence distinctions, clear consensus/disagreement markers, and open questions
- Each key claim must be annotated with source and evidence strength (strong empirical / indirect inference / theoretical speculation)

**The report should read like a high-quality science commentary, not AI bullet-point lists.**

---

## Module 6: Integrated Interface & Report (20%)

Integrate all modules into a unified interactive interface and comprehensive report:

- **Interactive interface**: Browse the graph, view trends, read proposals and debate reports; natural navigation and cross-references between modules
- **Comprehensive report**: Exportable field research report with narrative structure (overview → graph insights → trends → gaps → controversies → recommendations), well-typeset with figures
- **Interface quality**: Clear visual hierarchy, comfortable reading experience, harmonious color scheme and typography — not default framework styling
- **CLI entry point**: At minimum, support triggering data collection and viewing key metric summaries via command line. Terminal output should also have design quality — structured, layered, human-friendly error messages

**This module tests both web and terminal aesthetic expression.**

---

## Module 7: Reflection & Spec Iteration (15%)

This is not a code module — it's a metacognitive exercise:

- Submit your **complete Spec iteration history** (at least 2 versions), showing what changed and why
- Write a **reflection report** (800 words max), answering with precision and insight:
  1. How did the Spec evolve? What triggered each revision?
  2. In which modules did AI exceed expectations?
  3. Which parts required human intervention, and why?
  4. If you did it again, what would you change?

**The quality of the reflection report's writing is itself an evaluation criterion — precise, restrained, insightful.**

---

## Submission Requirements

1. **Spec document** (with iteration history and revision notes)
2. **Code repository** (runnable, with README explaining how to start)
3. **Screenshots or screen recording** (showing each module working)
4. **Design rationale** (200-300 words explaining key architecture, design, and tech decisions)
5. **Reflection report** (800 words max)

## Evaluation Dimensions

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Data Pipeline | 10% | Multi-source integration, incremental updates, error handling |
| Citation Visualization | 15% | Visual quality, self-explanatory encoding, interaction |
| Trend Analysis | 10% | Analysis depth, statistical rigor, natural language interpretation |
| Research Proposals | 15% | Gap identification methodology, proposal quality, evidence chains |
| Controversy Analysis | 15% | Debate quality, report expression, evidence annotation |
| Integrated Interface | 20% | System integration, web + CLI aesthetics, information architecture |
| Reflection & Iteration | 15% | Spec evolution, writing quality, critical insight |
