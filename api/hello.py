from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
leaderboard = [{'name': 'Yo', 'difficulty': 'easy_5x5', 'time': 22},
                {'name': 'Yoda', 'difficulty': 'easy_5x5', 'time': 16},
                {'name': 'I should not be here', 'difficulty': 'easy_5x5', 'time': 300},
                {'name': 'bob', 'difficulty': 'easy_5x5', 'time': 299},
                {'name': 'Jeff', 'difficulty': 'easy_5x5', 'time': 250},
                {'name': 'libra', 'difficulty': 'easy_5x5', 'time': 230},
                {'name': 'the one and only cadal', 'difficulty': 'easy_5x5', 'time': 234},
                {'name': 'Yeet', 'difficulty': 'easy_5x5', 'time': 123},
                {'name': 'fool fighter', 'difficulty': 'easy_5x5', 'time': 187},
                {'name': 'Harry', 'difficulty': 'easy_5x5', 'time': 160},
                {'name': 'barry', 'difficulty': 'easy_5x5', 'time': 110},]
#Puzzles taken from https://www.puzzle-loop.com/
puzzles = {
    "easy_5x5": [
          [[3, 4, 1, 4, 3],
          [4, 3, 4, 3, 4],
          [3, 2, 4, 2, 3],
          [2, 4, 4, 4, 4],
          [4, 4, 4, 4, 3]],
          
          [[4, 3, 3, 3, 4],
          [1, 2, 0, 4, 4],
          [2, 4, 4, 4, 2],
          [2, 2, 1, 4, 4],
          [3, 4, 2, 1, 2]]
          ],
    "hard_5x5": [
          [[4, 3, 4, 1, 4],
          [4, 0, 3, 4, 4],
          [4, 2, 4, 4, 4],
          [2, 0, 4, 2, 4],
          [4, 2, 4, 2, 4]]
          ],
    "easy_7x7": [
          [[4, 3, 2, 2, 3, 4, 0],
          [4, 4, 1, 4, 1, 4, 2],
          [4, 4, 3, 4, 4, 4, 3],
          [4, 2, 2, 4, 3, 1, 3],
          [4, 4, 3, 4, 4, 2, 2],
          [4, 4, 2, 4, 4, 4, 2],
          [4, 4, 4, 4, 4, 2, 3]]
          ],
    "hard_7x7": [
          [[4, 2, 2, 4, 4, 2, 4],
          [4, 4, 2, 2, 3, 4, 3],
          [4, 2, 4, 2, 4, 1, 4],
          [2, 2, 2, 4, 4, 4, 3],
          [3, 4, 2, 1, 2, 0, 3],
          [4, 2, 2, 2, 4, 4, 3],
          [4, 4, 4, 2, 4, 4, 4]],
          
          [[4,2,2,3,4,3,3,4,3,4],
          [3,4,4,2,3,4,4,4,4,4],
          [2,4,4,1,4,4,4,2,3,4],
          [4,3,4,4,4,3,4,4,2,2],
          [2,4,1,1,4,2,2,4,2,3],
          [1,4,4,4,4,4,2,1,3,4],
          [4,2,4,4,4,2,4,4,4,3],
          [4,2,4,4,3,1,2,1,3,4],
          [4,4,3,2,4,4,4,1,1,4],
          [4,2,2,4,4,4,4,4,1,4]],
          ],
          }


@app.route("/leaderboard")
def get_leaderboard():
    puzzle_type = request.args.get("puzzle_type")
    top_ten = []
    for i in leaderboard:
        if i["difficulty"] == puzzle_type:
            top_ten.append(i)
    top_ten = sorted(top_ten, key=lambda k: k['time'])
    if len(top_ten) > 10:
        top_ten = top_ten[:10]
    return jsonify(top_ten)

@app.route("/highscore", methods=["POST"])
def send_highscore():
    data = request.json
    leaderboard.append(data)
    return jsonify(leaderboard)

@app.route("/newpuzzle", methods=["GET"])
def send_new_puzzle():
    puzzle_type = request.args.get("puzzle_type")
    possible_puzzles = puzzles[puzzle_type]
    puzzle = possible_puzzles[random.randint(0, len(possible_puzzles)-1)]
    return jsonify(puzzle)
    
    
if __name__ == "__main__":
	app.run()

