#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import os
import re
from urllib.parse import unquote
import time

# Target URL
url = "https://halalbooking.com/en/ada-bungalow-hotel/p/8009"

# Output directory
output_dir = "/data/data/com.termux/files/home/adabungalow/images/ada-bungalow"

# Create directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

print("Fetching page...")
response = requests.get(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
})
response.raise_for_status()

print("Parsing HTML...")
soup = BeautifulSoup(response.text, 'html.parser')

# Find all image URLs matching the pattern
image_urls = set()

# Look for img tags
for img in soup.find_all('img'):
    src = img.get('src', '')
    if 'cdn.halalstatic.com/expedia%2F19000000%2F18830000%2F18822500%2F18822461' in src:
        image_urls.add(src)

    # Also check data attributes
    for attr in img.attrs:
        if attr.startswith('data-'):
            value = img.get(attr, '')
            if 'cdn.halalstatic.com/expedia%2F19000000%2F18830000%2F18822500%2F18822461' in value:
                image_urls.add(value)

# Look for background images in style attributes
for element in soup.find_all(style=True):
    style = element.get('style', '')
    urls = re.findall(r'url\(["\']?(https://cdn\.halalstatic\.com/expedia%2F19000000%2F18830000%2F18822500%2F18822461[^"\')]+)', style)
    image_urls.update(urls)

# Look in script tags for image URLs
for script in soup.find_all('script'):
    if script.string:
        urls = re.findall(r'https://cdn\.halalstatic\.com/expedia%2F19000000%2F18830000%2F18822500%2F18822461%2F[a-zA-Z0-9_]+\.jpg', script.string)
        image_urls.update(urls)

# Also look for higher resolution versions (replace _z with _w, _y, etc.)
expanded_urls = set(image_urls)
for url in image_urls:
    if '_z.jpg' in url:
        # Try to get higher res versions
        expanded_urls.add(url.replace('_z.jpg', '_w.jpg'))  # Larger size
        expanded_urls.add(url.replace('_z.jpg', '_y.jpg'))  # Even larger

image_urls = expanded_urls

print(f"\nFound {len(image_urls)} unique image URLs")
print("\nImage URLs found:")
for img_url in sorted(image_urls):
    print(img_url)

# Download images
downloaded = 0
failed = 0
skipped = 0

print(f"\nStarting download to {output_dir}...")
print("-" * 80)

for img_url in sorted(image_urls):
    # Extract filename from URL
    filename = img_url.split('/')[-1]
    filepath = os.path.join(output_dir, filename)

    # Skip if already exists
    if os.path.exists(filepath):
        print(f"SKIP: {filename} (already exists)")
        skipped += 1
        continue

    try:
        # Download image
        print(f"Downloading: {filename}...", end=' ')
        img_response = requests.get(img_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }, timeout=30)

        if img_response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(img_response.content)
            print(f"OK ({len(img_response.content)} bytes)")
            downloaded += 1
        else:
            print(f"FAILED (HTTP {img_response.status_code})")
            failed += 1

        # Small delay to be respectful
        time.sleep(0.5)

    except Exception as e:
        print(f"ERROR: {str(e)}")
        failed += 1

print("-" * 80)
print(f"\nDownload Summary:")
print(f"  Total URLs found: {len(image_urls)}")
print(f"  Successfully downloaded: {downloaded}")
print(f"  Skipped (already exists): {skipped}")
print(f"  Failed: {failed}")
print(f"\nImages saved to: {output_dir}")
