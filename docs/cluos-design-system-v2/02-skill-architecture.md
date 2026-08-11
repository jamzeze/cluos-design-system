# 02 — Skill Architecture

## Canonical source, single point of truth

```
cluos-design-system/agent-skills/
  frontend/
    anti-ai-slop-frontend/SKILL.md
    design-gallery/SKILL.md
    frontend-craftsman/SKILL.md
    design-critic/SKILL.md
    design-system-refactor-director/SKILL.md
  shared/
    design-archetypes.yaml
    anti-slop-rubric.md
    palette-policy.md
    routing-matrix.yaml
  profiles/cluos/
    product-context.md
    brand-context.md
    surface-inventory.md
    design-decisions.yaml
    palette-decisions.yaml
  manifest.yaml
cluos-design-system/scripts/
  install-agent-skills.sh
  sync-agent-skills.sh
  validate-agent-skills.sh
  test-frontend-routing.sh
```

## Install targets (empirically confirmed, see 00-baseline.md)

- `~/.claude/skills/<slug>/SKILL.md`
- `~/.codex/skills/<slug>/SKILL.md`

Same frontmatter contract (`name`, `description`) works unmodified for
both — no per-platform fork of any SKILL.md was needed.

## Sync mechanism

`scripts/sync-agent-skills.sh` copies (not symlinks — cross-repo symlinks
are fragile if either side moves) each `agent-skills/frontend/<slug>/`
directory into both target roots. Idempotent: re-running with no changes
is a no-op after the first backup-if-diverged pass. `--check` mode reports
drift without writing. Ran and verified on 2026-08-10: 5/5 skills synced to
both targets, `validate-agent-skills.sh` reports zero drift, and Claude
Code's own skill listing picked up all 5 new skills immediately after the
sync (observed in-session, not just asserted).

## Routing

`anti-ai-slop-frontend` is the mandatory entry point. It classifies depth
(N0-N3, see `shared/routing-matrix.yaml`) and hands off along the chain
documented in each skill's frontmatter `description` and body. The
12-prompt test matrix from the source metaprompt (§18.4) is encoded in
`routing-matrix.yaml` `test_matrix:` and checked for internal consistency
(every referenced skill exists, every level is valid) by
`scripts/test-frontend-routing.sh` — see `skill-provenance.md` "Deferred"
for what this check does *not* cover.

## Global config wiring

`agent-skills/global-config-block.md` is the canonical source for the
`<!-- BEGIN/END CLUOS FRONTEND WORKFLOW -->` delimited block, inserted
(never overwriting surrounding content) into three files by
`scripts/sync-global-config.sh`:

- `~/.claude/CLAUDE.md`
- `/Users/rafacosta/Documents/GitHub/AGENTS.md`
- `~/.codex/AGENTS.md`

Backed up (once per changed target, to `~/.claude/config-backups/<timestamp>/`)
before any write. Idempotent — re-running with no drift is a no-op
(`--check` reports drift without writing). The update-in-place path was
verified on a scratch copy before being run against the real files: block
correctly replaced, surrounding content byte-identical outside the marker
range, no duplication.

**Asymmetric confidence on the two targets.** The Claude side is
self-verified: after `sync-agent-skills.sh` ran, Claude Code's own skill
listing showed all 5 new skills immediately (observed in-session). The
Codex side has no equivalent live-load confirmation — there is no
skill-listing command available in this session to prove
`~/.codex/AGENTS.md` is read as global instructions the same way
`~/.claude/CLAUDE.md` is for Claude. Circumstantial evidence supports it:
`~/.codex/config.toml` has no separate instruction-file directive to
override it, and the file's pre-existing content (before this refactor's
edit) is written as live imperative directives to the agent itself
("before editing code, spawn the `advisor` agent...", communication-style
rules) rather than passive documentation — consistent with it already
being an active global-instructions file, not an unread doc. This is
inference from file contents, not a confirmed load path. Treat the Codex
half of this wiring as *probably* live, not *verified* live, until a real
Codex session confirms it picked up the block.

## CluOS profile auto-load

`anti-ai-slop-frontend`'s SKILL.md instructs loading
`agent-skills/profiles/cluos/*` whenever work happens inside a CluOS repo.
This is a documentation-level instruction (skills are markdown read by the
agent, not executable code with repo-detection logic) — the agent is
expected to check whether it's operating inside
`/Users/rafacosta/Documents/GitHub` and, if so, read the profile files.
