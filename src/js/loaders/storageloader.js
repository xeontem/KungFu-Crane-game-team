import currentGameState from '../currentGameState';

export default (score,name) => {

    const compareScore = (playerA, playerB) => playerB.value - playerA.value;

    if (!window.localStorage.getItem('score')) {
        window.localStorage.setItem('score',JSON.stringify([{name: 'player', value: 100, color:'#fff'}]));
    }

    let scores = JSON.parse(window.localStorage.getItem('score'));
    scores.forEach((el) => el.color = '#fff');

    if (score && name) {
        scores.unshift({name: name, value: score, color: '#ff0'});
        scores.sort(compareScore);
        if (scores.length === 6){
            scores.pop();
        }
        window.localStorage.setItem('score',JSON.stringify(scores));
    }

    return scores;
}
