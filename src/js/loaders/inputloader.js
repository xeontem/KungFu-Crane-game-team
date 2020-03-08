import { gameState } from '../currentGameState';

export default (createName, playerName) => {
  const body = document.getElementById('game');
  const div = document.createElement('div');
  const title = document.createElement('p');
  const input = document.createElement('input');

  title.innerHTML = 'ENTER YOUR NAME';
  input.setAttribute('autofocus', 'true');
  input.value = playerName;
  div.style.cssText = `width: ${gameState.gameWidth - 10}px; height: ${gameState.gameHeight - 10}px;`;
  div.appendChild(title);
  div.appendChild(input);
  body.appendChild(div);
  return { div, input };
};
