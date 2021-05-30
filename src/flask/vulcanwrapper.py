from vulcan import Vulcan

# TODO: some basic calls for logging probably

async def get_grades(keystore, account):
    client = get_client(keystore, account)

    async with client:
        grades = await client.data.get_grades()
        
    client.close()
    return grades


def get_client(keystore, account):
    return Vulcan(keystore=keystore, account=account)