**Idea: Contact Manager**

**One-Liner**
A curated, rich contact manager designed for the people who matter—more detailed than a phone’s address book, with quick-access shortcuts, relationship reminders, and mixed-language name support.

**What It Does**
- Stores extensive per-person data, far beyond basic phone/email:
  - Profile picture
  - First / middle / last name
  - Nickname (separate field)
  - Display name (e.g., “お母さん”, “آقاجون”, “Project Manager Alex”) – how you *think* of them
  - Multiple phone numbers (mobile, work, home, etc.)
  - Multiple email addresses
  - Social links (Twitter, LinkedIn, etc.)
  - Physical addresses (home, work, shop)
  - Birth date
  - Website / portfolio
- Relationship tags or roles (e.g., family, friend, coworker, client) to filter and group.
- Favorites / bookmarks / pinned contacts for **one-touch access** on the app’s home screen.
  - E.g., tap to call your project manager instantly during an error, without searching.
  - Long-press or hold for other actions (text, email, navigate).
- **Stay-in-touch reminders**: set nudges to call, text, or visit specific contacts periodically, so relationships don’t fade.
- First-class **internationalization (i18n)**: gracefully handles names in any script (Cyrillic, Arabic, CJK, etc.) and lets you set a display name in your preferred language.
- **Batch sharing**: export a selection of contacts as vCard or via a secure shareable link, for quick handoff to others.

**Core Experience**
1. You intentionally add only the people you actually need to stay connected with, free from the clutter of your phone’s default list.
2. Open the app: the home screen shows pinned/favorite contacts as large, tappable tiles for immediate action.
3. Tap a contact to see their full profile, with all rich details neatly organized.
4. Set a stay-in-touch reminder (e.g., “call every two weeks”), and the app pings you at the right time.
5. When sharing your contact or a group, export clean vCards without exposing your entire phonebook.

**Problem Validation**
- **What real-world friction does this address?**
  Phone contact lists become dumping grounds—cluttered with one-time numbers, outdated entries, and service bots. Finding an important person requires searching or scrolling through noise. Maintaining personal relationships gets forgotten.
- **Is it a surface symptom or a root cause?**
  Root cause: The default phone book has zero curation tools and no relationship-maintenance features. A clean, separate manager with favorites and reminders directly targets both the clutter and the forgetting.
- **What happens if you don’t build it?**
  You continue to avoid opening the contacts app, dreading the mess. Important calls get delayed, and connections weaken because no system nudges you to reach out.
- **The “to-do app lesson” check:**
  Are you avoiding the simple act of deleting junk contacts and setting reminders elsewhere? Possibly – you could prune your phone’s contacts and use a separate reminder app. But the friction of two apps plus the lack of quick-call favorites in one place is real. This tool combines those needs elegantly. Validating by prototyping will show if you actually use it more than the default.

**Open Questions / Decisions**
- **Tags vs. relationship field**: Should they be separate (relationship = single choice, tags = multiple), or can roles be replaced by a flexible tag system?
- **Quick-actions**: Which actions live on the home screen tile? Just call, or swipe-for-text/email?
- **Reminder types**: Pre-set intervals or custom schedules? What’s the minimal helpful nudge?
- **Platform**: Mobile-first (likely), or also desktop/web? vCard sharing implies cross-platform thinking.
- **Data safety**: Contacts are sensitive. Local-only storage with encrypted backup, or optional cloud sync?

**Potential Features to Explore**
- Import selected contacts from phone address book (with a “clean up later” mode).
- Deduplication / merge suggestions for those you already have.
- Activity log: last time you called/texted/visited, auto-tracked or manually noted.
- Smart grouping: auto-suggest “favorites” based on frequency.
- Dark/light theme, with large touch targets for quick-call safety.
