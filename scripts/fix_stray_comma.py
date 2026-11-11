with open('src/bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

bad = '{className:"relative flex items-center",/* menu hover stabilized */,'
good = '{className:"relative flex items-center",'

if bad in text:
    text = text.replace(bad, good)
    print('Successfully removed stray comma!')
    with open('src/bundle.js', 'w', encoding='utf-8') as f:
        f.write(text)
else:
    print('Target not found, checking alternatives...')
    # Let's search for "menu hover stabilized"
    idx = text.find('menu hover stabilized')
    if idx != -1:
        print(text[idx-50:idx+60])
