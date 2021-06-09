export const splitPrice = (elem: string | number): string => {
  if (elem === 0 || elem === '0' || elem === '') {
    return '0';
  }

  const str = typeof elem === 'string' ? elem.split('.')[0].split('') : Math.round(elem).toString().split('');

  return str
    .reduce((sum, item, index) => {
      if ((str.length - index) % 3 === 0) {
        return `${sum} ${item}`;
      }
      return sum + item;
    }, '')
    .trim();
};

export const formatNumber = (elem: number, requaredLength: number): string => {
  let result = elem.toString();
  while (result.length < requaredLength) {
    result = `0${result}`;
  }
  return result;
};

export const formatText = ({ template, link }: { template: string; link: string }) => {
  const text = template.replace(/\<link\>([a-zA-Zа-яА-Я ]+)\<\/link\>/gi, `<a href="#${link}">$1</a>`);

  return {
    __html: text,
  };
};
