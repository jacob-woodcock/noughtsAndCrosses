<template>
  <div class="pt-8 text-center">
    <h1 class="mb-8 text-3xl font-bold uppercase md:block hidden">
      Noughts And Crosses
    </h1>

    <h3 class="text-xl mb-4">
      Your turn. Playing as
      {{ player.pieces }}
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
          :class="`border border-white md:w-40 md:h-40 w-20 h-20 hover:bg-pewterBlueLight mt-2 cursor-pointer material-icons-outlined flex justify-center items-center text-4xl`"
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
import { ref, computed, onMounted, defineProps } from "vue";

onMounted(() => {
  if (player.value.name === "") {
    if (props.player1) {
      player.value.name = props.player1;
    }
  }
});

const props = defineProps({
  player1: String,
});

const player = ref({
  name: "",
  pieces: "X",
});

const numberOfMoves = ref({
  x: 0,
  o: 0,
});

const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
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

const winner = computed(() => {
  const winningMove = CalculateWinner(board.value.flat());
  if (winningMove) {
    postLatestGame(winningMove);
    return winningMove;
  }
});

const MakeMove = (x, y) => {
  if (winner.value) return;
  if (board.value[x][y]) return;
  board.value[x][y] = player.value.pieces;
  numberOfMoves.value.x += 1;
  ComputerMakesMove();
};

//very basic ai

const ComputerMakesMove = () => {
  if (winner.value) return;

  const tries = [];

  //check board, if empty add to array

  for (let y in board.value) {
    for (let x in board.value) {
      if (!board.value[x][y]) {
        tries.push({ x, y });
      }
    }
  }

  //if there are possible moves, generate random array val and move on those coors

  if (tries.length !== 0) {
    const input = Math.floor(Math.random() * tries.length);
    board.value[tries[input].x][tries[input].y] = "O";
    numberOfMoves.value.o += 1;
  }
};

const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value.pieces = "X";
};

const postLatestGame = async (winningMove) => {
  let winner;
  let winningNumberOfMoves;

  if (winningMove === "X") {
    winner = "Player 1 - X";
    winningNumberOfMoves = numberOfMoves.value.x;
  } else if (winningMove === "O") {
    winner = "Computer - O";
    winningNumberOfMoves = numberOfMoves.value.o;
  } else if (winningMove === "draw") {
    winner = "DRAW";
    winningNumberOfMoves = 9;
  }

  const res = await fetch("http://localhost:8000/api/games", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      type: "Single Player",
      player1: player.value.name,
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
