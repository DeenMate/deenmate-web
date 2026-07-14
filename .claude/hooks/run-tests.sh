#!/bin/bash
# Stop hook — TEMPLATED, SELF-DISABLING until the Next.js scaffold exists.
# Once live: run the test suite if present; exit 2 with failures so Claude fixes them.

cd "$CLAUDE_PROJECT_DIR" || exit 0
[ -f package.json ] || exit 0
[ -d node_modules ] || exit 0
git diff --quiet HEAD -- src/ 2>/dev/null && exit 0   # no src changes — skip

# Only if a test script exists (--if-present exits 0 when absent).
OUT=$(npm test --if-present --silent 2>&1)
STATUS=$?
if [ $STATUS -ne 0 ]; then
  echo "Web tests failing:" >&2
  echo "$OUT" | tail -40 >&2
  exit 2
fi
exit 0
