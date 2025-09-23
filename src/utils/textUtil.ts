export function capitalize(str: string): string {
  if (!str || str === '') {
    return '';
  }
  const arr: string[] = str.split(' ');
  let res = '';
  arr.forEach((element) => {
    res += element.charAt(0).toUpperCase() + element.substr(1, element.length).toLowerCase() + ' ';
  });
  return res;
}

export const concatString = (text1: string, text2: string): string => text1.concat(' ', text2);

export const stringUpper = (text: string | null): string | null => {
  if (text) return text.toUpperCase();
  else return null;
};

export const toInt = (text: string): number => parseInt(text);

export const repSpace = (text: string): string => {
  if (!text || text === '') {
    return '';
  }
  const new_text = text.replace(' ', '_');
  return new_text;
};
