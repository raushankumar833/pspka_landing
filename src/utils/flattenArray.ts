// ----------------------------------------------------------------------

export default function flattenArray<T>(list: T[], key = 'children'): T[] {
  let children: T[] = [];

  const flatten = list?.map((item: any) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}

export const checklength = (array: any) => {
  if (array && Array.isArray(array)) {
    if (array.length > 0) return true;
    else if (array.length === 0) return false;
    return false;
  }
  return false;
};
