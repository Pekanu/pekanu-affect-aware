from flask import Flask, request
from flask_cors import CORS
import numpy as np
import torch
import torch
import torch.nn.functional as F
import cv2
import albumentations as A
from albumentations.pytorch import ToTensorV2
from linformer import Linformer
from vit_pytorch.efficient import ViT
from torch.utils.data import DataLoader
import os
import calendar
import time
from urllib.request import urlopen
from PIL import Image


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return "Welcome to IITB Affect Aware Tutor System"


@app.route('/video', methods=['GET', 'POST'])
def video():
    if request.method == 'POST':
        file = request.files['file']
        temp_name = os.path.splitext(file.filename)

        # add timestamp to filename
        filename = temp_name[0] + \
            str(calendar.timegm(time.gmtime())) + temp_name[1]
        file.save(filename)

        return "Video Saved"


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    classifier = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml')

    if(request.method == "POST"):
        img_array = request.get_json()['newArray']

        # print(request.form.listvalues)
        # print(len(img_array))
        test_images = []
        no_face_count = 0

        for url in img_array:
            img = Image.open(urlopen(url))
            img = np.array(img)
            faces = classifier.detectMultiScale(img)
            if(len(faces) == 0):
                no_face_count += 1

            test_images.append(img)

        if(no_face_count >= 5):
            return {"prediction": "not engaged"}

        main_transform = A.Compose(
            [
                A.Resize(224, 224),
                ToTensorV2(),
            ])

        # file.save(filename)
        # test_images = video_to_image(filename)

        test_dataset = DaiseeDataset(
            test_images, augmentations=main_transform)

        batch_size = len(test_images)
        test_loader = DataLoader(
            test_dataset, batch_size=batch_size, shuffle=False)

        if torch.cuda.is_available():
            device = "cuda"
        else:
            device = "cpu"

        # Line transformer
        efficient_transformer = Linformer(
            dim=128,
            seq_len=49+1,  # 7x7 patches + 1 cls-token
            depth=12,
            heads=8,
            k=64
        ).to(device)

        # Visual transformer
        model = ViT(
            dim=128,
            image_size=224,
            patch_size=32,
            num_classes=4,
            transformer=efficient_transformer,
            channels=3,
        ).to(device)

        model.load_state_dict(torch.load(
            'daisee_vit_model_weights.pth', map_location=device))

        classes = {0: 'boredom', 1: 'confusion',
                   2: 'engagement', 3: 'frustration'}

        model.eval()
        for data in test_loader:
            data = data.type(torch.float)
            predict_values = model(data.to(device))
            preds = F.softmax(predict_values, dim=1)
            preds = torch.argmax(preds, dim=1)
            preds = preds.cpu().numpy()
            final_pred = np.bincount(preds).argmax()
            if final_pred in [0, 1, 2, 3]:
                prediction = classes[final_pred]
            else:
                prediction = "not found"

        return {"prediction": prediction}


class DaiseeDataset(torch.utils.data.Dataset):
    def __init__(self, img_list, augmentations):
        super(DaiseeDataset, self).__init__()
        self.img_list = img_list
        self.augmentations = augmentations

    def __len__(self):
        return len(self.img_list)

    def __getitem__(self, idx):
        img = self.img_list[idx]
        return self.augmentations(image=img)['image']


if __name__ == '__main__':
    app.run(host='localhost', port=4000)

