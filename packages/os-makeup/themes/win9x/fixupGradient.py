from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parent
SKINS_DIR = BASE_DIR / 'skins'

pattern = re.compile(
    r'--(\w+Title)\s*:\s*linear-gradient\([^,]+,\s*([^,\)]+)\s*,\s*([^\)]+)\)\s*;',
    re.I
)

def repl(match):
    name = match.group(1)
    color2 = match.group(3).strip()

    return f'--Gradient{name}: {color2};'

for path in SKINS_DIR.rglob('*'):

    if path.suffix.lower() not in ('.css', '.scss'):
        continue

    print(f'Processing: {path}')

    css = path.read_text(encoding='utf-8')

    new_css = pattern.sub(repl, css)

    if new_css != css:
        path.write_text(new_css, encoding='utf-8')
        print('  Updated')
    else:
        print('  No changes')