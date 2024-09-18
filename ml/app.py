from flask import Flask, request
from flask_cors import CORS
import numpy as np
from PIL import Image
from io import BytesIO
import base64
from hsemotion_onnx.facial_emotions import HSEmotionRecognizer
from mtcnn import MTCNN

app = Flask(__name__)
CORS(app)

# Initialize MTCNN for face detection
face_detector = MTCNN()

# Initialize HSEmotionRecognizer for emotion recognition
emotion_recognizer = HSEmotionRecognizer(model_name='enet_b0_8_best_vgaf')


def map_valence_arousal_to_emotion(valence, arousal):
    if valence < 0:
        if arousal > 0:
            return "frustration"
        else:
            return "boredom"
    else:
        if arousal > 0:
            return "delight"
        elif arousal < 0:
            return "confusion"
        else:
            return "engagement"


@app.route('/ml')
def hello():
    return "Welcome to IITB Affect Aware Tutor System"


@app.route('/ml/predict', methods=['POST'])
def predict():
    if request.method == "POST":
        img_array = request.get_json()['newArray']

        predictions = []
        no_face_count = 0

        for img_base64 in img_array:
            # Decode base64 image
            img_data = base64.b64decode(img_base64.split(',')[1])
            img = Image.open(BytesIO(img_data))
            img_np = np.array(img)

            # Detect faces using MTCNN
            faces = face_detector.detect_faces(img_np)

            if len(faces) == 0:
                no_face_count += 1
                continue

            # Get the first detected face
            x, y, width, height = faces[0]['box']
            face = img.crop((x, y, x+width, y+height))

            # Predict emotion using HSEmotionRecognizer
            emotion, scores = emotion_recognizer.predict_emotions(face, logits=True)

            # Extract valence and arousal scores
            valence = scores[0]  # Assuming valence is the first score
            arousal = scores[1]  # Assuming arousal is the second score

            # Map valence and arousal to learning-centered emotion
            learning_emotion = map_valence_arousal_to_emotion(valence, arousal)
            predictions.append(learning_emotion)

        if no_face_count >= 5:
            return {"prediction": "not engaged"}

        # Get the most common learning-centered emotion
        if predictions:
            final_prediction = max(set(predictions), key=predictions.count)
        else:
            final_prediction = "unknown"

        return {"prediction": final_prediction}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
