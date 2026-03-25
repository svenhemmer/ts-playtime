import type { Entity, EntityState, SelectionState } from '@models/index';

export const hitTest = (
    x: number,
    y: number,
    entity: Entity
) => {
    const w = entity.width || 50;
    const h = entity.height || 50;
    return (
        x >= entity.x &&
        x <= entity.x + w &&
        y >= entity.y &&
        y <= entity.y + h
    );
}

export const selectEntityAt = (
  state: EntityState,
  selection: SelectionState,
  x: number,
  y: number
) => {
  // reverse for top-most selection
  const entities = [...state.entities].reverse();

  for (const e of entities) {
    if (hitTest(x, y, e)) {
      selection.selectedId = e.id;
      return;
    }
  }

  selection.selectedId = undefined;
};