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

export const navBarBlursMessenger = [
  'extension-messenger',
  'message-popup',
  'popup-content',
  'popup-top',
  'popup-extension',
  'message-list',
  'message-item',
  'message-item-icon',
  'message-item-content',
  'text-name',
  'text-message',
  'message-last',
  'hours'
]

export const navBarBlursNofitication = [
  'extension-nofitication',
  'notify-popup',
  'popup-top',
  'popup-extension',
  'extension-all',
  'extension-not-read',
  'popup-content',
  'new-notify',
  'notify-header',
  'header-text',
  'header-dot',
  'notify-list',
  'notify-item',
  'notify-item-icon',
  'notify-item-content',
  'text',
  'text-bold',
  'hours'
]

export const navBarBlursAccount = [
  'extension-account',
  'popup-header',
  'account-popup',
  'account-block',
  'block-icon',
  'block-info',
  'info-name',
  'info-text',
  'block-line',
  'nav-setting',
  'setting-item',
  'setting-item-icon',
  'setting-item-text'
]

export const navBarBlursSearch = [
  'nav-search-container',
  'nav-search',
  'search-input',
  'nav-search-list',
  'search-header',
  'header-text',
  'search-item',
  'search-item-icon',
  'search-item-text'
]

export const sharedMapping = {
  public: 'Công khai',
  friend: 'Bạn bè',
  'only-self': 'Chỉ mình tôi'
}

export const radiosShared = [
  { id: 'public', value: 'public',  title: 'Công khai', text: 'Mọi người trên ứng dụng' },
  { id: 'friend', value: 'friend', title: 'Bạn bè', text: 'Bạn bè trên ứng dụng' },
  { id: 'only-self', value: 'only-self', title: 'Chỉ mình tôi', text: '' }
]