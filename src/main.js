import './style.css';
import { initHeroCanvas } from './canvas-ai.js';
import { 
  createIcons, 
  Code2, 
  Smartphone, 
  Cpu, 
  Workflow, 
  Bot, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Instagram, 
  MapPin, 
  Phone, 
  Sparkles, 
  ChevronRight, 
  Menu, 
  X, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Terminal,
  ExternalLink,
  MessageSquare
} from 'lucide';

// Initialize Lucide icons
function setupIcons() {
  createIcons({
    icons: {
      Code2,
      Smartphone,
      Cpu,
      Workflow,
      Bot,
      Layers,
      CheckCircle2,
      ArrowRight,
      Send,
      Instagram,
      MapPin,
      Phone,
      Sparkles,
      ChevronRight,
      Menu,
      X,
      Zap,
      ShieldCheck,
      Flame,
      Terminal,
      ExternalLink,
      MessageSquare
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupIcons();
  initHeroCanvas();
  setupSpotlightCards();
  setupMobileMenu();
  setupStickyHeader();
  setupInteractiveWhatsAppBuilder();
  setupScrollAnimations();
});

/**
 * Mouse spotlight effect on glass cards
 */
function setupSpotlightCards() {
  const cards = document.querySelectorAll('.card-spotlight');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Mobile slide-in navigation toggle
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.querySelector('.mobile-menu-content')?.classList.remove('translate-x-full');
      }, 10);
    } else {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      mobileMenu.querySelector('.mobile-menu-content')?.classList.add('translate-x-full');
      document.body.style.overflow = '';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  closeBtn?.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/**
 * Sticky Header glass blur on scroll
 */
function setupStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-dark-900/85', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3.5', 'shadow-lg');
      header.classList.remove('bg-transparent', 'py-5');
    } else {
      header.classList.remove('bg-dark-900/85', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3.5', 'shadow-lg');
      header.classList.add('bg-transparent', 'py-5');
    }
  }, { passive: true });
}

/**
 * Interactive Service Selector in the Lead Capture block:
 * Dynamically constructs a personalized WhatsApp message link
 */
function setupInteractiveWhatsAppBuilder() {
  const pills = document.querySelectorAll('.service-pill');
  const customInput = document.getElementById('custom-project-note');
  const ctaBtn = document.getElementById('dynamic-wa-btn');
  const dynamicPreview = document.getElementById('wa-message-preview');
  const phone = '77472470797';

  let selectedServices = ['Комплексные IT & AI решения'];

  function updateWhatsAppLink() {
    let message = 'Здравствуйте, BagdarLime! Хочу проконсультироваться';

    if (selectedServices.length > 0) {
      message += ` по направлению: ${selectedServices.join(', ')}`;
    }

    const note = customInput ? customInput.value.trim() : '';
    if (note) {
      message += `. Детали: ${note}`;
    }

    const encoded = encodeURIComponent(message);
    const fullUrl = `https://wa.me/${phone}?text=${encoded}`;

    if (ctaBtn) {
      ctaBtn.href = fullUrl;
    }
    if (dynamicPreview) {
      dynamicPreview.textContent = `"${message}"`;
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const value = pill.getAttribute('data-service');
      if (!value) return;

      if (pill.classList.contains('active-pill')) {
        if (selectedServices.length > 1) {
          selectedServices = selectedServices.filter(s => s !== value);
          pill.classList.remove('active-pill', 'bg-lime-neon', 'text-dark-950', 'border-lime-neon');
          pill.classList.add('bg-dark-800/80', 'text-slate-300', 'border-white/10');
        }
      } else {
        selectedServices.push(value);
        pill.classList.add('active-pill', 'bg-lime-neon', 'text-dark-950', 'border-lime-neon');
        pill.classList.remove('bg-dark-800/80', 'text-slate-300', 'border-white/10');
      }

      updateWhatsAppLink();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', updateWhatsAppLink);
  }

  updateWhatsAppLink();
}

/**
 * Reveal elements smoothly on scroll
 */
function setupScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.remove('opacity-0', 'translate-y-8'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
  });
}
