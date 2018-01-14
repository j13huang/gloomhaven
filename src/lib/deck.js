import * as gameData from "./gameData";

// https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
export function shuffleCards(cards) {
    return cards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}

export function newDeck(cards) {
    return {
        cards: shuffleCards(cards),
        currentIndex: -1,
        playedCards: [],
    };
}

export function clearPlayedCards(playedCards) {
    const firstReshuffleIndex = playedCards.findIndex((c, i) => (i > 0) && (c.endAction === gameData.END_ACTIONS.RESHUFFLE));
    // don't clear from the most recent card if the card is a reshuffle
    return firstReshuffleIndex === -1 ? playedCards : playedCards.filter((c, i) => i < firstReshuffleIndex);
}