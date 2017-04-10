import currentGameState from '../currentGameState';

export default () => {
  const body = document.getElementById('game');
  const div = document.createElement('div');
  const title = document.createElement('p');
  const input = document.createElement('input');


  title.innerHTML = 'ENTER YOU NAME';
  title.style.cssText = 'text-align:center;padding: 50px 0; font-size: 30px;color: #fff; font-family  : "Bangers"';
  input.style.cssText = 'width: 300px;display:block; margin:0 auto; font-size: 24px;font-family: "Bangers"; border: none; border-bottom: 1px solid #fff;color: #fff;outline: none;text-align:center;background:transparent';
  input.setAttribute('autofocus', 'true');

  const cb = (e) => {
    if (e.keyCode === 13) {
      currentGameState.name = input.value;
      input.value = '';
      body.removeChild(div);
    }
  };

  input.addEventListener('keydown', cb, false);
  div.style.cssText = 'position:absolute;top: 8px; width: 1024px; height: 512px;background-color: #000';
  div.appendChild(title);
  div.appendChild(input);

  body.appendChild(div);
};
