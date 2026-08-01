from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,mimetypes,re,sys
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'mockups'
outname,filename,w,h=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4])
def du(p):
 m=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'; return f'data:{m};base64,'+base64.b64encode(p.read_bytes()).decode()
assets={p.relative_to(ROOT).as_posix():du(p) for p in (ROOT/'assets').rglob('*') if p.is_file() and p.suffix.lower() in {'.jpg','.jpeg','.png','.webp','.svg'}}
css=(ROOT/'assets/css/styles.css').read_text()
for r,u in assets.items():css=css.replace(r,u)
js=(ROOT/'assets/js/app.js').read_text().replace('assets/icons/sprite.svg#','#')
js=js.replace("JSON.parse(localStorage.getItem('styleatlasSaved') || '[]')", "[]").replace("JSON.parse(localStorage.getItem('styleatlasCompare') || '[]')", "[]")
for r,u in assets.items():js=js.replace(r,u)
html=(ROOT/filename).read_text().replace('assets/icons/sprite.svg#','#')
html=re.sub(r'<link rel="stylesheet" href="assets/css/styles\.css">','<style>'+css+'</style>',html)
for r,u in assets.items():html=html.replace(r,u)
sprite=re.sub(r'<\?xml[^>]*>','',(ROOT/'assets/icons/sprite.svg').read_text()).replace('<svg ','<svg style="display:none" aria-hidden="true" ',1)
pos=html.find('>',html.find('<body'))+1;html=html[:pos]+sprite+html[pos:]
html=html.replace('<script src="assets/js/app.js"></script>','<script>'+js+'</script>')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
 page=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
 page.set_content(html,wait_until='domcontentloaded',timeout=15000)
 page.evaluate("if(document.querySelector('[data-header]') && !document.querySelector('[data-header]').children.length){injectShell()}")
 page.evaluate("document.querySelectorAll('[data-count]').forEach(el=>el.textContent=Number(el.dataset.count).toLocaleString()+(el.dataset.suffix||''));document.querySelectorAll('.compare-drawer:not(.open)').forEach(el=>el.remove())")
 page.wait_for_timeout(80)
 height=page.evaluate('document.documentElement.scrollHeight')
 page.screenshot(path=str(OUT/outname),full_page=True,type='jpeg',quality=76,animations='disabled')
 print(outname,w,height)
 b.close()
