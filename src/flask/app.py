from flask import Flask, request, jsonify
import logininfo
import asyncio, json

app = Flask(__name__)

@app.route('/register', methods=['GET'])
async def hello():
    if request.method == 'GET':

        pin = request.args.get('pin')
        symbol = request.args.get('symbol')
        token = request.args.get('token')

        print(pin)

        keystore = logininfo.get_keystore()
        account = await logininfo.get_new_account(keystore=keystore, pin=int(pin), symbol=symbol, token=token)

        message = {
            'account': account.as_dict
        }
        return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)
