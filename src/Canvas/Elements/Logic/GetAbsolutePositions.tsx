export default function getAbsolutePosition(obj: any): { left: number; top: number } {
  if (obj.group) {
    const parentPosition = getAbsolutePosition(obj.group);
    const absoluteLeft = (obj.left as number) + parentPosition.left;
    const absoluteTop = (obj.top as number) + parentPosition.top;
    return { left: absoluteLeft, top: absoluteTop };
  } else {
    return { left: obj.left as number, top: obj.top as number };
  }
}
