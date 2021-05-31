from flask import Flask, request, jsonify
import vulcan
from werkzeug.exceptions import BadRequest
import logininfo, vulcanwrapper
import json

app = Flask(__name__)

def get_account(straccount: str):

    acc_dict = json.loads(straccount)
    print(acc_dict)

    account = vulcan.Account(
        login_id = acc_dict['account']['LoginId'],
        user_login = acc_dict['account']['UserLogin'],
        rest_url = acc_dict['account']['RestURL'],
        user_name = acc_dict['account']['UserName'])

    return account

@app.route('/grades', methods=['GET'])
async def grades():
    if request.method == 'GET':

        account = get_account(request.args.get('account'))

        grades = await vulcanwrapper.get_grades(account)
        grades = [grade async for grade in grades]

        end_grades = []

        for grade in grades:
            e_grade = {
                'mark': grade.content_raw,
                'teacher': grade.teacher_created.display_name,
                'subject': grade.column.subject.name,
                'name': grade.column.name,
                'weight': grade.column.weight,
                'date': f'{grade.date_created.date.day}-{grade.date_created.date.month}-{grade.date_created.date.year}',
            }

            end_grades.append(e_grade)

        message = {
            'grades': end_grades
        }

        return jsonify(message)

@app.route('/messages', methods=['GET'])
async def messages():
    if request.method == 'GET':

        account = get_account(request.args.get('account'))

        messages = await vulcanwrapper.get_messages(account)
        messages = [message async for message in messages]

        end_messages = []

        for message in messages:
            end_message = {
                'subject': message.subject,
                'sentDate': f'{message.sent_date.date.day}-{message.sent_date.date.month}-{message.sent_date.date.year}',
                'content': message.content,
                'sender': message.sender.address_name
            }

            end_messages.append(end_message)

        message = {
            'messages': end_messages
        }

        return jsonify(message)

@app.route('/register', methods=['GET'])
async def register():
    if request.method == 'GET':

        pin = request.args.get('pin')
        symbol = request.args.get('symbol')
        token = request.args.get('token')

        keystore = logininfo.get_keystore()

        try:
            account = await logininfo.get_new_account(keystore=keystore, pin=int(pin), symbol=symbol, token=token)

            message = {
                'account': account.as_dict
            }

            return jsonify(message)

        except BadRequest as e:
            return e


if __name__ == '__main__':
    app.run(debug=True)
