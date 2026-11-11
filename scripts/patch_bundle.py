import os

with open('src/bundle.js', 'r') as f:
    text = f.read()

# 1. Menu hover canvas loop: ONLY spread when drawer is open (D.current?1:0)
old_spread = 'const re=D.current?1:w.current?.185:0,se=D.current?.16:w.current?.12:.18;'
new_spread = 'const re=D.current?1:0,se=D.current?.16:.18;'
if old_spread in text:
    text = text.replace(old_spread, new_spread)
    print('Replaced old_spread')
else:
    print('old_spread not found')

# 2. Header backdrop: calm stable backdrop-blur-md without mask jitter
old_needle = 'WebkitMaskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 42%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 100%)",maskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 42%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 100%)"}'
idx = text.find(old_needle)
if idx != -1:
    # Find start of style:
    style_start = text.rfind(',style:{', 0, idx)
    style_end = idx + len(old_needle) + 1 # includes closing brace
    # Find preceding class string
    class_start = text.rfind('className:`absolute inset-x-0 top-0', 0, style_start)
    if class_start != -1:
        class_end = text.find('`', class_start + 15) + 1
        new_class_and_style = 'className:`absolute inset-x-0 top-0 h-24 sm:h-28 pointer-events-none transition-opacity duration-300 backdrop-blur-md bg-gradient-to-b from-[#070709]/90 via-[#070709]/40 to-transparent ${R||w||N?"opacity-100":"opacity-90"}`'
        text = text[:class_start] + new_class_and_style + text[style_end:]
        print('Replaced header backdrop class and removed mask')

# 3. Remove hover dispatch from menu button wrapper
old_hover_dispatch = 'onMouseEnter:()=>{window.dispatchEvent(new CustomEvent("eferz-menu-hover",{detail:{hovered:!0}}))},onMouseLeave:()=>{window.dispatchEvent(new CustomEvent("eferz-menu-hover",{detail:{hovered:!1}}))}'
if old_hover_dispatch in text:
    text = text.replace(old_hover_dispatch, '/* menu hover stabilized */')
    print('Removed menu hover dispatch')
else:
    print('old_hover_dispatch not found')

# 4. Add pointer-events-none to ping rings on header buttons
text = text.replace(
    'className:"absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-30"',
    'className:"absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-30 pointer-events-none"'
)
text = text.replace(
    'className:"absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-35"',
    'className:"absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-35 pointer-events-none"'
)
print('Updated ping rings pointer-events-none')

with open('src/bundle.js', 'w') as f:
    f.write(text)

print('Finished patching src/bundle.js')
