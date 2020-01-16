<template>
  <div id='app'>
    <div class="game-container">
      <div class="left-container">
        <div class="hangman">
          <img
            class="hangman__icon"
            :src="'../assets/hangman_' + strikes"
          />
        </div>
        <div class="strikes">
          strikes: {{ strikes }}/6
        </div>
      </div>
      <div class="right-container">
        <div
          class="game-word"
        >
          <div
            class="game-word__letter"
            v-for="letter in wordProgress"
          >
            {{ letter }}
          </div>
        </div>
        <div class="used-letters">
          <div
            class="used-letters__letter letter"
            v-for="letter in usedLetters"
          >
            {{ letter }}
          </div>
        </div>
        <div class="available-letters">
          <div
            v-for="letter in availableLetters"
            class="available-letters__letter letter"
            @click="tryLetter(letter)"
          >
            {{ letter }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import randomWord from '../utils/randomWord';

const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export default {
  data() {
    return {
      strikes: 0,
      currentWord: [],
      usedLetters: [],
      availableLetters: LETTERS,
      correct: 0,
      wordProgress: [],
    }
  },
  mounted() {
    this.startGame();
  },
  methods: {
    startGame() {
      this.currentWord = randomWord().split("");
      this.strikes = 0;
      this.usedLetters = [];
      this.availableLetters = LETTERS;
      this.correct = 0;
      this.wordProgress = new Array(this.currentWord.length);
      this.wordProgress.fill("_");
    },
    markUsedLetter(letter) {
      this.usedLetters.push(letter);
      this.availableLetters.splice( this.availableLetters.indexOf(letter), 1 );
    },
    tryLetter(letter) {
      let found = false;
      for (let i = 0; i < this.currentWord.length; i++) {
        if (letter === this.currentWord[i]) {
          this.wordProgress.splice(i, 1, letter)
          found = true;
        }
      }
      if (!found) {
        if (this.strikes < 6) {
          this.strikes += 1;
          this.markUsedLetter(letter);
        } else {
          this.startGame();
        }
      } else {
        this.markUsedLetter(letter);
      }
    },
  },
}
</script>

<style lang="scss">

.game-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.left-container {
  margin: 10px;
}

.right-container {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.letter {
  font-size: 40px;
  margin: 5px;
}

.available-letters {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}

.used-letters {
  display: flex;

  &__letter {
    color: red;
    font-size: 25px;
  }
}

.game-word {
  display: flex;
  height: 100px;
  width: 500px;

  &__letter {
    font-size: 45px;
    color: blue;
    margin: 2px;
  }
}

.strikes {
  font-size: 35px;
}
</style>