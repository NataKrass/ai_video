# 🎬 AI Video Generator

- [Link to Application here](https://ai-video-iota-jet.vercel.app/)

An AI-powered video generation platform built with **Next.js**, **Convex**, **Google Cloud**, **PayPal**, and **Remotion**.  
It allows users to generate, render, and download custom AI videos directly from the browser.

---

## 🚀 Features

- 🎥 **Video Rendering via Google Cloud Run & Remotion** — all videos are rendered in the cloud for high performance.  
- 🤖 **AI Content Generation** — integrates with **OpenAI**, **Gemini**, and other AI assistants to generate scripts and video content.  
- 🔊 **Speech-to-Text & Audio Processing** — powered by **Deepgram** for high-quality voice recognition.  
- ☁️ **Database Management with Convex** — provides real-time data storage and retrieval.  
- 🔐 **Google Authentication** — users can log in securely using their Google accounts.  
- 💾 **Cloud File Storage** — media files and rendered videos are stored in **Google Cloud Storage**.
- 💳 **PayPal Integration** — supports secure online payments and subscriptions. 
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
| **Other Integrations** | Inngest API |
| **Deployment** | Vercel |

---

## 🧰 Getting Started

## 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/ai-video-generator.git
cd ai-video-generator
```
## 2️⃣ Install dependencies
```
npm install
# or
yarn install

npx convex dev
npm install inngest
npx inngest-cli@latest dev
```
## 3️⃣ Set up environment variables

Create a .env.local file and add your own keys (keep them private!):
```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_key
```

⚠️ Important: Never expose your API keys in public repositories.

## 4️⃣ Run the development server
```
npm run dev
```

Then open ``` http://localhost:3000 ```
 in your browser.

☁️ Cloud Rendering with Remotion

This project uses Remotion Cloud Run to render videos on Google Cloud.
Each video is generated, uploaded, and stored in a Google Cloud Storage bucket for easy download.

### 📸 Preview
![main](https://github.com/user-attachments/assets/53cd2d59-bacf-4dbe-a75e-bccd6f8600db)
![create](https://github.com/user-attachments/assets/35917b79-f9d1-4a53-a456-c43f20b1022d)
![home](https://github.com/user-attachments/assets/586fe35e-da1f-4020-b945-9443117d1f0d)




### 🧑‍💻 Author

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

