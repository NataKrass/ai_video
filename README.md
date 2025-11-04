# 🎬 AI Video Generator

An AI-powered video generation platform built with **Next.js**, **Convex**, **Google Cloud**, and **Remotion**.  
It allows users to generate, render, and download custom AI videos directly from the browser.

---

## 🚀 Features

- 🎥 **Video Rendering via Google Cloud Run & Remotion** — all videos are rendered in the cloud for high performance.  
- 🤖 **AI Content Generation** — integrates with **OpenAI**, **Gemini**, and other AI assistants to generate scripts and video content.  
- 🔊 **Speech-to-Text & Audio Processing** — powered by **Deepgram** for high-quality voice recognition.  
- ☁️ **Database Management with Convex** — provides real-time data storage and retrieval.  
- 🔐 **Google Authentication** — users can log in securely using their Google accounts.  
- 💾 **Cloud File Storage** — media files and rendered videos are stored in **Google Cloud Storage**.  
- 🧩 **Ingest API Integration** — enables media uploads and real-time updates to cloud storage.  
- 📦 **Modern Frontend Stack** — built with **Next.js (App Router)** and **React** for a clean and interactive UI.  

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend / Cloud** | Google Cloud Run, Remotion, Convex |
| **AI Services** | OpenAI, Gemini, Deepgram |
| **Authentication** | Google OAuth |
| **Storage** | Google Cloud Storage |
| **Other Integrations** | Ingest API |

---

## 🧰 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/ai-video-generator.git
cd ai-video-generator
2️⃣ Install dependencies
npm install
# or
yarn install
npx convex dev
npm install inngest
npx inngest-cli@latest dev
3️⃣ Set up environment variables

Create a .env.local file and add your own keys (keep them private!):

NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_key

⚠️ Important: Never expose your API keys in public repositories.

4️⃣ Run the development server
npm run dev


Then open http://localhost:3000
 in your browser.

☁️ Cloud Rendering with Remotion

This project uses Remotion Cloud Run to render videos on Google Cloud.
Each video is generated, uploaded, and stored in a Google Cloud Storage bucket for easy download.

📸 Preview

Coming soon ...

🧑‍💻 Author

Developed with ❤️ by Nata_Krass
If you like this project, feel free to ⭐ it on GitHub!

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/)
- [Remotion](https://www.remotion.dev/)
- [Google Cloud](https://cloud.google.com/)
- [OpenAI](https://openai.com)
- [Gemini](https://deepmind.google/technologies/gemini/)
- [Deepgram](https://deepgram.com)
- [Convex](https://www.convex.dev/)

