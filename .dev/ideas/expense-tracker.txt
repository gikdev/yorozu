**Idea: Expense & Wealth Tracker with Custom Currency**

**One-Liner**
A personal finance tool that uses a fictional internal currency to avoid real-world decimal headaches, tracks debt and assets, charts net wealth over time, and optionally captures emotional context around spending.

**What It Does**
- Log expenses and income with:
  - Category / reason (e.g., fun, necessity, need, impulse).
  - Free-text description.
  - Optional emotional note (hesitation, embarrassment, joy) for later therapeutic insight.
- Uses an **internal, made-up currency** (e.g., “coins”) that has no decimals – simple whole numbers.
  - In settings, you define the conversion rate (e.g., 1 coin = 100,000 Iranian toman).
  - All calculations, storage, and charts work in coins.
  - Toggle a **secondary display layer** to show the equivalent real-world currency on the fly, without changing the underlying data.
- **Debt manager**:
  - Track money you owe and money owed to you.
  - Each debt has a counterpart, amount, due date, and a reminder to follow up (call/text).
- **Asset manager**:
  - List physical or digital assets (gold grams, Tether, Bitcoin, etc.).
  - Assign a coin value to each asset (manual entry or optional auto-fetch).
  - See a unified net wealth view (assets minus debts).
- **Charts & summaries**:
  - Category breakdowns (where your money goes).
  - Wealth chart over time (months) to see if you’re moving forward or slipping.
  - Progress indication – am I saving or just treading water?
- **Therapeutic layer** (optional):
  - Record a feeling or hesitation score per transaction.
  - Later correlate emotions with spending categories – e.g., you always feel embarrassed buying food.
  - Provides a gentle mirror, not a clinical tool.

**Core Experience**
1. You enter an expense: “Lunch – necessity – 3 coins – felt a bit shy paying.”
2. You instantly see category trends and a running balance, all in clean whole numbers.
3. When you want to know real-world value, toggle the secondary currency overlay.
4. Debt reminders nudge you at the right time to follow up, avoiding awkward forgotten loans.
5. A wealth dashboard shows total coins across cash, gold, crypto, minus debts, with a chart stretching back months – a single number that tells you if you’re gaining or losing ground.
6. Optionally, monthly you review the emotional tags and spot patterns you’d otherwise miss.

**Problem Validation**
- **What real-world friction does this address?**
  Local currencies with huge numbers and decimals (like Iranian rial) make mental arithmetic and clean charts painful. Existing trackers either force you into that mess or ignore assets/debts entirely. Also, financial anxiety often has behavioral roots that raw numbers don’t capture.
- **Is it a surface symptom or a root cause?**
  Mixed. The custom currency solves a genuine numeric friction. The emotional tracking tackles a deeper root – spending habits tied to feelings. The debt/asset unification is a real missing piece in simple trackers.
- **What happens if you don’t build it?**
  You either avoid tracking altogether because of messy numbers, or you track expenses in a spreadsheet that ignores debts and assets, leaving a fragmented picture. The emotional patterns stay invisible.
- **The “to-do app lesson” check:**
  Could you just use a spreadsheet with a “coin” column and manually convert? Yes, but the friction of manual charting, debt reminders, and asset valuation would likely make you stop. The emotional tracking is a genuinely novel angle, but you must validate if you actually *want* to record feelings. Prototype the bare core (expense logging in coins) first – if that alone feels useful, layer on the rest.

**Open Questions / Decisions**
- **Category system**: fixed preset (necessity/fun/etc.) or fully customizable tags?
- **Asset valuation**: manual coin price per asset, or optional API for crypto/gold? (Latter adds complexity.)
- **Debt reminders**: where do they fire? Push notification, in-app badge, or just a list?
- **Therapeutic aspect**: a separate “feeling” field with emoji scale or free-text? Opt-in per transaction?
- **Wealth chart granularity**: snapshot at end of each month, or daily tracking?
- **Privacy**: emotions attached to transactions are extremely personal – local-only storage with encrypted backup, or zero cloud.

**Potential Features to Explore**
- Recurring expenses/income (subscriptions, salary) in coins.
- “Was this worth it?” one-tap rating after a purchase, for later reflection.
- Export simple coin-based reports for sharing (stripped of real-world conversion and emotions).
- Separate savings goal tracker, expressed in coins.
- Quick-add widgets: tap a category icon to add a preset coin amount instantly.
