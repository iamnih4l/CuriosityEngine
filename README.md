<div align="center">
  <h1>🧠 Curiosity Engine</h1>
  <p><em>An intelligent desktop widget that reignites your curiosity, every single day.</em></p>
  <br />
</div>

> [!NOTE]
> This application is built as a minimal, lightweight, always-on-top desktop widget. It presents one fascinating, obscure topic each day to encourage exploration and learning.

---

## ❓ Why Create Curiosity Engine?

The goal of this widget is not to give you "motivational quotes," random Wikipedia facts, or current news. 

Instead, the **Curiosity Engine** was built to **reignite intellectual curiosity**. It is designed for those who want their computer to act as a brilliant scientist, philosopher, and historian. Every morning, opening your laptop exposes you to one profound idea—be it astrophysics, quantum mechanics, philosophy, or complexity science—capable of expanding your understanding of the world and making you say: 

> *"I've never heard of this before... I need to learn more."*

---

## ✨ Features

- **Daily Curated Topics**: Uses AI to generate obscure, thought-provoking topics (e.g., The Great Filter, Dyson Spheres).
- **Glassmorphism UI**: Beautiful, fully transparent, draggable widget interface that looks native on any desktop.
- **Deep Dive Learning**: Click *Learn More* for a comprehensive breakdown, history, and thought-provoking questions.
- **Instant Exploration**: Direct links to search Google or YouTube for the topic.
- **Always-On Integration**: Configured to launch automatically at startup so you never miss a day of learning!
- **Local Privacy**: Your streaks, settings, and favorites are stored purely on your local machine.

---

## 🚀 Installation Guide

### Option 1: Quick Install (Windows)

1. Navigate to the [Releases](#) tab (or clone the repository and build it locally).
2. Download `Curiosity Setup.exe`.
3. Double click the installer to run it.
4. The application will launch automatically and embed itself in your system startup routine!

> [!IMPORTANT]
> The widget uses a frameless transparent window. To move the widget around your screen, **click and drag the invisible top header area** of the widget.

### Option 2: Build from Source

If you prefer to compile the application yourself, make sure you have [Node.js](https://nodejs.org/) installed.

```bash
# 1. Clone the repository
git clone https://github.com/iamnih4l/CuriosityEngine.git
cd CuriosityEngine

# 2. Install dependencies
npm install

# 3. Start in development mode
npm run electron:dev

# 4. Build the executable installer
npm run electron:build
```

The compiled installer will be available in the `release/` directory.

---

## ⚙️ Configuration

Curiosity requires a Google Gemini API Key to autonomously generate daily topics.

1. Launch the widget.
2. Click the **Settings icon** (⚙️) in the top right.
3. Paste your Gemini API Key in the designated field and click **Save**.
4. You can also customize the App Theme (Light/Dark) in this menu!

---

## 🏗️ Technology Stack

- **Electron**: For cross-platform desktop capabilities and deep system integration.
- **React & Vite**: Extremely fast and responsive UI layer.
- **Vanilla CSS**: Custom design system using glassmorphism aesthetics.
- **Google Gen AI**: Powerful LLM integration for endless topic generation.

---

<div align="center">
  <i>Stay curious.</i>
</div>
