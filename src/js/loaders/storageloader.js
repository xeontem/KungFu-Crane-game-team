import currentGameState from '../currentGameState';

export default (score,name) => {

    const compareScore = (playerA, playerB) => playerB.value - playerA.value;

    if (!window.localStorage.getItem('score')) {
        window.localStorage.setItem('score',JSON.stringify([{name: 'player', value: 100 }]));
    }

    let scores = JSON.parse(window.localStorage.getItem('score'));

    if (score && name) {
        scores.unshift({name: name, value: score});
        scores.sort(compareScore);
        if (scores.length === 6){
            scores.pop();
        }
        window.localStorage.setItem('score',JSON.stringify(scores));
    }

    return scores;
}
