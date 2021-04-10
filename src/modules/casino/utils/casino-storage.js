// @flow

const _save = (obj: any, key: string) => {
  const str = JSON.stringify(obj);
  localStorage.setItem(`PAKTOLUS/${key}`, str);
};

export const getName = (): number => {
  let s;
  const raw = localStorage.getItem("PAKTOLUS/NAME");
  if (!!raw) {
    try {
      s = JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing name');
    }
  }
  return (s: any);
}

export const setName = (balance: number) => _save(balance, "NAME");

export const getBalance = (): number => {
  let s;
  const raw = localStorage.getItem("PAKTOLUS/BALANCE");
  if (!!raw) {
    try {
      s = JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing balance');
    }
  }
  return (s: any);
}

export const setBalance = (balance: number) => _save(balance, "BALANCE");