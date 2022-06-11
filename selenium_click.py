# coding: utf-8
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains

browser = webdriver.Firefox()
browser.get('http://127.0.0.1:8080')
ActionChains(browser).send_keys(Keys.COMMAND + Keys.ALT + 'k').perform()
button = browser.find_element(By.TAG_NAME, "button")

for _ in range(10):
    button.click()
