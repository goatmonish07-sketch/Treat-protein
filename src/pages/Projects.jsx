import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials, RowActions, useCrud } from '../components/ui.jsx';
import EntityModal from '../components/EntityModal.jsx';
import { useCollection } from '../lib/store.jsx';
import { currency } from '../lib/data.js';

export default function Projects() {
  const { items, remove } = useCollection('projects');
  const crud = useCrud();

  const onTrack = items.filter((p) => p.status === 'On track').length;
  const budget = items.reduce((s, p) => s + p.budget, 0);
  const avg = items.length ? Math.round(items.reduce((s, p) => s + p.progress, 0) / items.length) : 0;

  return (
    <>
      <PageHeader crumb="Operations / Project" title="Projects" subtitle="Plan, track and deliver on time and on budget">
        <button className="btn btn--primary btn--sm" onClick={crud.openCreate}><Plus size={15} /> <span>New project</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Active Projects" value={items.length} delta={1} up icon="trend" tone="brand" fmt="num" />
        <StatCard label="On Track" value={onTrack} delta={2} up icon="cart" tone="accent" fmt="num" />
        <StatCard label="Total Budget" value={budget} delta={4.5} up icon="wallet" tone="info" />
      </div>

      <div className="card section-gap">
        <div className="card__head"><h3>Project Portfolio</h3><small>Avg. completion {avg}%</small></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Project</th><th>Owner</th><th>Progress</th><th className="num">Budget</th><th>Due</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="cell-strong">{p.name}</td>
                  <td><span className="avatar-sm">{initials(p.owner)}</span>{p.owner}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                      <div className="progress"><span style={{ width: p.progress + '%' }} /></div>
                      <span className="cell-sub" style={{ minWidth: 34 }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td className="num">{currency(p.budget)}</td>
                  <td className="cell-sub">{p.due}</td>
                  <td><Badge>{p.status}</Badge></td>
                  <td><RowActions name={p.name} onEdit={() => crud.openEdit(p)} onDelete={() => remove(p.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {crud.modal && <EntityModal collection="projects" editing={crud.modal.editing} onClose={crud.close} />}
    </>
  );
}
