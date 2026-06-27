# Task

{{TASK_DESCRIPTION}}

## Context

Read `.roadie/AGENT.md` for project context and coding standards.
Read `.roadie/fix_plan.md` if it exists for the current fix plan.

## Instructions

1. Understand the problem completely
2. Explore the codebase to find relevant files
3. Plan your changes
4. Implement the fix with minimal, focused changes
5. Verify the fix works (check for syntax errors, run tests if available)
6. Commit with: `fix: #NNN <one-line summary>` (replace NNN with the issue number)
7. If opening a PR, the PR body MUST include `Closes #NNN` on its own line so GitHub
   auto-closes the issue when the PR merges. Without this keyword the issue stays open
   and Roadie will re-pick it on the next run, creating a duplicate PR.

## Output Format

When done, output a summary:
- What was the problem
- What files were changed
- How was it fixed
- Any follow-up recommendations
