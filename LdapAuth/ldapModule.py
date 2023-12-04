from ldap3.core.exceptions import LDAPException, LDAPBindError
from ldap3 import Server, Connection, ALL, SUBTREE


def global_ldap_authentication(user_name, user_pwd):
    ldap_user_name = user_name.strip()
    ldap_user_pwd = user_pwd.strip()

    ldsp_server = f"ldap://192.168.1.122:389"

    root_dn = "dc=example,dc=org"

    user = f'cn={ldap_user_name},{root_dn}'

    print(user)
    server = Server(ldsp_server, get_info=ALL)

    connection = Connection(server,
                            user=user,
                            password=ldap_user_pwd)
    if not connection.bind():
        print(f" *** Cannot bind to ldap server: {connection.last_error} ")
        l_success_msg = f' ** Failed Authentication: {connection.last_error}'
    else:
        print(f" *** Successful bind to ldap server")
        l_success_msg = 'Success'

    return l_success_msg


global_ldap_authentication('admin', 'adminn')
