# spinner rotation et pulsation

#### HTML

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<div id="loadingSpinner" class="loadingSpinner" style="display:none;">
    <span class="spinner-wrap">
        <i class="fas fa-spinner"></i>
    </span>
</div>
```

#### CSS

```css
.loadingSpinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #28a745;
  z-index: 9999;
}

/* pulsation sur le wrapper */
.spinner-wrap {
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

/* rotation sur l'icône elle-même */
.spinner-wrap i {
  display: inline-block;
  animation: spin 1s linear infinite;
}

/* rotations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* pulsation (scale + opacity) */
@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.2); }
}
```