from pathlib import Path
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
class P(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]
    def handle_starttag(self,tag,attrs):
        if tag in {'a','link','script','img'}:
            d=dict(attrs)
            for key in ('href','src'):
                if key in d: self.links.append(d[key])
missing=[]
for f in root.glob('*.html'):
    p=P();p.feed(f.read_text(errors='ignore'))
    for link in p.links:
        if not link or link.startswith(('http:','https:','mailto:','tel:','#','data:')): continue
        target=(f.parent/link.split('#')[0].split('?')[0]).resolve()
        if not target.exists(): missing.append((f.name,link))
if missing:
    print('Missing local targets:')
    for item in missing: print(*item,sep=' -> ')
    raise SystemExit(1)
print(f'Checked {len(list(root.glob("*.html")))} HTML pages. All local asset and page targets exist.')
