# Screenshot Tool Instructions

## Setup

1. **Install Python dependencies:**

   ```powershell
   pip install -r requirements.txt
   ```

2. **Make sure Chrome browser is installed** (the script uses Chrome)

## Usage

Run the script from the Mini-Projects folder:

```powershell
python take_screenshots.py
```

## What it does

- Finds all `index.html` files in subdirectories
- Opens each one in a headless Chrome browser
- Takes a screenshot at 1920x1080 resolution
- Saves all screenshots to a `screenshots/` folder
- Names each screenshot after its project folder

## Output

All screenshots will be saved in:

```
Mini-Projects/screenshots/
```

Each screenshot will be named after its folder (e.g., `Calculator.png`, `Dad Jokes.png`)

## Troubleshooting

If you get a chromedriver error:

1. Check Chrome is installed
2. The script should auto-download the correct chromedriver
3. If issues persist, manually download chromedriver from: https://chromedriver.chromium.org/

## Customization

To change screenshot dimensions, edit these lines in `take_screenshots.py`:

```python
SCREENSHOT_WIDTH = 1920
SCREENSHOT_HEIGHT = 1080
```
