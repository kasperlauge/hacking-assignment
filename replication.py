import hashlib

def hash(password, salt):
    h = []
    for i in range(len(password)):
        m = hashlib.sha256()
        for j in range(100000):
                m.update(password[i])
        m.update(salt)
        h = h + [m.hexdigest()[0:4]]
    return "".join(h)


print hash("Psword", "123")