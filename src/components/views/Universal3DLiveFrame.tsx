import React, { useEffect, useMemo, useRef } from 'react';
import { UniversalDemoTemplate } from '../../data/universal3dDemosData';

export interface UniversalTextEditMessage {
  type: 'UNIVERSAL_TEXT_EDIT';
  path: string;
  value: string;
  label: string;
  section: string;
}

interface Universal3DLiveFrameProps {
  config: UniversalDemoTemplate;
  inspectorEnabled?: boolean;
  onSelectElement?: (
    section: string,
    label: string,
    path?: string,
    currentValue?: string
  ) => void;
  onInlineTextChange?: (path: string, newValue: string) => void;
}

interface ArchetypeDesignMeta {
  layoutClass: string;
  fontUrl: string;
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  stackLabel: string;
  showcaseSectionTitle: string;
  showcaseSectionSubtitle: string;
  articlesSectionTitle: string;
  articlesSectionSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  contactHubs: string;
  contactFormPlaceholder: string;
  contactSubmitText: string;
  defaultArticles: [
    { tag: string; readTime: string; title: string; summary: string },
    { tag: string; readTime: string; title: string; summary: string },
    { tag: string; readTime: string; title: string; summary: string }
  ];
}

function getArchetypeDesign(config: UniversalDemoTemplate): ArchetypeDesignMeta {
  const st = config.sceneType;

  if (st === 'melto-icecream') {
    return {
      layoutClass: 'arch-gelato-cremerie',
      fontUrl:
        'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
      displayFont: "'Fraunces', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      monoFont: "'Space Mono', monospace",
      stackLabel: 'CRYOGENIC 3D GELATO CHURN · THREE.JS · GSAP SCROLL · EFERZ PLATFORM',
      showcaseSectionTitle: 'Artisan Gelato Flavors & Single-Origin Pints',
      showcaseSectionSubtitle:
        'Slow-churned Jersey cream, single-origin cacao shells, and hand-swirled fruit compotes.',
      articlesSectionTitle: 'The Cremerie Journal & Gelato Masterclasses',
      articlesSectionSubtitle:
        'Insights into micro-crystal freezing, Bronte pistachio terroirs, and sub-zero cold-chain transport.',
      contactTitle: 'Private Gelato Tasting Flights & Event Catering',
      contactSubtitle:
        'Reserve our mobile gelato cart, schedule private flavor tastings, or request restaurant wholesale distribution.',
      contactHubs: 'Bologna Atelier · London Mayfair · Dubai Marina · New York SoHo',
      contactFormPlaceholder:
        'Tell us about your event date, custom flavor request, or wholesale pints inquiry...',
      contactSubmitText: 'Book Private Tasting →',
      defaultArticles: [
        {
          tag: 'COLD CHURN · SCIENCE',
          readTime: '05 MIN READ',
          title: 'Why -18°C Cryo-Freezing Eliminates Ice Crystals in Pure Jersey Cream',
          summary:
            'How ultra-fast rapid chilling preserves the velvety lipid matrix of organic Jersey dairy without synthetic stabilizers.',
        },
        {
          tag: 'TERROIR · INGREDIENTS',
          readTime: '06 MIN READ',
          title: 'Mount Etna Volcanic Soil: The Emerald Soul of Bronte Pistachios',
          summary:
            'Exploring the biennial harvest of DOP Sicilian pistachios roasted slowly to produce intense emerald green paste.',
        },
        {
          tag: 'CHOCOLATE · CRAFT',
          readTime: '04 MIN READ',
          title: '72% Single-Origin Arriba Dark Chocolate: The Science of the Crisp Snap Shell',
          summary:
            'Balancing pure cacao butter melting curves so the outer coating cracks instantly on contact while retaining rich floral fruit notes.',
        },
      ],
    };
  }

  // DEFAULT / DESI SPICES ARCHETYPE ('desi-spices-mortar')
  return {
    layoutClass: 'arch-spice-atelier',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap',
    displayFont: "'Cinzel', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    stackLabel: 'TRADITIONAL STONE CHAKKI 3D · THREE.JS · WEBGL · EFERZ PLATFORM',
    showcaseSectionTitle: 'Heritage Stone-Ground Masaley & Pure Blends',
    showcaseSectionSubtitle:
      'Hand-harvested unpolished crops ground below 45°C to preserve fragile aromatic volatile oils.',
    articlesSectionTitle: 'Heritage Spice Chronicles & Culinary Monographs',
    articlesSectionSubtitle:
      'Ancient techniques of slow stone milling, sun-curing rhizomes, and culinary alchemy.',
    contactTitle: 'Chef Culinary Consultation & Tasting Sample Kits',
    contactSubtitle:
      'Request custom restaurant recipe blends, commercial wholesale accounts, or our chef discovery box.',
    contactHubs: 'Lahore Heritage Hub · Old Delhi Khari Baoli · Dubai Al Ras · London Spice Lane',
    contactFormPlaceholder:
      'Share details about your culinary kitchen, restaurant requirements, or requested spice sample kit...',
    contactSubmitText: 'Request Chef Spice Kit →',
    defaultArticles: [
      {
        tag: 'HERITAGE MILLING · MONOGRAPH',
        readTime: '07 MIN READ',
        title: 'Why Low-RPM Granite Chakki Milling Keeps Fragrant Volatiles Alive',
        summary:
          'High-speed industrial blenders scorch spices at 80°C. Discover why traditional cold granite grinding locks in 3x higher essential oils.',
      },
      {
        tag: 'HARVEST ROOTS · BOTANY',
        readTime: '06 MIN READ',
        title: '7.5% Curcumin in Lakadong Turmeric: Nature’s Golden Healer',
        summary:
          'Deep inside the organic hill farms where pristine mountain rainwater and natural soil create the world’s most potent turmeric.',
      },
      {
        tag: 'ROYAL CUISINE · GASTRONOMY',
        readTime: '05 MIN READ',
        title: 'The Lost Art of Muslin Potli: Perfuming Dum Biryani with Zero Grit',
        summary:
          'How sealing whole royal spices in fine unbleached cotton infuses long-grain Basmati with fragrant spice vapors during slow sealed dum cooking.',
      },
    ],
  };
}

function buildBrandEmblemMarkup(config: UniversalDemoTemplate): string {
  if (config.logoImageUrl) {
    return `<img src="${config.logoImageUrl}" alt="${config.brandName}" class="custom-brand-icon" />`;
  }
  if (config.sceneType === 'melto-icecream') {
    return `
      <svg viewBox="0 0 40 40" class="brand-mark-svg" style="width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#E29578,#522E2A);padding:6px;box-shadow:0 0 16px rgba(226,149,120,0.4)">
        <path d="M20 6C15 6 11 10 11 15C11 18 13 20 15 22L20 34L25 22C27 20 29 18 29 15C29 10 25 6 20 6Z" fill="#FFF"/>
        <path d="M15 15C15 12 17 10 20 10C23 10 25 12 25 15" stroke="#522E2A" stroke-width="2" stroke-linecap="round"/>
        <circle cx="20" cy="15" r="2" fill="#E29578"/>
      </svg>
    `;
  }
  // Desi spices emblem
  return `
    <svg viewBox="0 0 40 40" class="brand-mark-svg" style="width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#E59500,#C02626);padding:6px;box-shadow:0 0 16px rgba(229,149,0,0.4)">
      <path d="M12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24H12Z" fill="#FFF"/>
      <line x1="8" y1="24" x2="32" y2="24" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="12" x2="18" y2="22" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="27" cy="11" r="2.5" fill="#E59500"/>
    </svg>
  `;
}

function buildDistinctLayoutBody(
  config: UniversalDemoTemplate,
  arch: ArchetypeDesignMeta,
  emblemHtml: string
): string {
  const isAltVariant = (config.variantGeneration || 0) % 2 === 1;

  if (config.sceneType === 'melto-icecream') {
    return `
    <!-- ── MELTO 2026 ARCHETYPE: ARTISAN GELATERIA & CRYO CHURN ── -->
    <nav data-edit-section="brand" class="nav-gelato">
      <a href="#tH" class="brand-link">
        ${emblemHtml}
        <div>
          <span class="brand-name" data-edit-path="brandName" data-edit-label="Brand Name">${config.brandName}</span>
          <span class="brand-tag" data-edit-path="brandTag" data-edit-label="Brand Tagline">${config.brandTag}</span>
        </div>
      </a>
      <div class="gelato-temp-indicator">
        <i class="frost-dot"></i>
        <span>CHURN TEMP: <strong>-18.0°C CRYO</strong></span>
        <span>DAIRY: <strong>100% JERSEY</strong></span>
      </div>
      <div class="nav-links">
        <a href="#tS0" data-edit-path="navLinks.0" data-edit-label="Nav Link 1">${config.navLinks[0]}</a>
        <a href="#tS1" data-edit-path="navLinks.1" data-edit-label="Nav Link 2">${config.navLinks[1]}</a>
        <a href="#products" data-edit-path="navLinks.2" data-edit-label="Nav Link 3">${config.navLinks[2]}</a>
        <a href="#contact" data-edit-path="navLinks.3" data-edit-label="Nav Link 4">${config.navLinks[3]}</a>
      </div>
      <a href="#contact" class="nav-cta" data-edit-path="navCta" data-edit-label="Navbar CTA">${config.navCta}</a>
    </nav>

    <main>
      <!-- HERO STAGE (COMPACT 135VH) -->
      <div class="tr" id="tH" style="height:135vh">
        <div class="stg" data-edit-section="hero">
          <div class="hl">
            <small data-edit-path="heroBadge" data-edit-label="Hero Kicker">${config.heroBadge}</small>
            <h1>
              <span data-edit-path="heroTitle1" data-edit-label="Hero Line 1">${config.heroTitle1}</span>
              <em data-edit-path="heroTitleAccent" data-edit-label="Hero Accent">${config.heroTitleAccent}</em>
            </h1>
            <p data-edit-path="heroSubtitle" data-edit-label="Hero Subtitle">${config.heroSubtitle}</p>
            <div class="btn-row">
              <a href="#products" class="btn">Explore Flavors →</a>
              <a href="#contact" class="btn sec-outline" data-edit-path="navCta" data-edit-label="Hero CTA">${config.navCta}</a>
            </div>
            <div class="drag-badge" data-edit-path="heroDragHint" data-edit-label="3D Drag Hint">${config.heroDragHint}</div>
          </div>

          <aside class="gelato-telemetry-panel">
            <div class="panel-head">
              <span>CRYO VAULT STATUS</span>
              <strong data-edit-path="promoCode" data-edit-label="Vault Code">${config.promoCode}</strong>
            </div>
            <div class="temp-display">
              <span class="temp-val" data-edit-path="promoBadgeTop" data-edit-label="Badge Top">${config.promoBadgeTop}</span>
              <small data-edit-path="promoBadgeBottom" data-edit-label="Badge Bottom">${config.promoBadgeBottom}</small>
            </div>
            <div class="gelato-facts">
              ${config.stats
                .slice(0, 2)
                .map(
                  (st, i) => `
              <div>
                <small data-edit-path="stats.${i}.label" data-edit-label="Stat Label">${st.label}</small>
                <strong data-edit-path="stats.${i}.value" data-edit-label="Stat Value">${st.value}</strong>
              </div>`
                )
                .join('')}
            </div>
          </aside>
        </div>
      </div>

      <!-- COMPACT 155VH ALTERNATING SCROLL STAGES -->
      ${config.stages
        .map(
          (st, idx) => `
      <div class="tr" id="tS${idx}" style="height:155vh">
        <div class="stg" data-edit-section="stages">
          <div class="cap ${idx % 2 === 1 ? 'cap-right' : 'cap-left'}">
            <div class="hud-corner-tag">COLD CHURN CHOREOGRAPHY // 0${idx + 1}</div>
            <span class="st-badge" data-edit-path="stages.${idx}.badge" data-edit-label="Stage 0${idx + 1} Badge">${st.badge}</span>
            <h2>
              <span data-edit-path="stages.${idx}.title" data-edit-label="Stage 0${idx + 1} Title">${st.title}</span>
              <em data-edit-path="stages.${idx}.highlight" data-edit-label="Stage 0${idx + 1} Highlight">${st.highlight}</em>
            </h2>
            <p data-edit-path="stages.${idx}.description" data-edit-label="Stage 0${idx + 1} Description">${st.description}</p>
            <div class="inline-stage-metric">
              <b data-edit-path="stages.${idx}.metricValue" data-edit-label="Stage Metric">${st.metricValue}</b>
              <span data-edit-path="stages.${idx}.metricUnit" data-edit-label="Stage Unit">${st.metricUnit}</span>
              <small data-edit-path="stages.${idx}.metricLabel" data-edit-label="Stage Metric Label">${st.metricLabel}</small>
            </div>
          </div>
        </div>
      </div>`
        )
        .join('')}

      <!-- SIGNATURE GELATO FLAVORS MATRIX -->
      <section class="sec" id="products" data-edit-section="products">
        <div class="sec-head">
          <div>
            <small class="sec-kicker">ARTISAN FLAVOR SELECTION // SINGLE-ORIGIN PINTS</small>
            <h2 data-edit-path="productsTitle" data-edit-label="Products Title">${config.productsTitle}</h2>
          </div>
          <p data-edit-path="productsSubtitle" data-edit-label="Products Subtitle">${config.productsSubtitle}</p>
        </div>
        <div class="grid-4">
          ${config.products
            .map(
              (prod, idx) => `
          <div class="card gelato-flavor-card">
            <div>
              <span class="card-code" data-edit-path="products.${idx}.code" data-edit-label="Item #${idx + 1} Code">${prod.code}</span>
              <h3 data-edit-path="products.${idx}.name" data-edit-label="Item #${idx + 1} Title">${prod.name}</h3>
              <div class="sub" data-edit-path="products.${idx}.subtitle" data-edit-label="Item #${idx + 1} Subtitle">${prod.subtitle}</div>
              <p data-edit-path="products.${idx}.description" data-edit-label="Item #${idx + 1} Summary">${prod.description}</p>
              <ul class="spec-list">
                <li data-edit-path="products.${idx}.specs.0" data-edit-label="Item #${idx + 1} Spec 1">${prod.specs[0]}</li>
                <li data-edit-path="products.${idx}.specs.1" data-edit-label="Item #${idx + 1} Spec 2">${prod.specs[1]}</li>
                <li data-edit-path="products.${idx}.specs.2" data-edit-label="Item #${idx + 1} Spec 3">${prod.specs[2]}</li>
              </ul>
            </div>
            <div class="card-foot">
              <span class="card-price" data-edit-path="products.${idx}.price" data-edit-label="Item #${idx + 1} Price">${prod.price}</span>
              <a href="#contact" class="card-btn inquire-trigger" data-item="${prod.name}">Request Tasting →</a>
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>
    `;
  }

  // ── DESI SPICES 2026 ARCHETYPE: HERITAGE STONE-GROUND MASALEY ATELIER ──
  return `
    <nav data-edit-section="brand" class="nav-spice">
      <a href="#tH" class="brand-link">
        ${emblemHtml}
        <div>
          <span class="brand-name" data-edit-path="brandName" data-edit-label="Brand Name">${config.brandName}</span>
          <span class="brand-tag" data-edit-path="brandTag" data-edit-label="Brand Tagline">${config.brandTag}</span>
        </div>
      </a>
      <div class="spice-mill-indicator">
        <i class="amber-dot"></i>
        <span>MILLING: <strong>COLD STONE CHAKKI (&lt;45°C)</strong></span>
        <span>PURITY: <strong>100% UNPOLISHED</strong></span>
      </div>
      <div class="nav-links">
        <a href="#tS0" data-edit-path="navLinks.0" data-edit-label="Nav Link 1">${config.navLinks[0]}</a>
        <a href="#tS1" data-edit-path="navLinks.1" data-edit-label="Nav Link 2">${config.navLinks[1]}</a>
        <a href="#products" data-edit-path="navLinks.2" data-edit-label="Nav Link 3">${config.navLinks[2]}</a>
        <a href="#contact" data-edit-path="navLinks.3" data-edit-label="Nav Link 4">${config.navLinks[3]}</a>
      </div>
      <a href="#contact" class="nav-cta" data-edit-path="navCta" data-edit-label="Navbar CTA">${config.navCta}</a>
    </nav>

    <main>
      <!-- HERO STAGE (COMPACT 135VH) -->
      <div class="tr" id="tH" style="height:135vh">
        <div class="stg" data-edit-section="hero">
          <div class="hl">
            <small data-edit-path="heroBadge" data-edit-label="Hero Kicker">${config.heroBadge}</small>
            <h1>
              <span data-edit-path="heroTitle1" data-edit-label="Hero Line 1">${config.heroTitle1}</span>
              <em data-edit-path="heroTitleAccent" data-edit-label="Hero Accent">${config.heroTitleAccent}</em>
            </h1>
            <p data-edit-path="heroSubtitle" data-edit-label="Hero Subtitle">${config.heroSubtitle}</p>
            <div class="btn-row">
              <a href="#products" class="btn">Explore Heritage Blends →</a>
              <a href="#contact" class="btn sec-outline" data-edit-path="navCta" data-edit-label="Hero CTA">${config.navCta}</a>
            </div>
            <div class="drag-badge" data-edit-path="heroDragHint" data-edit-label="3D Drag Hint">${config.heroDragHint}</div>
          </div>

          <aside class="spice-curcumin-panel">
            <div class="panel-head">
              <span>LAB PURITY ANALYSIS</span>
              <strong data-edit-path="promoCode" data-edit-label="Batch Code">${config.promoCode}</strong>
            </div>
            <div class="purity-display">
              <span class="purity-val" data-edit-path="promoBadgeTop" data-edit-label="Badge Top">${config.promoBadgeTop}</span>
              <small data-edit-path="promoBadgeBottom" data-edit-label="Badge Bottom">${config.promoBadgeBottom}</small>
            </div>
            <div class="spice-kpis">
              ${config.stats
                .slice(0, 2)
                .map(
                  (st, i) => `
              <div>
                <small data-edit-path="stats.${i}.label" data-edit-label="Stat Label">${st.label}</small>
                <strong data-edit-path="stats.${i}.value" data-edit-label="Stat Value">${st.value}</strong>
              </div>`
                )
                .join('')}
            </div>
          </aside>
        </div>
      </div>

      <!-- COMPACT 155VH ALTERNATING SCROLL STAGES -->
      ${config.stages
        .map(
          (st, idx) => `
      <div class="tr" id="tS${idx}" style="height:155vh">
        <div class="stg" data-edit-section="stages">
          <div class="cap ${idx % 2 === 1 ? 'cap-right' : 'cap-left'}">
            <div class="hud-corner-tag">HERITAGE MILLING WAYPOINT // 0${idx + 1}</div>
            <span class="st-badge" data-edit-path="stages.${idx}.badge" data-edit-label="Stage 0${idx + 1} Badge">${st.badge}</span>
            <h2>
              <span data-edit-path="stages.${idx}.title" data-edit-label="Stage 0${idx + 1} Title">${st.title}</span>
              <em data-edit-path="stages.${idx}.highlight" data-edit-label="Stage 0${idx + 1} Highlight">${st.highlight}</em>
            </h2>
            <p data-edit-path="stages.${idx}.description" data-edit-label="Stage 0${idx + 1} Description">${st.description}</p>
            <div class="inline-stage-metric">
              <b data-edit-path="stages.${idx}.metricValue" data-edit-label="Stage Metric">${st.metricValue}</b>
              <span data-edit-path="stages.${idx}.metricUnit" data-edit-label="Stage Unit">${st.metricUnit}</span>
              <small data-edit-path="stages.${idx}.metricLabel" data-edit-label="Stage Metric Label">${st.metricLabel}</small>
            </div>
          </div>
        </div>
      </div>`
        )
        .join('')}

      <!-- HERITAGE MASALEY SHOWCASE -->
      <section class="sec" id="products" data-edit-section="products">
        <div class="sec-head">
          <div>
            <small class="sec-kicker">HERITAGE STONE-GROUND COLLECTION // GLASS APOTHECARY</small>
            <h2 data-edit-path="productsTitle" data-edit-label="Products Title">${config.productsTitle}</h2>
          </div>
          <p data-edit-path="productsSubtitle" data-edit-label="Products Subtitle">${config.productsSubtitle}</p>
        </div>
        <div class="grid-4">
          ${config.products
            .map(
              (prod, idx) => `
          <div class="card spice-potli-card">
            <div>
              <span class="card-code" data-edit-path="products.${idx}.code" data-edit-label="Item #${idx + 1} Code">${prod.code}</span>
              <h3 data-edit-path="products.${idx}.name" data-edit-label="Item #${idx + 1} Title">${prod.name}</h3>
              <div class="sub" data-edit-path="products.${idx}.subtitle" data-edit-label="Item #${idx + 1} Subtitle">${prod.subtitle}</div>
              <p data-edit-path="products.${idx}.description" data-edit-label="Item #${idx + 1} Summary">${prod.description}</p>
              <ul class="spec-list">
                <li data-edit-path="products.${idx}.specs.0" data-edit-label="Item #${idx + 1} Spec 1">${prod.specs[0]}</li>
                <li data-edit-path="products.${idx}.specs.1" data-edit-label="Item #${idx + 1} Spec 2">${prod.specs[1]}</li>
                <li data-edit-path="products.${idx}.specs.2" data-edit-label="Item #${idx + 1} Spec 3">${prod.specs[2]}</li>
              </ul>
            </div>
            <div class="card-foot">
              <span class="card-price" data-edit-path="products.${idx}.price" data-edit-label="Item #${idx + 1} Price">${prod.price}</span>
              <a href="#contact" class="card-btn inquire-trigger" data-item="${prod.name}">Request Sample →</a>
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>
    `;
}

export function buildUniversal3DHtml(config: UniversalDemoTemplate): string {
  const serialized = JSON.stringify(config).replace(/</g, '\\u003c');
  const arch = getArchetypeDesign(config);
  const isAltVariant = (config.variantGeneration || 0) % 2 === 1;
  const emblemHtml = buildBrandEmblemMarkup(config);
  const distinctBodyMarkup = buildDistinctLayoutBody(config, arch, emblemHtml);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${config.brandName} — ${config.brandTag} | 2026 Interactive 3D Showcase</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${arch.fontUrl}" rel="stylesheet">
<style>
:root{
  --bg:${config.bgDarkHex};
  --bg2:${config.bgMidHex};
  --pri:${config.primaryHex};
  --sec:${config.secondaryHex};
  --fg:#f8fafc;
  --mut:#94a3b8;
  --font-display:${arch.displayFont};
  --font-body:${arch.bodyFont};
  --font-mono:${arch.monoFont};
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{
  background:radial-gradient(ellipse at ${isAltVariant ? '30% 25%' : '68% 36%'},var(--bg2),var(--bg) 74%) fixed;
  color:var(--fg);
  font-family:var(--font-body);
  overflow-x:hidden;
  scroll-behavior:smooth;
}

body.arch-gelato-cremerie::before{
  content:'';position:fixed;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(circle at 75% 25%, rgba(226,149,120,0.14), transparent 50%);
}

body.arch-spice-atelier::before{
  content:'';position:fixed;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(circle at 20% 30%, rgba(229,149,0,0.12), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(192,38,38,0.10), transparent 50%);
}

#gl{
  position:fixed;inset:0;width:100%;height:100%;z-index:0;
  cursor:grab;touch-action:pan-y;
}
#gl:active{cursor:grabbing}
#sprog{
  position:fixed;left:0;top:0;height:3px;width:100%;
  background:linear-gradient(90deg,var(--pri),var(--sec),#fff);
  transform-origin:left;transform:scaleX(0);z-index:220;
}
#vig{
  position:fixed;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(circle,transparent 50%,rgba(0,0,0,0.75) 100%);
}
main{position:relative;z-index:2;pointer-events:none}
main a,main button,main input,main textarea,main select,main .card,main .cap,main .ps,main .hl,main .bd,main .art-card,main .contact-wrap,main .gelato-telemetry-panel,main .spice-curcumin-panel,main [data-edit-path],main [data-edit-section]{pointer-events:auto}

/* ── DIRECT CLICK-ANY-TEXT INLINE EDITOR & INSPECTOR ── */
body.inspector-on [data-edit-path]{
  position:relative;
  border-radius:6px;
  transition:outline .18s ease,background-color .18s ease,box-shadow .18s ease;
}
body.inspector-on [data-edit-path]:hover{
  outline:1.5px dashed var(--pri);
  outline-offset:4px;
  background:rgba(255,255,255,0.06);
  cursor:text;
}
body.inspector-on [data-edit-path]:focus,
body.inspector-on [data-edit-path].active-text-node{
  outline:2px solid var(--pri);
  outline-offset:5px;
  background:rgba(0,0,0,0.7);
  box-shadow:0 0 0 4px rgba(255,255,255,0.14),0 12px 30px rgba(0,0,0,0.6);
}
#inline-edit-Banner{
  position:fixed;bottom:18px;left:50%;transform:translate(-50%,20px);
  z-index:240;background:rgba(10,12,20,0.94);backdrop-filter:blur(16px);
  border:1px solid var(--pri);color:#fff;padding:8px 16px;border-radius:999px;
  font-size:.72rem;font-weight:700;letter-spacing:.06em;
  display:flex;align-items:center;gap:8px;
  opacity:0;pointer-events:none;transition:.3s cubic-bezier(.16,1,.3,1);
  box-shadow:0 16px 40px rgba(0,0,0,0.65);
}
#inline-edit-Banner.on{opacity:1;transform:translate(-50%,0)}
#inline-edit-Banner span.dot{width:8px;height:8px;border-radius:50%;background:var(--pri);box-shadow:0 0 10px var(--pri)}

nav{
  position:fixed;top:0;left:0;right:0;z-index:80;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 5vw;
  background:linear-gradient(180deg,rgba(4,7,15,0.92),rgba(4,7,15,0.4));
  backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(255,255,255,0.09);
}
.brand-link{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}
.custom-brand-icon{
  width:38px;height:38px;border-radius:10px;object-fit:cover;
  border:1.5px solid var(--pri);box-shadow:0 0 18px var(--pri);
}
.brand-name{font-family:var(--font-display);font-size:1.25rem;letter-spacing:.1em;font-weight:700}
.brand-tag{font-family:var(--font-mono);font-size:.58rem;letter-spacing:.2em;color:var(--pri);display:block;font-weight:600}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-links a{
  color:var(--fg);text-decoration:none;font-size:.74rem;font-weight:600;
  letter-spacing:.13em;text-transform:uppercase;opacity:.84;transition:.25s;
}
.nav-links a:hover{opacity:1;color:var(--pri)}
.nav-cta{
  background:var(--pri);color:#05070e;border:0;border-radius:999px;
  padding:9px 22px;font-weight:800;font-size:.74rem;letter-spacing:.13em;
  text-transform:uppercase;cursor:pointer;transition:.25s;text-decoration:none;
}
.gelato-temp-indicator, .spice-mill-indicator{
  display:flex;gap:14px;font-family:var(--font-mono);font-size:.64rem;letter-spacing:.14em;
  padding:6px 14px;border-radius:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);
}
.gelato-temp-indicator strong, .spice-mill-indicator strong{color:var(--pri)}
.frost-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}
.amber-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#f59e0b;box-shadow:0 0 8px #f59e0b}
@media(max-width:920px){.nav-links,.gelato-temp-indicator,.spice-mill-indicator{display:none}}

/* ── HERO & SCROLL STAGES ── */
.tr{position:relative}
.stg{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden}
.hl{
  position:absolute;
  ${isAltVariant ? 'right:5vw;text-align:right;align-items:flex-end;' : 'left:5vw;text-align:left;align-items:flex-start;'}
  top:52%;transform:translateY(-50%);
  max-width:min(540px,88vw);display:flex;flex-direction:column;
}
.hl small{
  font-family:var(--font-mono);
  display:inline-block;letter-spacing:.18em;color:var(--pri);
  font-size:.68rem;font-weight:700;margin-bottom:10px;text-transform:uppercase;
}
.hl h1{
  font-family:var(--font-display);
  font-size:clamp(2.6rem,6.2vw,5.2rem);line-height:.96;
  letter-spacing:-.01em;margin-bottom:12px;
  text-shadow:0 12px 42px rgba(0,0,0,0.85);
}
.hl h1 em{font-style:normal;color:var(--pri);display:block}
.hl p{
  color:var(--mut);font-size:.96rem;line-height:1.6;
  max-width:470px;margin-bottom:18px;
}
.btn-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--pri);color:#05070e;padding:12px 24px;border-radius:999px;
  font-weight:800;font-size:.74rem;letter-spacing:.13em;text-transform:uppercase;
  text-decoration:none;border:0;cursor:pointer;transition:.3s;
}
.btn.sec-outline{
  background:rgba(255,255,255,0.06);color:#fff;
  border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(10px);
}
.btn:hover{box-shadow:0 0 0 4px rgba(255,255,255,0.14),0 0 28px var(--pri)}
.drag-badge{
  margin-top:12px;display:inline-flex;align-items:center;gap:8px;
  padding:7px 14px;border-radius:99px;background:rgba(8,12,22,0.75);
  border:1px solid rgba(255,255,255,0.16);font-size:.63rem;font-weight:700;
  font-family:var(--font-mono);letter-spacing:.14em;color:#fff;backdrop-filter:blur(12px);
}

/* ── GELATO TELEMETRY & SPICE CURCUMIN ASIDE PANELS ── */
.gelato-telemetry-panel, .spice-curcumin-panel{
  position:absolute;right:5vw;top:52%;transform:translateY(-50%);
  width:290px;padding:20px;border-radius:18px;
  background:rgba(18,12,15,0.88);backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,0.15);
  box-shadow:0 24px 60px rgba(0,0,0,0.65);
}
.panel-head{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:.62rem;letter-spacing:.14em;color:var(--pri);margin-bottom:12px}
.temp-display, .purity-display{text-align:center;padding:12px 0 16px;border-bottom:1px solid rgba(255,255,255,0.1)}
.temp-val, .purity-val{display:block;font-family:var(--font-display);font-size:3.2rem;font-weight:800;color:var(--pri);line-height:1}
.temp-display small, .purity-display small{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.18em;color:#fff;text-transform:uppercase}
.gelato-facts, .spice-kpis{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
.gelato-facts small, .spice-kpis small{display:block;font-family:var(--font-mono);font-size:.58rem;letter-spacing:.12em;color:var(--mut)}
.gelato-facts strong, .spice-kpis strong{font-family:var(--font-display);font-size:1.15rem;color:#fff}
@media(max-width:860px){.gelato-telemetry-panel,.spice-curcumin-panel{display:none}}

/* ── COMPACT 155VH SCROLL STAGES ── */
.cap{
  position:absolute;bottom:9vh;max-width:min(460px,86vw);
  background:rgba(12,10,14,0.82);backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,0.16);border-radius:20px;padding:22px 26px;
  box-shadow:0 20px 50px rgba(0,0,0,0.6);
}
.cap.cap-left{left:5vw}
.cap.cap-right{right:5vw}
.hud-corner-tag{
  font-family:var(--font-mono);font-size:.56rem;letter-spacing:.18em;color:var(--sec);
  margin-bottom:4px;
}
.cap .st-badge{
  font-family:var(--font-mono);
  display:inline-block;font-size:.63rem;font-weight:700;letter-spacing:.18em;
  color:var(--pri);text-transform:uppercase;margin-bottom:6px;
}
.cap h2{
  font-family:var(--font-display);font-size:clamp(1.75rem,3.6vw,2.75rem);
  line-height:1.02;margin-bottom:8px;
}
.cap h2 em{font-style:normal;color:var(--pri);margin-left:6px}
.cap p{color:var(--mut);font-size:.9rem;line-height:1.58}
.inline-stage-metric{
  margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);
  display:flex;align-items:baseline;gap:8px;
}
.inline-stage-metric b{font-family:var(--font-display);font-size:1.85rem;color:var(--pri)}
.inline-stage-metric span{font-family:var(--font-mono);font-size:.8rem;font-weight:700;color:#fff}
.inline-stage-metric small{font-family:var(--font-mono);font-size:.6rem;color:var(--mut);letter-spacing:.14em;margin-left:auto}

/* Stage Quick-Jump Dots */
.stage-nav{
  position:fixed;right:1.6vw;top:50%;transform:translateY(-50%);
  z-index:60;display:flex;flex-direction:column;gap:8px;
}
.stage-dot{
  width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,0.22);
  border:1px solid rgba(255,255,255,0.4);cursor:pointer;transition:.3s;
}
.stage-dot.on{background:var(--pri);transform:scale(1.4);box-shadow:0 0 12px var(--pri)}

/* ── MARQUEE RIBBON ── */
.mq-bar{
  position:relative;z-index:4;background:var(--pri);color:#05070e;
  padding:12px 0;overflow:hidden;
  box-shadow:0 12px 30px rgba(0,0,0,0.45);
}
.mq-track{
  display:flex;gap:40px;width:max-content;animation:mq 26s linear infinite;
  font-family:var(--font-display);font-size:1.25rem;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;
}
@keyframes mq{to{transform:translateX(-50%)}}

/* ── CONTENT SECTIONS ── */
.sec{max-width:1220px;margin:auto;padding:6vh 5vw 3vh;position:relative;z-index:4}
.sec-kicker{
  display:block;font-family:var(--font-mono);font-size:.62rem;letter-spacing:.2em;
  color:var(--pri);margin-bottom:6px;font-weight:700;
}
.sec-head{margin-bottom:24px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:16px}
.sec-head h2{
  font-family:var(--font-display);font-size:clamp(1.85rem,4vw,3.1rem);
  line-height:1.04;
}
.sec-head p{color:var(--mut);max-width:520px;line-height:1.58;font-size:.92rem}

.grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.card{
  padding:24px;border-radius:18px;background:rgba(255,255,255,0.035);
  border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(14px);
  display:flex;flex-direction:column;justify-content:space-between;
  transition:border-color .3s,transform .3s;
}
.card:hover{border-color:var(--pri);transform:translateY(-4px)}
.card-code{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.18em;color:var(--pri);display:block;margin-bottom:6px}
.card h3{font-family:var(--font-display);font-size:1.32rem;margin-bottom:4px}
.card .sub{font-size:.78rem;color:var(--sec);margin-bottom:10px;font-weight:600}
.card p{font-size:.85rem;color:var(--mut);line-height:1.52;margin-bottom:14px}
.spec-list{list-style:none;margin:0 0 16px;display:grid;gap:6px}
.spec-list li{font-family:var(--font-mono);font-size:.68rem;color:#cbd5e1;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)}
.card-foot{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.09);padding-top:14px}
.card-price{font-family:var(--font-mono);font-size:1.05rem;font-weight:700;color:#fff}
.card-btn{
  font-family:var(--font-mono);font-size:.68rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--pri);text-decoration:none;
}
.card-btn:hover{text-decoration:underline}

/* ── ARTICLES GRID ── */
.articles-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
.art-card{
  padding:24px;border-radius:18px;background:rgba(255,255,255,0.035);
  border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(16px);
  display:flex;flex-direction:column;justify-content:space-between;
  transition:border-color .3s,transform .3s;
}
.art-card:hover{border-color:var(--pri);transform:translateY(-4px)}
.art-meta{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  font-family:var(--font-mono);font-size:.64rem;letter-spacing:.15em;color:var(--pri);
  margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.09);
}
.art-card h3{font-family:var(--font-display);font-size:1.24rem;line-height:1.25;margin-bottom:10px;color:#fff}
.art-card p{color:var(--mut);font-size:.86rem;line-height:1.6;margin-bottom:16px}
.art-link{font-family:var(--font-mono);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;text-decoration:none}
.art-link:hover{color:var(--pri)}

/* ── DIRECT CONTACT & INQUIRY SECTION (NO CHECKOUT FLOW) ── */
.contact-wrap{
  display:grid;grid-template-columns:1.05fr 1.2fr;gap:28px;
  padding:32px;border-radius:24px;
  background:linear-gradient(155deg,rgba(22,14,20,0.92),rgba(8,6,10,0.88));
  border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(20px);
  box-shadow:0 24px 60px rgba(0,0,0,0.65);
}
@media(max-width:860px){.contact-wrap{grid-template-columns:1fr;padding:22px}}
.contact-info h3{font-family:var(--font-display);font-size:clamp(1.65rem,3.2vw,2.4rem);line-height:1.08;margin-bottom:10px}
.contact-info p{color:var(--mut);line-height:1.6;font-size:.9rem;margin-bottom:16px}
.hub-box{
  padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1);margin-bottom:10px;
}
.hub-box small{display:block;font-family:var(--font-mono);font-size:.6rem;letter-spacing:.18em;color:var(--pri);margin-bottom:4px;font-weight:700}
.hub-box strong{font-size:.86rem;color:#fff;display:block}
.contact-form{display:grid;gap:12px}
.contact-form .row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:600px){.contact-form .row-2{grid-template-columns:1fr}}
.contact-form input,.contact-form textarea{
  width:100%;padding:12px 14px;border-radius:12px;
  border:1px solid rgba(255,255,255,0.16);background:rgba(4,7,14,0.75);
  color:#fff;font-family:var(--font-body);font-size:.88rem;transition:.25s;
}
.contact-form input:focus,.contact-form textarea:focus{
  outline:none;border-color:var(--pri);box-shadow:0 0 0 3px rgba(255,255,255,0.1);
}

/* ── PERMANENTLY LOCKED WATERMARK: POWERED BY EFERZ (EFERZ.COM) ── */
footer{
  position:relative;z-index:4;background:rgba(5,4,8,0.96);
  border-top:1px solid rgba(255,255,255,0.12);padding:36px 5vw 26px;margin-top:4vh;
}
.foot-top{
  max-width:1220px;margin:0 auto 20px;display:flex;flex-wrap:wrap;
  align-items:center;justify-content:space-between;gap:16px;
}
.locked-watermark-bar{
  max-width:1220px;margin:0 auto;padding-top:18px;
  border-top:1px solid rgba(255,255,255,0.1);
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;
  font-size:.82rem;color:var(--mut);
  user-select:none;
}
.efforts-badge{
  display:inline-flex;align-items:center;gap:8px;
  padding:7px 16px;border-radius:999px;
  background:rgba(208,33,40,0.18);
  border:1px solid rgba(208,33,40,0.6);color:#fff;
  font-size:.74rem;font-weight:800;letter-spacing:.08em;text-decoration:none;
  transition:.25s;
}
.efforts-badge:hover{background:#d02128;border-color:#d02128;box-shadow:0 0 24px rgba(208,33,40,0.6)}
.efforts-badge i.lock-icon{font-style:normal;font-size:.78rem}

#toast{
  position:fixed;top:72px;right:24px;z-index:250;
  background:#0f172a;color:#fff;border:1.5px solid var(--pri);
  padding:10px 20px;border-radius:14px;font-size:.8rem;font-weight:700;
  opacity:0;transform:translateY(-12px);pointer-events:none;transition:.35s;
  box-shadow:0 18px 40px rgba(0,0,0,0.6);
}
#toast.on{opacity:1;transform:translateY(0)}
</style>
</head>
<body class="inspector-on ${arch.layoutClass}">

<div id="sprog"></div>
<div id="vig"></div>
<canvas id="gl"></canvas>
<div id="toast"></div>
<div id="inline-edit-Banner">
  <span class="dot"></span>
  <span id="inline-edit-status">Click any text on the page to edit it directly in place</span>
</div>

<!-- Stage Quick-Jump Dots -->
<div class="stage-nav">
  <div class="stage-dot on" data-jump="#tH" title="Hero Stage"></div>
  <div class="stage-dot" data-jump="#tS0" title="Stage 01"></div>
  <div class="stage-dot" data-jump="#tS1" title="Stage 02"></div>
  <div class="stage-dot" data-jump="#tS2" title="Stage 03"></div>
  <div class="stage-dot" data-jump="#tS3" title="Stage 04"></div>
</div>

<!-- ── DISTINCT ARCHETYPE BODY SHELL ── -->
${distinctBodyMarkup}

  <!-- ── MARQUEE RIBBON ── -->
  <div class="mq-bar" data-edit-section="marquee">
    <div class="mq-track">
      ${[...config.marqueeItems, ...config.marqueeItems]
        .map(
          (item, i) =>
            `<span data-edit-path="marqueeItems.${i % 5}" data-edit-label="Marquee Item #${(i % 5) + 1}">${item}</span>`
        )
        .join('')}
    </div>
  </div>

  <!-- ── EDITORIAL JOURNAL MONOGRAPHS ── -->
  <section class="sec" id="articles" data-edit-section="reviews">
    <div class="sec-head">
      <div>
        <small class="sec-kicker">EDITORIAL JOURNAL &amp; TASTING NOTES</small>
        <h2>${arch.articlesSectionTitle}</h2>
      </div>
      <p>${arch.articlesSectionSubtitle}</p>
    </div>
    <div class="articles-grid">
      ${arch.defaultArticles
        .map(
          (art) => `
      <article class="art-card">
        <div>
          <div class="art-meta">
            <span>${art.tag}</span>
            <span class="rt">${art.readTime}</span>
          </div>
          <h3>${art.title}</h3>
          <p>${art.summary}</p>
        </div>
        <a href="#contact" class="art-link inquire-trigger" data-item="${art.title}">Request Tasting Monograph →</a>
      </article>`
        )
        .join('')}
    </div>
  </section>

  <!-- ── CLIENT & PARTNER ENDORSEMENTS ── -->
  <section class="sec" id="reviews" data-edit-section="reviews">
    <div class="sec-head">
      <div>
        <small class="sec-kicker">VERIFIED SOMMELIER &amp; CHEF ENDORSEMENTS</small>
        <h2>Culinary &amp; Industry <em>Reviews</em></h2>
      </div>
    </div>
    <div class="grid-4">
      ${config.reviews
        .map(
          (rev, idx) => `
      <div class="card">
        <div>
          <div style="color:var(--pri);letter-spacing:3px;margin-bottom:8px;font-size:.78rem">✦ VERIFIED CRITIC</div>
          <p data-edit-path="reviews.${idx}.quote" data-edit-label="Review #${idx + 1} Quote">"${rev.quote}"</p>
        </div>
        <div>
          <strong style="display:block;color:#fff;font-size:.92rem" data-edit-path="reviews.${idx}.name" data-edit-label="Review #${idx + 1} Author">${rev.name}</strong>
          <small style="color:var(--mut);font-size:.76rem" data-edit-path="reviews.${idx}.role" data-edit-label="Review #${idx + 1} Role">${rev.role}</small>
        </div>
      </div>`
        )
        .join('')}
    </div>
  </section>

  <!-- ── DIRECT CONTACT & INQUIRY CONCIERGE (NO CHECKOUT FLOW) ── -->
  <section class="sec" id="contact" data-edit-section="footer">
    <div class="contact-wrap">
      <div class="contact-info">
        <small style="font-family:var(--font-mono);color:var(--pri);letter-spacing:.18em;font-weight:700;display:block;margin-bottom:6px;font-size:.64rem">DIRECT TASTING &amp; INQUIRY DESK</small>
        <h3 data-edit-path="footerHeadline" data-edit-label="Contact Headline">${config.footerHeadline || arch.contactTitle}</h3>
        <p data-edit-path="footerSubtext" data-edit-label="Contact Subtext">${config.footerSubtext || arch.contactSubtitle}</p>
        <div class="hub-box">
          <small>GLOBAL HUBS &amp; ATELIERS</small>
          <strong>${arch.contactHubs}</strong>
        </div>
        <div class="hub-box">
          <small>DIRECT CONCIERGE DISPATCH</small>
          <strong>concierge@${config.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</strong>
        </div>
      </div>

      <form class="contact-form" id="directInquiryForm" onsubmit="event.preventDefault(); window.top && window.top.postMessage({type:'INQUIRY_SUBMIT', data:'success'}, '*'); document.getElementById('inqSuccess').style.display='block'; return false;">
        <div class="row-2">
          <input type="text" name="full_name" required placeholder="Your Full Name / Title" />
          <input type="email" name="email" required placeholder="Email Address" />
        </div>
        <div class="row-2">
          <input type="text" name="organization" placeholder="Venue / Organization" />
          <input type="text" name="subject" id="inquirySubjectInput" placeholder="Subject / Flavor or Spice Spec" />
        </div>
        <textarea rows="3" name="message" required placeholder="${arch.contactFormPlaceholder}"></textarea>
        <button type="submit" class="btn" style="justify-content:center;width:100%" data-edit-path="footerCta" data-edit-label="Contact Submit Button">${config.footerCta || arch.contactSubmitText}</button>
        <p id="inqSuccess" style="display:none;color:var(--pri);font-size:.82rem;font-weight:700;margin-top:6px;text-align:center">✓ Direct inquiry received. Our concierge will reply within 4 hours.</p>
      </form>
    </div>
  </section>

  <!-- ── FOOTER WITH PERMANENTLY LOCKED POWERED BY EFERZ WATERMARK ── -->
  <footer>
    <div class="foot-top">
      <div>
        <strong style="font-family:var(--font-display);letter-spacing:.12em;font-size:1.2rem">${config.brandName}</strong>
        <p style="color:var(--mut);font-size:.8rem;margin-top:3px">${config.brandTag} · ${arch.stackLabel}</p>
      </div>
      <div style="display:flex;gap:20px;font-size:.78rem;color:var(--mut)">
        <a href="#tH" style="color:inherit;text-decoration:none">3D Stage</a>
        <a href="#products" style="color:inherit;text-decoration:none">Collection</a>
        <a href="#articles" style="color:inherit;text-decoration:none">Journal</a>
        <a href="#contact" style="color:inherit;text-decoration:none">Contact</a>
      </div>
    </div>

    <!-- LOCKED WATERMARK: POWERED BY EFERZ (EFERZ.COM) -->
    <div class="locked-watermark-bar" title="Locked EFerz Watermark">
      <div>
        © ${new Date().getFullYear()} <strong style="color:#fff">${config.brandName}</strong>. All Rights Reserved.
      </div>
      <a href="https://eferz.com" target="_blank" rel="noopener noreferrer" class="efforts-badge">
        <i class="lock-icon">🔒</i>
        <span>Powered by <strong>EFerz</strong> (<strong style="text-decoration:underline">EFerz.com</strong>)</span>
      </a>
    </div>
  </footer>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function initUniversalScope(){
  if (typeof THREE === 'undefined') {
    setTimeout(initUniversalScope, 40);
    return;
  }
  const CONFIG = ${serialized};
  const $ = id => document.getElementById(id);
  const clamp = (x, a=0, b=1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  /* ── 1. DIRECT CLICK-ANY-TEXT INLINE EDITING ENGINE ── */
  const banner = $('inline-edit-Banner');
  const bannerText = $('inline-edit-status');
  let activeEditingNode = null;

  function showToast(msg) {
    const t = $('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('on');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove('on'), 2200);
  }

  document.querySelectorAll('[data-edit-path]').forEach(el => {
    el.setAttribute('title', 'Click to edit text directly');
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const path = el.getAttribute('data-edit-path');
      const label = el.getAttribute('data-edit-label') || path;
      const section = el.closest('[data-edit-section]')?.getAttribute('data-edit-section') || 'brand';
      const curVal = el.innerText.trim();

      if (activeEditingNode && activeEditingNode !== el) {
        activeEditingNode.classList.remove('active-text-node');
        activeEditingNode.removeAttribute('contenteditable');
      }

      activeEditingNode = el;
      el.classList.add('active-text-node');
      el.setAttribute('contenteditable', 'true');
      el.focus();

      if (banner && bannerText) {
        bannerText.innerHTML = 'Editing <strong>' + label + '</strong> · Press Enter or click away to save';
        banner.classList.add('on');
      }

      window.parent && window.parent.postMessage({
        type: 'UNIVERSAL_ELEMENT_CLICK',
        section: section,
        label: label,
        path: path,
        currentValue: curVal
      }, '*');
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
    });

    el.addEventListener('blur', () => {
      const path = el.getAttribute('data-edit-path');
      const label = el.getAttribute('data-edit-label') || path;
      const newVal = el.innerText.trim();
      el.classList.remove('active-text-node');
      el.removeAttribute('contenteditable');
      if (banner) banner.classList.remove('on');

      showToast('Updated ' + label);

      window.parent && window.parent.postMessage({
        type: 'UNIVERSAL_TEXT_EDIT',
        path: path,
        value: newVal,
        label: label
      }, '*');
    });
  });

  /* Inquire buttons autofill contact form */
  document.querySelectorAll('.inquire-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = btn.getAttribute('data-item');
      const subInput = $('inquirySubjectInput');
      if (subInput && item) {
        subInput.value = 'Inquiry: ' + item;
      }
    });
  });

  /* Stage Nav Dots click handler */
  document.querySelectorAll('.stage-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-jump');
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── 2. THREE.JS 3D PROCEDURAL SCENE (MELTO ICE CREAM & DESI SPICES) ── */
  const canvas = $('gl');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.8);

  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(CONFIG.primaryHex, 2.8);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(CONFIG.secondaryHex, 2.2);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.2, 14);
  rimLight.position.set(0, 4, -3);
  scene.add(rimLight);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  const priMat = new THREE.MeshStandardMaterial({
    color: CONFIG.primaryHex,
    roughness: 0.32,
    metalness: 0.22,
  });
  const secMat = new THREE.MeshStandardMaterial({
    color: CONFIG.secondaryHex,
    roughness: 0.45,
    metalness: 0.15,
  });
  const darkStone = new THREE.MeshStandardMaterial({
    color: 0x1f191b,
    roughness: 0.88,
    metalness: 0.1,
  });
  const waffleMat = new THREE.MeshStandardMaterial({
    color: 0xd49b55,
    roughness: 0.75,
    metalness: 0.05,
  });
  const chocoMat = new THREE.MeshStandardMaterial({
    color: 0x2b140e,
    roughness: 0.25,
    metalness: 0.15,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    transmission: 0.75,
    thickness: 1.2,
  });
  const goldBrassMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.28,
    metalness: 0.85,
  });
  const glowMat = new THREE.MeshBasicMaterial({ color: CONFIG.primaryHex });

  /* Studio Podium */
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.16, 64), darkStone);
  podium.position.y = -2.45;
  const podiumRing = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.03, 16, 96), glowMat);
  podiumRing.rotation.x = Math.PI / 2;
  podiumRing.position.y = -2.36;
  scene.add(podium, podiumRing);

  /* Atmospheric Dust Particles */
  const pCount = 200;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12 - 2], i * 3);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: CONFIG.primaryHex, size: 0.08, transparent: true, opacity: 0.5 }));
  scene.add(pMesh);

  /* 4 Sub-Groups for Stage Assembly */
  const parts = {
    a: new THREE.Group(),
    b: new THREE.Group(),
    c: new THREE.Group(),
    d: new THREE.Group(),
  };
  rootGroup.add(parts.a, parts.b, parts.c, parts.d);

  const sceneType = CONFIG.sceneType;

  if (sceneType === 'melto-icecream') {
    /* ── MELTO 3D PROCEDURAL ICE CREAM CONE & GELATO DIPS ── */
    // Part A: Crisp Waffle Cone
    const coneGeo = new THREE.ConeGeometry(1.2, 3.4, 32);
    coneGeo.rotateX(Math.PI);
    const coneMesh = new THREE.Mesh(coneGeo, waffleMat);
    coneMesh.position.y = -1.2;
    parts.a.add(coneMesh);

    // Waffle Texture Grid Rings
    for (let r = 0; r < 5; r++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3 + r * 0.22, 0.025, 8, 32), darkStone);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -2.4 + r * 0.55;
      parts.a.add(ring);
    }

    // Part B: Big Swirled Gelato Scoop
    const scoopGeo = new THREE.SphereGeometry(1.35, 48, 36);
    const scoopMesh = new THREE.Mesh(scoopGeo, priMat);
    scoopMesh.position.y = 0.85;
    
    // Top swirl dollop
    const topDollop = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.9, 24), priMat);
    topDollop.position.y = 2.1;
    parts.b.add(scoopMesh, topDollop);

    // Part C: Dipped 72% Dark Chocolate Shell & Dripping Drops
    const dipCap = new THREE.Mesh(new THREE.SphereGeometry(1.39, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.45), chocoMat);
    dipCap.position.y = 0.85;
    
    // Dripping chocolate drops on sides
    const drip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.65, 16), chocoMat);
    drip1.position.set(1.15, 0.4, 0.4);
    const drip2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.85, 16), chocoMat);
    drip2.position.set(-1.18, 0.25, -0.3);
    parts.c.add(dipCap, drip1, drip2);

    // Sprinkled Pistachio & Honeycomb Shards
    for (let s = 0; s < 18; s++) {
      const ang = (s / 18) * Math.PI * 2;
      const rad = 0.85 + Math.random() * 0.45;
      const shard = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.14), s % 2 === 0 ? goldBrassMat : priMat);
      shard.position.set(Math.cos(ang) * rad, 1.4 + Math.random() * 0.6, Math.sin(ang) * rad);
      shard.rotation.set(Math.random(), Math.random(), Math.random());
      parts.c.add(shard);
    }

    // Part D: Cryo Frost Halo & Artisan Spoon
    const frostRing = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.04, 16, 72), glassMat);
    frostRing.rotation.x = Math.PI / 2;
    frostRing.position.y = 0.6;
    const spoon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 16), goldBrassMat);
    spoon.rotation.z = Math.PI / 4;
    spoon.position.set(1.6, 0.6, 0);
    parts.d.add(frostRing, spoon);

  } else {
    /* ── DESI SPICES 3D PROCEDURAL BLACK GRANITE MORTAR & WHOLE SPICES ── */
    // Part A: Heavy Granite Mortar Bowl & Angled Pestle
    const mortarOuter = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 1.6, 1.6, 36), darkStone);
    mortarOuter.position.y = -0.7;
    const mortarRim = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.18, 16, 48), darkStone);
    mortarRim.rotation.x = Math.PI / 2;
    mortarRim.position.y = 0.1;
    const pestle = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 2.6, 24), darkStone);
    pestle.rotation.z = 0.42;
    pestle.rotation.x = 0.25;
    pestle.position.set(0.65, 0.45, 0.1);
    parts.a.add(mortarOuter, mortarRim, pestle);

    // Part B: Whole Heirloom Spices (Star Anise, Cinnamon, Cardamom)
    // Star Anise (8-pointed star arms)
    const starCenter = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), secMat);
    for (let a = 0; a < 8; a++) {
      const armAng = (a / 8) * Math.PI * 2;
      const arm = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.65, 12), secMat);
      arm.rotation.z = armAng - Math.PI / 2;
      arm.position.set(Math.cos(armAng) * 0.35, Math.sin(armAng) * 0.35, 0);
      starCenter.add(arm);
    }
    starCenter.position.set(-1.6, 1.1, 0.6);
    starCenter.rotation.x = 0.4;
    parts.b.add(starCenter);

    // Ceylon Cinnamon Sticks (rolled hollow cylinders)
    const cin1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.2, 16, 1, true), secMat);
    cin1.rotation.set(0.6, 0.8, -0.4);
    cin1.position.set(1.4, 0.9, -0.5);
    parts.b.add(cin1);

    // Green Cardamom Pods (elongated ribbed ellipsoids)
    for (let c = 0; c < 5; c++) {
      const ang = (c / 5) * Math.PI * 2;
      const card = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), priMat);
      card.scale.set(1, 1.9, 1);
      card.position.set(Math.cos(ang) * 1.3, -0.15 + (c % 2) * 0.25, Math.sin(ang) * 1.3);
      card.rotation.set(Math.random(), Math.random(), Math.random());
      parts.b.add(card);
    }

    // Part C: Golden Turmeric & Kashmiri Mirch Ground Dust Swirl
    const powderBed = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.1, 0.3, 32), priMat);
    powderBed.position.y = -0.05;
    const mirchAccent = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.5, 0.32, 24), secMat);
    mirchAccent.position.set(0.3, -0.04, 0.2);
    parts.c.add(powderBed, mirchAccent);

    // Part D: Airtight Glass Spice Apothecary Jar with Brass Lid
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.8, 32), glassMat);
    jar.position.set(-2.2, -0.6, -0.8);
    const jarLid = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.25, 32), goldBrassMat);
    jarLid.position.set(-2.2, 0.35, -0.8);
    const jarSpice = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 1.3, 32), priMat);
    jarSpice.position.set(-2.2, -0.7, -0.8);
    parts.d.add(jar, jarLid, jarSpice);
  }

  /* ── 3. INTERACTIVE 360° DRAG ORBIT CONTROLS ── */
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotX = 0.2;
  let targetRotY = -0.3;
  let curRotX = 0.2;
  let curRotY = -0.3;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    targetRotY += dx * 0.008;
    targetRotX += dy * 0.008;
    targetRotX = clamp(targetRotX, -1.0, 1.0);
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  /* Touch Drag Orbit */
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    targetRotY += dx * 0.01;
    targetRotX += dy * 0.01;
    targetRotX = clamp(targetRotX, -1.0, 1.0);
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  /* ── 4. SCROLL-DRIVEN 3D CHOREOGRAPHY LOOP ── */
  const sprog = $('sprog');
  const stageDots = document.querySelectorAll('.stage-dot');

  function render(time) {
    requestAnimationFrame(render);
    const t = time * 0.001;

    // Smooth drag interpolation
    curRotX = lerp(curRotX, targetRotX, 0.08);
    curRotY = lerp(curRotY, targetRotY, 0.08);

    // Scroll progress calculation
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollP = clamp(maxScroll > 0 ? scrollY / maxScroll : 0, 0, 1);

    if (sprog) sprog.style.transform = 'scaleX(' + scrollP + ')';

    // Auto rotate slow drift when not dragging
    const idleSpin = isDragging ? 0 : Math.sin(t * 0.5) * 0.08;

    rootGroup.rotation.x = curRotX;
    rootGroup.rotation.y = curRotY + idleSpin;

    // Stage progression dynamics
    const s1 = clamp(scrollY / (window.innerHeight * 1.55), 0, 1);
    const s2 = clamp((scrollY - window.innerHeight * 1.55) / (window.innerHeight * 1.55), 0, 1);
    const s3 = clamp((scrollY - window.innerHeight * 3.1) / (window.innerHeight * 1.55), 0, 1);
    const s4 = clamp((scrollY - window.innerHeight * 4.65) / (window.innerHeight * 1.55), 0, 1);

    // Update active stage dot
    const stageIdx = scrollY < window.innerHeight * 0.9 ? 0 :
                     s2 < 0.2 ? 1 :
                     s3 < 0.2 ? 2 :
                     s4 < 0.2 ? 3 : 4;
    stageDots.forEach((d, i) => {
      d.classList.toggle('on', i === stageIdx);
    });

    if (sceneType === 'melto-icecream') {
      parts.a.position.y = lerp(-0.2, 0.1, s1);
      parts.b.position.y = lerp(0.85, 0.95 + Math.sin(t * 2) * 0.05, s2);
      parts.c.position.y = lerp(0.85, 0.95, s3);
      parts.d.rotation.y = t * 0.5;
    } else {
      parts.a.rotation.y = Math.sin(t * 0.8) * 0.1;
      parts.b.position.y = Math.sin(t * 1.5) * 0.12;
      parts.c.rotation.y = t * 0.4;
      parts.d.position.y = -0.6 + Math.sin(t * 1.2) * 0.08;
    }

    pMesh.rotation.y = t * 0.03;
    renderer.render(scene, camera);
  }

  requestAnimationFrame(render);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
})();
</script>
</body>
</html>`;
}

export const Universal3DLiveFrame: React.FC<Universal3DLiveFrameProps> = ({
  config,
  inspectorEnabled = true,
  onSelectElement,
  onInlineTextChange,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const htmlContent = useMemo(() => {
    return buildUniversal3DHtml(config);
  }, [config]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'UNIVERSAL_ELEMENT_CLICK') {
        onSelectElement?.(
          e.data.section,
          e.data.label,
          e.data.path,
          e.data.currentValue
        );
      } else if (e.data.type === 'UNIVERSAL_TEXT_EDIT') {
        onInlineTextChange?.(e.data.path, e.data.value);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSelectElement, onInlineTextChange]);

  return (
    <iframe
      ref={iframeRef}
      title={`${config.brandName} Live 3D Experience`}
      srcDoc={htmlContent}
      className="w-full h-full border-0 bg-transparent block"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

export default Universal3DLiveFrame;
