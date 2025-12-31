
const navLinks = document.querySelectorAll('.navbar a');

const sections = [
  document.querySelector('.first-body'),          
  document.querySelector('.about-me-container'), 
  document.querySelector('.featured-works'),    
  document.querySelector('.service-section'),    
  document.querySelector('.contact')             
];

navLinks.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    sections[i].scrollIntoView({ behavior: 'smooth' });
  });
});

function updateActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Initialize
updateActiveLink();

const roles = ["UI/UX Designer", "Frontend Developer", "Problem Solver"];
let index = 0;
let charIndex = 0;

function type() {
    const text = roles[index];
    document.getElementById("roles").textContent = text.slice(0, charIndex);
    charIndex++;
    if (charIndex <= text.length) {
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1200);
    }
}

function erase() {
    const text = roles[index];
    document.getElementById("roles").textContent = text.slice(0, charIndex);
    charIndex--;
    if (charIndex >= 0) {
        setTimeout(erase, 50);
    } else {
        index = (index + 1) % roles.length;
        charIndex = 0;
        setTimeout(type, 300);
    }
}

type();


const themeColors = {
    white: [],
    dark: ["#00FFFF", "#FF00FF", "#FF4500", "#7CFC00", "#FFA500", "#FF1493"]
};

function createNeonLight(color, size, blur, opacity, top, left) {
    const neon = document.createElement("div");
    neon.style.position = "fixed";
    neon.style.top = top + "px";
    neon.style.left = left + "px";
    neon.style.width = size + "px";
    neon.style.height = size + "px";
    neon.style.background = `radial-gradient(circle, ${color}, transparent 70%)`;
    neon.style.filter = `blur(${blur}px)`;
    neon.style.zIndex = "0";
    neon.style.opacity = opacity;
    neon.style.pointerEvents = "none";
    document.body.appendChild(neon);
    return neon;
}

function createNeonLights(theme) {
    if (!themeColors[theme].length) return [];
    const colors = themeColors[theme];
    return [
        createNeonLight(colors[0], 350, 40, 0.7, 50, 50),
        createNeonLight(colors[1], 300, 50, 0.6, 200, 800),
        createNeonLight(colors[2], 250, 60, 0.5, 600, 100),
        createNeonLight(colors[3], 300, 40, 0.7, 400, 500),
        createNeonLight(colors[4], 350, 50, 0.6, 700, 700),
        createNeonLight(colors[5], 300, 45, 0.5, 150, 400)
    ];
}

function animateLights(lights) {
    lights.forEach(light => {
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        function move() {
            let top = parseFloat(light.style.top);
            let left = parseFloat(light.style.left);
            if (top + dy < 0 || top + dy + parseFloat(light.style.height) > window.innerHeight) dy *= -1;
            if (left + dx < 0 || left + dx + parseFloat(light.style.width) > window.innerWidth) dx *= -1;
            light.style.top = top + dy + "px";
            light.style.left = left + dx + "px";
            requestAnimationFrame(move);
        }
        move();
    });
}


let cursorTrail = [];
const maxTrailPoints = 50;

document.addEventListener("mousemove", (e) => {
    if (currentTheme !== "dark") return;
    cursorTrail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    if (cursorTrail.length > maxTrailPoints) cursorTrail.shift();
});
let trailCanvas = document.createElement("canvas");
trailCanvas.style.position = "fixed";
trailCanvas.style.top = "0";
trailCanvas.style.left = "0";
trailCanvas.style.pointerEvents = "none";
trailCanvas.style.zIndex = "1000";
document.body.appendChild(trailCanvas);
let ctx = trailCanvas.getContext("2d");

function resizeCanvas() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const elements = document.querySelectorAll('.main-container *');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('fade-in'); 
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.08 
});

elements.forEach(el => observer.observe(el));

const hireBtn = document.querySelector('.btns button:first-child');

const modalOverlay = document.createElement('div');
modalOverlay.style.position = 'fixed';
modalOverlay.style.top = '0';
modalOverlay.style.left = '0';
modalOverlay.style.width = '100%';
modalOverlay.style.height = '100%';
modalOverlay.style.background = 'rgba(0,0,0,0.7)';
modalOverlay.style.display = 'flex';
modalOverlay.style.justifyContent = 'center';
modalOverlay.style.alignItems = 'center';
modalOverlay.style.zIndex = '10000';
modalOverlay.style.opacity = '0';
modalOverlay.style.pointerEvents = 'none';
modalOverlay.style.transition = 'opacity 0.3s';
document.body.appendChild(modalOverlay);
const modalContent = document.createElement('div');
modalContent.style.background = '#fff';
modalContent.style.padding = '30px';
modalContent.style.borderRadius = '15px';
modalContent.style.width = '95%';
modalContent.style.maxWidth = '450px';
modalContent.style.textAlign = 'center';
modalContent.style.position = 'relative';
modalOverlay.appendChild(modalContent);
const fieldStyle = "width:100%; padding:12px; margin:8px 0; border-radius:8px; border:1px solid #ccc; box-sizing:border-box;";

modalContent.innerHTML = `
    <h2>Hire Me</h2>
    <input id="clientName" type="text" placeholder="Your Name" required style="${fieldStyle}">
    <input id="clientEmail" type="email" placeholder="Your Email" required style="${fieldStyle}">
    <textarea id="clientProject" placeholder="Project Details" required style="${fieldStyle}; height:100px; resize:none;"></textarea>
    <select id="clientTimeline" required style="${fieldStyle} cursor:pointer;">
        <option value="">Expected Timeline</option>
        <option value="1-2 weeks">1-2 weeks</option>
        <option value="2-4 weeks">2-4 weeks</option>
        <option value="1-2 months">1-2 months</option>
        <option value="More than 2 months">More than 2 months</option>
    </select>
    <select id="clientPayment" required style="${fieldStyle} cursor:pointer;">
        <option value="">Payment Method</option>
        <option value="PayPal">PayPal</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Crypto">Crypto</option>
    </select>
    <select id="clientCountry" required style="${fieldStyle} cursor:pointer;">
        <option value="">Select Country</option>
        <option value="Nepal">Nepal</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="Other">Other</option>
    </select>
    <input id="clientBudget" type="number" placeholder="Estimated Budget (USD)" required min="0" style="${fieldStyle}">
    <div style="display:flex; justify-content:space-between; margin-top:15px;">
        <button id="cancelBtn" style="padding:12px 20px; border:none; border-radius:8px; cursor:pointer; background:#ccc;">Cancel</button>
        <button id="submitBtn" style="padding:12px 20px; border:none; border-radius:8px; cursor:pointer; background:#00bfff; color:white;">Submit</button>
    </div>
`;

function openModal() {
    modalOverlay.style.opacity = '1';
    modalOverlay.style.pointerEvents = 'all';
}
function closeModal() {
    modalOverlay.style.opacity = '0';
    modalOverlay.style.pointerEvents = 'none';
    resetFields();
}

function resetFields() {
    const fields = ['clientName','clientEmail','clientProject','clientTimeline','clientPayment','clientCountry','clientBudget'];
    fields.forEach(f => {
        const el = document.getElementById(f);
        el.value = '';
        el.style.outline = 'none';
        el.style.borderColor = '#ccc';
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const allFields = modalContent.querySelectorAll('input, select, textarea');
allFields.forEach(field => {
    field.addEventListener('focus', () => {
        field.style.outline = 'none';
        field.style.borderColor = '#ccc';
    });
});
hireBtn.addEventListener('click', openModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
const successOverlay = document.createElement('div');
successOverlay.style.position = 'fixed';
successOverlay.style.top = '0';
successOverlay.style.left = '0';
successOverlay.style.width = '100%';
successOverlay.style.height = '100%';
successOverlay.style.background = 'rgba(0,0,0,0.8)';
successOverlay.style.display = 'flex';
successOverlay.style.justifyContent = 'center';
successOverlay.style.alignItems = 'center';
successOverlay.style.zIndex = '10001';
successOverlay.style.opacity = '0';
successOverlay.style.pointerEvents = 'none';
successOverlay.style.transition = 'opacity 0.3s';
document.body.appendChild(successOverlay);
const successContent = document.createElement('div');
successContent.style.width = '150px';
successContent.style.height = '150px';
successContent.style.position = 'relative';
successContent.style.display = 'flex';
successContent.style.justifyContent = 'center';
successContent.style.alignItems = 'center';
successOverlay.appendChild(successContent);
successContent.innerHTML = `
<svg width="200" height="200" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="282" stroke-dashoffset="282"/>
 
  <path fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="70" stroke-dashoffset="70" d="M30 52 l15 15 l35 -35"/>
</svg>
`;

function showSuccessAnimation(){
    const svg = successContent.querySelector('svg');
    const circle = svg.querySelector('circle');
    const check = svg.querySelector('path');

    successOverlay.style.opacity = '1';
    successOverlay.style.pointerEvents = 'all';

    circle.animate([{strokeDashoffset:157},{strokeDashoffset:0}], {duration:800, fill:'forwards', easing:'ease-out'});

    setTimeout(()=>{
        check.animate([{strokeDashoffset:35},{strokeDashoffset:0}], {duration:500, fill:'forwards', easing:'ease-out'});
    }, 800);

    setTimeout(()=>{
        successOverlay.style.opacity='0';
        successOverlay.style.pointerEvents='none';
    }, 4000);
}

document.getElementById('submitBtn').addEventListener('click', () => {
    let valid = true;

    const name = document.getElementById('clientName');
    const email = document.getElementById('clientEmail');
    const project = document.getElementById('clientProject');
    const timeline = document.getElementById('clientTimeline');
    const payment = document.getElementById('clientPayment');
    const country = document.getElementById('clientCountry');
    const budget = document.getElementById('clientBudget');

    // Validation check
    if(!name.value.trim()){ name.style.borderColor='red'; valid=false;}
    if(!isValidEmail(email.value.trim())){ email.style.borderColor='red'; valid=false;}
    if(!project.value.trim()){ project.style.borderColor='red'; valid=false;}
    if(!timeline.value){ timeline.style.borderColor='red'; valid=false;}
    if(!payment.value){ payment.style.borderColor='red'; valid=false;}
    if(!country.value){ country.style.borderColor='red'; valid=false;}
    if(!budget.value || Number(budget.value)<0){ budget.style.borderColor='red'; valid=false;}

    if(valid){
        closeModal();
        showSuccessAnimation();
    }
});

const downloadBtn = document.querySelector('.btns button:nth-child(2)');
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'path/to/your/CV.pdf'; 
  link.download = 'Ramesh_Khanal_CV.pdf'; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", function(){
    if(window.scrollY > 300){
        toTopBtn.style.display = "flex";
    } else {
        toTopBtn.style.display = "none";
    }
});

toTopBtn.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: "smooth" });
});
document.querySelectorAll('.input-wrap input, .input-wrap textarea').forEach(field => {
    const parent = field.parentElement;
    field.addEventListener('focus', () => {
        parent.classList.add('focused');
    });
    field.addEventListener('blur', () => {
        parent.classList.remove('focused');
        if(field.value.trim() !== "") {
            parent.classList.add('filled');
        } else {
            parent.classList.remove('filled');
        }
    });
    if(field.value.trim() !== "") {
        parent.classList.add('filled');
    }
});
