import pickle
import sys
import json
import os
import re

# Load the model and label encoder
try:
    with open('resume_classifier.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    with open('label_encoder.pkl', 'rb') as le_file:
        label_encoder = pickle.load(le_file)
except Exception as e:
    print(json.dumps({'error': f'Error loading model or label encoder: {str(e)}'}))
    sys.exit(1)

# Read the file path from the command line arguments
file_path = sys.argv[1]

# Read the file content
try:
    with open(file_path, 'r', encoding='utf-8') as file:
        input_text = file.read()
    print(f'File content read successfully: {input_text[:100]}...')  # Log the first 100 characters of the file content
except Exception as e:
    print(json.dumps({'error': f'Error reading file: {str(e)}'}))
    sys.exit(1)

# Clean the input text (implement your text cleaning logic here)
def clean_text(text):
    text = text.lower()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ').strip()
    words = text.split(' ')
    # Implement stopword removal if needed
    return ' '.join(words)

try:
    cleaned_text = clean_text(input_text)
    print(f'Cleaned text: {cleaned_text[:100]}...')  # Log the first 100 characters of the cleaned text
except Exception as e:
    print(json.dumps({'error': f'Error cleaning text: {str(e)}'}))
    sys.exit(1)

# Make prediction
try:
    prediction = model.predict([cleaned_text])
    predicted_category = label_encoder.inverse_transform(prediction)[0]

    # Get prediction probabilities
    probabilities = model.predict_proba([cleaned_text])[0]
    predicted_probability = max(probabilities) * 100

    # Output the predicted category and probability as JSON
    output = {
        'category': predicted_category,
        'probability': predicted_probability
    }
    print(json.dumps(output))
except Exception as e:
    print(json.dumps({'error': f'Error making prediction: {str(e)}'}))
    sys.exit(1)