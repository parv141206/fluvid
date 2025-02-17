# 🚀 Fluvid

## 📌 Description
Fluvid helps you record **long** videos (hours-long!) without worrying about storage space. 🎥💾

## 🔍 How It Works
📹 You can record video directly from the website! While recording, Fluvid breaks the video into smaller chunks of 'n' seconds.

⬆️ Each chunk is **immediately uploaded** to your PC (acting as a server). When you stop recording, Fluvid seamlessly stitches all chunks together into a full video. This way, you **save tons of phone storage** instead of filling it up with GBs of raw footage! 🏆

---

## 🛠 Getting Started

### ✅ Prerequisites
- 📌 Node.js installed on your system
- 🌍 Ngrok for exposing the app to the internet

### ⚙️ Setup Instructions

#### 💻 Running the frontend and backend locally (Recommended)

This method allows you to run both the frontend and backend on your local machine and expose it via port forwarding to a public URL.

#### 📝 Steps to set up:

1️⃣ Clone this repository to your PC:
   ```sh
   git clone https://github.com/parv141206/fluvid
   ```

2️⃣ In the root directory of the project (just outside `src`), create a directory named `uploads`:
   ```sh
   mkdir uploads
   ```
   📂 Your recorded videos will be saved here!

3️⃣ Build the project for production:
   ```sh
   npm run build
   ```

4️⃣ Run the production server:
   ```sh
   npm run start
   ```

5️⃣ Install Ngrok and run the following command in a new terminal:
   ```sh
   ngrok http 3000
   ```
   🌐 This exposes the app to the internet and provides a **public URL**.

6️⃣ Copy the public URL:
   - 🔗 Use it to access the **frontend**.
   - 🔗 Paste the **same URL** for the 'Backend URL'.
   - 🎉 You should be **good to go!**

---

### ℹ️ Additional Information
- 🐧 **Currently only tested on Linux**

---

## Regards... parv
