#!/usr/bin/env python3
import os
import re
import glob

# Directorio base
base_dir = "/Users/javi/Documents/W"

def check_images_in_file(filepath):
    print(f"🔍 Verificando: {os.path.basename(filepath)}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buscar todas las referencias a imágenes
    patterns = [
        r'src=["\']([^"\']*Images/[^"\']*)["\']',
        r'background-image:\s*url\(["\']?([^)]*Images/[^)]*)["\']?\)',
    ]
    
    all_good = True
    
    for pattern in patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            image_path = match.group(1)
            full_path = os.path.join(base_dir, image_path)
            
            if os.path.exists(full_path):
                print(f"  ✅ {image_path}")
            else:
                print(f"  ❌ {image_path} (NO EXISTE)")
                all_good = False
    
    return all_good

def main():
    print("🔍 Verificando que todas las imágenes existan...")
    print()
    
    # Buscar todos los archivos HTML
    html_files = glob.glob(os.path.join(base_dir, "*.html"))
    
    all_files_good = True
    
    for html_file in html_files:
        file_good = check_images_in_file(html_file)
        if not file_good:
            all_files_good = False
        print()
    
    if all_files_good:
        print("🎉 ¡Todas las imágenes están correctamente referenciadas!")
    else:
        print("⚠️  Hay algunas imágenes que necesitan atención.")
    
    print()
    print("📂 Estructura actual de la carpeta Images:")
    for root, dirs, files in os.walk(os.path.join(base_dir, "Images")):
        level = root.replace(base_dir, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f"{indent}{os.path.basename(root)}/")
        sub_indent = ' ' * 2 * (level + 1)
        for file in files:
            if not file.startswith('.') and file.lower().endswith(('.jpg', '.jpeg', '.png', '.heic', '.gif', '.bmp', '.webp')):
                print(f"{sub_indent}{file}")

if __name__ == "__main__":
    main()
