#!/bin/bash
# Stop hook — TEMPLATED, SELF-DISABLING until the Next.js scaffold exists.
# Once live: run the test suite if present; exit 2 with failures so Claude fixes them.

input=$(cat)

# Prevent infinite loops: if we're already continuing because of this hook, don't re-block.
active=$(printf '%s' "$input" | /usr/bin/python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print("1" if d.get("stop_hook_active") else "0")
except Exception:
    print("0")
')
[ "$active" = "1" ] && exit 0

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
