import Modal from './Modal.jsx';
import EntityForm from './EntityForm.jsx';
import { schemas } from '../lib/schemas.js';
import { useCollection, genId } from '../lib/store.jsx';

// Binds a schema to the store: renders an add/edit modal for `collection`.
export default function EntityModal({ collection, editing, onClose }) {
  const s = schemas[collection];
  const { items, keyField, add, update } = useCollection(collection);
  const isEdit = !!editing;

  const onSubmit = (raw) => {
    const v = s.finalize ? s.finalize(raw) : raw;
    if (isEdit) {
      update(editing[keyField], v);
    } else {
      const id = genId(s.prefix, items, keyField);
      add({ [keyField]: id, ...v });
    }
    onClose();
  };

  return (
    <Modal title={(isEdit ? 'Edit ' : 'Add ') + s.title} onClose={onClose}>
      <EntityForm
        fields={s.fields}
        initial={editing || {}}
        submitLabel={isEdit ? 'Save changes' : 'Add ' + s.title}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
