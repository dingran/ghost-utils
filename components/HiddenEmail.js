export default function HiddenEmail() {
  const clickHander = (e) => {
    window.location.href =
      'mailto:' +
      e.target.dataset.name +
      '@' +
      e.target.dataset.domain +
      '.' +
      e.target.dataset.tld;
    return false;
  };
  return (
    <a
      href='#'
      className='cryptedmail'
      data-name='hello'
      data-domain='dingran'
      data-tld='me'
      onClick={clickHander}
    ></a>
  );
}
