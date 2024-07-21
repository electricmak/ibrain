document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('output');
    const wakeUpButton = document.getElementById('wakeUpButton');
    let isListening = false;

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    const wakeUpCommand = 'hey I BRAIN wake up';

    wakeUpButton.addEventListener('click', () => {
        if (!isListening) {
            isListening = true;
            outputElement.textContent = 'Listening...';
            recognition.start();
        }
    });

    recognition.addEventListener('result', (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();

        if (isListening) {
            outputElement.textContent = `IBRAIN said: "${transcript}"`;
            isListening = false;
            respond(transcript);
        }
    });

    recognition.addEventListener('end', () => {
        if (isListening) {
            recognition.start();
        }
    });

    function respond(transcript) {
        const synth = window.speechSynthesis;
        let responseText;

        if (transcript.includes('hello') || transcript.includes('hi') || transcript.includes('hey')) {
            responseText = 'Hello! How can I help you today?';
        } else {
            responseText = 'I am sorry, I did not understand that.';
        }

        const utterance = new SpeechSynthesisUtterance(responseText);
        synth.speak(utterance);
    }
});
