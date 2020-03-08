export default (score, name) => {
  if (!window.localStorage.getItem('score')) {
    window.localStorage.setItem('score', JSON.stringify([{ name: 'player', value: 100, color: '#fff' }]));
  }

  const scores = JSON.parse(window.localStorage.getItem('score'));
  scores.forEach((el) => {
    el.color = '#fff';
  });

  if (score && name) {
    scores.unshift({ name, value: score, color: '#ff0' });
    scores.sort((a, b) => b.value - a.value);
    if (scores.length === 6) {
      scores.pop();
    }
    window.localStorage.setItem('score', JSON.stringify(scores));
  }

  return scores;
};
