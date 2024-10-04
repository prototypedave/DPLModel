import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from models.predict import predict_sentinel_images
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/home', methods=['POST', 'GET'])
def handle_post():
    try:
        data = request.get_json()
        region = data.get('region')
        sen = data.get('sentinel')
        file = data.get('fileName')
        pred_path, true_path, hist_path, tif_path, loss, rmse, r2, mae, scatt = predict_sentinel_images(file)
        
        return jsonify({
            "message": "Data received successfully",
            "region": region,
            "sentinel": sen,
            "pred": pred_path,
            "true": true_path,
            "hist": hist_path,
            "tif": tif_path,
            "scatt": scatt,
            "r2": str(truncate(r2,5)),
            "mae": str(np.round(mae, 5)),
            "loss": str(np.round(loss, 5)),
            "rmse": str(np.round(rmse, 5)),
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/image/<path:filename>')
def serve_image(filename):
    try:
        return send_file(filename, mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@app.route('/tif/<path:filename>')
def serve_tif(filename):
    try:
        return send_file(filename, mimetype='image/tiff', as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 404

def truncate(num, dec=3):
    if not isinstance(num, float):
        return num
    factor = 10.0 ** dec
    return int(num * factor) / factor

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7070)
