import { Link } from 'react-router-dom';
import {
  Sparkles, Wallet, IdCard, Box, ShoppingCart, Truck, Factory, KanbanSquare,
  LineChart, Zap, SlidersHorizontal, ShieldCheck, TrendingUp, Headset,
  ArrowRight, Check,
} from 'lucide-react';
import { company, modules, whyPoints } from '../lib/data.js';

const modIcons = { wallet: Wallet, badge: IdCard, box: Box, cart: ShoppingCart, truck: Truck, factory: Factory, kanban: KanbanSquare, chart: LineChart };
const whyIcons = { zap: Zap, sliders: SlidersHorizontal, shield: ShieldCheck, trend: TrendingUp, headset: Headset };

export default function Landing({ authed }) {
  const go = authed ? '/app' : '/login';
  return (
    <div className="lp">
      <header className="lp__nav">
        <div className="lp__wrap lp__nav-inner">
          <div className="lp__brand"><span className="lp__logo"><Sparkles size={18} /></span> {company.name} <b>ERP</b></div>
          <nav className="lp__links">
            <a href="#modules">Modules</a>
            <a href="#why">Why us</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <Link to={go} className="btn btn--primary btn--sm">Launch Demo</Link>
        </div>
      </header>

      <section className="lp__hero">
        <div className="lp__wrap lp__hero-grid">
          <div className="lp__hero-copy">
            <span className="lp__eyebrow">All-in-one business platform</span>
            <h1>One ERP.<br />Every department.<br /><span className="lp__grad">Total control.</span></h1>
            <p>{company.name} ERP unifies finance, inventory, sales, people and operations into a single intelligent platform — so you work smarter, move faster and grow bigger.</p>
            <div className="lp__cta">
              <Link to={go} className="btn btn--primary">Launch live demo <ArrowRight size={16} /></Link>
              <a href="#modules" className="btn btn--ghost">Explore features</a>
            </div>
            <div className="lp__ticks">
              <span><Check size={15} /> No setup fees</span>
              <span><Check size={15} /> 14-day free trial</span>
              <span><Check size={15} /> Cancel anytime</span>
            </div>
          </div>

          {/* Stylized dashboard preview */}
          <div className="lp__preview" aria-hidden="true">
            <div className="lp__preview-top"><span /><span /><span /></div>
            <div className="lp__preview-body">
              <div className="lp__mini-kpis">
                {['₹24.5L', '₹8.4L', '₹16.1L', '1,243'].map((v, i) => (
                  <div key={i} className="lp__mini-kpi"><small>KPI</small><b>{v}</b></div>
                ))}
              </div>
              <div className="lp__mini-chart">
                {[42, 58, 51, 67, 62, 78, 71, 88].map((h, i) => (
                  <span key={i} style={{ height: h + '%' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp__trust">
        <div className="lp__wrap">
          <p className="lp__trust-label">Trusted by growing businesses across India</p>
          <div className="lp__trust-logos">
            {['NORTHWIND', 'Zenith', 'FitZone', 'PRANA', 'Verve Co', 'Skyline'].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="lp__stats">
        <div className="lp__wrap lp__stats-grid">
          {[['10+', 'Modules'], ['99.9%', 'Uptime'], ['5,000+', 'Businesses'], ['24/7', 'Support']].map(([v, l]) => (
            <div key={l} className="lp__stat"><b>{v}</b><span>{l}</span></div>
          ))}
        </div>
      </section>

      <section className="lp__section" id="modules">
        <div className="lp__wrap">
          <div className="lp__head">
            <span className="lp__eyebrow">Powering every department</span>
            <h2>Everything your business runs on</h2>
            <p>Modular by design — switch on what you need, add the rest as you grow.</p>
          </div>
          <div className="lp__modules">
            {modules.map((m) => {
              const Icon = modIcons[m.icon] || Box;
              return (
                <div key={m.name} className="lp__mod">
                  <span className="lp__mod-ic"><Icon size={22} /></span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lp__why" id="why">
        <div className="lp__wrap">
          <div className="lp__head lp__head--light">
            <span className="lp__eyebrow">Why teams choose us</span>
            <h2>Built for every business</h2>
          </div>
          <div className="lp__why-grid">
            {whyPoints.map((w) => {
              const Icon = whyIcons[w.icon] || Zap;
              return (
                <div key={w.title} className="lp__why-item">
                  <span className="lp__why-ic"><Icon size={22} /></span>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lp__cta-band" id="pricing">
        <div className="lp__wrap lp__cta-inner">
          <div>
            <h2>Ready to run your business the smart way?</h2>
            <p>Explore the full working demo — no sign-up required.</p>
          </div>
          <Link to={go} className="btn btn--light">Launch the demo <ArrowRight size={16} /></Link>
        </div>
      </section>

      <footer className="lp__footer">
        <div className="lp__wrap lp__footer-inner">
          <div className="lp__brand"><span className="lp__logo"><Sparkles size={18} /></span> {company.name} <b>ERP</b></div>
          <span className="muted">© {new Date().getFullYear()} {company.name}. A demo product.</span>
        </div>
      </footer>
    </div>
  );
}
