# Manage local Markdown issues

Read and edit issues and specifications as Markdown files under `.scratch/`. Each feature has its own directory.

## Organize feature files

Use these paths and fields for feature planning:

- Use one directory per feature, such as `.scratch/your_feature_slug/`.
- Store the specification at `.scratch/your_feature_slug/spec.md`.
- Store one ticket per file, such as `.scratch/your_feature_slug/issues/01-your_ticket_slug.md`. Number tickets from `01`.
- Record triage state in a `Status:` line near the top of each ticket. Use the role strings in [triage labels](triage-labels.md).
- Append comments and conversation history under a `## Comments` heading. Keep this heading as written so tools can find it.

## Publishing to the issue tracker

Create the specification or ticket file in its feature directory under `.scratch/`. Create the directory if needed.

## Fetching a ticket

Read the referenced file. Resolve ticket numbers within the feature directory supplied by the user. If the feature is unclear, ask for the path.

## Manage wayfinding tickets

The `/wayfinder` workflow uses a map file and one file per child ticket. Organize each effort as follows:

- Store the map at `.scratch/your_effort_slug/map.md`, with Notes, Decisions-so-far, and Fog sections.
- Store child tickets in that effort's `issues/` directory, such as `01-your_ticket_slug.md`. Number tickets from `01` and write the question in the body.
- Record `research`, `prototype`, `grilling`, or `task` in a `Type:` line.
- Record `open`, `claimed`, or `resolved` in a `Status:` line.
- List dependencies in a `Blocked by:` line near the top, such as `Blocked by: 01, 02`. A ticket is unblocked when every listed ticket is `resolved`.

Process tickets in this order:

1. Find tickets that are open and unblocked. Choose the lowest numbered ticket first.
2. Set `Status: claimed` and save before starting work.
3. Append the answer under `## Answer` and set `Status: resolved`.
4. Append a summary and file link to the map's Decisions-so-far section.

Wayfinding tickets use their own lifecycle statuses. Feature implementation tickets use the triage roles.
