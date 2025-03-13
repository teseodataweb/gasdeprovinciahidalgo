<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<div id="cookieBanner">
<link rel="stylesheet" href="/assets/css/cookies.css">
    <p>🍪 ¿Acepta nuestras Cookies y nuestro Aviso de Privacidad?</p>
    <p>En este sitio hacemos uso de cookies dentro de algunos procesos. <strong>Acepte</strong> o <strong>Personalice</strong> el uso de cookies.</p>
    
    <div id="cookieOptions" class="cookie-options hidden">
        <label><input type="checkbox" id="basicCookies" checked disabled> Básicas</label><br>
        <label><input type="checkbox" id="preferencesCookies"> Preferencias</label><br>
        <label><input type="checkbox" id="analyticsCookies"> Análisis</label><br>
        <label><input type="checkbox" id="marketingCookies"> Marketing</label><br>
        <button id="savePreferences">Guardar Preferencias</button>
    </div>
    
    <button id="acceptCookies">Aceptar Cookies y Aviso de Privacidad</button>
    <button id="customizeCookies">Personalizar Cookies</button>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const cookieBanner = document.getElementById("cookieBanner");
        const acceptBtn = document.getElementById("acceptCookies");
        const customizeBtn = document.getElementById("customizeCookies");
        const savePreferencesBtn = document.getElementById("savePreferences");
        const cookieOptions = document.getElementById("cookieOptions");
        const preferencesCheckbox = document.getElementById("preferencesCookies");
        const analyticsCheckbox = document.getElementById("analyticsCookies");
        const marketingCheckbox = document.getElementById("marketingCookies");

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + "; path=/" + expires;
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function loadScripts() {
            if (getCookie("analyticsCookies") === "true") {
                let scriptGA = document.createElement("script");
                scriptGA.src = "https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X";
                document.head.appendChild(scriptGA);
            }
            if (getCookie("marketingCookies") === "true") {
                let scriptFB = document.createElement("script");
                scriptFB.src = "https://connect.facebook.net/en_US/fbevents.js";
                document.head.appendChild(scriptFB);
            }
        }

        if (getCookie("cookiesAccepted")) {
            cookieBanner.classList.add("hidden");
            loadScripts();
        }

        acceptBtn.addEventListener("click", function() {
            setCookie("cookiesAccepted", "true", 365);
            setCookie("preferencesCookies", "true", 365);
            setCookie("analyticsCookies", "true", 365);
            setCookie("marketingCookies", "true", 365);
            cookieBanner.classList.add("hidden");
            loadScripts();
        });

        customizeBtn.addEventListener("click", function() {
            cookieOptions.classList.remove("hidden");
        });

        savePreferencesBtn.addEventListener("click", function() {
            setCookie("cookiesAccepted", "true", 365);
            setCookie("preferencesCookies", preferencesCheckbox.checked, 365);
            setCookie("analyticsCookies", analyticsCheckbox.checked, 365);
            setCookie("marketingCookies", marketingCheckbox.checked, 365);
            cookieBanner.classList.add("hidden");
            loadScripts();
        });
    });
</script>
