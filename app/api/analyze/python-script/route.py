import os
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
from io import BytesIO
from kolam_analyzer_single import KolamCVAnalyzer


import os
import json
from kolam_analyzer_single import KolamCVAnalyzer

def handler(event, context):
    try:
        # Get uploaded file from event (Vercel passes file as 'image' in event['body'])
        image_data = event['body']
        temp_path = '/tmp/uploaded_image.png'
        with open(temp_path, 'wb') as f:
            f.write(image_data)
        analyzer = KolamCVAnalyzer()
        result = analyzer.analyze_kolam(temp_path)
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
        os.remove(temp_path)
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(output_dict)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
