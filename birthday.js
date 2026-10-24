/* ==========================================================================
           1. Canvas Particle & Grand Fireworks Engine
           ========================================================================== */
        const canvas = document.getElementById('fx-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, isFirework = false) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.size = isFirework ? Math.random() * 5 + 2 : Math.random() * 6 + 3;
                this.color = ['#ff4081', '#ec4899', '#8b5cf6', '#06b6d4', '#fde047', '#10b981', '#f97316', '#ffffff'][Math.floor(Math.random() * 8)];
                
                const angle = Math.random() * Math.PI * 2;
                const speed = isFirework ? Math.random() * 10 + 2 : Math.random() * 2 + 1;
                
                this.vx = isFirework ? Math.cos(angle) * speed : (Math.random() - 0.5) * 3;
                this.vy = isFirework ? Math.sin(angle) * speed : Math.random() * 3 + 1;
                this.life = 100;
                this.isFirework = isFirework;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 8;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.isFirework) {
                    this.vy += 0.12; // Gravity effect
                    this.vx *= 0.96; // Air drag
                    this.vy *= 0.96;
                    this.life -= 1.8;
                } else {
                    this.rotation += this.rotationSpeed;
                    if (this.y > canvas.height) {
                        this.y = -20;
                        this.x = Math.random() * canvas.width;
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                if (this.isFirework) {
                    ctx.globalAlpha = Math.max(0, this.life / 100);
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = this.color;
                    ctx.fill();
                } else {
                    ctx.rotate((this.rotation * Math.PI) / 180);
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                }
                ctx.restore();
            }
        }

        // Initialize background confetti
        for (let i = 0; i < 40; i++) {
            particles.push(new Particle());
        }

        function triggerFireworksExplosion(x, y) {
            const startX = x || (Math.random() * 0.6 + 0.2) * canvas.width;
            const startY = y || (Math.random() * 0.4 + 0.2) * canvas.height;
            
            playFireworkBoom();

            for (let i = 0; i < 90; i++) {
                particles.push(new Particle(startX, startY, true));
            }
        }

        function launchGrandFireworksShow() {
            let bursts = 0;
            const interval = setInterval(() => {
                const rx = (Math.random() * 0.8 + 0.1) * canvas.width;
                const ry = (Math.random() * 0.5 + 0.15) * canvas.height;
                triggerFireworksExplosion(rx, ry);
                bursts++;
                if (bursts >= 8) clearInterval(interval);
            }, 300);
        }

        function renderCanvasLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p => !p.isFirework || p.life > 0);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(renderCanvasLoop);
        }
        renderCanvasLoop();

        /* ==========================================================================
           2. Wish Lantern Engine (With Flame Glow & Explosive Finish)
           ========================================================================== */
        const lanternContainer = document.getElementById('lantern-container');

        function launchWishLantern() {
            const lantern = document.createElement('div');
            lantern.className = 'wish-lantern';
            const left = Math.random() * 75 + 10;
            lantern.style.left = `${left}vw`;

            lantern.innerHTML = `
                <div class="relative flex flex-col items-center group">
                    <!-- Top Ribbon Decor -->
                    <div class="w-14 h-20 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-t-2xl rounded-b-md shadow-2xl relative flex flex-col items-center justify-between border border-yellow-300/40 p-1">
                        <div class="text-[10px] text-orange-950 font-bold">✨ Wish</div>
                        <!-- Flame Core inside lantern -->
                        <div class="w-5 h-6 bg-yellow-100 rounded-full animate-ping opacity-90 shadow-lg shadow-yellow-300"></div>
                        <div class="text-[9px] text-amber-900 font-extrabold">💖</div>
                    </div>
                    <!-- Lantern Tassel -->
                    <div class="w-1 h-6 bg-amber-400 shadow-md"></div>
                </div>
            `;

            // Click or tap on lantern bursts it immediately
            lantern.addEventListener('click', (e) => {
                triggerFireworksExplosion(e.clientX, e.clientY);
                lantern.remove();
            });

            lanternContainer.appendChild(lantern);

            // Synthesize launch swoosh audio
            playLaunchSwoosh();

            // Auto-burst when lantern reaches high sky
            setTimeout(() => {
                if (lantern.parentNode) {
                    const rect = lantern.getBoundingClientRect();
                    triggerFireworksExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    lantern.remove();
                }
            }, 11000);
        }

        /* ==========================================================================
           3. Interactive Balloon Engine
           ========================================================================== */
        const balloonContainer = document.getElementById('balloon-container');
        const balloonColors = ['#ff4081', '#8b5cf6', '#06b6d4', '#fde047', '#10b981', '#ec4899', '#f97316'];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            const left = Math.random() * 90;
            const duration = Math.random() * 6 + 9;

            balloon.style.left = `${left}vw`;
            balloon.style.animation = `floatUp ${duration}s linear`;

            balloon.innerHTML = `
                <div class="relative flex flex-col items-center">
                    <div class="w-12 h-16 rounded-full shadow-2xl relative" style="background: radial-gradient(circle at 30% 30%, #fff, ${color} 70%)">
                        <div class="absolute top-2 left-2 w-3 h-5 bg-white/40 rounded-full blur-[1px]"></div>
                    </div>
                    <div class="w-1 h-10 bg-white/40"></div>
                </div>
            `;

            balloon.addEventListener('click', (e) => {
                playPopSound();
                spawnPopParticles(e.clientX, e.clientY);
                balloon.remove();
            });

            balloonContainer.appendChild(balloon);

            setTimeout(() => {
                if (balloon.parentNode) balloon.remove();
            }, duration * 1000);
        }

        function spawnPopParticles(x, y) {
            for (let i = 0; i < 6; i++) {
                const heart = document.createElement('div');
                heart.className = 'pop-particle';
                heart.innerText = ['💖', '✨', '🎈', '⭐'][Math.floor(Math.random() * 4)];
                heart.style.left = `${x + (Math.random() - 0.5) * 40}px`;
                heart.style.top = `${y + (Math.random() - 0.5) * 40}px`;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 800);
            }
        }

        setInterval(createBalloon, 2200);

        /* ==========================================================================
           4. Sparkle Cursor & Touch Trail Effect
           ========================================================================== */
        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-trail';
            sparkle.style.left = `${x - 4}px`;
            sparkle.style.top = `${y - 4}px`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        }

        window.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.25) createSparkle(e.clientX, e.clientY);
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches[0] && Math.random() < 0.35) {
                createSparkle(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        /* ==========================================================================
           5. Unwrapping Gift Box Module
           ========================================================================== */
        const fortunes = [
            "Your star shines brighter than ever this year. Embrace every new day with courage, laughter, and endless dreams!",
            "May your path be lined with unexpected blessings, wonderful friendships, and peaceful moments!",
            "This chapter of your life will bring exciting breakthroughs, happiness, and unforgettable memories!",
            "Never stop dreaming big—the universe is aligned to make your wishes come true!"
        ];

        function openSurpriseGift() {
            const lid = document.getElementById('gift-lid');
            const card = document.getElementById('gift-secret-card');
            
            lid.style.transform = 'translateY(-60px) rotate(-20deg)';
            playPopSound();
            triggerFireworksExplosion();

            setTimeout(() => {
                card.classList.remove('hidden');
            }, 400);
        }

        function getNewFortune() {
            const textEl = document.getElementById('fortune-text');
            const random = fortunes[Math.floor(Math.random() * fortunes.length)];
            textEl.innerText = `"${random}"`;
            playPopSound();
        }

        /* ==========================================================================
           6. Candle & Microphone Blow Detection
           ========================================================================== */
        let candlesBlown = [false, false, false];

        function blowCandle(index) {
            if (candlesBlown[index]) return;
            candlesBlown[index] = true;

            const flame = document.getElementById(`flame-${index}`);
            const smoke = document.getElementById(`smoke-${index}`);

            flame.classList.add('hidden');
            smoke.classList.remove('hidden');
            smoke.classList.add('smoke');

            playBlowSound();

            if (candlesBlown.every(Boolean)) {
                document.getElementById('wish-revealed-box').classList.remove('hidden');
                launchGrandFireworksShow();
            }
        }

        function relightCandles() {
            candlesBlown = [false, false, false];
            for (let i = 0; i < 3; i++) {
                document.getElementById(`flame-${i}`).classList.remove('hidden');
                const smoke = document.getElementById(`smoke-${i}`);
                smoke.classList.add('hidden');
                smoke.classList.remove('smoke');
            }
            document.getElementById('wish-revealed-box').classList.add('hidden');
        }

        let micStream = null;
        let micAudioCtx = null;
        let isMicActive = false;

        async function toggleMicrophoneBlow() {
            const btnText = document.getElementById('mic-btn-text');

            if (isMicActive) {
                if (micStream) micStream.getTracks().forEach(track => track.stop());
                isMicActive = false;
                btnText.innerText = "Enable Blow via Microphone";
                return;
            }

            try {
                micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                micAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = micAudioCtx.createAnalyser();
                const microphone = micAudioCtx.createMediaStreamSource(micStream);
                microphone.connect(analyser);
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                isMicActive = true;
                btnText.innerText = "Listening... Blow into Mic!";

                function detectBlow() {
                    if (!isMicActive) return;
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
                    let average = sum / bufferLength;

                    if (average > 65) {
                        candlesBlown.forEach((blown, idx) => {
                            if (!blown) blowCandle(idx);
                        });
                    }
                    requestAnimationFrame(detectBlow);
                }
                detectBlow();

            } catch (err) {
                alert("Microphone permission was denied or is unavailable.");
            }
        }

        /* ==========================================================================
           7. Web Audio Synthesizer & Sound FX Engine
           ========================================================================== */
        let synthAudioCtx = null;
        let isPlayingAudio = false;
        let isStartingAudio = false;
        let musicInterval = null;

        function getAudioContext() {
            if (!synthAudioCtx) {
                synthAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            return synthAudioCtx;
        }

        function playFireworkBoom() {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        }

        function playLaunchSwoosh() {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }

        function playPopSound() {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }

        function playBlowSound() {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }

        const melody = [
            { note: 261.63, duration: 0.3 }, { note: 261.63, duration: 0.3 },
            { note: 293.66, duration: 0.6 }, { note: 261.63, duration: 0.6 },
            { note: 349.23, duration: 0.6 }, { note: 329.63, duration: 1.0 },
            { note: 261.63, duration: 0.3 }, { note: 261.63, duration: 0.3 },
            { note: 293.66, duration: 0.6 }, { note: 261.63, duration: 0.6 },
            { note: 392.00, duration: 0.6 }, { note: 349.23, duration: 1.0 }
        ];

        function startMelody() {
            if (isPlayingAudio || isStartingAudio) return;
            const ctx = getAudioContext();
            isStartingAudio = true;

            const beginPlayback = () => {
                isStartingAudio = false;
                if (ctx.state !== 'running') {
                    console.warn('Birthday music is waiting for a user interaction before playback.');
                    return;
                }

                isPlayingAudio = true;
                document.getElementById('floating-speaker-icon').className = "fa-solid fa-volume-high animate-pulse";
                window.removeEventListener('click', handleFirstInteraction);
                window.removeEventListener('touchstart', handleFirstInteraction);

                let noteIndex = 0;
                function playNextNote() {
                    if (!isPlayingAudio) return;

                    const item = melody[noteIndex];
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(item.note, ctx.currentTime);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.duration);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start();
                    osc.stop(ctx.currentTime + item.duration);

                    noteIndex = (noteIndex + 1) % melody.length;
                }

                playNextNote();
                musicInterval = setInterval(playNextNote, 600);
            };

            if (ctx.state === 'suspended') {
                ctx.resume().then(beginPlayback).catch(error => {
                    isStartingAudio = false;
                    console.warn('Birthday music could not start until a user interaction.', error);
                });
            } else {
                beginPlayback();
            }
        }

        function stopMelody() {
            isPlayingAudio = false;
            clearInterval(musicInterval);
            document.getElementById('floating-speaker-icon').className = "fa-solid fa-volume-xmark";
        }

        function toggleAudio() {
            if (isPlayingAudio) {
                stopMelody();
            } else {
                startMelody();
            }
        }

        function handleFirstInteraction(event) {
            if (event.target.closest('#floating-speaker-btn')) return;
            startMelody();
        }
        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);
        startMelody();

        /* ==========================================================================
           8. 3D Tilt Card Effect & Modal
           ========================================================================== */
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        function openPhotoModal(imgSrc, caption) {
            document.getElementById('modal-img').src = imgSrc;
            document.getElementById('modal-caption').innerText = caption;
            document.getElementById('photo-modal').classList.remove('hidden');
        }

        function closePhotoModal() {
            document.getElementById('photo-modal').classList.add('hidden');
        }
