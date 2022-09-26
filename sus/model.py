# Imports
import matplotlib.pyplot as plt
from pathlib import Path
import numpy as np

# Tensorflow
import tensorflow as tf

""" Weird errors """
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"


""" CONSTANT VARS """
DATA_DIR = ".\\data\\images\\.train"
SAVE_DIR = ".\\sus\\models"

def main():

    outputs = len(list(Path(DATA_DIR).iterdir()))

    input = 64
    batch = 16

    ds_train, ds_test = tf.keras.utils.image_dataset_from_directory(
        directory=DATA_DIR,
        label_mode="int",
        batch_size=batch,
        image_size=(input, input),
        validation_split=0.2,
        seed=123,
        subset="both",
        color_mode="rgb",
    )

    model = tf.keras.Sequential(
        [
            tf.keras.layers.Input((input, input, 3)),
            # 
            tf.keras.layers.Conv2D(32, 3, 1, padding='same', activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            # 
            tf.keras.layers.Conv2D(64, 3, 1, padding='same', activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            # 
            tf.keras.layers.Conv2D(128, 3, 1, padding='same', activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            # 
            tf.keras.layers.Conv2D(256, 3, 1, padding='same', activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            # 
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dense(outputs),
        ]
    )

    model.compile(
        optimizer=tf.keras.optimizers.Adam(),
        loss=[tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)],
        metrics=["accuracy"],
    )

    model.summary()

    # model.fit(ds_train, batch_size=batch, epochs=30, verbose=2)
    # model.save(f"{SAVE_DIR}\\model09")

    model = tf.keras.models.load_model(f"{SAVE_DIR}\\model09")

    # model.evaluate(ds_test, batch_size=batch, verbose=2)




if __name__ == "__main__":
    main()
