from flask import Flask, request, render_template, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def label_encode_columns(df):
    df = df.copy()  # Make a copy to avoid modifying the original data
    for col in df.columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
    return df

# Load models
with open('./models/knn.joblib', 'rb') as model_file:
    model_knn = joblib.load(model_file)

with open('./models/logistic_regression.joblib', 'rb') as model_file:
    model_logistic = joblib.load(model_file)

# with open('./models/mlp.joblib', 'rb') as model_file:
#     model_mlp = joblib.load(model_file)

with open('./models/naive_bayes.joblib', 'rb') as model_file:
    model_bayes = joblib.load(model_file)

with open('./models/random_forrest.joblib', 'rb') as model_file:
    model_forrest = joblib.load(model_file)

with open('./models/svm.joblib', 'rb') as model_file:
    model_svm = joblib.load(model_file)

# Load the pipeline for preprocessing
with open('./transformers/pipeline.joblib', 'rb') as pipeline_file:
    pipeline = joblib.load(pipeline_file)

@app.route('/')
def home():
    return render_template('predict_form.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    form_data = request.json
    selected_model = form_data['model']
    form_data = {key: float(value) for key, value in form_data.items() if key != 'model'}
    print(form_data)  # Convert all inputs to float
    input_df = pd.DataFrame([form_data])
    print(input_df)
    # Apply transformations using the pipeline
    transformed_input = pipeline.transform(input_df)

    # Get the selected model from the form
    

    # Choose the appropriate model for prediction
    if selected_model == "knn":
        model = model_knn
    elif selected_model == "logistic_regression":
        model = model_logistic
    elif selected_model == "mlp":
        model = model_mlp
    elif selected_model == "bayes":
        model = model_bayes
    elif selected_model == "forrest":
        model = model_forrest
    elif selected_model == "svm":
        model = model_svm
    else:
        return jsonify({"error": "Invalid model selected"}), 400

    # Make predictions
    prediction = model.predict(transformed_input)

    # Prepare the response
    result = {
        "prediction": int(prediction[0])
    }

    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=3001)
