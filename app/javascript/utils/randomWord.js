const HANGMAN_WORDS = ['grit', 'creativity', 'imapct', 'diversity', 'trust'];

function randomWord() {
  return HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)];;
}

export default randomWord