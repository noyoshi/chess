var chess = new Chess();

// Chess.js event loop
// while (!chess.game_over()) {
//   var moves = chess.moves();
//   var move = moves[Math.floor(Math.random() * moves.length)];
//   chess.move(move);
// }
// console.log(chess.pgn());

var chessMapping = {
  'P': chess.PAWN, 
  'N': chess.KNIGHT, 
  'R': chess.ROOK, 
  'K': chess.KING, 
  'Q': chess.QUEEN, 
  'B': chess.BISHOP, 
  'w': chess.WHITE, 
  'b': chess.BLACK
}

var moves = chess.moves();

var parsePiece = function (piece) {
  return {
    color: piece[0],
    piece: piece[1] }
}

// Chessboard.js stuff
var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
  console.log("Source: " + source);
  console.log("Target: " + target);
  console.log("Piece: " + piece);
  console.log("New position: " + ChessBoard.objToFen(newPos));
  console.log("Old position: " + ChessBoard.objToFen(oldPos));
  console.log("Orientation: " + orientation);
  console.log("--------------------");
  $.post( "/board_state", {
      source: source, 
      target: target, 
      piece: piece, 
      orientation: orientation,
    });
  var move = moves[Math.floor(Math.random() * moves.length)];
  console.log(move);
  chess.move(move);
  let data = chess.remove(source);
  chess.put(data, target);
  console.log(chess.ascii());
};

var cfg = {
  draggable: true,
  dropOffBoard: 'snapback', // this is the default
  position: 'start', 
  onDrop: onDrop
};

var board = ChessBoard('board', cfg);

