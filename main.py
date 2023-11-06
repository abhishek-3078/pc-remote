from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS

import pyautogui

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app)
 
width=1536
height=836

def calculate_actual(x,y):
    return x*2,y*2

@app.route('/')
def say_hello():
    print("new device joined")
    return render_template('index2.html')
    # with open('index2.html', 'r') as file:
    #     html_content = file.read()
    # return html_content

@app.route('/check',methods=["POST"])
def say_cehck():
    data = request.get_json()
    name = data.get('name')
    print(name)
    return jsonify({'message': 'we reached successfully'})

@socketio.on('move_mouse')
def move_mouse(data):
    x, y = pyautogui.position()
    x, y = x+ 3*data['x'], y+1.5*data['y']
   
    pyautogui.moveTo(x, y)



@socketio.on('click')
def left_click(data):
    print("Click")
    
    pyautogui.click()

@socketio.on('rightclick')
def right_click():
    print("RightClick")
    
    pyautogui.rightClick()

@socketio.on('character_send')
def send_char(data):

    print("Character",data["char"])
    # pyautogui.click()
    pyautogui.press(data['char'])

@socketio.on('drag_mouse')
def drag_mouse(data):
    x, y = pyautogui.position()
    x, y = x+ 3*data['x'], y+1.5*data['y']
    print("Drag")
    # pyautogui.moveTo(x, y)
    pyautogui.dragTo(x,y);

@socketio.on('scroll')
def drag_mouse(data):
    x, y = pyautogui.position()
    y= data['y']
    print("scroll")
    # pyautogui.moveTo(x, y)
    # pyautogui.press('down')
    if(y>0):
        y=65;
    else:
        y=-65;
    
    pyautogui.scroll(y);


@app.route('/move', methods=['POST'])
def move_mouse():
    data = request.get_json()
    x, y = data.get('x'), data.get('y')
    
    print(x,y)
   
    pyautogui.moveTo(x, y)

    return jsonify({'message': 'Mouse moved successfully'})

@app.route('/click', methods=['POST'])
def click_mouse():
    data = request.get_json()
    button = data.get('button')  # 'left' or 'right'

    if button == 'left':
        pyautogui.click()
    elif button == 'right':
        pyautogui.rightClick()

    return jsonify({'message': f'{button} click executed'})

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000)
