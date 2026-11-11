with open('src/bundle.js', 'r') as f:
    text = f.read()

bad = 'backdrop-blur-md bg-gradient-to-b from-[#070709]/90 via-[#070709]/40 to-transparent ${R||w||N?"opacity-100":"opacity-90"}`'
good = 'backdrop-blur-md bg-gradient-to-b from-[#070709]/90 via-[#070709]/40 to-transparent ${R||w||N?"opacity-100":"opacity-90"}`}'

if bad in text:
    text = text.replace(bad, good)
    print('Fixed closing brace!')
    with open('src/bundle.js', 'w') as f:
        f.write(text)
else:
    print('Bad string not found!')
