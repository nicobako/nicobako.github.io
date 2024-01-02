# [nicobako.github.io](https://nicobako.github.io)

Personal site.

Serves mostly as a playground for creating *static site* built with the same technologies that I would use for a full-fledged Django app:

* htmx
* hyperscript
* tailwind

## Note

Create tailwind css files:

```bash
npx tailwindcss -i ./input.css -o ./static/output.css --watch
```

Python version 3.12

Generating favicon.ico

```python
from PIL import Image
img = Image.open("static/nico-bako.png")
img.save("favicon.ico")
```