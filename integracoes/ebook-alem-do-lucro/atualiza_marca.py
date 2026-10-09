"""Atualiza logo, domínio e e-mail do e-book 'Além do Lucro' sem mexer no resto."""
import io, pdfplumber
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream, NameObject
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

D='/tmp/claude-0/-home-user-BATISTELA/6dd83072-fe0a-5e94-a430-8143eb4402a5/scratchpad/ebook2/'
SRC=D+'original.pdf'; OUT='/home/user/BATISTELA/public/downloads/ebook-alem-do-lucro-indicadores-financeiros-batistela.pdf'
LOGO=D+'logo-branco.png'
NAVY=(22/255,43/255,87/255); WHITE=(1,1,1); BLUE_TXT=(46/255,117/255,182/255)
NEW_DOMAIN='www.batistelaconsultoria.com'; NEW_EMAIL='info@batistelaconsultoria.com'; NEW_PHONE='+55 48 99911-7072'
OLD={'www.batistelaconsultores.cl','batistela@batistelaconsultores.cl'}
SHOW={b'Tj',b'TJ',b"'",b'"'}
HEADER_PAGES={1,17,18,19}; NAVY_PAGES={17,18,19}

r=PdfReader(SRC); w=PdfWriter()
with pdfplumber.open(SRC) as pdf:
  for pn,page in enumerate(r.pages, start=1):
    pl=pdf.pages[pn-1]; chars=pl.chars; words=pl.extract_words()
    H=float(page.mediabox.height); W=float(page.mediabox.width)
    remove=set(); overlays=[]  # (kind, data)
    def chars_in(word):
        return [i for i,c in enumerate(chars) if c['x0']>=word['x0']-0.5 and c['x1']<=word['x1']+0.5 and c['top']>=word['top']-0.5 and c['bottom']<=word['bottom']+0.5]
    # 1) cabeçalho (logo antigo em texto) nas páginas com logo
    if pn in HEADER_PAGES:
        for i,c in enumerate(chars):
            if c['top']<80: remove.add(i)
    # 2) domínio / e-mail / telefone
    for wd in words:
        t=wd['text']
        if t in OLD:
            remove.update(chars_in(wd))
            new=NEW_DOMAIN if t.startswith('www') else NEW_EMAIL
            overlays.append(('text', wd, new))
    # telefone antigo "+55 48 9911-7072" (3 palavras na mesma linha) nas páginas 18 e 19
    if pn in (1,18,19):
        for idx,wd in enumerate(words):
            if wd['text']=='9911-7072':
                line=[x for x in words if abs(x['top']-wd['top'])<1 and x['text'] in ('+55','48','9911-7072')]
                for x in line: remove.update(chars_in(x))
                merged={'x0':min(x['x0'] for x in line),'x1':max(x['x1'] for x in line),'top':wd['top'],'bottom':wd['bottom'],'text':'tel'}
                overlays.append(('text', merged, NEW_PHONE))
    # 3) remover operadores de texto marcados e o Do da imagem do símbolo antigo
    cs=ContentStream(page.get_contents(), r)
    logo_names={k for k,v in page['/Resources'].get('/XObject',{}).items() if v.get('/Width')==1491}
    newops=[]; si=0
    for args,op in cs.operations:
        if op in SHOW:
            keep = si not in remove; si+=1
            if not keep: continue
        if op==b'Do' and str(args[0]) in logo_names: continue
        newops.append((args,op))
    cs.operations=newops
    page.replace_contents(cs)
    # 4) overlay: logo novo + textos novos
    buf=io.BytesIO(); c=canvas.Canvas(buf, pagesize=(W,H))
    if pn in HEADER_PAGES:
        img=ImageReader(LOGO); iw,ih=img.getSize(); lw=180; lh=lw*ih/iw
        c.drawImage(img, (W-lw)/2, H-28-lh, lw, lh, mask='auto')
    for kind,wd,new in overlays:
        size=max(8.0, round((wd['bottom']-wd['top'])*0.78,1)); font='Helvetica'
        cx=(wd['x0']+wd['x1'])/2; y=H-wd['bottom']+size*0.22
        if pn in NAVY_PAGES: color=WHITE
        elif pn==1: color=WHITE
        else: color=BLUE_TXT
        if pn not in (1,): # fundo plano: cobrir a área antiga (inclui sublinhado)
            c.setFillColorRGB(*(NAVY if pn in NAVY_PAGES else WHITE)); c.rect(wd['x0']-6, H-wd['bottom']-3, wd['x1']-wd['x0']+12, wd['bottom']-wd['top']+5, stroke=0, fill=1)
        c.setFillColorRGB(*color); c.setFont(font,size)
        tw=c.stringWidth(new,font,size)
        if pn==1: x=wd['x1']-tw   # capa: alinhado à direita como o original
        else: x=cx-tw/2
        c.drawString(x,y,new)
        if new==NEW_DOMAIN and pn!=1:
            c.setStrokeColorRGB(*color); c.setLineWidth(0.5); c.line(x,y-1.5,x+tw,y-1.5)
    c.save(); buf.seek(0)
    page.merge_page(PdfReader(buf).pages[0])
    w.add_page(page)
    print(f"p{pn}: removidos {len(remove)} chars, logo={'sim' if logo_names else 'não'}, overlays={[(o[2]) for o in overlays]}")
w.add_metadata({'/Title':'Além do Lucro: Guia Prático de Indicadores Financeiros','/Author':'Batistela Gestão Empresarial'})
with open(OUT,'wb') as f: w.write(f)
import os; print('saída', OUT, os.path.getsize(OUT)//1024,'KB')
