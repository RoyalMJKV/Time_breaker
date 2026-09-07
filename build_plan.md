#  Build Plan: 20-20-20 Eye Care Reminder Application

This document outlines the comprehensive build plan for the 20-20-20 Eye Care Reminder desktop application, incorporating the requirements from the initial `idea.md` specification along with modern UI (Glassmorphism) and a preferred NoSQL local database structure.

---

## 1. Project Overview
A lightweight, privacy-first, offline desktop eye-care companion for Windows and Linux. It runs in the background, reminds users to take regular visual breaks (20 minutes screen time -> 25 seconds break), and maintains a simple history of their screen sessions.

---

## 2. Tech Stack & Dependencies

To achieve the requirements of **cross-platform compatibility**, **minimal CPU/RAM usage**, and a **modern Glassmorphism UI**, the following stack is recommended:

*   **Application Framework:** **Tauri** (Rust-based). Tauri is significantly more resource-efficient than Electron, ensuring minimal background memory and CPU footprint.
*   **Frontend Library:** **React.js (TypeScript)** for robust component-based UI development.
*   **Styling:** **Tailwind CSS** combined with CSS modules for implementing the **Glassmorphism** design system (using backdrop-blur, semi-transparent backgrounds, and subtle borders).
*   **Animations:** **Framer Motion** for smooth, calm transitions and countdown animations.
*   **Database (NoSQL):** **tauri-plugin-store** (JSON-based local NoSQL key-value store) or **Sled** (embedded NoSQL database for Rust) to store user settings and session history locally.
*   **Native Integrations:**
    *   `tauri-plugin-autostart` (for launch-on-boot).
    *   `tauri-plugin-notification` (for native OS notifications).
    *   Tauri System Tray API (for tray icon and background running).

---

## 3. Database Structure (NoSQL)

Since the application requires local-only persistence and NoSQL is preferred, we will use a document-based JSON structure. Data will be stored in two main collections/files in the user's local application data folder can be located at the spacious disk with more storage.

### Collection 1: `settings.json`
Stores user preferences.
```json
{
  "appearance": {
    "theme": "system", // "light", "dark", "system"
    "fontSize": "medium", // "small", "medium", "large"
    "fontFamily": "Inter, sans-serif"
  },
  "reminder": {
    "mode": "overlay", // "overlay", "notification"
    "durationSeconds": 25,
    "intervalMinutes": 20
  },
  "sound": {
    "enabled": true,
    "volume": 0.7,
    "soundTheme": "gentle_chime"
  },
  "system": {
    "startOnBoot": true,
    "startMinimized": true
  }
}
```

### Collection 2: `history.json`
Stores the log of completed sessions.
```json
[
  {
    "sessionId": "uuid-v4-string",
    "startTimestamp": "2026-09-06T14:30:00Z",
    "endTimestamp": "2026-09-06T16:45:00Z",
    "totalActiveDurationSeconds": 8100,
    "breaksTriggered": 6,
    "breaksCompleted": 5,
    "pauseCount": 1,
    "status": "completed" // "completed", "terminated"
  }
]
```

---

## 4. UI/UX Design: Glassmorphism

The UI will utilize a **Glassmorphism** aesthetic to convey a "Calm + Minimal + Lightweight + Modern" feel.

**Key Visual Characteristics:**
*   **Translucency:** Semi-transparent panels with a frosted glass effect (`backdrop-filter: blur(16px)`).
*   **Vivid Backgrounds:** Subtle, animated, abstract gradient backgrounds (e.g., soft blues, greens, and purples) behind the glass panels to make the transparency visible without being distracting.
*   **Borders & Highlights:** 1px solid white/gray borders with low opacity to simulate the edge of glass.
*   **Typography:** Clean, sans-serif fonts (like Inter or Roboto) with high contrast for readability.
*   **Shadows:** Soft, diffused drop shadows to create depth and separation between overlapping glass layers.

**Core Views:**
1.  **Main Dashboard (Home):** Glass card displaying active session status, next break countdown, and quick daily stats.
2.  **Sidebar:** A frosted glass vertical strip for navigation (Home, History, Settings).
3.  **Reminder Overlay:** A full-screen or large centered glass pane that gently fades in, blurring the rest of the user's screen during the 25-second break.
4.  **Settings & History:** Simple lists and toggles enclosed within rounded glass containers.

---

## 5. Functional Requirements

### Session Management
*   **Start/Stop/Pause/Resume:** Users can fully control the timer state.
*   **Timer Accuracy:** Must use timestamp diffing (current_time - start_time) rather than a simple 1-second decrementing loop to avoid timer drift when CPU throttles.Use default system clock.
*   **Sleep/Wake Detection:** Automatically pause the active session when the OS goes to sleep or locks, and resume when the user returns.

### Reminders & Notifications
*   **Overlay Mode:** A prominent glassmorphic overlay for the 25-second break with a visible countdown.
*   **Notification Mode:** Uses native Windows/Linux desktop notifications instead of the overlay for users who prefer zero disruption.
*   **Audio:** Play a soft, customizable chime when a break starts, adhering to the user's volume settings.

### System Integration
*   **System Tray:** The app minimizes to the tray. The tray icon shows state (Active/Paused) and provides quick controls (Pause, Stop, Open).
*   **Startup:** Optional setting to launch automatically when the OS boots, starting directly in the tray.

### History & Analytics
*   Record every session (start, end, duration, breaks taken).
*   Display basic statistics (today's active time, breaks completed).

---

## 6. Non-Functional Requirements

*   **Offline-First & Privacy:** 100% local. No network requests, telemetry, cloud sync, or user accounts.
*   **Performance:** Background process must consume minimal RAM (< 50MB) and near 0% CPU while idle/timing.
*   **Cross-Platform:** Native builds for Windows (.msi, .exe) and Linux (.AppImage, .deb).
*   **Accessibility:** Keyboard navigation support, scalable fonts, and screen-reader-friendly labels. Color must not be the sole indicator of state (e.g., use text labels like "Active", "Paused").
*   **Resilience:** App must safely recover if the JSON storage files are corrupted, and handle missing fonts or disabled notification permissions gracefully.

---

## 7. Development Phases

### Phase 1: Foundation & Setup
*   Initialize Tauri + React + TypeScript project.
*   Set up Tailwind CSS and basic Glassmorphism utility classes.
*   Create basic routing (Home, Settings, History) and the main App Window.

### Phase 2: Core Timer Logic
*   Implement the timestamp-based timer engine.
*   Build the state machine (IDLE, ACTIVE, PAUSED, BREAK, STOPPED).
*   Connect the UI Start/Stop/Pause buttons to the timer engine.

### Phase 3: UI & Reminders
*   Design the Glassmorphic Home Dashboard.
*   Implement the Full-Screen Reminder Overlay with countdown.
*   Integrate native OS notifications for "Notification Only" mode.
*   Add sound playback capabilities.

### Phase 4: Persistence & Settings
*   Implement the NoSQL local JSON storage (tauri-plugin-store).
*   Wire up the Settings page to update and save user preferences.
*   Record completed sessions to `history.json` and build the History UI.

### Phase 5: Desktop Integration & Polish
*   Implement System Tray functionality.
*   Handle OS Sleep/Wake events to auto-pause the timer.
*   Set up launch-on-boot configuration.
*   Refine Framer Motion animations and ensure accessibility standards.

### Phase 6: Testing & Release
*   Write unit tests for the timer engine and state machine.
*   Test cross-platform UI behavior (Windows and Linux).
*   Compile and package release binaries.
