from vulcan import Keystore, Account

def get_keystore():
    try:
        with open('keystore.json', 'r') as file:
            keystore = Keystore.load(file.read())
            return keystore
    except:
        with open ('keystore.json', 'w') as file:
            keystore = Keystore.create(device_model='Vulcanic Kobe')
            file.write(keystore.as_json)
            return keystore

async def get_new_account(keystore, token, symbol, pin):
    account = await Account.register(keystore, token, symbol, pin)

    return account