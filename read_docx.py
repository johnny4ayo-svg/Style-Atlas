import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path):
    try:
        doc = zipfile.ZipFile(docx_path)
        xml_content = doc.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.findall('.//w:p', namespaces):
            texts = [node.text for node in p.findall('.//w:t', namespaces) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
        
        with open('STYLEATLAS-One-Pass-Remaining-Errors-Fix-Instructions.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(paragraphs))
            
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

extract_text_from_docx('STYLEATLAS-One-Pass-Remaining-Errors-Fix-Instructions.docx')
