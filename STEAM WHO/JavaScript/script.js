/**
 * ============================================
 * DOCUMENTAZIONE - script.js
 * Gioco Akinator - Steam Who
 * Autori: Poli Alessio, Redi Giacomo, Renesto Francesco
 * 
 * Descrizione: Questo script implementa la logica del gioco "Steam Who",
 * una versione semplificata di Akinator. Il genio pone domande sì/no
 * per restringere progressivamente l'insieme dei personaggi fino a
 * indovinare quello pensato dall'utente.
 * 
 * Struttura:
 * - Caricamento dei personaggi e delle domande dai file JSON esterni
 * - Gestione del flusso delle domande (nextQuestion, processAnswer)
 * - Filtraggio dei personaggi tramite espressioni logiche (evaluateExpression)
 * - Conferma finale e messaggi di vittoria/sconfitta
 * - Listener dinamici per i pulsanti (Sì, No, Reset)
 * ============================================
 */

// Debug utility (non utilizzata in produzione, stampa domande)
function _debug_printQuestions(data) {
    data.categories.sort((a, b) => a.priority - b.priority);

    for (const category of data.categories) {
        console.log(`Categoria: ${category.name}`);
        for (const question of category.questions) {
            console.log(`  Domanda: ${question.question}`);
            console.log(`  Risposta: ${question.answer.expression}`);
        }
    }
}

// Messaggi finali randomici mostrati all'utente
const finalAnswers = {
    right: [
        "Evviva! Ho indovinato il personaggio che stavi pensando.",
        "Yay! Ho indovinato il personaggio!"
    ],
    wrong: [
        "Mi dispiace, sembra che ci sia stato un errore nell'indovinare il personaggio.",
        "Ops! Non ho indovinato il personaggio, riprova!",
        "Peccato! Ho sbagliato, riprova!"
    ]
}

// Riferimenti agli elementi DOM
var questionText = null;      // elemento della nuvola (testo domanda)
var genieImage = null;        // immagine del genio
var yesButton = null;         // pulsante Sì
var noButton = null;          // pulsante No
var resetButton = null;       // pulsante Reset (ricomincia)

// Stato del gioco
var remainingCharacters = null;   // array dei personaggi ancora possibili
var categoryIndex = 0;            // indice della categoria corrente (domande)
var remainingQuestions = null;    // domande ancora da fare per questa categoria
var selectedQuestion = null;      // domanda attualmente mostrata

// Callback correnti dei pulsanti (per rimuoverli/aggiungerli dinamicamente)
var handleYesAnswer = function() {};
var handleNoAnswer = function() {};
var handleResetAnswer = function() {};

/**
 * Funzione principale: passa alla prossima domanda o termina il gioco.
 * - Se non ci sono più personaggi -> sconfitta
 * - Se rimane un solo personaggio -> chiede conferma
 * - Altrimenti sceglie una domanda a caso dalla categoria corrente
 *   e la visualizza nella nuvola.
 * NOTA: dopo ogni domanda, la categoria viene incrementata per
 *       ruotare tra le categorie (Lavoro, Sesso, Data, Luogo, etc.)
 */
function nextQuestion() {
    // Caso 1: nessun personaggio rimasto (filtro troppo restrittivo)
    if (remainingCharacters.length === 0) {
        resultOfTheGuess(false);
        return;
    }

    // Caso 2: un solo personaggio -> chiedi conferma
    if (remainingCharacters.length === 1) {
        askConfirmation(remainingCharacters[0]);
        return;
    }

    // Caso normale: seleziona una domanda a caso dalla lista rimasta
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    selectedQuestion = remainingQuestions[randomIndex];

    // Mostra la domanda nell'HTML (dentro la nuvola)
    questionText.innerHTML = selectedQuestion.question;

    // Passa alla categoria successiva (ruota tra le categorie predefinite)
    remainingQuestions = questions.categories[++categoryIndex].questions;
}

/**
 * Processa la risposta dell'utente (Sì/No).
 * @param {string} expression - Espressione logica associata alla domanda (es. "professions == physicist")
 * @param {boolean} answer - true = Sì, false = No
 */
function processAnswer(expression, answer) {
    // Filtra i personaggi in base alla risposta
    remainingCharacters = filterCharacters(expression, answer);

    // Filtra le domande rimanenti per rimuovere quelle non più utili
    remainingQuestions = filterQuestions(remainingQuestions, remainingCharacters);

    console.log('CHARACTERS: ', remainingCharacters);
    console.log('QUESTIONS: ', remainingQuestions);
    nextQuestion();
}

/**
 * Filtra l'array dei personaggi valutando l'espressione su ciascuno.
 * @param {string} expression - Espressione da valutare
 * @param {boolean} answerValue - Risposta data dall'utente
 * @returns {Array} Personaggi che soddisfano la condizione
 */
function filterCharacters(expression, answerValue) {
    return remainingCharacters.filter(character => {
        return evaluateExpression(expression, character, answerValue);
    });
}

/**
 * Filtra le domande rimanenti: mantiene solo quelle che sono ancora
 * utili per discriminare tra i personaggi rimasti.
 * Se una categoria finisce, passa automaticamente alla successiva.
 * @param {Array} quest - Lista di domande da filtrare
 * @param {Array} characters - Personaggi ancora possibili
 * @returns {Array} Domande ancora applicabili
 */
function filterQuestions(quest, characters) {
    // Per ogni domanda, verifica se esiste almeno un personaggio
    // per cui l'espressione è vera (cioè la domanda è ancora discriminante)
    const filteredQuestions = quest.filter(question => {
        let isApplicable = characters.some(character => {
            let answerValue = true;
            return evaluateExpression(question.answer.expression, character, answerValue);
        });
        return isApplicable;
    });

    // Se dopo il filtraggio non rimangono domande, passa alla categoria successiva
    if (filteredQuestions.length === 0) {
        categoryIndex++;

        if (quest == null) return [];
        if (categoryIndex >= questions.categories.length) return [];

        // Richiama ricorsivamente sulla nuova categoria
        return filterQuestions(questions.categories[categoryIndex].questions, characters);
    }

    return filteredQuestions;
}

/**
 * Valuta un'espressione del tipo "feature == value" su un personaggio.
 * Supporta operatori: <, >, <=, >=, !=, ==
 * Gestisce anche array (es. professions contiene un valore).
 * @param {string} expression - Es. "colorOfHair == blonde"
 * @param {object} character - Oggetto personaggio con .features
 * @param {boolean} answerValue - Risposta attesa (true/false)
 * @returns {boolean} true se l'espressione corrisponde alla risposta data
 */
function evaluateExpression(expression, character, answerValue) {
    // Suddivide l'espressione in [feature, operatore, valore]
    let [feature, operator, val] = expression.split(' ');
    const featureValue = character.features[feature];
    var resultValue = undefined;

    // Se la caratteristica non esiste, salta la domanda (considera sempre true)
    if (featureValue === undefined) {
        console.log('SKIPPED QUESTIONS');
        return true;
    }

    // Gestisce il caso in cui val sia la stringa "null"
    val = val == "null" ? null : val;

    // Helper per controllare presenza in array
    const arrayContainsValue = (arr, value) => Array.isArray(arr) && arr.includes(value);

    // Valutazione dell'operatore
    switch (operator) {
        case '<':
            resultValue = parseFloat(featureValue) < parseFloat(val);
            break;
        case '>':
            resultValue = parseFloat(featureValue) > parseFloat(val);
            break;
        case '<=':
            resultValue = parseFloat(featureValue) <= parseFloat(val);
            break;
        case '>=':
            resultValue = parseFloat(featureValue) >= parseFloat(val);
            break;
        case '!=':
            resultValue = featureValue != val && !arrayContainsValue(featureValue, val);
            break;
        case '==':
            if (Array.isArray(featureValue)) {
                resultValue = arrayContainsValue(featureValue, val);
            } else {
                resultValue = featureValue == val;
            }
            break;
        default:
            resultValue = false;
    }

    // Confronta il risultato dell'espressione con la risposta data (answerValue)
    return resultValue == answerValue;
}

/**
 * Chiede conferma all'utente quando il genio pensa di aver indovinato.
 * @param {object} character - Personaggio candidato
 */
function askConfirmation(character) {
    questionText.textContent = 'La persona a cui stai pensando è: ' + character.name + '?';
    genieImage.src = "Immagini/confuso.png"

    // Sostituisce i listener: Sì -> indovinato, No -> sbagliato
    setButtonListeners(
        function() { resultOfTheGuess(true) },
        function() { resultOfTheGuess(false) },
        null
    );
}

/**
 * Termina la partita mostrando un messaggio casuale (vittoria o sconfitta)
 * e prepara i pulsanti per una nuova partita.
 * @param {boolean} guessed - true se il genio ha indovinato
 */
function resultOfTheGuess(guessed) {
    var answers = null;

    if (guessed) {
        answers = finalAnswers.right;
        genieImage.src = "Immagini/felice.png"
    } else {
        answers = finalAnswers.wrong;
        genieImage.src = "Immagini/triste.png"
    }

    // Sceglie una frase casuale dall'array corrispondente
    const randomIndex = Math.floor(Math.random() * answers.length);
    questionText.textContent = answers[randomIndex];

    // Mostra solo il pulsante Reset
    setButtonsForNextGame();
}

/**
 * Mostra/nasconde i pulsanti Sì, No, Reset.
 * @param {boolean} yesVisible - Mostra Sì?
 * @param {boolean} noVisible - Mostra No?
 * @param {boolean} resetVisible - Mostra Reset?
 */
function setButtonVisibility(yesVisible, noVisible, resetVisible) {
    yesButton.style.display = yesVisible ? 'block' : 'none';
    noButton.style.display = noVisible ? 'block' : 'none';
    resetButton.style.display = resetVisible ? 'block' : 'none';
}

/**
 * Assegna in modo sicuro i listener ai pulsanti, rimuovendo i precedenti.
 * @param {function} yesBtnListener - Callback per Sì
 * @param {function} noBtnListener - Callback per No
 * @param {function} resetBtnListener - Callback per Reset
 */
function setButtonListeners(yesBtnListener, noBtnListener, resetBtnListener) {
    handleYesAnswer = updateListenerSafe(yesButton, 'click', handleYesAnswer, yesBtnListener);
    handleNoAnswer = updateListenerSafe(noButton, 'click', handleNoAnswer, noBtnListener);
    handleResetAnswer = updateListenerSafe(resetButton, 'click', handleResetAnswer, resetBtnListener);
}

/**
 * Configura l'interfaccia per il termine della partita:
 * solo pulsante Reset visibile e collegato alla funzione akinator().
 */
function setButtonsForNextGame() {
    setButtonVisibility(false, false, true);
    setButtonListeners(null, null, akinator);
}

/**
 * Helper per aggiornare i listener in modo sicuro:
 * rimuove il vecchio callback e ne aggiunge uno nuovo.
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} event - Nome evento (es. 'click')
 * @param {function} oldCallback - Callback da rimuovere
 * @param {function} newCallback - Callback da aggiungere
 * @returns {function} Il nuovo callback (per tenerne traccia)
 */
function updateListenerSafe(element, event, oldCallback, newCallback) {
    if (element && oldCallback && typeof oldCallback === 'function') {
        element.removeEventListener(event, oldCallback);
    }

    if (element && newCallback && typeof newCallback === 'function') {
        element.addEventListener(event, newCallback);
    }

    return newCallback;
}

/**
 * Funzione principale che avvia (o riavvia) il gioco.
 * Resetta lo stato: categoria 0, tutti i personaggi, domande della prima categoria.
 * Mostra i pulsanti Sì/No e imposta i listener per processare le risposte.
 */
function akinator() {
    categoryIndex = 0;
    remainingCharacters = characters;              // characters viene dal file characters.js
    remainingQuestions = questions.categories[categoryIndex].questions;
    genieImage.src = "Immagini/genio.png"

    setButtonVisibility(true, true, false);

    // I listener chiameranno processAnswer con l'espressione della domanda corrente
    setButtonListeners(
        function() { processAnswer(selectedQuestion.answer.expression, true); },
        function() { processAnswer(selectedQuestion.answer.expression, false); },
        null
    );

    nextQuestion();
}

/**
 * Inizializzazione al caricamento della pagina:
 * recupera i riferimenti DOM, imposta i listener e avvia il gioco.
 */
window.onload = function() {
    questionText = document.getElementById('question-text');
    genieImage = document.getElementById('genie-image');
    yesButton = document.getElementById('yes-button');
    noButton = document.getElementById('no-button');
    resetButton = document.getElementById('reset-button');

    setButtonListeners(handleYesAnswer, handleNoAnswer, handleResetAnswer);

    akinator();

    // window.open('docs/Personaggi.pdf', '_blank');
}