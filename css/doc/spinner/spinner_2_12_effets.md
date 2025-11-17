# 12 effets de spinners modernes

### 1 Spinner “Double Rotate” (rotation + rotation inverse)

Très élégant et hypnotique.*

#### HTML

```html
<div class="spinner-double"></div>
```

#### CSS
```css
.spinner-double {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #28a745;
    z-index: 9999;

    width: 100px;
    height: 100px;
    border: 4px solid #28a745;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite, spin2 2s linear reverse infinite;
}

@keyframes spin {
    100% { transform: rotate(360deg); }
}
@keyframes spin2 {
    100% { transform: rotate(-360deg); }
}
```

### 2️ Spinner “Barres qui tournent”

#### HTML

```html
<div class="spinner-bars"></div>
```

#### CSS
```css
.spinner-bars {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #28a745;
    z-index: 9999;

    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: #28a745;
    border-right-color: #28a745;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    100% { transform: rotate(360deg); }
}
```

### 3 Spinner “Pulse Ring" (anneau qui respire)

Très doux visuellement.

#### HTML

```html
<div class="pulse-ring"></div>
```

#### CSS
```css
.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px;
    height: 100px;
    border: 4px solid #28a745;
    border-radius: 50%;
    animation: pulseRing 1.4s ease-in-out infinite;
}

@keyframes pulseRing {
    0%   { transform: scale(0.7); opacity: 0.6; }
    50%  { transform: scale(1);   opacity: 1; }
    100% { transform: scale(0.7); opacity: 0.6; }
}
```

### 4 Spinner “3 points orbitaux”

Très doux visuellement.

#### HTML

```html
<div class="spinner-orbit">
    <div class="orbit">
        <div></div><div></div><div></div>
    </div>
</div>
```

#### CSS
```css
.spinner-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
}

.orbit {
    position: relative;
    width: 100px; height: 100px;
}

.orbit div {
    position: absolute;
    top: 50%; left: 50%;
    width: 40px; height: 40px;
    background: #28a745;
    border-radius: 50%;
    transform-origin: -100px;
    animation: orbit 2s linear infinite;
}
.orbit div:nth-child(2) { animation-delay: 0.2s; }
.orbit div:nth-child(3) { animation-delay: 0.4s; }

@keyframes orbit {
    100% { transform: rotate(360deg); }
}
```

### 5 Spinner “Line Loader Classic” (ligne qui se replie)

#### HTML

```html
<div class="line-loader"></div>
```

#### CSS
```css
.line-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px;
    height: 10px;
    background: #28a745;
    animation: lineLoad 0.8s ease-in-out infinite alternate;
}

@keyframes lineLoad {
    0%   { transform: scaleX(0.2); }
    100% { transform: scaleX(1); }
}
```

### 6 Spinner “Heartbeat”

#### HTML

```html
<div class="heartbeat"></div>
```

#### CSS
```css
.heartbeat {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px; 
    height: 100px;
    background: #28a745;
    border-radius: 50%;
    animation: heartbeat 1.2s infinite;
}

@keyframes heartbeat {
    0% { transform: scale(1); }
    30% { transform: scale(1.4); }
    60% { transform: scale(1); }
    100% { transform: scale(1); }
}
```

### 7 Spinner “Ellipsis” (trois points flottants)

#### HTML

```html
<div class="dots"></div>
```

#### CSS
```css
.dots {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px;
    height: 60px;
    text-align: center;
}
.dots:after {
    content: '● ● ● ●';
    color: #28a745;
    font-size: 1.6rem;
    animation: dots 1s infinite;
}

@keyframes dots {
    0%   { opacity: 1; }
    50%  { opacity: 0.2; }
    100% { opacity: 1; }
}
```

### 8 Spinner “Progress Circle” (cercle en chargement)

#### HTML

```html
<div class="progress-circle"></div>
```

#### CSS
```css
.progress-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px; 
    height: 100px;
    border: 4px solid #e6f4ea;
    border-top-color: #28a745;
    border-radius: 50%;
    animation: spin 1s infinite linear;
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
```

### 9 Spinner "Flip" (effet card flipping)

#### HTML

```html
<div class="flip"></div>
```

#### CSS
```css
.flip {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px; 
    height: 100px;
    background: #28a745;
    animation: flip 1.2s infinite ease-in-out;
}

@keyframes flip {
    0%   { transform: rotateY(0); }
    50%  { transform: rotateY(180deg); }
    100% { transform: rotateY(360deg); }
}
```

### 10 Spinner “Wave Loader” (petites barres animées)

#### HTML

```html
<div class="wave">
  <span></span><span></span><span></span><span></span><span></span>
</div>
```

#### CSS
```css
.wave {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    display: flex;
    align-items: center;
    gap: 4px;
}

.wave span {
    width: 15px;
    height: 30px;
    background: #28a745;
    animation: wave 1s ease-in-out infinite;
}

.wave span:nth-child(2) { animation-delay: 0.1s; }
.wave span:nth-child(3) { animation-delay: 0.2s; }
.wave span:nth-child(4) { animation-delay: 0.3s; }
.wave span:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
    0%, 100% { transform: scaleY(0.4); }
    50%      { transform: scaleY(1); }
}
```

### 11 Spinner “Ripple” (ondes circulaires)

Super doux et premium.

#### HTML

```html
<div class="ripple"></div>
```

#### CSS
```css
.ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px; height: 100px;
    border: 4px solid #28a745;
    border-radius: 50%;
    animation: ripple 1.3s ease-out infinite;
}

@keyframes ripple {
    from { transform: scale(0.6); opacity: 1; }
    to   { transform: scale(2); opacity: 0; }
}
```

### 12 Spinner "Glow Pulse" (halo lumineux)

#### HTML

```html
<div class="glow"></div>
```

#### CSS
```css
.glow {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;

    width: 100px; 
    height: 100px;
    background: #28a745;
    border-radius: 50%;
    box-shadow: 0 0 15px #28a745;
    animation: glowPulse 1.3s ease-in-out infinite;
}

@keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 15px #28a745; }
    50%      { box-shadow: 0 0 80px #28a745; }
}
```