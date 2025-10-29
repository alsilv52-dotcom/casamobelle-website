#!/usr/bin/env python3
import os
import re
import glob

# Directorio base
base_dir = "/Users/javi/Documents/W"
images_dir = os.path.join(base_dir, "Images")

# Crear un mapa de todas las imágenes disponibles
def create_image_map():
    image_map = {}
    
    # Recorrer toda la carpeta Images
    for root, dirs, files in os.walk(images_dir):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.heic', '.gif', '.bmp', '.webp')):
                # Obtener la ruta relativa desde la carpeta base
                relative_path = os.path.relpath(os.path.join(root, file), base_dir)
                # Usar el nombre del archivo como clave
                filename = file.lower()
                image_map[filename] = relative_path
                
    return image_map

# Mapeo de correcciones específicas conocidas
def get_corrections():
    return {
        'Images/8070D874-0AB7-42D4-9B87-022B59DF27D6.jpg': None,  # No encontrada, buscar similar
        'Images/53439be1-3b77-456f-a587-837ce3e56428.jpg': None,  # No encontrada, buscar similar
        'Images/letrassf.png': 'Images/Logos/Letrassf.png',
        'Images/LogHor2.png': 'Images/Logos/LogHor2.png',
        'Images/Vestidor1.jpg': 'Images/Closetsyvestidores/Vestidor1.jpg',
        'Images/Librero1.jpg': 'Images/Otros/Librero1.jpg',
        'Images/Proceso.jpg': 'Images/Proceso.jpg',  # Ya está correcto
    }

def fix_html_file(filepath, image_map, corrections):
    print(f"Procesando: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = []
    
    # Buscar todas las referencias a imágenes
    patterns = [
        r'src=["\']([^"\']*Images/[^"\']*)["\']',
        r'background-image:\s*url\(["\']?([^)]*Images/[^)]*)["\']?\)',
    ]
    
    for pattern in patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            old_path = match.group(1)
            
            # Verificar si necesita corrección
            if old_path in corrections:
                new_path = corrections[old_path]
                if new_path:
                    content = content.replace(old_path, new_path)
                    changes_made.append(f"  {old_path} -> {new_path}")
                else:
                    print(f"  ⚠️  IMAGEN NO ENCONTRADA: {old_path}")
            else:
                # Verificar si el archivo existe
                full_path = os.path.join(base_dir, old_path)
                if not os.path.exists(full_path):
                    print(f"  ⚠️  IMAGEN NO EXISTE: {old_path}")
    
    # Guardar si hubo cambios
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Archivo actualizado")
        for change in changes_made:
            print(change)
    else:
        print("  ℹ️  No se necesitaron cambios")
    
    print()

def main():
    print("🔄 Iniciando corrección automática de rutas de imágenes...")
    print()
    
    # Crear mapa de imágenes disponibles
    image_map = create_image_map()
    print(f"📁 Encontradas {len(image_map)} imágenes en la carpeta Images/")
    
    # Mostrar algunas imágenes encontradas
    print("Algunas imágenes disponibles:")
    for i, (filename, path) in enumerate(list(image_map.items())[:10]):
        print(f"  - {filename} -> {path}")
    if len(image_map) > 10:
        print(f"  ... y {len(image_map) - 10} más")
    print()
    
    # Obtener correcciones
    corrections = get_corrections()
    
    # Buscar todos los archivos HTML
    html_files = glob.glob(os.path.join(base_dir, "*.html"))
    
    print(f"🔍 Procesando {len(html_files)} archivos HTML...")
    print()
    
    # Procesar cada archivo
    for html_file in html_files:
        fix_html_file(html_file, image_map, corrections)
    
    print("✅ Proceso completado!")
    print()
    print("📋 Resumen:")
    print("- Revisa las imágenes marcadas con ⚠️")
    print("- Algunas imágenes pueden haber sido eliminadas y necesitan nuevas rutas")
    print("- Verifica que el sitio funcione correctamente")

if __name__ == "__main__":
    main()
