#!/usr/bin/env python3
"""Build a multi-size favicon.ico from pre-rendered PNG files.

Pillow's ICO writer takes a single source image and a `sizes` list, then
resizes to each entry.  We pass the largest PNG as source so every embedded
size is downscaled from high-quality art rather than upscaled from a small one.
"""
import os
import shutil
import struct
import io
from PIL import Image

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
web = os.path.join(root, 'packages', 'frontend', 'web')
pub = os.path.join(root, 'public')

# ── Assemble ICO manually so each embedded bitmap uses our pre-rendered PNG ──
# ICO binary layout:
#   6-byte ICONDIR header
#   N × 16-byte ICONDIRENTRY
#   N × PNG/BMP payload data

ico_sizes = [16, 32, 48]

payloads = []
for s in ico_sizes:
    img = Image.open(os.path.join(web, f'favicon-{s}x{s}.png')).convert('RGBA')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    payloads.append(buf.getvalue())

header = struct.pack('<HHH', 0, 1, len(ico_sizes))  # reserved, type=1 (ICO), count

data_offset = 6 + len(ico_sizes) * 16
entries = b''
data = b''
for i, (s, payload) in enumerate(zip(ico_sizes, payloads)):
    w = s if s < 256 else 0
    h = s if s < 256 else 0
    entry = struct.pack(
        '<BBBBHHII',
        w, h,       # width, height (0 = 256)
        0,          # colour count (0 = no palette)
        0,          # reserved
        1,          # colour planes
        32,         # bits per pixel
        len(payload),
        data_offset + len(data),
    )
    entries += entry
    data += payload

ico_bytes = header + entries + data

ico_path_web = os.path.join(web, 'favicon.ico')
ico_path_pub = os.path.join(pub, 'favicon.ico')

with open(ico_path_web, 'wb') as f:
    f.write(ico_bytes)
shutil.copy(ico_path_web, ico_path_pub)

# Verify
with open(ico_path_web, 'rb') as f:
    raw = f.read(6)
count = struct.unpack('<H', raw[4:6])[0]
print(f'✓ favicon.ico ({len(ico_bytes)} bytes, {count} entries: {ico_sizes})')
print('ICO generation complete.')
