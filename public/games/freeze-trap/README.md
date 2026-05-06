# freeze_trap

A dynamic web game where you trap bouncing balls by painting over them.

**Play it live here: https://deepanwadhwa.github.io/freeze_trap/**



---

## How to Play

The goal is simple: **trap the little bouncing critters!**

Just click and drag your mouse (or use your finger on your phone) to draw lines on the screen. The balls will be trapped inside the new boundaries you create. Once a ball gets stuck bouncing frantically in a small enough space, it'll burst like fireworks💥 , I honestly wanted the mario (mario jumping on ducks) effect but will do that sometime soon. 

Watch out, though—in the main game, you've got a **time limit** and only a **certain number of draws** per level. Oh, and the balls don't like your cursor... they'll try to run away from it.

---

## Features

This started as a simple idea but grew a bit. Here's what's under the hood:

* **Desktop & Mobile Ready:** You can play with a mouse on your computer or with touch on your phone/tablet. The UI should adjust automatically.
* **Dynamic Difficulty:** I didn't want to design levels by hand, so the game generates 100 levels on the fly, each one a bit harder than the last. The balls get faster, you get fewer draws, and other fun challenges pop up.
* **Custom Game Mode:** Jump into the Custom Game mode if you want to ignore the rules, crank up the ball count, and just mess around.
* **"Pollock" Paint Mode:** There's also a mode where there's no objective. Just draw and watch the balls bounce around, creating a messy piece of abstract art. It's surprisingly relaxing.

---

## Running the Code Locally

If you wanna tinker with the code yourself, it's pretty easy to get going.

1.  Clone the repo to your machine:
    ```bash
    git clone [https://github.com/deepanwadhwa/freeze_trap.git](https://github.com/deepanwadhwa/freeze_trap.git)
    ```
2.  Navigate into the directory:
    ```bash
    cd freeze_trap
    ```
3.  Just open the `index.html` file in your browser.

For the best experience (to avoid any weird module-loading issues), I'd recommend using a simple local server. If you're using VS Code, the **"Live Server"** extension is perfect for this.

---

## Tech Stack

No fancy frameworks here, just the basics:

* **HTML5 Canvas** for all the drawing and animation.
* **JavaScript (ES6 Modules)** for the game logic.
* **CSS** for the menus and responsive layout.