interface GroupWithOutlineEventsParams {
  canvas: fabric.Canvas;
  parent: fabric.Object;
  outline: fabric.Object;
}

const GroupWithOutlineEvents = ({ canvas, parent, outline }: GroupWithOutlineEventsParams) => {
  const group = parent;
  group.on('mouseover', () => {
    outline.animate('opacity', 1, {
      duration: 150,
      onChange: canvas.renderAll.bind(canvas),
    });
  });

  group.on('mouseout', () => {
    if (group === canvas.getActiveObject()) return;
    outline.animate('opacity', 0, {
      duration: 150,
      onChange: canvas.renderAll.bind(canvas),
    });
  });
  return group;
};
export default GroupWithOutlineEvents;
