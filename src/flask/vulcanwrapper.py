from vulcan import Vulcan
import logininfo

async def get_grades(account):
    client = _get_client(logininfo.get_keystore(), account)
    await client.select_student()
    grades = await client.data.get_grades()
        
    return grades

async def get_messages(account):
    client = _get_client(logininfo.get_keystore(), account)
    await client.select_student()
    
    messages = await client.data.get_messages()
    
    return messages

async def get_lessons(account):
    client = _get_client(logininfo.get_keystore(), account)
    await client.select_student()

    lessons = await client.data.get_lessons

    return lessons


def _get_client(keystore, account):
    return Vulcan(keystore=keystore, account=account)