export const dayOptions = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]

export const monthOptions = [
  { value: '01', label: 'Tháng 1' },
  { value: '02', label: 'Tháng 2' },
  { value: '03', label: 'Tháng 3' },
  { value: '04', label: 'Tháng 4' },
  { value: '05', label: 'Tháng 5' },
  { value: '06', label: 'Tháng 6' },
  { value: '07', label: 'Tháng 7' },
  { value: '08', label: 'Tháng 8' },
  { value: '09', label: 'Tháng 9' },
  { value: '10', label: 'Tháng 10' },
  { value: '11', label: 'Tháng 11' },
  { value: '12', label: 'Tháng 12' },
]

export const yearOptions = () => {
  const year = new Date().getFullYear();
  const totalyear = (year - 1970) + 1;

  return Array.from(new Array(totalyear), (_undefined, index) => {
    const value = year - index;
    return {
      value: value,
      label: value
    }
  });
}