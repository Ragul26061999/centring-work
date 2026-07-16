import os

files = ['src/app/page.tsx', 'src/app/layout.tsx']

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replacements
    content = content.replace('+1 (555) 123-4567', '+91 79041 38705')
    content = content.replace('contact@omdealer.com', 'omdealer7@gmail.com')
    content = content.replace('123 Construction Ave, BuildCity', '55, Madavaram Red Hills Rd, Red Hills, Naravarikuppam, Chennai, Tamil Nadu 600052')
    content = content.replace('123 Construction Ave, BuildCity, ST 12345', '55, Madavaram Red Hills Rd, Red Hills, Naravarikuppam, Chennai, Tamil Nadu 600052')
    
    with open(f, 'w') as file:
        file.write(content)
