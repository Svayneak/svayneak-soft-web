"use client";

import React, { useEffect, useState } from "react";
import BinaryDragonLogo from "../components/BinaryDragonLogo";
import {
  Database,
  RefreshCw,
  Layers,
  Bot,
  ArrowRight,
  Check,
  PlugZap,
  Sun,
  Moon,
  Globe,
} from "lucide-react";

type Lang = "en" | "es";
type Theme = "dark" | "light";

const COPY = {
  en: {
    subtitle: "Databases · CRM · Custom Apps · AI Agents & MCPs",
    nav: {
      solutions: "Solutions",
      dataFlow: "Data Flow",
      mcps: "Custom MCPs & Agents",
      cta: "Start a Project",
    },
    hero: {
      badge: "AI ARCHITECTURE & BUSINESS SYSTEMS",
      titleStart: "Interconnected Databases,",
      titleHighlight: "Custom Apps & AI Agents.",
      leadBefore:
        "We migrate your company off fragile spreadsheets into a live, interconnected database—connecting your ",
      leadBold: "purchases, CRM, custom apps, and AI agents",
      leadAfter: " so you ",
      leadUnderline: "never have to copy, paste, or click save ever again.",
      pills: [
        "Automated Data Freshness",
        "Custom Client & Team Apps",
        "Works With Any AI (Custom MCPs)",
      ],
      primaryCta: "Build Your System",
      secondaryCta: "Explore What We Do",
      logoHint: "Interactive 01 Matrix — Hover or switch modes",
    },
    servicesHeader: {
      tag: "// WHAT WE BUILD FOR YOUR COMPANY",
      title: "One Connected Ecosystem. Zero Manual Busywork.",
    },
    services: [
      {
        id: "database-migration",
        tag: "01 // DATA SPINE & MIGRATIONS",
        title: "Spreadsheet-to-Database Migration & Auto-Freshness",
        headline: "Never copy, paste, or click save ever again.",
        description:
          "We migrate your scattered spreadsheets into a unified, interconnected company database—and wire up automated sync pipelines so your numbers, inventory, and client records stay 100% fresh in real time.",
        icon: Database,
        accent: "from-cyan-400 to-purple-500",
        points: [
          "Zero-downtime migration from Google Sheets / Excel to relational SQL",
          "Interconnected tables linking purchases, operations, and client profiles",
          "Automated background data freshness—no manual exports or copy-pasting",
        ],
      },
      {
        id: "crm-purchases",
        tag: "02 // CRM & PURCHASES",
        title: "CRM Integration & Purchase Reconciliation",
        headline: "Every sale, tag, and booking connected automatically.",
        description:
          "When a customer buys, books, or updates their profile, your database, CRM, and onboarding flows react instantly. We connect payment processors, CRM tags, and user permissions into one seamless flow.",
        icon: RefreshCw,
        accent: "from-purple-500 to-fuchsia-500",
        points: [
          "Instant two-way sync between your CRM, payments, and core database",
          "Automated access provisioning the second a purchase clears",
          "Purchase cross-referencing so no lead or payment ever slips through",
        ],
      },
      {
        id: "custom-apps",
        tag: "03 // CLIENT & INTERNAL APPS",
        title: "Custom Client-Facing Apps & Dashboards",
        headline: "Tailored software built around how your business actually runs.",
        description:
          "From customer portals and interactive intake tools to live executive dashboards, we build fast, modern web applications connected directly to your company's live database.",
        icon: Layers,
        accent: "from-cyan-400 to-teal-400",
        points: [
          "Client portals, booking apps, and interactive diagnostic tools",
          "Live executive dashboards powered directly by your database",
          "Clean, responsive interfaces designed for daily team and customer use",
        ],
      },
      {
        id: "agents-mcp",
        tag: "04 // CUSTOM AGENTS, AUTOMATIONS & MCPs",
        title: "Custom AI Agents & Model-Agnostic MCP Servers",
        headline: "Works with any AI your company uses—today or tomorrow.",
        description:
          "We build custom AI agents, end-to-end workflow automations, and your own Model Context Protocol (MCP) servers. Connect Claude, GPT, Gemini, or local models directly to your business tools without vendor lock-in.",
        icon: PlugZap,
        accent: "from-fuchsia-500 to-cyan-400",
        points: [
          "Build your own custom MCPs so any AI can safely query & act on your data",
          "Custom autonomous agents for support drafting, content, and operations",
          "100% model-agnostic architecture—switch AI providers anytime",
        ],
      },
    ],
    flow: {
      tag: "// END-TO-END DATA FRESHNESS",
      title: "Kill Copy-Paste Forever",
      subtitle:
        "We turn disconnected spreadsheets and manual exports into a self-updating pipeline where every purchase, CRM event, and app action flows automatically.",
      steps: [
        {
          label: "Spreadsheets & Raw Inputs",
          sub: "Purchases · Forms · Legacy Sheets",
        },
        {
          label: "Interconnected SQL Database",
          sub: "Auto-Fresh · Zero Copy-Paste",
        },
        {
          label: "CRM & Custom Web Apps",
          sub: "Live Portals · Dashboards · Sync",
        },
        {
          label: "Custom MCPs & AI Agents",
          sub: "Works With Any AI Model",
        },
      ],
    },
    mcpSection: {
      badge: "OWN YOUR INTELLIGENCE LAYER",
      titleStart: "Custom MCPs & AI Agents That Work With ",
      titleHighlight: "Any AI You Choose.",
      body: "Don't lock your company into a single AI vendor. By building custom Model Context Protocol (MCP) servers and tailored agents directly on top of your database and CRM, your team can use Claude, ChatGPT, Gemini, or open-weights models—all securely reading and acting on the exact same live company data.",
      card1Title: "CUSTOM MCP SERVERS",
      card1Body:
        "Give your AI direct, permissioned tools to query inventory, purchases, and CRM records.",
      card2Title: "CUSTOM AI AGENTS",
      card2Body:
        "Dedicated agents that draft support replies, reconcile sales, and automate daily ops.",
      diagramTop: "ANY AI MODEL YOU USE",
      diagramMidTitle: "YOUR CUSTOM MCP & AGENT LAYER",
      diagramMidSub: "Engineered by Svayneak Soft",
      diagramBottom: ["SQL Database", "CRM & Sales", "Custom Apps"],
    },
    contact: {
      tag: "// LET'S BUILD YOUR SYSTEM",
      title: "Ready to Automate & Connect Your Business?",
      subtitle:
        "Tell us what you want to connect first, and we'll map out the exact architecture for your company.",
      selectLabel: "WHAT DO YOU NEED MOST RIGHT NOW?",
      options: [
        "Spreadsheet-to-Database & Auto-Sync",
        "CRM & Purchases Integration",
        "Custom Client or Internal Web App",
        "Custom AI Agents & MCP Servers",
      ],
      nameLabel: "NAME / COMPANY",
      namePlaceholder: "Your name & company",
      emailLabel: "EMAIL",
      emailPlaceholder: "you@company.com",
      submitBtn: "BOOK YOUR ARCHITECTURE CALL →",
      receivedTitle: "Request Received",
      receivedBody: "We'll review your focus area and follow up shortly:",
      resetBtn: "Send Another Inquiry",
    },
    footer: {
      left: "AI Architecture & Business Systems",
      right: "DATABASES · CRM · CUSTOM APPS · MODEL-AGNOSTIC MCPs & AGENTS",
    },
  },
  es: {
    subtitle: "Bases de Datos · CRM · Apps a Medida · Agentes IA y MCPs",
    nav: {
      solutions: "Soluciones",
      dataFlow: "Flujo de Datos",
      mcps: "MCPs y Agentes IA",
      cta: "Iniciar Proyecto",
    },
    hero: {
      badge: "ARQUITECTURA DE IA Y SISTEMAS EMPRESARIALES",
      titleStart: "Bases de Datos Interconectadas,",
      titleHighlight: "Apps a Medida y Agentes IA.",
      leadBefore:
        "Migramos tu empresa de hojas de cálculo frágiles a una base de datos viva e interconectada—uniendo tus ",
      leadBold: "compras, CRM, aplicaciones a medida y agentes de IA",
      leadAfter: " para que ",
      leadUnderline: "nunca más tengas que copiar, pegar ni hacer clic en guardar.",
      pills: [
        "Datos Siempre Actualizados",
        "Apps para Clientes y Equipos",
        "Compatible con Cualquier IA (MCPs Propios)",
      ],
      primaryCta: "Construir Tu Sistema",
      secondaryCta: "Ver Soluciones",
      logoHint: "Matriz 01 Interactiva — Pasa el cursor o cambia el modo",
    },
    servicesHeader: {
      tag: "// LO QUE CONSTRUIMOS PARA TU EMPRESA",
      title: "Un Ecosistema Conectado. Cero Trabajo Manual.",
    },
    services: [
      {
        id: "database-migration",
        tag: "01 // BASE DE DATOS Y MIGRACIONES",
        title: "Migración de Planillas a Base de Datos y Auto-Sincronización",
        headline: "Nunca más vuelvas a copiar, pegar ni hacer clic en guardar.",
        description:
          "Migramos tus hojas de cálculo dispersas hacia una base de datos empresarial unificada e interconectada, automatizando la frescura de los datos para que tu inventario, ventas y clientes estén al día en tiempo real.",
        icon: Database,
        accent: "from-cyan-400 to-purple-500",
        points: [
          "Migración sin interrupciones desde Excel / Google Sheets hacia SQL relacional",
          "Tablas interconectadas que unen compras, operaciones y perfiles de clientes",
          "Actualización automática en segundo plano—sin exportaciones manuales",
        ],
      },
      {
        id: "crm-purchases",
        tag: "02 // CRM Y COMPRAS",
        title: "Integración de CRM y Conciliación de Compras",
        headline: "Cada venta, etiqueta y reserva conectada automáticamente.",
        description:
          "Cuando un cliente compra, agenda o actualiza sus datos, tu base de datos, CRM y accesos reaccionan al instante. Conectamos pasarelas de pago, etiquetas de CRM y permisos en un solo flujo continuo.",
        icon: RefreshCw,
        accent: "from-purple-500 to-fuchsia-500",
        points: [
          "Sincronización bidireccional instantánea entre tu CRM, pagos y base de datos",
          "Habilitación automática de accesos apenas se confirma una compra",
          "Auditoría cruzada de compras para que ningún pago o cliente se pierda",
        ],
      },
      {
        id: "custom-apps",
        tag: "03 // APPS PARA CLIENTES Y EQUIPOS",
        title: "Aplicaciones Web a Medida y Paneles de Control",
        headline: "Software diseñado exactamente para la forma en que opera tu negocio.",
        description:
          "Desde portales de clientes y herramientas interactivas hasta paneles ejecutivos en vivo, creamos aplicaciones modernas conectadas directamente a la base de datos de tu empresa.",
        icon: Layers,
        accent: "from-cyan-400 to-teal-400",
        points: [
          "Portales de clientes, sistemas de reservas y diagnósticos interactivos",
          "Dashboards ejecutivos en tiempo real alimentados por tu base de datos",
          "Interfaces rápidas y claras diseñadas para el uso diario de tu equipo",
        ],
      },
      {
        id: "agents-mcp",
        tag: "04 // AGENTES IA, AUTOMATIZACIÓN Y MCPs",
        title: "Agentes de IA Propios y Servidores MCP Agnósticos",
        headline: "Funciona con cualquier IA que tu empresa elija—hoy o mañana.",
        description:
          "Creamos agentes de IA personalizados, automatizaciones completas y tus propios servidores Model Context Protocol (MCP). Conecta Claude, GPT, Gemini o modelos locales a tus datos sin depender de un solo proveedor.",
        icon: PlugZap,
        accent: "from-fuchsia-500 to-cyan-400",
        points: [
          "Construye tus propios MCPs para que cualquier IA consulte y opere tus datos",
          "Agentes personalizados para soporte, contenido y operaciones internas",
          "Arquitectura 100% agnóstica—cambia de modelo de IA cuando quieras",
        ],
      },
    ],
    flow: {
      tag: "// FLUJO DE DATOS AUTOMATIZADO",
      title: "Elimina el Copiar y Pegar para Siempre",
      subtitle:
        "Transformamos planillas desconectadas y tareas manuales en un sistema vivo donde cada compra, evento de CRM y acción en tu app se actualiza solo.",
      steps: [
        {
          label: "Planillas y Datos Crudos",
          sub: "Compras · Formularios · Excel",
        },
        {
          label: "Base de Datos SQL Conectada",
          sub: "Auto-Actualizada · Cero Copy-Paste",
        },
        {
          label: "CRM y Apps a Medida",
          sub: "Portales · Dashboards · Sync",
        },
        {
          label: "MCPs y Agentes IA Propios",
          sub: "Compatible con Cualquier IA",
        },
      ],
    },
    mcpSection: {
      badge: "DUEÑO DE TU CAPA DE INTELIGENCIA",
      titleStart: "MCPs y Agentes Propios que Funcionan con ",
      titleHighlight: "Cualquier IA que Elijas.",
      body: "No ates tu empresa a un único proveedor de IA. Al construir servidores Model Context Protocol (MCP) y agentes a medida directamente sobre tu base de datos y CRM, tu equipo puede usar Claude, ChatGPT, Gemini o modelos abiertos—todos operando de forma segura sobre los mismos datos en vivo.",
      card1Title: "SERVIDORES MCP PROPIOS",
      card1Body:
        "Dale a tu IA herramientas seguras para consultar inventario, compras y registros del CRM.",
      card2Title: "AGENTES DE IA A MEDIDA",
      card2Body:
        "Agentes dedicados que redactan soporte, concilian ventas y automatizan operaciones diarias.",
      diagramTop: "CUALQUIER MODELO DE IA QUE USES",
      diagramMidTitle: "TU CAPA DE MCPs Y AGENTES A MEDIDA",
      diagramMidSub: "Diseñada por Svayneak Soft",
      diagramBottom: ["Base de Datos SQL", "CRM y Ventas", "Apps a Medida"],
    },
    contact: {
      tag: "// CONSTRUYAMOS TU SISTEMA",
      title: "¿Listo para Automatizar y Conectar tu Empresa?",
      subtitle:
        "Cuéntanos qué necesitas conectar primero y diseñaremos la arquitectura exacta para tu negocio.",
      selectLabel: "¿QUÉ NECESITAS PRIORIZAR AHORA MISMO?",
      options: [
        "Migración de Planillas a Base de Datos + Auto-Sync",
        "Integración de CRM y Conciliación de Compras",
        "App Web a Medida para Clientes o Equipo",
        "Agentes de IA Propios y Servidores MCP",
      ],
      nameLabel: "NOMBRE / EMPRESA",
      namePlaceholder: "Tu nombre y empresa",
      emailLabel: "CORREO ELECTRÓNICO",
      emailPlaceholder: "tu@empresa.com",
      submitBtn: "AGENDAR LLAMADA DE ARQUITECTURA →",
      receivedTitle: "Solicitud Recibida",
      receivedBody: "Revisaremos tu prioridad y te contactaremos a la brevedad:",
      resetBtn: "Enviar Otra Consulta",
    },
    footer: {
      left: "Arquitectura de IA y Sistemas Empresariales",
      right: "BASES DE DATOS · CRM · APPS A MEDIDA · MCPs Y AGENTES IA",
    },
  },
} as const;

// LATAM + Spain timezones & locale detection helper
function detectPreferredLanguage(): Lang {
  if (typeof window === "undefined") return "en";

  const saved = window.localStorage.getItem("svayneak_lang");
  if (saved === "es" || saved === "en") return saved;

  // 1. Check browser languages (es, es-AR, es-MX, es-ES, es-CO, etc.)
  const langs = navigator.languages || [navigator.language || ""];
  for (const l of langs) {
    if (l.toLowerCase().startsWith("es")) {
      return "es";
    }
  }

  // 2. Check timezone for Latin America / Spain if browser language is generic
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const latamOrEsTimezones = [
      "Argentina",
      "Buenos_Aires",
      "Cordoba",
      "Mendoza",
      "Santiago",
      "Bogota",
      "Lima",
      "Mexico",
      "Montevideo",
      "Asuncion",
      "La_Paz",
      "Caracas",
      "Guayaquil",
      "Panama",
      "Costa_Rica",
      "Guatemala",
      "El_Salvador",
      "Tegucigalpa",
      "Managua",
      "Havana",
      "Santo_Domingo",
      "Puerto_Rico",
      "Madrid",
      "Canary",
    ];
    if (latamOrEsTimezones.some((region) => tz.includes(region))) {
      return "es";
    }
  } catch {
    // ignore timezone errors
  }

  return "en";
}

function detectPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem("svayneak_theme");
  if (saved === "light" || saved === "dark") return saved;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }
  return "dark";
}

export default function SvayneakSoftLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedFocusIdx, setSelectedFocusIdx] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Auto-detect OS theme & LATAM/Spanish vs Rest-of-World on mount
  useEffect(() => {
    setLang(detectPreferredLanguage());
    setTheme(detectPreferredTheme());

    // Also listen for live OS theme changes if user hasn't locked a manual override
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem("svayneak_theme")) {
        setTheme(e.matches ? "light" : "dark");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "es" : "en";
    setLang(next);
    window.localStorage.setItem("svayneak_lang", next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("svayneak_theme", next);
  };

  const t = COPY[lang];
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        isLight
          ? "bg-[#f6f7fb] text-slate-900 bg-carbon-grid-light"
          : "bg-[#06060b] text-slate-100 bg-carbon-grid-dark"
      }`}
    >
      {/* Subtle Ambient Purple Dragon Glow */}
      <div
        className={`pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] blur-[140px] z-0 transition-opacity duration-500 ${
          isLight ? "opacity-15" : "opacity-20"
        }`}
        style={{
          background:
            "linear-gradient(90deg, #00fbff 0%, #a855f7 50%, #ed00ff 100%)",
        }}
      />

      {/* Sticky Navigation */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "border-slate-200/90 bg-white/85"
            : "border-white/10 bg-[#06060b]/85"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Actual Animated SVG Logo */}
            <svg
              width="42"
              height="42"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            >
              <defs>
                <clipPath id="nav-clip-anillo">
                  <path d="M 100, 20 A 80, 80 0 1, 1 100, 180 A 80, 80 0 1, 1 100, 20 Z M 100, 35 A 65, 65 0 1, 0 100, 165 A 65, 65 0 1, 0 100, 35 Z" />
                </clipPath>
                <clipPath id="nav-clip-s">
                  <path d="m 100.79754,151.36869 c -13.744203,-7.52197 -23.972582,-15.02967 -35.731859,-23.45713 0.496133,-16.10079 -0.451957,-2.81425 0.523373,-18.49322 37.917196,21.50195 -11.642012,-5.421937 36.813766,21.68121 15.11593,-11.43055 0.42131,0.30792 14.4512,-11.32354 -33.399042,-19.959197 -10.28826,-6.69384 -51.477901,-30.514645 -0.329842,-19.13969 -0.06228,-0.770976 0.368311,-16.206054 33.57227,-23.103668 0.179825,-0.39355 33.79051,-22.707174 23.25878,12.757822 6.26771,2.995675 37.02073,22.903822 -1.68198,19.637688 0.52473,22.204583 -1.8098,20.254861 -19.34151,-11.460875 -19.15597,-13.112382 -35.94088,-23.697373 -13.428338,10.58151 1.06527,-0.566689 -13.422642,10.786245 22.506132,13.605299 29.048012,18.390806 49.587582,32.342928 -0.345,24.39803 -0.19445,-4.829643 -0.35606,15.3456 z" />
                </clipPath>
                <linearGradient id="nav-grad-anillo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00fbff" />
                  <stop offset="100%" stop-color="#ed00ff" />
                </linearGradient>
                <linearGradient id="nav-grad-s" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#ed00ff" />
                  <stop offset="50%" stop-color="#00fbff" />
                  <stop offset="100%" stop-color="#ed00ff" />
                </linearGradient>
              </defs>

              <rect width="200" height="200" fill="url(#nav-grad-anillo)" clip-path="url(#nav-clip-anillo)">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </rect>

              <g clip-path="url(#nav-clip-s)">
                <rect x="-200" y="0" width="400" height="200" fill="url(#nav-grad-s)">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    from="0 0"
                    to="200 0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
            </svg>

            <div>
              <span
                className={`font-bold tracking-tight text-xl ${
                  isLight ? "text-slate-950" : "text-white"
                }`}
              >
                SVAYNEAK
                <span className={isLight ? "text-purple-600" : "text-cyan-400"}>
                  .SOFT
                </span>
              </span>
              <p
                className={`text-[11px] font-mono hidden sm:block ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-7 text-sm font-medium ${
              isLight ? "text-slate-700" : "text-slate-300"
            }`}
          >
            <a
              href="#services"
              className={`transition-colors ${
                isLight ? "hover:text-purple-700" : "hover:text-cyan-300"
              }`}
            >
              {t.nav.solutions}
            </a>
            <a
              href="#how-it-connects"
              className={`transition-colors ${
                isLight ? "hover:text-purple-700" : "hover:text-cyan-300"
              }`}
            >
              {t.nav.dataFlow}
            </a>
            <a
              href="#ai-agnostic"
              className={`transition-colors ${
                isLight ? "hover:text-purple-700" : "hover:text-cyan-300"
              }`}
            >
              {t.nav.mcps}
            </a>
          </nav>

          {/* Right Controls: Language Toggle (ES/EN) + Theme Toggle (Light/Dark) + CTA */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              title="Switch Language (Español / English)"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                isLight
                  ? "border-slate-300 bg-slate-100 text-slate-800 hover:border-purple-500"
                  : "border-white/15 bg-white/[0.04] text-slate-200 hover:border-cyan-400/50"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-500" />
              <span className={lang === "es" ? "text-cyan-500 underline" : "opacity-60"}>
                ES
              </span>
              <span className="opacity-40">/</span>
              <span className={lang === "en" ? "text-cyan-500 underline" : "opacity-60"}>
                EN
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to Carbon Dark Theme" : "Switch to High-Contrast Light Theme"}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                isLight
                  ? "border-slate-300 bg-slate-100 text-slate-800 hover:border-purple-500"
                  : "border-white/15 bg-white/[0.04] text-slate-200 hover:border-cyan-400/50"
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">DARK</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">LIGHT</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 text-slate-950 font-bold shadow-[0_0_25px_-5px_rgba(0,251,255,0.5)] hover:opacity-95 transition-all"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-7">
              <div
                className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
                  isLight
                    ? "border-purple-300 bg-purple-50 text-purple-900 font-semibold"
                    : "border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>{t.hero.badge}</span>
              </div>

              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${
                  isLight ? "text-slate-950" : "text-white"
                }`}
              >
                {t.hero.titleStart}{" "}
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r ${
                    isLight
                      ? "from-cyan-600 via-purple-600 to-fuchsia-600"
                      : "from-cyan-300 via-purple-400 to-fuchsia-400"
                  }`}
                >
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p
                className={`text-lg sm:text-xl max-w-xl leading-relaxed ${
                  isLight ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {t.hero.leadBefore}
                <strong className={isLight ? "text-slate-950" : "text-white"}>
                  {t.hero.leadBold}
                </strong>
                {t.hero.leadAfter}
                <span
                  className={`font-semibold underline underline-offset-4 ${
                    isLight
                      ? "text-purple-700 decoration-purple-400"
                      : "text-cyan-300 decoration-cyan-400/40"
                  }`}
                >
                  {t.hero.leadUnderline}
                </span>
              </p>

              {/* 3 Crisp Highlights */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono">
                {t.hero.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-800 shadow-sm"
                        : "bg-white/[0.04] border-white/10 text-slate-300"
                    }`}
                  >
                    <span className="text-purple-500 font-bold">✦</span> {pill}
                  </span>
                ))}
              </div>

              {/* Clean CTA Row */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-mono text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 shadow-[0_0_35px_-5px_rgba(168,85,247,0.55)] hover:scale-[1.01] transition-all"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className={`inline-flex items-center gap-2 px-6 py-4 rounded-xl font-mono text-sm border transition-all ${
                    isLight
                      ? "border-slate-300 bg-white text-slate-800 hover:border-purple-500 shadow-sm"
                      : "border-white/15 bg-white/[0.03] text-slate-200 hover:border-cyan-400/40"
                  }`}
                >
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive 0101 Purple Dragon Logo */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <BinaryDragonLogo
                size={390}
                gridResolution={38}
                interactive={true}
                theme={theme}
                lang={lang}
              />
              <p
                className={`mt-3 text-xs font-mono ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {t.hero.logoHint}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 CORE SERVICES */}
      <section
        id="services"
        className={`relative z-10 py-24 border-t ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div
              className={`text-xs font-mono uppercase tracking-widest mb-2 font-bold ${
                isLight ? "text-purple-700" : "text-cyan-400"
              }`}
            >
              {t.servicesHeader.tag}
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                isLight ? "text-slate-950" : "text-white"
              }`}
            >
              {t.servicesHeader.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`group relative rounded-2xl border p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isLight
                      ? "border-slate-200/90 bg-white shadow-[0_12px_35px_-15px_rgba(15,23,42,0.08)] hover:border-purple-400"
                      : "border-white/10 bg-[#0b0b15]/90 hover:border-purple-500/50"
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.accent}`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`text-xs font-mono tracking-wider font-bold ${
                          isLight ? "text-cyan-700" : "text-cyan-300"
                        }`}
                      >
                        {service.tag}
                      </span>
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                          isLight
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : "bg-purple-500/10 border-purple-500/30 text-cyan-300"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        isLight ? "text-slate-950" : "text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm font-mono font-semibold mb-4 ${
                        isLight ? "text-purple-700" : "text-purple-300"
                      }`}
                    >
                      {service.headline}
                    </p>
                    <p
                      className={`text-sm leading-relaxed mb-7 ${
                        isLight ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div
                    className={`space-y-2.5 pt-5 border-t ${
                      isLight ? "border-slate-200" : "border-white/10"
                    }`}
                  >
                    {service.points.map((pt, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-xs ${
                          isLight ? "text-slate-800 font-medium" : "text-slate-200"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isLight ? "text-cyan-600" : "text-cyan-400"
                          }`}
                        />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT CONNECTS */}
      <section
        id="how-it-connects"
        className={`relative z-10 py-24 border-t ${
          isLight
            ? "border-slate-200 bg-slate-100/70"
            : "border-white/10 bg-[#080812]/60"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className={`text-xs font-mono uppercase tracking-widest mb-2 font-bold ${
                isLight ? "text-purple-700" : "text-purple-300"
              }`}
            >
              {t.flow.tag}
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                isLight ? "text-slate-950" : "text-white"
              }`}
            >
              {t.flow.title}
            </h2>
            <p
              className={`text-sm sm:text-base mt-3 ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {t.flow.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            {t.flow.steps.map((step, idx) => {
              const stepStyles = isLight
                ? [
                    "border-slate-300 bg-white text-slate-800",
                    "border-cyan-500/60 bg-cyan-50/80 text-cyan-900",
                    "border-purple-500/60 bg-purple-50/80 text-purple-900",
                    "border-fuchsia-500/60 bg-fuchsia-50/80 text-fuchsia-900",
                  ][idx]
                : [
                    "border-white/15 bg-white/[0.02] text-slate-300",
                    "border-cyan-400/50 bg-cyan-500/5 text-cyan-300",
                    "border-purple-400/50 bg-purple-500/5 text-purple-300",
                    "border-fuchsia-400/50 bg-fuchsia-500/5 text-fuchsia-300",
                  ][idx];

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${stepStyles} backdrop-blur-sm flex flex-col justify-between`}
                >
                  <div className="text-xs font-mono opacity-75 mb-2 font-bold">
                    STEP 0{idx + 1}
                  </div>
                  <div>
                    <div
                      className={`text-base font-bold mb-1 ${
                        isLight ? "text-slate-950" : "text-white"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs font-mono opacity-85">{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: MODEL-AGNOSTIC MCPs & CUSTOM AI AGENTS */}
      <section
        id="ai-agnostic"
        className={`relative z-10 py-24 border-t ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl border p-8 sm:p-12 ${
              isLight
                ? "border-purple-300 bg-gradient-to-br from-white via-purple-50/50 to-cyan-50/50 shadow-lg"
                : "border-purple-500/30 bg-gradient-to-br from-[#0d0d1d] via-[#090914] to-[#0d1322]"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div
                  className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold ${
                    isLight ? "text-purple-700" : "text-cyan-300"
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>{t.mcpSection.badge}</span>
                </div>
                <h2
                  className={`text-3xl sm:text-4xl font-bold leading-tight ${
                    isLight ? "text-slate-950" : "text-white"
                  }`}
                >
                  {t.mcpSection.titleStart}
                  <span
                    className={`bg-clip-text text-transparent bg-gradient-to-r ${
                      isLight
                        ? "from-cyan-600 to-fuchsia-600"
                        : "from-cyan-300 to-fuchsia-400"
                    }`}
                  >
                    {t.mcpSection.titleHighlight}
                  </span>
                </h2>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isLight ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  {t.mcpSection.body}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div
                    className={`p-4 rounded-xl border ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-700 shadow-sm"
                        : "bg-white/[0.03] border-white/10 text-slate-200"
                    }`}
                  >
                    <span
                      className={`font-bold block mb-1 ${
                        isLight ? "text-cyan-700" : "text-cyan-400"
                      }`}
                    >
                      {t.mcpSection.card1Title}
                    </span>
                    {t.mcpSection.card1Body}
                  </div>
                  <div
                    className={`p-4 rounded-xl border ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-700 shadow-sm"
                        : "bg-white/[0.03] border-white/10 text-slate-200"
                    }`}
                  >
                    <span
                      className={`font-bold block mb-1 ${
                        isLight ? "text-purple-700" : "text-fuchsia-400"
                      }`}
                    >
                      {t.mcpSection.card2Title}
                    </span>
                    {t.mcpSection.card2Body}
                  </div>
                </div>
              </div>

              {/* Clean Visual Diagram of Model-Agnostic MCP */}
              <div
                className={`lg:col-span-5 rounded-2xl border p-6 font-mono text-xs space-y-4 ${
                  isLight
                    ? "border-purple-200 bg-white shadow-md"
                    : "border-white/10 bg-[#06060b]/90"
                }`}
              >
                <div
                  className={`text-center text-[11px] uppercase tracking-wider font-bold ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t.mcpSection.diagramTop}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {["Claude", "OpenAI / GPT", "Gemini / Local"].map((m) => (
                    <div
                      key={m}
                      className={`py-2.5 px-2 rounded-lg border font-semibold ${
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800"
                          : "bg-white/5 border-white/10 text-slate-200"
                      }`}
                    >
                      {m}
                    </div>
                  ))}
                </div>

                <div
                  className={`text-center text-sm font-bold ${
                    isLight ? "text-cyan-600" : "text-cyan-400"
                  }`}
                >
                  ▼ ▲
                </div>

                <div
                  className={`p-4 rounded-xl border text-center ${
                    isLight
                      ? "bg-gradient-to-r from-cyan-50 via-purple-50 to-fuchsia-50 border-purple-400"
                      : "bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-fuchsia-500/15 border-cyan-400/40"
                  }`}
                >
                  <div
                    className={`font-bold text-sm ${
                      isLight ? "text-purple-900" : "text-cyan-300"
                    }`}
                  >
                    {t.mcpSection.diagramMidTitle}
                  </div>
                  <div
                    className={`text-[11px] mt-1 ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {t.mcpSection.diagramMidSub}
                  </div>
                </div>

                <div
                  className={`text-center text-sm font-bold ${
                    isLight ? "text-purple-600" : "text-purple-400"
                  }`}
                >
                  ▼ ▲
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {t.mcpSection.diagramBottom.map((item) => (
                    <div
                      key={item}
                      className={`py-2.5 px-2 rounded-lg border font-semibold ${
                        isLight
                          ? "bg-purple-50 border-purple-200 text-purple-900"
                          : "bg-purple-500/10 border-purple-500/30 text-purple-200"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT / PROJECT BUILDER */}
      <section
        id="contact"
        className={`relative z-10 py-24 border-t ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl border p-8 sm:p-12 ${
              isLight
                ? "border-purple-300 bg-white shadow-[0_20px_60px_-15px_rgba(126,34,206,0.18)]"
                : "border-purple-500/40 bg-[#0b0b15] shadow-[0_0_60px_-15px_rgba(168,85,247,0.35)]"
            }`}
          >
            <div className="text-center mb-8">
              <div
                className={`text-xs font-mono uppercase tracking-widest mb-2 font-bold ${
                  isLight ? "text-purple-700" : "text-cyan-300"
                }`}
              >
                {t.contact.tag}
              </div>
              <h2
                className={`text-3xl font-bold ${
                  isLight ? "text-slate-950" : "text-white"
                }`}
              >
                {t.contact.title}
              </h2>
              <p
                className={`text-sm mt-2 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {t.contact.subtitle}
              </p>
            </div>

            {submitted ? (
              <div
                className={`p-8 rounded-2xl border text-center space-y-3 ${
                  isLight
                    ? "border-cyan-500 bg-cyan-50 text-slate-900"
                    : "border-cyan-400/50 bg-cyan-500/10 text-white"
                }`}
              >
                <div className="text-xl font-bold">{t.contact.receivedTitle}</div>
                <p className={isLight ? "text-sm text-slate-700" : "text-sm text-slate-300"}>
                  {t.contact.receivedBody}{" "}
                  <strong className={isLight ? "text-purple-700" : "text-cyan-300"}>
                    {t.contact.options[selectedFocusIdx]}
                  </strong>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs ${
                    isLight
                      ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                      : "bg-white/10 text-slate-200 hover:bg-white/20"
                  }`}
                >
                  {t.contact.resetBtn}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    className={`block text-xs font-mono uppercase mb-3 font-bold ${
                      isLight ? "text-purple-700" : "text-cyan-300"
                    }`}
                  >
                    {t.contact.selectLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.contact.options.map((item, idx) => {
                      const active = selectedFocusIdx === idx;
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedFocusIdx(idx)}
                          className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all ${
                            active
                              ? isLight
                                ? "border-purple-600 bg-purple-50 text-purple-950 font-bold"
                                : "border-cyan-400 bg-cyan-500/15 text-white font-bold"
                              : isLight
                              ? "border-slate-200 bg-slate-50 text-slate-700 hover:border-purple-400"
                              : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-purple-400/40"
                          }`}
                        >
                          {active ? "● " : "○ "}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-semibold ${
                        isLight ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                        isLight
                          ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600"
                          : "bg-[#06060b] border-white/15 text-white focus:border-cyan-400"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-mono mb-1.5 font-semibold ${
                        isLight ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                        isLight
                          ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600"
                          : "bg-[#06060b] border-white/15 text-white focus:border-cyan-400"
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-mono text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 shadow-[0_0_30px_-5px_rgba(0,251,255,0.5)] hover:opacity-95 transition-all"
                >
                  {t.contact.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer
        className={`border-t py-10 text-xs font-mono ${
          isLight
            ? "border-slate-200 text-slate-600"
            : "border-white/10 text-slate-500"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={isLight ? "text-slate-900 font-bold" : "text-slate-300 font-bold"}>
            SVAYNEAK
            <span className={isLight ? "text-purple-600" : "text-cyan-400"}>
              .SOFT
            </span>{" "}
            — {t.footer.left}
          </div>
          <div>{t.footer.right}</div>
        </div>
      </footer>
    </div>
  );
}
