from flask import Flask, request, jsonify, send_file, abort
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

model = load_model('model.h5')

with open('nn_model.pkl', 'rb') as f:
    nn_model = pickle.load(f)

with open('name_classes.pkl', 'rb') as f:
    name_classes = pickle.load(f)

train_labels_flat_custom = np.load('train_labels_custom.npy')
train_img_flat_custom = np.load('train_img_custom.npy')

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        print("recieved good file")
        preprocessed_data = preprocess_input(file)

        predictions = model.predict(preprocessed_data).flatten().reshape(1, -1)
        print("model prediction done")

        distances_custom, indices_custom = nn_model.kneighbors(predictions)
        print("model knn done")

        data_list = []

        for i in range(len(indices_custom[0])):
            class_name = name_classes[train_labels_flat_custom[indices_custom[0][i]]]
            distance = round(distances_custom[0][i], 2)
            index = indices_custom[0][i]

            data = {
                "Clase": class_name,
                "Distancia": distance,
                "Indice": index
            }
            
            data_list.append(data)

        print("data list created", data_list)

        for item in data_list:
            item['Distancia'] = float(item['Distancia'])
            item['Indice'] = int(item['Indice'])

        return jsonify(data_list)
    else:
        return jsonify({"error": "File type not allowed"}), 400
    
# Preprocessing function (adapt as needed)
def preprocess_input(file):
     # Open the image file
    #image = Image.open(io.BytesIO(file.read()))
    image = Image.open(file).convert('RGB')
    print("converted to RGB")
    # Resize the image to match the input shape of the model
    image = image.resize((224, 224))
    print("reziced")
    # Convert the image to a numpy array
    image = np.array(image)
    print("Converted image to array")
    # Normalize the image
    image = image / 255.0
    print("image normalized")
    # Expand dimensions to match the model input shape
    image = np.expand_dims(image, axis=0)
    print("image expanded")
    return image

@app.route('/get-image/<int:index>', methods=['GET'])
def get_image(index):
    try:
        # Access the image from the train_img_flat_custom array using the index
        flat_img = train_img_flat_custom[index]
        
        # Reshape the image if necessary (depending on how it was flattened)
        # For example, if the original image size was (224, 224, 3):
        img_shape = (224, 224, 3)
        img_array = flat_img.reshape(img_shape)

        # Rescale pixel values from [0, 1] to [0, 255]
        img_array = (img_array * 255).astype('uint8')
        
        # Convert the NumPy array to a PIL Image
        img = Image.fromarray(img_array, 'RGB')

        # img.save(f"debug/debug_image_{index}.jpg")

        # Convert the PIL Image to a BytesIO object
        img_io = io.BytesIO()
        img.save(img_io, 'JPEG')
        img_io.seek(0)

        # Send the image as a response
        return send_file(img_io, mimetype='image/jpeg')

    except IndexError:
        # If the index is out of bounds, return a 404 error
        abort(404, description="Image not found")

if __name__ == '__main__':
    app.run(debug=True)
