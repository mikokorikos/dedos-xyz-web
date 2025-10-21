from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("file:///app/index.html")

        # Screenshot FAQ section
        faq_element = page.query_selector("#faq")
        if faq_element:
            print("Found FAQ element")
            faq_element.scroll_into_view_if_needed()
            page.screenshot(path="jules-scratch/verification/faq_redesign.png")
            print("Took FAQ screenshot")
        else:
            print("Could not find FAQ element")

        # Screenshot Catalog section
        catalog_element = page.query_selector("#catalogo")
        if catalog_element:
            print("Found Catalog element")
            catalog_element.scroll_into_view_if_needed()
            page.screenshot(path="jules-scratch/verification/catalog_redesign.png")
            print("Took Catalog screenshot")
        else:
            print("Could not find Catalog element")

        print("Files in verification dir:", os.listdir("jules-scratch/verification"))

        browser.close()

run()
