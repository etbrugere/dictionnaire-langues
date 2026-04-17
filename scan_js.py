import re

with open(r'C:/Users/brugere/Documents/Workspace/dictionnaire-langues/index.html', encoding='utf-8') as f:
    content = f.read()

js = content[content.find('<script>')+8:content.rfind('</script>')]

html_lines = content.split('\n')
script_offset = next(i for i,l in enumerate(html_lines) if '<script>' in l) + 1

BACKSLASH = chr(92)
DQUOTE = chr(34)

i = 0
while i < len(js):
    ch = js[i]
    # Skip line comments
    if ch == '/' and i+1 < len(js) and js[i+1] == '/':
        while i < len(js) and js[i] != '\n':
            i += 1
        continue
    # Enter double-quoted string
    if ch == DQUOTE:
        string_start = i
        line_start = js[:i].count('\n')
        i += 1
        while i < len(js):
            c = js[i]
            if c == BACKSLASH:
                i += 2
                continue
            if c == '\n':
                file_line = script_offset + line_start + 1
                print(f'UNCLOSED STRING at file line {file_line}:')
                snippet = js[string_start:string_start+100].replace('\n', '<NL>')
                print(f'  {snippet}')
                break
            if c == DQUOTE:
                break
            i += 1
    i += 1

print('Scan complete')
