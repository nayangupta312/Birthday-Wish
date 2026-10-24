/* ============================================================
   loading-screen.js — Birthday Loading Splash
   Builds the loading screen DOM, runs for ~7.8 s, then fades out.
   ============================================================ */

(function () {
    'use strict';

    const TOTAL_DURATION_MS = 7800;   // visible time before fade-out
    const FADE_DURATION_MS  =  900;   // CSS transition duration

    // -------------------------------------------------------
    // 1.  Inject the loading screen HTML
    // -------------------------------------------------------
    const screen = document.createElement('div');
    screen.id = 'loading-screen';
    screen.setAttribute('role', 'status');
    screen.setAttribute('aria-label', 'Loading birthday experience…');

    screen.innerHTML = `
        <!-- Glowing background orbs -->
        <div class="ls-orb" style="width:340px;height:340px;background:rgba(255,64,129,0.35);top:-80px;left:-100px;--orb-dur:6s;--orb-delay:0s;"></div>
        <div class="ls-orb" style="width:280px;height:280px;background:rgba(124,58,237,0.4);bottom:-60px;right:-80px;--orb-dur:7s;--orb-delay:1.5s;"></div>
        <div class="ls-orb" style="width:200px;height:200px;background:rgba(234,179,8,0.25);bottom:20%;left:10%;--orb-dur:5s;--orb-delay:0.8s;"></div>

        <!-- Stars layer -->
        <div class="ls-stars-layer" id="ls-stars-layer"></div>

        <!-- Floating birthday emojis -->
        <span class="ls-float-emoji" style="top:8%;left:6%;--fe-size:32px;--fe-dur:5.5s;--fe-delay:0.2s;--fe-rot0:-8deg;--fe-rot1:6deg;">🎂</span>
        <span class="ls-float-emoji" style="top:14%;right:8%;--fe-size:28px;--fe-dur:6.5s;--fe-delay:1s;--fe-rot0:5deg;--fe-rot1:-7deg;">🎉</span>
        <span class="ls-float-emoji" style="bottom:18%;left:5%;--fe-size:26px;--fe-dur:7s;--fe-delay:0.5s;--fe-rot0:-4deg;--fe-rot1:8deg;">🎈</span>
        <span class="ls-float-emoji" style="bottom:12%;right:6%;--fe-size:30px;--fe-dur:5s;--fe-delay:1.8s;--fe-rot0:6deg;--fe-rot1:-5deg;">✨</span>
        <span class="ls-float-emoji" style="top:40%;left:3%;--fe-size:22px;--fe-dur:6s;--fe-delay:2.2s;--fe-rot0:-6deg;--fe-rot1:4deg;">🎀</span>
        <span class="ls-float-emoji" style="top:35%;right:4%;--fe-size:22px;--fe-dur:5.8s;--fe-delay:0.9s;--fe-rot0:4deg;--fe-rot1:-6deg;">💫</span>
        <span class="ls-float-emoji" style="top:65%;left:12%;--fe-size:20px;--fe-dur:6.3s;--fe-delay:3s;--fe-rot0:-3deg;--fe-rot1:7deg;">🌟</span>
        <span class="ls-float-emoji" style="top:72%;right:11%;--fe-size:20px;--fe-dur:5.2s;--fe-delay:1.4s;--fe-rot0:5deg;--fe-rot1:-4deg;">🎊</span>

        <!-- Floating sparkle symbols -->
        <span class="ls-sparkle" style="bottom:30%;left:20%;color:#ff4081;--sp-size:18px;--sp-dur:3.5s;--sp-delay:0.3s;">✦</span>
        <span class="ls-sparkle" style="bottom:50%;right:22%;color:#fde047;--sp-size:14px;--sp-dur:4.2s;--sp-delay:1.1s;">✧</span>
        <span class="ls-sparkle" style="bottom:20%;right:35%;color:#a855f7;--sp-size:20px;--sp-dur:3.8s;--sp-delay:2s;">✦</span>
        <span class="ls-sparkle" style="bottom:40%;left:38%;color:#fde047;--sp-size:12px;--sp-dur:4.5s;--sp-delay:0.7s;">★</span>

        <!-- Centre content -->
        <div class="ls-center-content">

            <!-- Spinning crown icon -->
            <div class="ls-crown-wrap">
                <div class="ls-crown-bg"></div>
                <div class="ls-crown-inner">👑</div>
            </div>

            <!-- Name & tag -->
            <h1 class="ls-title">Devanshi</h1>
            <p class="ls-subtitle">✨ Birthday Celebration ✨</p>

            <!-- Progress bar -->
            <div class="ls-progress-wrap">
                <div class="ls-progress-bar" id="ls-progress-bar"></div>
            </div>
            <p class="ls-label" id="ls-label">Preparing your celebration…</p>

        </div>
    `;

    document.body.insertBefore(screen, document.body.firstChild);

    // -------------------------------------------------------
    // 2.  Generate star field
    // -------------------------------------------------------
    const starsLayer = document.getElementById('ls-stars-layer');
    const STAR_COUNT = 90;
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'ls-star';
        const size = Math.random() * 2.4 + 0.8;
        star.style.cssText = `
            width:  ${size}px;
            height: ${size}px;
            top:    ${Math.random() * 100}%;
            left:   ${Math.random() * 100}%;
            --tw-dur:   ${(Math.random() * 2.5 + 1.8).toFixed(2)}s;
            --tw-delay: ${(Math.random() * 3).toFixed(2)}s;
            --tw-op:    ${(Math.random() * 0.5 + 0.45).toFixed(2)};
        `;
        starsLayer.appendChild(star);
    }

    // -------------------------------------------------------
    // 3.  Cycle loading messages
    // -------------------------------------------------------
    const messages = [
        'Preparing your celebration…',
        'Lighting the candles…',
        'Inflating the balloons…',
        'Arranging the fireworks…',
        'Adding a sprinkle of magic…',
        'Almost ready — hang tight! 🎂',
    ];
    const label = document.getElementById('ls-label');
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        label.style.opacity = '0';
        label.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            label.textContent = messages[msgIdx];
            label.style.opacity = '';
        }, 320);
    }, 1300);

    // -------------------------------------------------------
    // 4.  Dismiss after TOTAL_DURATION_MS
    // -------------------------------------------------------
    setTimeout(() => {
        clearInterval(msgInterval);
        label.textContent = '🎉 Welcome, Devanshi!';
        label.style.color  = '#fde047';
        label.style.opacity = '1';

        // Short pause so last message is readable, then fade
        setTimeout(() => {
            screen.classList.add('fade-out');
            // Remove from DOM after CSS transition completes
            setTimeout(() => {
                screen.remove();
            }, FADE_DURATION_MS + 100);
        }, 400);

    }, TOTAL_DURATION_MS);

})();
