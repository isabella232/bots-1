var gridIds = {
  p1Spawn:'0',
  p2Spawn:'1',
  player1:'a',
  player2:'b',
  food:'*',
  empty:'.'
};
var distance = {
  move:1,
  raze:1,
  attack:1,
  food:0,
  spawn:1
};

exports.create = function(rows, cols) {
  var gameState = {
    rows:rows,
    cols:cols
  };

  gameState.p1 = {
    food:1,
    spawn:coordToIndex(gameState, {x:1,y:1})
  };
  gameState.p2 = {
    food:1,
    spawn:coordToIndex(gameState, {x:cols-2,y:rows-2})
  };
  gameState.grid = makeEmptyGrid(gameState.rows, gameState.cols);

  return gameState;
};

exports.doTurn = function(state, p1Moves, p2Moves) {
  // move
  var re = new RegExp('['+gridIds.player1+gridIds.player2+']','g');
  state.newGrid = state.grid.replace(re, gridIds.empty);
  p1Moves.forEach(function(move) {
    if(validMove(state, move, gridIds.player1)) {
      state = movePlayer(state, move);
    }
  });
  p2Moves.forEach(function(move) {
    if(validMove(state, move, gridIds.player2)) {
      state = movePlayer(state, move);
    }
  });

  // gather

  // fight

  // raze

  // spawn

  // determine whether to continue/end game
};

// movement functions
function validMove(state, move, playerSymbol) {
  if(move.from<numCoords && move.from>=0
      && move.to<numCoords && move.to>=0
      && state.grid[move.from]===playerSymbol
      && state.grid[move.to]!==gridIds.p1Spawn
      && state.grid[move.to]!==gridIds.p2Spawn) {
    return true;
  }
  else {
    return false;
  }
}
function movePlayer(state, move) {

}


// grid functions
function getCoord(state, coord) {
  var index = coordToIndex(state, coord);
  return state.grid[index];
}
function setCoord(state, coord, val) {
  var index = coordToIndex(state, coord);
  state.grid = state.grid.substr(0,index) + val + state.grid.substr(index+1);
}
function showGrid(state) {
  for(var y=0; y<state.rows; y++) {
    var row = '';
    for(var x=0; x<state.cols; x++) {
      row += state.grid[coordToIndex(state, {x:x,y:y})];
    }
    console.log(row+'\n');
  }
}
function indexToCoord(state, index) {
  var x = index%state.grid.cols;
  var y = ~~(index/state.grid.cols);
  return {x:x, y:y};
}
function coordToIndex(state, coord) {
  return state.cols * coord.y + coord.x;
}
function makeEmptyGrid(rows, cols) {
  return Array(rows*cols+1).join(gridIds.empty);
}