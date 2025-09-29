{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Day 1: Python Basics — Print & Input\n",
    "Welcome to your first Python challenge! Today, you will learn how to display text on the screen using `print()` and take input from the user using `input()`."
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Learning Objectives\n",
    "- Understand the purpose of `print()` to display output.\n",
    "- Learn how to use `input()` to get user input.\n",
    "- Combine `print()` and `input()` to make small interactive programs.\n",
    "- Run and edit notebook cells to practice Python interactively."
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 1️⃣ Displaying Text with `print()`"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Print a simple message\n",
    "print(\"Hello, world!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Practice:** Try printing your own message below"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Replace the text with your own message\n",
    "print(\"Type your message here!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 2️⃣ Taking Input with `input()`"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Ask the user for their name and print a greeting\n",
    "name = input(\"What's your name? \")\n",
    "print(\"Hello, \" + name + \"! Welcome to Python!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Practice:** Ask the user for their favorite color and print a response"
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Example: Replace with your own input question\n",
    "color = input(\"What's your favorite color? \")\n",
    "print(\"Wow! I like \" + color + \" too!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 3️⃣ Combining Text and Input\n",
    "You can combine multiple pieces of text using commas or `+` signs."
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Example combining strings\n",
    "age = input(\"How old are you? \")\n",
    "print(\"So your name is \" + name + \" and you are \" + age + \" years old!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "**Practice:** Ask the user two questions (like favorite food and hobby) and print a message combining them."
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Replace with your own questions\n",
    "food = input(\"What's your favorite food? \")\n",
    "hobby = input(\"What's your favorite hobby? \")\n",
    "print(\"So you like \" + food + \" and enjoy \" + hobby + \"!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 4️⃣ Extra Tips\n",
    "- You can print multiple items with commas: `print(name, \"is learning Python\")`\n",
    "- Use `\\n` inside a string to create a new line: `print(\"Hello\\nWorld\")`\n",
    "- Strings from `input()` are always text. To work with numbers, you can convert them using `int()` or `float()`."
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 5️⃣ Challenge Exercise\n",
    "Create a small program that asks the user for:\n",
    "1. Name\n",
    "2. Age\n",
    "3. Favorite programming language\n",
    "\n",
    "Then print a greeting that uses all the inputs in a complete sentence."
   ]
  },
  {
   "cell_type": "code",
   "metadata": {},
   "source": [
    "# Example solution (students can try first!)\n",
    "name = input(\"What's your name? \")\n",
    "age = input(\"How old are you? \")\n",
    "language = input(\"What's your favorite programming language? \")\n",
    "print(\"Hello, \" + name + \"! At \" + age + \" years old, it's great that you love \" + language + \"!\")"
   ],
   "execution_count": null,
   "outputs": []
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "---\n",
    "🎉 **Congratulations!** You completed Day 1. You've learned how to display messages, take user input, and combine them to make interactive Python programs. Now you're ready for Day 2!"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "name": "python",
   "version": "3.11"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
