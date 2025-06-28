import dataclasses
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape

@dataclasses.dataclass
class Config:
    template_path: Path
    output_path: Path

    def __post_init__(self):
        self._validate()

    def _validate(self):
        if not self.template_path.exists():
            raise ValueError(f"Template path {self.template_path} does not exist.")
        if not self.template_path.is_dir():
            raise ValueError(f"Template path {self.template_path} is not a directory.")
        return True

config = Config(
    template_path=Path('templates'),
    output_path=Path('output'),
)

env = Environment(
    loader=FileSystemLoader(
        config.template_path,
    ),
    autoescape=select_autoescape(),
)

@dataclasses.dataclass
class Page:
    template: str
    output: str
    context: dict[str, str]

    def render(self, config: Config):
        template = env.get_template(self.template)
        text = template.render(**self.context)
        output_path = config.output_path / self.output
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(text, encoding='utf-8')

index = Page(
    template="index.html",
    output="index.html",
    context={
        "title": "Hello World",
        "content": "Ths is a Jinja2 template example.",
    },
)

pages: list[Page] = [index]
for page in pages:
    page.render(config)
