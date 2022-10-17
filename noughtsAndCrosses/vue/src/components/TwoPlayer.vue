<template>
  <div class="pt-8 text-center">
    <h1 class="mb-8 text-3xl font-bold uppercase md:block hidden">
      Noughts And Crosses
    </h1>

    <h3 class="text-xl mb-4">
      {{ currentPlayer.name }}'s turn. Playing as
      {{ currentPlayer.pieces }}
    </h3>

    <div class="flex flex-col items-center mb-8">
      <div
        v-for="(row, x) in this.board"
        :key="x"
        class="grid grid-cols-3 gap-2"
      >
        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="`border border-white md:w-40 md:h-40 w-20 h-20 bg-pewterBlue hover:bg-pewterBlueLight mt-2 cursor-pointer material-icons-outlined flex justify-center items-center text-4xl`"
        >
          {{ cell === "X" ? "close" : cell === "O" ? "circle" : "" }}
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 v-if="winner" class="text-6xl font-bold mb-8">
        {{ winner === "draw" ? "DRAW" : `Player ${winner} wins!` }}
      </h2>
      <button
        @click="ResetGame"
        class="
          px-4
          py-2
          bg-vanDykeBrown
          rounded
          uppercase
          font-bold
          hover:bg-frenchBistre
          duration-300
        "
      >
        Reset
      </button>
    </div>
  </div>
</template>


<script setup >
import { Dialog } from "@headlessui/vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//Player objects with pieces and names

const player1 = ref({
  name: "",
  pieces: "X",
});

const player2 = ref({
  name: "",
  pieces: "O",
});

const props = defineProps({
  player1: String,
  player2: String,
});

const currentPlayer = ref({
  name: "",
  pieces: "",
});

const numberOfMoves = ref({
  x: 0,
  o: 0,
});

//On mount - set player objects with passed props

onMounted(() => {
  player1.value.name = props.player1;
  player2.value.name = props.player2;
  currentPlayer.value.name = player1.value.name;
  currentPlayer.value.pieces = player1.value.pieces;
});

const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

//Winner calculatior logic -> loops over winning lines,
//Checks if grid line = board line => if so, return winning pieces

const CalculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
    if (!board.includes("")) {
      return "draw";
    }
  }
  return null;
};

//computed value continues to check if value is return or is null => updates DOM
//if win, post those results

const winner = computed(() => {
  const winningMove = CalculateWinner(board.value.flat());
  if (winningMove) {
    postLatestGame(winningMove);
    return winningMove;
  }
});

//If winner or value is full, exit function
//set the board value to current players pieces,
//then set current player to opposite

const MakeMove = (x, y) => {
  if (winner.value) return;
  if (board.value[x][y]) return;
  board.value[x][y] = currentPlayer.value.pieces;
  if (currentPlayer.value.pieces === "X") {
    numberOfMoves.value.x += 1;
    currentPlayer.value.pieces = player2.value.pieces;
    currentPlayer.value.name = player2.value.name;
  } else {
    numberOfMoves.value.o += 1;
    currentPlayer.value.pieces = player1.value.pieces;
    currentPlayer.value.name = player1.value.name;
  }
};

//Reset all game values

const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer.value.name === player1.value.name;
};

//Check the winner, and number of winning moves recorded in ref object

const postLatestGame = async (winningMove) => {
  let winner;
  let winningNumberOfMoves;

  if (winningMove === "X") {
    winner = `${player1.value.name} - X`;
    winningNumberOfMoves = numberOfMoves.value.x;
  } else if (winningMove === "O") {
    winner = `${player2.value.name} - O`;
    winningNumberOfMoves = numberOfMoves.value.o;
  } else if (winningMove === "draw") {
    winner = "DRAW";
    winningNumberOfMoves = 9;
  }

  //send post request to laravel, with string json body

  const res = await fetch("http://localhost:8000/api/games", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      type: "Two Player",
      player1: player1.value.name,
      player2: player2.value.name,
      number_of_moves: winningNumberOfMoves,
      result: winner,
    }),
  });
};
</script>

<script>
</script>
  
<style>
</style>
