import os
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
from io import BytesIO
from kolam_analyzer_single import KolamCVAnalyzer

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        # Parse multipart form data
        boundary = self.headers['Content-Type'].split('boundary=')[-1]
        parts = body.split(b'--' + boundary.encode())
        image_data = None
        filename = None
        for part in parts:
            if b'Content-Disposition' in part and b'name="image"' in part:
                # Extract filename
                lines = part.split(b'\r\n')
                for line in lines:
                    if b'filename=' in line:
                        filename = line.split(b'filename=')[1].strip(b'"')
                # Find image data
                idx = part.find(b'\r\n\r\n')
                if idx != -1:
                    image_data = part[idx+4:]
                    break
        if not image_data or not filename:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'No image uploaded.'}).encode())
            return
        temp_path = f"/tmp/{filename.decode()}"
        with open(temp_path, 'wb') as f:
            f.write(image_data)
        try:
            analyzer = KolamCVAnalyzer()
            result = analyzer.analyze_kolam(temp_path)
            # Convert dataclass objects to dicts for JSON
            output_dict = {
                "dot_grid": result.dot_grid.__dict__,
                "symmetry": result.symmetry.__dict__,
                "kolam_type": result.kolam_type,
                "type_confidence": float(result.type_confidence),
                "dl_classification": result.dl_classification,
                "dl_confidence": float(result.dl_confidence),
                "repetition_patterns": result.repetition_patterns,
                "characteristics": result.characteristics
            }
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(output_dict).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
        finally:
            try:
                os.remove(temp_path)
            except Exception:
                pass
