import requests # Still useful for sitemap or initial checks
from bs4 import BeautifulSoup
import os
from playwright.sync_api import sync_playwright # New import

def extract_text_from_url_with_playwright(url, wait_selector='body'):
    """
    Fetches the content of a given URL using Playwright (headless browser)
    and extracts visible text after JavaScript execution.
    """
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch() # You can choose 'firefox' or 'webkit' as well
            page = browser.new_page()
            page.goto(url, wait_until="networkidle") # Wait until network is idle
            
            # Wait for a specific selector to ensure content is loaded
            # Adjust 'body' to a more specific selector if your content loads into a particular div
            page.wait_for_selector(wait_selector, timeout=30000) # Wait up to 30 seconds

            # Get the full HTML content after rendering
            html_content = page.content()
            browser.close()

            soup = BeautifulSoup(html_content, 'html.parser')

            # Remove script and style elements to avoid extracting code/CSS
            for script_or_style in soup(['script', 'style', 'header', 'footer', 'nav', 'form', 'aside', 'button', 'a[href^="#"]']):
                script_or_style.decompose()

            text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'span', 'div', 'article', 'section'])

            page_text_chunks = []
            for element in text_elements:
                text = element.get_text(separator=' ', strip=True)
                if text:
                    page_text_chunks.append(text)

            full_text = ' '.join(page_text_chunks)
            full_text = ' '.join(full_text.split())
            return full_text
    except Exception as e:
        print(f"Error fetching {url} with Playwright: {e}")
        return None

def save_content_to_file(content, filename="website_content.txt"):
    """Saves the extracted content to a text file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Content successfully saved to {filename}")
    except IOError as e:
        print(f"Error saving content to file: {e}")

if __name__ == "__main__":
    base_url = "https://pitchport-frontend.onrender.com" # Your deployed URL

    # List the actual routes that your React Router handles
    urls_to_scrape = [
        f"https://pitchport-frontend.onrender.com/", # Homepage
        f"https://pitchport-frontend.onrender.com/explore",
        f"https://pitchport-frontend.onrender.com/investors",
        f"https://pitchport-frontend.onrender.com/startups",
        f"https://pitchport-frontend.onrender.com/about",
        # Add any other routes that contain content you want to extract
        # e.g., f"{base_url}/faq", f"{base_url}/blog/my-post-slug"
    ]

    all_extracted_content = []

    print("Starting content extraction with Playwright...")
    for i, url in enumerate(urls_to_scrape):
        print(f"Extracting from: {url} ({i+1}/{len(urls_to_scrape)})")
        # Use the Playwright function here
        content = extract_text_from_url_with_playwright(url, wait_selector='#root') # Adjust wait_selector if needed
        if content:
            all_extracted_content.append(f"--- URL: {url} ---\n{content}\n\n")
        else:
            print(f"No content extracted or error for: {url}")

    final_combined_content = "\n".join(all_extracted_content)

    if final_combined_content:
        save_content_to_file(final_combined_content, "pitchport_website_context.txt")
    else:
        print("No content was extracted from any of the provided URLs.")