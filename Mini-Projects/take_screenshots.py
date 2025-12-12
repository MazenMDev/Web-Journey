"""
Automated Screenshot Tool for Mini-Projects
Takes screenshots of all index.html files in subdirectories
"""

import os
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

# Configuration
SCREENSHOT_WIDTH = 1920
SCREENSHOT_HEIGHT = 1080
OUTPUT_FOLDER = "screenshots"
BASE_DIR = Path(__file__).parent

def setup_driver():
    """Setup Chrome driver with headless options"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in background
    chrome_options.add_argument(f"--window-size={SCREENSHOT_WIDTH},{SCREENSHOT_HEIGHT}")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Create driver (make sure chromedriver is in PATH or specify path)
    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(SCREENSHOT_WIDTH, SCREENSHOT_HEIGHT)
    
    return driver

def find_all_index_files():
    """Find all index.html files in subdirectories"""
    index_files = []
    
    for folder in BASE_DIR.iterdir():
        if folder.is_dir() and not folder.name.startswith('.'):
            # Try multiple HTML file patterns
            html_file = None
            
            # First try index.html
            if (folder / "index.html").exists():
                html_file = folder / "index.html"
            # Try folder name + .html (e.g., Calculator.html)
            elif (folder / f"{folder.name}.html").exists():
                html_file = folder / f"{folder.name}.html"
            # Try test.html as fallback
            elif (folder / "test.html").exists():
                html_file = folder / "test.html"
            # Try any .html file that contains common names
            else:
                for html_path in folder.glob("*.html"):
                    if html_path.stem.lower() in ['dicee', 'main', 'app', 'page']:
                        html_file = html_path
                        break
            
            if html_file:
                index_files.append({
                    'name': folder.name,
                    'path': html_file
                })
    
    return index_files

def take_screenshot(driver, file_info, output_dir):
    """Take screenshot of a single HTML file with fixed dimensions"""
    try:
        # Convert to file:// URL
        file_url = f"file:///{file_info['path'].absolute().as_posix()}"
        
        print(f"Processing: {file_info['name']}")
        driver.get(file_url)
        
        # Wait for page to load
        time.sleep(2)
        
        # Force fixed viewport dimensions (prevent content from affecting size)
        driver.execute_script(f"""
            document.body.style.width = '{SCREENSHOT_WIDTH}px';
            document.body.style.height = '{SCREENSHOT_HEIGHT}px';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.width = '{SCREENSHOT_WIDTH}px';
            document.documentElement.style.height = '{SCREENSHOT_HEIGHT}px';
            document.documentElement.style.overflow = 'hidden';
        """)
        
        # Small delay to apply styles
        time.sleep(0.5)
        
        # Take screenshot
        screenshot_name = f"{file_info['name']}.png"
        screenshot_path = output_dir / screenshot_name
        driver.save_screenshot(str(screenshot_path))
        
        print(f"✓ Saved: {screenshot_name}")
        return True
        
    except Exception as e:
        print(f"✗ Error with {file_info['name']}: {str(e)}")
        return False

def main():
    print("=" * 60)
    print("Mini-Projects Screenshot Tool")
    print("=" * 60)
    
    # Create output directory
    output_dir = BASE_DIR / OUTPUT_FOLDER
    output_dir.mkdir(exist_ok=True)
    print(f"\nOutput folder: {output_dir}")
    
    # Find all index.html files
    index_files = find_all_index_files()
    print(f"\nFound {len(index_files)} projects:")
    for file_info in index_files:
        print(f"  - {file_info['name']}")
    
    # Setup browser
    print("\nInitializing browser...")
    try:
        driver = setup_driver()
    except Exception as e:
        print(f"\n✗ Error: Could not start Chrome driver")
        print(f"Make sure Chrome and chromedriver are installed")
        print(f"Install chromedriver: pip install webdriver-manager")
        return
    
    # Take screenshots
    print(f"\nTaking screenshots ({SCREENSHOT_WIDTH}x{SCREENSHOT_HEIGHT})...")
    print("-" * 60)
    
    success_count = 0
    for file_info in index_files:
        if take_screenshot(driver, file_info, output_dir):
            success_count += 1
    
    # Cleanup
    driver.quit()
    
    # Summary
    print("-" * 60)
    print(f"\n✓ Complete! {success_count}/{len(index_files)} screenshots taken")
    print(f"Screenshots saved in: {output_dir}")
    print("=" * 60)

if __name__ == "__main__":
    main()
