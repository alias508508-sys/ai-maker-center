"""Single-video subtitle probe. Writes private material; never publishes or downloads video."""
import argparse
import html
import json
import pathlib
import re
import tempfile
from urllib.parse import urlparse, parse_qs
import yt_dlp


def subtitle_text(vtt):
    lines = []
    for line in vtt.splitlines():
        if not line.strip() or '-->' in line or line.startswith(('WEBVTT', 'Kind:', 'Language:')) or line.strip().isdigit():
            continue
        text = html.unescape(re.sub(r'<[^>]+>', '', line)).strip()
        if text and (not lines or text != lines[-1]):
            lines.append(text)
    return '\n'.join(lines)


def video_id(url):
    u = urlparse(url)
    if u.scheme not in ('https', 'http'):
        raise ValueError('Expected a YouTube URL')
    ident = u.path.strip('/') if u.hostname == 'youtu.be' else parse_qs(u.query).get('v', [''])[0] if u.hostname in ('youtube.com', 'www.youtube.com') and u.path == '/watch' else ''
    if not re.fullmatch(r'[A-Za-z0-9_-]{11}', ident):
        raise ValueError('Expected a single YouTube video')
    return ident


def probe(url, output):
    ident = video_id(url)
    canonical = 'https://www.youtube.com/watch?v=' + ident
    with tempfile.TemporaryDirectory() as folder:
        opts = dict(skip_download=True, writesubtitles=True, writeautomaticsub=True,
                    subtitleslangs=['en'], subtitlesformat='vtt',
                    outtmpl=folder + '/%(id)s.%(ext)s', noplaylist=True, quiet=True,
                    socket_timeout=20, retries=1)
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(canonical, download=True)
        files = sorted(pathlib.Path(folder).glob('*.vtt'))
        if not files:
            raise RuntimeError('No usable subtitles; video summary must not be generated')
        text = subtitle_text(files[0].read_text())
        if len(text) < 100:
            raise RuntimeError('Insufficient subtitle content')
        result = dict(url=canonical, identityKey='youtube:' + ident, title=info['title'],
                      author=info.get('channel'), publishedDate=info.get('upload_date'),
                      bodyText=text, thumbnail=info.get('thumbnail'),
                      evidence='video-subtitles', subtitleLanguage=files[0].name.split('.')[-2],
                      subtitleAutomatic=files[0].name.split('.')[-2] not in info.get('subtitles', {}))
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(result, ensure_ascii=False, indent=2))
        output.chmod(0o600)
        print(json.dumps(dict(title=result['title'], characters=len(text), output=str(output)), ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('url')
    parser.add_argument('--output', type=pathlib.Path, default=pathlib.Path('.data/social-probe/youtube.json'))
    args = parser.parse_args()
    probe(args.url, args.output)
