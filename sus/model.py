# https://journalofbigdata.springeropen.com/articles/10.1186/s40537-020-00387-6
# Imports
from gc import callbacks
import matplotlib.pyplot as plt
from pathlib import Path
import json
import datetime
import numpy as np

# Tensorflow
import tensorflow as tf

""" Weird errors """
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"


""" CONSTANT VARS """
DATA_DIR = ".\\data\\images\\.train"
SAVE_DIR = ".\\sus\\models"
LOG_DIR = ".\\sus\\.logs"


def create_model(params: dict) -> dict:
    """
    Load dataset and create the model based on given parameters.
    """

    """ VARS """
    outputs = len(list(Path(DATA_DIR).iterdir()))
    input_y = params['input_y']
    input_x = params['input_x']
    batch_size = params['batch_size']
    dimensions = params['dimensions']
    conv_block = params['conv_filters']
    dense_block = zip(params['dense_units'], params['drop_prob'])
    learning_rate = params['learning_rate']
    epochs = params['epochs']

    if dimensions == 1:
        color_mode = 'grayscale'
    elif dimensions == 3:
        color_mode = 'rgb'

    """ LOAD DS """
    ds_train, ds_test = tf.keras.utils.image_dataset_from_directory(
        directory=DATA_DIR,
        label_mode="int",
        batch_size=batch_size,
        image_size=(input_y, input_x),
        validation_split=0.2,
        seed=123,
        subset="both",
        color_mode=color_mode,
    )

    """ CREATE MODEL """
    model = tf.keras.Sequential()

    # Input
    model.add(tf.keras.layers.Input((input_y, input_x, dimensions)))

    # conv2d, maxpool, batchnorm
    for filters in conv_block:
        regularizer = tf.keras.regularizers.L2()

        model.add(tf.keras.layers.Conv2D(filters, kernel_size=3,
                  padding='same', activation='relu', kernel_regularizer=regularizer))
        model.add(tf.keras.layers.MaxPool2D(pool_size=5, padding='same'))
        model.add(tf.keras.layers.BatchNormalization())

    model.add(tf.keras.layers.Flatten())

    # dense, dropout
    for units, drop_prob in dense_block:
        model.add(tf.keras.layers.Dense(units, activation='relu'))
        model.add(tf.keras.layers.Dropout(rate=drop_prob))

    # Final layer block
    model.add(tf.keras.layers.Dense(outputs, activation='relu'))

    package = {
        'model': model,
        'train': ds_train,
        'test': ds_test,
        'batch_size': batch_size,
        'learning_rate': learning_rate,
        'epochs': epochs,
    }

    return package


def main():

    with open('.\\sus\\parameters_list.json', 'r') as f:
        parameters_list = json.load(f)

    packages = list(map(create_model, parameters_list))

    for package in packages:

        model = package['model']
        train = package['train']
        test = package['test']
        batch_size = package['batch_size']
        learning_rate = package['learning_rate']
        epochs = package['epochs']

        model.summary()

        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
            loss=[tf.keras.losses.SparseCategoricalCrossentropy(
                from_logits=True)],
            metrics=["accuracy"],
        )

        model_name = f"cnn-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}"

        # logging directory
        log_dir = f'{LOG_DIR}\\{model_name}'

        # Initiate TensorBoard
        tensorboard = tf.keras.callbacks.TensorBoard(
            log_dir=log_dir, histogram_freq=1)

        model.fit(train, batch_size=batch_size, epochs=epochs,
                  verbose=2, callbacks=[tensorboard])

        model.evaluate(test, batch_size=batch_size,
                       verbose=2, callbacks=[tensorboard])

        model.save(f"{SAVE_DIR}\\{model_name}")


if __name__ == "__main__":
    main()
