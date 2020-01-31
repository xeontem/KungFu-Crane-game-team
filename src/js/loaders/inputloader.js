import config from '../config';

export default () => {
  const body = document.getElementById('game');
  const div = document.createElement('div');
  const title = document.createElement('p');
  const input = document.createElement('input');

  title.innerHTML = 'ENTER YOUR NAME';
  input.setAttribute('autofocus', 'true');
  div.style.cssText = `width: ${config.gameWidth-10}px; height: ${config.gameHeight-10}px;`;
  div.appendChild(title);
  div.appendChild(input);
  body.appendChild(div);
  return { div, input };
};
