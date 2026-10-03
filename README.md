# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# SignBridge-AI 🤟

> AI-powered sign language communication platform

SignBridge-AI is a web-based platform designed to help reduce the communication gap between people who use sign language and people who do not understand it.

The project combines camera-based interaction, computer vision, artificial intelligence, text translation, and sign-language output into an integrated and expandable communication platform.

---

## 💡 Project Idea

The basic aim of SignBridge-AI is to reduce the communication gap between people who use sign language and people who do not understand it.

Our project has three main communication directions:

### 1. 🤟 Sign Language → Text

- User shows a sign through a laptop or mobile camera.
- Camera captures the hand movement.
- AI/computer vision detects the sign.
- System converts the recognized sign into text.
- Example: User signs **HELLO** → screen shows **HELLO**.

### 2. 📝 Text → Sign Language

- User types a word or sentence.
- System identifies the words.
- Corresponding sign-language videos or animations are displayed.
- Example: User types **HELLO** → corresponding sign is shown.

### 3. 🎤 Speech → Sign Language

- User speaks through a microphone.
- Speech is converted into text.
- Text is processed.
- Corresponding sign-language output is displayed.
- Example: User says **"I need help"** → system displays the relevant signs.

---

## 🎯 Project Goal

SignBridge-AI aims to provide a simple and accessible platform for communication between sign-language users and people who do not understand sign language.

The long-term goal is to build an integrated system that can support multiple communication directions in real time.

We are not claiming that sign-language recognition is a completely new research problem. Existing research and tools already exist.

Our focus is to create an integrated, real-time, and expandable platform combining these communication directions in one system, starting with a controlled vocabulary and gradually expanding it.

---

## ✨ Key Features

- 🤟 **Sign Language Recognition**  
  Uses a camera-based interface to capture hand gestures and prepare them for AI-based recognition.

- 📝 **Text to Sign Language**  
  Converts typed words or sentences into corresponding sign-language output.

- 🎤 **Speech to Sign Language**  
  Converts spoken language into text and prepares the corresponding sign-language output.

- 📷 **Camera Integration**  
  Provides a browser-based camera interface for real-time interaction.

- 🤖 **AI-Ready Architecture**  
  The frontend is designed so that AI/computer-vision recognition can be integrated as the project develops.

- ⚡ **Real-Time Interaction**  
  The interface is designed around real-time sign detection and translation.

- 🌐 **Web-Based Platform**  
  The application can be accessed through a modern web browser without requiring a separate desktop application.

- 📱 **Responsive Interface**  
  Designed to work across different screen sizes, including laptops and mobile devices.

---

## 🖥️ Current Frontend

The current frontend provides the initial user interface for SignBridge-AI.

It includes:

### 🏠 Landing Page

The landing page introduces SignBridge-AI and explains its purpose.

It contains:

- Project branding
- Main project description
- Start Translating button
- How SignBridge-AI Works section
- Project mission section
- Feature highlights

### 🎥 Translator Interface

The translator page provides the main interaction area.

It currently includes:

- Camera preview
- Start Camera button
- Stop Camera button
- Camera status
- Detected Sign section
- AI Recognition status
- Translation section
- Real-time interaction indicators

The current interface establishes the frontend foundation for future AI-based sign recognition.

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Browser APIs

- Web Camera API
- MediaDevices API

### Planned AI / Backend Components

The project is being developed with future integration of:

- Computer Vision
- Hand Gesture Recognition
- Machine Learning
- Artificial Intelligence
- Speech Recognition
- Text Processing
- Sign-Language Video/Animation Output

The exact AI and backend technologies may evolve as development progresses.


---

## 🔄 How SignBridge-AI Works

SignBridge-AI is planned around three main communication pipelines.

### 1. 🤟 Sign Language → Text

Camera → Hand Gesture → Hand Detection → AI / Computer Vision → Sign Recognition → Text Output

The camera captures the user's hand gesture. The AI system processes the gesture and identifies the corresponding sign before displaying the result as text.

### 2. 📝 Text → Sign Language

User Text → Text Processing → Word / Phrase Identification → Sign Mapping → Sign Video / Animation → Visual Sign Output

The user enters text, and the system identifies the corresponding signs and displays them using sign-language videos or animations.

### 3. 🎤 Speech → Sign Language

Microphone → Speech Recognition → Text → Text Processing → Sign Mapping → Sign Video / Animation → Visual Sign Output

The user's speech is converted into text and then processed to determine the corresponding sign-language output.

---

## 🧠 AI and Computer Vision

The AI component is one of the main future development areas of SignBridge-AI.

The planned recognition pipeline includes:

1. Camera input
2. Hand detection
3. Hand landmark extraction
4. Gesture analysis
5. Sign classification
6. Text generation

A controlled vocabulary will be used during the initial development stage.

The vocabulary can gradually be expanded as the recognition system is improved.

---

## 🎯 Controlled Vocabulary

The initial version of the project will focus on a limited set of signs instead of attempting to recognize every possible sign immediately.

For example, the initial vocabulary may contain common signs such as:

- HELLO
- YES
- NO
- THANK YOU
- PLEASE
- HELP
- GOOD
- BAD
- STOP
- START

The exact vocabulary will be determined during AI model and dataset development.

Starting with a controlled vocabulary allows the team to test the complete communication pipeline before expanding the system.

---

## 📈 Future Expansion

After the initial controlled vocabulary is working, the system can be expanded with:

- More signs
- More words and phrases
- Sentence-level translation
- Improved gesture recognition
- Better hand tracking
- Multiple sign-language support
- Sign-language video libraries
- Sign-language animations
- Speech integration
- Improved real-time performance

---

## 🔐 Privacy and Security

Camera access should only be requested when required by the application.

Users must explicitly provide browser permission before the application can access the camera.

The project will follow appropriate security and privacy practices as backend and AI services are introduced.

Sensitive information such as API keys, passwords, access tokens, and private credentials must never be committed to the GitHub repository.

---

## ⚙️ Installation and Setup

### Prerequisites

Before running SignBridge-AI locally, make sure the following are installed:

- Node.js
- npm
- Git

You can check the installed versions with:

    node --version
    npm --version
    git --version

---

## 📥 Clone the Repository

Clone the SignBridge-AI repository:

    git clone https://github.com/Krishna-199221/SignBridge-AI.git

Move into the project directory:

    cd SignBridge-AI

Switch to the frontend branch:

    git checkout Frontend

Install the required dependencies:

    npm install

---

## ▶️ Run the Frontend

Start the development server:

    npm run dev

Vite will provide a local development URL, usually:

    http://localhost:5173/

Open the provided URL in your browser to access the application.

---

## 📋 Available Scripts

### Start Development Server

    npm run dev

Starts the Vite development server for local development.

### Build the Project

    npm run build

Creates an optimized production build of the application.

### Preview Production Build

    npm run preview

Runs the production build locally for testing.

### Run ESLint

    npm run lint

Checks the project for JavaScript and code-quality issues.

---

## 📷 Camera Permissions

The SignBridge-AI translator uses the browser's camera functionality.

When the user selects **Start Camera**, the browser requests permission to access the device camera.

The user must select **Allow** to enable the camera.

The current workflow is:

    Start Camera
          ↓
    Browser requests permission
          ↓
    Camera stream starts
          ↓
    Live preview appears
          ↓
    Future AI system processes the gesture

When the user selects **Stop Camera**, the active camera stream is stopped.

Camera access is controlled by the browser and operating system.

---

## 🧪 Current Testing

The frontend should currently be tested for:

- Application startup
- Navigation
- Responsive layout
- Camera permission
- Start Camera functionality
- Stop Camera functionality
- Camera preview
- Translator interface
- Status messages
- Browser console errors

AI recognition accuracy will be tested after the AI recognition system is integrated.


---

## 🌿 Git Branch Structure

SignBridge-AI uses separate branches for different areas of development.

    main
    ├── Frontend
    ├── Backend
    ├── ai
    ├── documentation
    └── presentation

### Branch Responsibilities

| Branch | Responsibility |
|---|---|
| `main` | Stable integrated project |
| `Frontend` | React UI and frontend development |
| `Backend` | Backend and API development |
| `ai` | AI, computer vision, datasets, and recognition |
| `documentation` | Project documentation |
| `presentation` | Presentation and demonstration material |

---

## 👥 Team Collaboration

Team members should work on their assigned branches rather than directly changing the `main` branch.

Before starting work:

    git checkout Frontend
    git pull origin Frontend

After making changes:

    git add .
    git commit -m "Describe your changes"
    git push origin Frontend

---

## 🔀 Pull Request Workflow

When a feature is ready:

1. Push the branch to GitHub.
2. Create a Pull Request.
3. Describe the changes.
4. Allow the team to review the changes.
5. Resolve review comments.
6. Merge after approval.

The general workflow is:

    Frontend → main
    Backend → main
    ai → main
    documentation → main
    presentation → main

The `main` branch should contain the integrated project version.

---

## 📝 Commit Message Convention

Use clear and meaningful commit messages.

### New Feature

    Add: camera preview

### Bug Fix

    Fix: camera permission issue

### UI Change

    Update: translator interface

### Documentation

    Docs: update README

### Refactoring

    Refactor: translator component

---

## 🔐 Security

Never commit sensitive information such as:

- API keys
- Passwords
- Access tokens
- Private credentials
- Database credentials
- Secret configuration files

If environment variables are required, use a local `.env` file and keep secrets out of GitHub.

Example:

    VITE_API_URL=
    VITE_AI_API_KEY=

A safe template can be maintained as:

    .env.example

Do not commit:

    .env

---

## 📊 Development Status

### 🟢 Completed / In Progress

- [x] Repository setup
- [x] Team branch structure
- [x] React/Vite frontend setup
- [x] Landing page
- [x] Responsive UI
- [x] Camera interface
- [x] Browser camera access
- [x] Translator interface
- [x] Start/Stop Camera interaction

### 🟡 Under Development

- [ ] AI sign recognition
- [ ] Hand landmark processing
- [ ] Sign-to-text translation
- [ ] Text-to-sign output
- [ ] Speech-to-sign output
- [ ] Backend API integration
- [ ] Controlled vocabulary
- [ ] Model evaluation
- [ ] Automated testing
- [ ] Production deployment

---

## 🗺️ Development Roadmap

### Phase 1 — Foundation

- Repository setup
- Branch organization
- Frontend foundation
- Basic responsive UI
- Camera interface

### Phase 2 — Sign Language → Text

- Hand detection
- Hand landmark extraction
- Dataset preparation
- Gesture classification
- Controlled vocabulary
- Text output

### Phase 3 — Text → Sign Language

- Text input
- Word and phrase processing
- Sign mapping
- Sign-language video/animation library
- Visual sign output

### Phase 4 — Speech → Sign Language

- Microphone input
- Speech recognition
- Text processing
- Sign mapping
- Sign-language output

### Phase 5 — Integration

- Frontend and backend integration
- Frontend and AI integration
- Real-time processing
- Error handling
- Performance improvements
- Testing

### Phase 6 — Expansion

- Larger vocabulary
- More sign-language support
- Sentence-level translation
- Improved recognition
- Accessibility improvements
- Deployment
- Future mobile support

---

## ♿ Accessibility Goals

Accessibility is an important part of SignBridge-AI.

The platform aims to provide:

- Simple navigation
- Clear controls
- Readable typography
- Responsive layouts
- Visible system status
- Camera feedback
- Understandable translation output
- Support for different screen sizes

Future accessibility features may be added as the project develops.

---

## ⚠️ Current Limitations

SignBridge-AI is currently under development.

At the present stage:

- The frontend interface is available.
- Browser camera interaction is available.
- The AI sign-recognition system is still being developed.
- Translation output is not yet production-ready.
- Recognition accuracy will depend on the selected dataset, model, training process, and testing.

The current translator may therefore display:

    Waiting for camera

or:

    Waiting for sign detection...

until the AI system is connected.

---

## 🤝 Contributing

Contributions are welcome.

Before making changes:

    git pull

Switch to the appropriate branch:

    git checkout Frontend

Make and test your changes.

Then:

    git add .
    git commit -m "Describe your changes"
    git push origin Frontend

For larger changes, create a Pull Request for review.

---

## 📌 Development Guidelines

Please follow these practices:

- Keep components organized.
- Use meaningful names.
- Keep commits focused.
- Test changes before pushing.
- Avoid unnecessary duplication.
- Do not commit secrets.
- Do not directly modify `main` unless authorized.
- Keep existing functionality working.
- Document important architectural changes.

---

## 📄 License

The project is currently under development.

License information will be maintained in the repository `LICENSE` file.

---

## 🌍 Vision

> **Technology that connects people.**

SignBridge-AI aims to explore how artificial intelligence, computer vision, speech processing, and sign-language resources can be combined into one accessible communication platform.

---

## 📦 Repository

**SignBridge-AI**

GitHub Repository:

https://github.com/Krishna-199221/SignBridge-AI

---

## ⭐ Project Status

    🚧 SignBridge-AI — In Development

The project is being developed incrementally, starting with the frontend and camera interaction and progressing toward AI recognition, translation, speech processing, and integrated communication.

---

## 🤟 SignBridge-AI

**AI-based Sign Language Communication Platform**

> Technology that connects people.

