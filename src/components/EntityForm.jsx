import { useState } from 'react';

// Schema-driven form. `fields` from schemas.js. Validates required + numbers,
// focuses the first invalid field on submit, and returns coerced values.
export default function EntityForm({ fields, initial = {}, submitLabel = 'Save', onSubmit, onCancel }) {
  const [values, setValues] = useState(() => {
    const v = {};
    fields.forEach((f) => { v[f.name] = initial[f.name] ?? ''; });
    return v;
  });
  const [errors, setErrors] = useState({});

  const set = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    for (const f of fields) {
      const raw = values[f.name];
      const empty = raw === '' || raw == null;
      if (f.required && empty) { errs[f.name] = 'This field is required'; continue; }
      if (f.type === 'number' && !empty) {
        const n = Number(raw);
        if (Number.isNaN(n)) errs[f.name] = 'Enter a valid number';
        else if (f.min != null && n < f.min) errs[f.name] = `Must be at least ${f.min}`;
        else if (f.max != null && n > f.max) errs[f.name] = `Must be at most ${f.max}`;
      }
      if (f.type === 'email' && !empty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
        errs[f.name] = 'Enter a valid email';
      }
    }
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const bad = Object.keys(errs)[0];
    if (bad) {
      const el = e.currentTarget.querySelector(`[name="${bad}"]`);
      el?.focus();
      return;
    }
    onSubmit(values);
  };

  return (
    <form className="entity-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        {fields.map((f) => (
          <div key={f.name} className={'field' + (f.full ? ' field--full' : '')}>
            <label htmlFor={'f_' + f.name}>
              {f.label}{f.required && <span className="req" aria-hidden="true"> *</span>}
            </label>
            {f.type === 'select' ? (
              <select id={'f_' + f.name} name={f.name} className="input"
                value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!errors[f.name]}>
                <option value="" disabled>Select…</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input id={'f_' + f.name} name={f.name} className="input"
                type={f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'date' ? 'date' : 'text'}
                inputMode={f.type === 'number' ? 'decimal' : undefined}
                step={f.step} min={f.min} placeholder={f.placeholder}
                value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!errors[f.name]}
                aria-describedby={errors[f.name] ? 'e_' + f.name : undefined} />
            )}
            {errors[f.name] && <span className="field-err" id={'e_' + f.name} role="alert">{errors[f.name]}</span>}
          </div>
        ))}
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn--primary">{submitLabel}</button>
      </div>
    </form>
  );
}
