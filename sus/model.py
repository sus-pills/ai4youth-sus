# Imports
import matplotlib.pyplot as plt
from pathlib import Path
import numpy as np

# Tensorflow
import tensorflow as tf

""" Weird errors """
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


""" CONSTANT VARS """
CODEBLOCK = 0
DATA_DIR = ".\\data\\images\\.train"
SAVE_DIR = ".\\sus\\models"


def main():

    outputs = len(list(Path(DATA_DIR).iterdir()))

    ds_train, ds_test = tf.keras.utils.image_dataset_from_directory(
        directory=DATA_DIR,
        label_mode='int',
        batch_size=8,
        image_size=(28, 28),
        validation_split=0.2,
        seed=123,
        subset="both",
        color_mode='grayscale',
    )

    model = tf.keras.Sequential(
        [
            # Input layers
            tf.keras.layers.Input((28, 28, 1)),
            tf.keras.layers.Conv2D(32, (3, 3), padding="valid", activation='relu'),
            
            # Maxpool Conv2D
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(64, (3, 3), padding="valid", activation='relu'),

            # Maxpool Conv2D
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),

            # Output layers
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(64, activation='relu'),            
            tf.keras.layers.Dense(outputs),
        ]
    )

    model.compile(
        optimizer=tf.keras.optimizers.Adam(),
        loss=[tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)],
        metrics=["accuracy"],
    )

    if False:
        model.fit(ds_train, batch_size=16, epochs=15, verbose=2)
        model.save(f"{SAVE_DIR}\\model_02")
    else:
        model = tf.keras.models.load_model(f"{SAVE_DIR}\\model_02")
        model.evaluate(ds_test, batch_size=16, verbose=2)



if __name__ == "__main__":
    main()
