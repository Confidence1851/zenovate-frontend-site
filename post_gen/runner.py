#!/usr/bin/env python3
"""
Script to convert images to base64 and update HTML files accordingly.
Converts images in [ARTICLE_FOLDER]/images/ to base64, updates [ARTICLE_FOLDER]/post.html,
and saves a markdown version.

Usage:
    python script.py article1
    python script.py ./articles/my-blog-post
    python script.py /path/to/article
"""

import os
import base64
import re
import sys
import argparse
from pathlib import Path
from bs4 import BeautifulSoup
import html2text
from PIL import Image
import io

def compress_image(image_path, quality=85):
    """
    Compress an image and return the compressed image data.
    
    Args:
        image_path (str): Path to the image file
        quality (int): Compression quality (1-100, higher = better quality)
        
    Returns:
        tuple: (compressed_image_data, mime_type, original_size, compressed_size)
    """
    try:
        # Get original file size
        original_size = os.path.getsize(image_path)
        
        # Open and process image
        with Image.open(image_path) as img:
            # Convert RGBA to RGB if necessary (for JPEG compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background for transparent images
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = background
            elif img.mode not in ('RGB', 'L'):
                img = img.convert('RGB')
            
            # Determine output format and MIME type based on original extension
            ext = Path(image_path).suffix.lower()
            if ext in ['.jpg', '.jpeg'] or quality < 100:
                # Use JPEG for lossy compression
                output_format = 'JPEG'
                mime_type = 'image/jpeg'
            else:
                # Use PNG for lossless or high quality
                output_format = 'PNG'
                mime_type = 'image/png'
                quality = None  # PNG doesn't use quality parameter
            
            # Compress image to bytes
            img_byte_arr = io.BytesIO()
            save_kwargs = {'format': output_format, 'optimize': True}
            if quality is not None:
                save_kwargs['quality'] = quality
            
            img.save(img_byte_arr, **save_kwargs)
            compressed_data = img_byte_arr.getvalue()
            compressed_size = len(compressed_data)
            
            return compressed_data, mime_type, original_size, compressed_size
            
    except Exception as e:
        print(f"Error compressing {image_path}: {e}")
        return None, None, None, None

def get_image_base64(image_path, compression_quality=None):
    """
    Convert an image file to base64 string with optional compression.
    
    Args:
        image_path (str): Path to the image file
        compression_quality (int, optional): Compression quality (1-100)
        
    Returns:
        tuple: (base64_data_uri, original_size, final_size)
    """
    try:
        if compression_quality is not None and 1 <= compression_quality <= 100:
            # Use compression
            compressed_data, mime_type, original_size, compressed_size = compress_image(image_path, compression_quality)
            if compressed_data is None:
                return None, None, None
                
            img_base64 = base64.b64encode(compressed_data).decode('utf-8')
            data_uri = f"data:{mime_type};base64,{img_base64}"
            return data_uri, original_size, compressed_size
        else:
            # No compression - use original file
            with open(image_path, 'rb') as img_file:
                img_data = img_file.read()
                img_base64 = base64.b64encode(img_data).decode('utf-8')
                
                # Determine MIME type based on file extension
                ext = Path(image_path).suffix.lower()
                mime_types = {
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.bmp': 'image/bmp',
                    '.webp': 'image/webp'
                }
                
                mime_type = mime_types.get(ext, 'image/png')
                data_uri = f"data:{mime_type};base64,{img_base64}"
                file_size = len(img_data)
                return data_uri, file_size, file_size
    
    except Exception as e:
        print(f"Error converting {image_path} to base64: {e}")
        return None, None, None

def find_images_in_folder(images_folder):
    """
    Find all image files in the specified folder.
    
    Args:
        images_folder (str): Path to the images folder
        
    Returns:
        dict: Dictionary mapping image filenames to their full paths
    """
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'}
    images = {}
    
    if os.path.exists(images_folder):
        for file in os.listdir(images_folder):
            if Path(file).suffix.lower() in image_extensions:
                images[file] = os.path.join(images_folder, file)
    
    return images

def update_html_with_base64(html_content, images_dict, compression_quality=None):
    """
    Update HTML content by replacing image src attributes with base64 data URIs.
    
    Args:
        html_content (str): Original HTML content
        images_dict (dict): Dictionary mapping image filenames to their paths
        compression_quality (int, optional): Compression quality (1-100)
        
    Returns:
        tuple: (updated_html_content, total_original_size, total_final_size)
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all img tags
    img_tags = soup.find_all('img')
    
    total_original_size = 0
    total_final_size = 0
    processed_images = 0
    
    for img_tag in img_tags:
        src = img_tag.get('src')
        if not src:
            continue
            
        # Extract filename from src (handle relative paths)
        filename = os.path.basename(src)
        
        # Check if we have this image in our images dictionary
        if filename in images_dict:
            print(f"Converting image: {filename}")
            base64_data, original_size, final_size = get_image_base64(images_dict[filename], compression_quality)
            
            if base64_data and original_size and final_size:
                img_tag['src'] = base64_data
                total_original_size += original_size
                total_final_size += final_size
                processed_images += 1
                
                if compression_quality:
                    compression_ratio = (1 - final_size / original_size) * 100
                    print(f"✓ {filename}: {original_size:,} → {final_size:,} bytes ({compression_ratio:.1f}% reduction)")
                else:
                    print(f"✓ {filename}: {final_size:,} bytes (no compression)")
            else:
                print(f"✗ Failed to convert {filename}")
        else:
            print(f"⚠ Image not found in folder: {filename}")
    
    if processed_images > 0:
        print(f"\n📊 Compression Summary:")
        print(f"   Images processed: {processed_images}")
        print(f"   Total original size: {total_original_size:,} bytes ({total_original_size/1024/1024:.2f} MB)")
        print(f"   Total final size: {total_final_size:,} bytes ({total_final_size/1024/1024:.2f} MB)")
        if compression_quality and total_original_size > 0:
            overall_reduction = (1 - total_final_size / total_original_size) * 100
            print(f"   Overall size reduction: {overall_reduction:.1f}%")
    
    return str(soup), total_original_size, total_final_size

def html_to_markdown(html_content):
    """
    Convert HTML content to Markdown format.
    
    Args:
        html_content (str): HTML content to convert
        
    Returns:
        str: Markdown formatted content
    """
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.ignore_emphasis = False
    h.body_width = 0  # Don't wrap lines
    
    return h.handle(html_content)

def parse_arguments():
    """
    Parse command line arguments.
    
    Returns:
        argparse.Namespace: Parsed arguments
    """
    parser = argparse.ArgumentParser(
        description="Convert images to base64 and update HTML files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Basic usage
  python script.py article1
  
  # With compression (80% quality)
  python script.py article1 --compression 80
  
  # Custom output path for markdown
  python script.py posts/article3 --html-file index.html --output /path/to/final.md
  
  # Full example
  python script.py posts/article3 --html-file index.html --compression 75 --output ~/blogs/article-3.md
        """
    )
    parser.add_argument(
        'article_folder',
        help='Path to the article folder containing images/ and HTML file'
    )
    parser.add_argument(
        '--html-file',
        default='post.html',
        help='Name of the HTML file to process (default: post.html)'
    )
    parser.add_argument(
        '--images-folder',
        default='images',
        help='Name of the images subfolder (default: images)'
    )
    parser.add_argument(
        '--compression', '-c',
        type=int,
        metavar='QUALITY',
        help='Image compression quality (1-100, lower = smaller file). Default: no compression'
    )
    parser.add_argument(
        '--output', '-o',
        metavar='PATH',
        help='Custom output path for the markdown file (e.g., /path/to/article.md)'
    )
    
    return parser.parse_args()

def main():
    """
    Main function to process the HTML file and convert images to base64.
    """
    # Parse command line arguments
    args = parse_arguments()
    
    # Define paths based on arguments
    article_folder = args.article_folder
    images_folder = os.path.join(article_folder, args.images_folder)
    html_file = os.path.join(article_folder, args.html_file)
    
    # Generate output filenames
    html_name = Path(args.html_file).stem
    html_ext = Path(args.html_file).suffix
    output_html = os.path.join(article_folder, f"{html_name}_base64{html_ext}")
    
    # Handle custom markdown output path
    if args.output:
        output_md = os.path.expanduser(args.output)  # Expand ~ to home directory
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_md), exist_ok=True)
    else:
        output_md = os.path.join(article_folder, f"{html_name}.md")
    
    # Validate compression quality
    compression_quality = None
    if args.compression is not None:
        if 1 <= args.compression <= 100:
            compression_quality = args.compression
        else:
            print("Error: Compression quality must be between 1 and 100")
            return 1
    
    # Validate article folder exists
    if not os.path.exists(article_folder):
        print(f"Error: Article folder not found at {article_folder}")
        print("Please provide a valid path to your article folder.")
        return 1
    
    # Check if required files/folders exist
    if not os.path.exists(html_file):
        print(f"Error: HTML file not found at {html_file}")
        print(f"Expected file: {args.html_file}")
        return 1
    
    if not os.path.exists(images_folder):
        print(f"Error: Images folder not found at {images_folder}")
        print(f"Expected folder: {args.images_folder}")
        return 1
    
    print(f"Processing article: {article_folder}")
    if compression_quality:
        print(f"Image compression: {compression_quality}% quality")
    else:
        print("Image compression: None (original quality)")
    print("Starting image to base64 conversion process...")
    
    # Find all images in the folder
    print(f"Scanning for images in {images_folder}...")
    images_dict = find_images_in_folder(images_folder)
    print(f"Found {len(images_dict)} images: {list(images_dict.keys())}")
    
    # Read HTML file
    print(f"Reading HTML file: {html_file}")
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except Exception as e:
        print(f"Error reading HTML file: {e}")
        return 1
    
    # Update HTML with base64 images
    print("Processing HTML and converting images to base64...")
    updated_html, total_original, total_final = update_html_with_base64(html_content, images_dict, compression_quality)
    
    # Save updated HTML
    print(f"Saving updated HTML to: {output_html}")
    try:
        with open(output_html, 'w', encoding='utf-8') as f:
            f.write(updated_html)
        print("✓ HTML file saved successfully")
    except Exception as e:
        print(f"Error saving HTML file: {e}")
        return 1
    
    # Convert to Markdown
    print(f"Converting to Markdown: {output_md}")
    try:
        markdown_content = html_to_markdown(updated_html)
        with open(output_md, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        print("✓ Markdown file saved successfully")
    except Exception as e:
        print(f"Error converting to Markdown: {e}")
        return 1
    
    print("\n=== Process Complete ===")
    print(f"Article folder: {article_folder}")
    print(f"Original HTML: {html_file}")
    print(f"Updated HTML: {output_html}")
    print(f"Markdown file: {output_md}")
    if compression_quality:
        print(f"Compression quality: {compression_quality}%")
    return 0

if __name__ == "__main__":
    # Check for required dependencies
    try:
        import bs4
        import html2text
        from PIL import Image
    except ImportError as e:
        print("Missing required dependencies. Please install them using:")
        print("pip install beautifulsoup4 html2text pillow")
        print(f"Error: {e}")
        exit(1)
    
    # Check if arguments provided
    if len(sys.argv) < 2:
        print("Usage: python script.py <article_folder> [options]")
        print("\nExamples:")
        print("  python script.py article1")
        print("  python script.py posts/article3 --html-file index.html")
        print("  python script.py article1 --compression 80")
        print("  python script.py article1 --output ~/blogs/final.md")
        print("\nUse --help for all options")
        exit(1)
    
    exit(main())