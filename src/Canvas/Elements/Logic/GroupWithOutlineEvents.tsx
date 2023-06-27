interface GroupWithOutlineEventsParams {
  canvas: fabric.Canvas;
  parent: fabric.Object;
  outline: fabric.Object;
}

const GroupWithOutlineEvents = ({ canvas, parent, outline }: GroupWithOutlineEventsParams) => {
  const group = parent;

  canvas.on('mouse:over', (event) => {
    if (canvas.getActiveObject()) return;
    const target = event.target;
    if (target === group) {
      outline.animate('opacity', 1, {
        duration: 150,
        onChange: canvas.renderAll.bind(canvas),
      });
    }
  });

  canvas.on('mouse:out', (event) => {
    const target = event.target;
    if (target === group && group !== canvas.getActiveObject()) {
      outline.animate('opacity', 0, {
        duration: 150,
        onChange: canvas.renderAll.bind(canvas),
      });
    }
  });

  return group;
};

export default GroupWithOutlineEvents;
