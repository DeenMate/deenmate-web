#!/bin/bash
# PostToolUse(Edit|Write) — TEMPLATED, SELF-DISABLING until the Next.js scaffold exists.
# Once package.json + node_modules are present: prettier + eslint the edited file.
# Also nudges on banned physical-direction Tailwind classes (RTL-first law).

INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)

cd "$CLAUDE_PROJECT_DIR" || exit 0
[ -f package.json ] || exit 0        # scaffold doesn't exist yet — template dormant
[ -d node_modules ] || exit 0

case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.css|*.mjs) ;;
  *) exit 0 ;;
esac

npx prettier --write "$FILE" >/dev/null 2>&1
LINT_OUT=$(npx eslint --fix "$FILE" 2>&1)
[ -n "$LINT_OUT" ] && { echo "eslint findings in $FILE:"; echo "$LINT_OUT" | head -40; }

# RTL-first law: flag physical-direction utilities (use logical ms-/me-/ps-/pe-/text-start/text-end).
case "$FILE" in
  *.tsx|*.jsx)
    RTL_HITS=$(grep -nE 'className="[^"]*\b(ml-|mr-|pl-|pr-|text-left|text-right|left-[0-9]|right-[0-9])' "$FILE" 2>/dev/null | head -10)
    [ -n "$RTL_HITS" ] && { echo "RTL-first violation — physical direction classes found (use logical: ms-/me-/ps-/pe-/text-start/text-end):"; echo "$RTL_HITS"; }
    ;;
esac
exit 0
