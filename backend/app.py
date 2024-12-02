from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "distant lands are calling"

@app.route('/heartbeat')
def heartbeat():
    print("Route is responding")
    return "I am alive"

if __name__ == "__main__":
    app.run(debug=True)
