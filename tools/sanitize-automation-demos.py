"""Create silent, cropped review copies; never modify the supplied recordings.

Requires OpenCV, NumPy and Pillow. Source files are explicit CLI inputs.
Opaque masks are baked into every frame; no reversible blur or audio is retained.
These edits require the owner's publication review before public playback.
"""
import argparse
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'preview/v0304-p2-hero-cta/project-demos'
FPS = 15
SIZE = (1280, 720)
IVORY = (246, 241, 231)
PURPLE = (51, 35, 67)


def text(draw, xy, value, size=24, fill=PURPLE):
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', size)
    draw.text(xy, value, font=font, fill=fill)


def mask(frame, box):
    x1, y1, x2, y2 = box
    frame[y1:y2, x1:x2] = (67, 35, 51)


def build(source, kind, start, end):
    capture = cv2.VideoCapture(str(source))
    if not capture.isOpened():
        raise RuntimeError('Cannot open supplied recording')
    expected = (1916, 990) if kind == 'packing' else (1412, 904)
    if (int(capture.get(3)), int(capture.get(4))) != expected:
        raise RuntimeError('Source dimensions changed: masks must be reviewed again')
    OUT.mkdir(exist_ok=True)
    target = OUT / (kind + '-review.webm')
    if target.exists():
        raise FileExistsError(target)
    writer = cv2.VideoWriter(str(target), cv2.VideoWriter_fourcc(*'VP80'), FPS, SIZE)
    if not writer.isOpened():
        raise RuntimeError('VP8 encoder unavailable')
    poster = None
    for index in range(round((end - start) * FPS)):
        capture.set(cv2.CAP_PROP_POS_MSEC, (start + index / FPS) * 1000)
        ok, frame = capture.read()
        if not ok:
            raise RuntimeError('Unexpected end of source')
        canvas = Image.new('RGB', SIZE, IVORY)
        draw = ImageDraw.Draw(canvas)
        text(draw, (46, 28), 'OPERATIONS / REAL WORKFLOW RECORDING', 17)
        if kind == 'packing':
            # Only the Sheets pane. No browser chrome, operations dashboard or chat.
            # Mask all identity, batch, SKU, count, tracking and machine-readable QR areas.
            mask(frame, (44, 310, 398, 350))
            mask(frame, (44, 375, 398, 418))
            mask(frame, (44, 441, 398, 618))
            mask(frame, (44, 653, 398, 696))
            mask(frame, (44, 720, 398, 763))
            mask(frame, (44, 786, 398, 844))
            # While the SKU cell is being edited, text briefly overflows its row.
            # Cover the adjoining box-size strip throughout that source interval.
            if 7.5 <= start + index / FPS <= 10.5:
                mask(frame, (38, 618, 404, 653))
            crop = frame[284:846, 38:404]
            crop = cv2.resize(crop, (352, 540))
            canvas.paste(Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)), (50, 105))
            text(draw, (550, 110), 'Packing Cover Automation', 34)
            for y, line in enumerate([
                'Batch details -> packing cover',
                'SKU / quantity fields are redacted.',
                'Box size follows the SKU combination.',
                'Unknown combinations need manual review.',
                'Printed QR prepares the next shipping step.',
            ]):
                text(draw, (550, 195 + y * 48), line, 22)
            text(draw, (550, 500), 'Google Sheets + Apps Script', 24)
            text(draw, (550, 545), 'Architecture context: owner-reported.', 19)
        else:
            # Preserve only row-selection indicators and the assistant panel.
            # Entire operational row content and dashboard are excluded by cropping.
            rows = frame[185:875, 178:243]
            canvas.paste(Image.fromarray(cv2.cvtColor(cv2.resize(rows, (51, 540)), cv2.COLOR_BGR2RGB)), (50, 105))
            # Fixed panel crop for this selected source interval; input/status/history
            # IDs are always opaque, including frames while the input is changing.
            mask(frame, (1140, 590, 1400, 632))
            mask(frame, (1140, 667, 1400, 710))
            mask(frame, (1140, 710, 1400, 860))
            crop = frame[422:900, 1140:1400]
            crop = cv2.resize(crop, (294, 540))
            canvas.paste(Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)), (120, 105))
            text(draw, (470, 110), 'AcrossB Flow QR Helper', 34)
            for y, line in enumerate([
                'Read a date + batch identifier.',
                'Check the work list before selecting.',
                'Partial loading can block selection.',
                'A matching row is selected by the helper.',
                'A person checks quantities and completes work.',
            ]):
                text(draw, (470, 195 + y * 48), line, 22)
            text(draw, (470, 500), 'Selection assistance, not automatic ship-out.', 23)
            text(draw, (470, 545), 'Identifiers and activity history are redacted.', 19)
        text(draw, (46, 665), 'Silent real capture / cropped + opaque redactions / edited excerpt, not a benchmark', 19)
        bgr = cv2.cvtColor(np.array(canvas), cv2.COLOR_RGB2BGR)
        writer.write(bgr)
        if index == FPS:
            poster = canvas.copy()
    writer.release()
    capture.release()
    poster.save(OUT / (kind + '-review.jpg'), quality=85)
    print(kind, 'frames=', index + 1, 'seconds=', (index + 1) / FPS, 'bytes=', target.stat().st_size)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--packing', type=Path, required=True)
    parser.add_argument('--qr', type=Path, required=True)
    args = parser.parse_args()
    build(args.packing, 'packing', 4, 14)
    build(args.qr, 'qr', 12, 30)
