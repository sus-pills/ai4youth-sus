"""
File designated to prepare the reference data for the downloading process from the https://data.lhncbc.nlm.nih.gov/public/Pills/index.html website.
Important: if the data_list.csv file already exists, it will be overwrittena after executing this script!
"""

import re
import pandas as pd
import numpy as np


"""  CONSTANT VARS  """
# Chosen pill categories
CATEGORIES_DIR = ".\\data\\tablets_list.txt"
# regex for the usp pills
USP_REGEX = "usp*$|USP*$|Usp*$|usp dosepack*$"


def prepare_for_csv(df: np.ndarray, cats: list):
    """
    Extract the desired data from the numpy array.
    We want only the data that consists of all these traits:
        - Images that end with .JPG
        - Images' names that equal our desired categories
    """

    new_df = np.empty((0, 3))

    # Append only valid rows
    for i in range(len(df)):

        if (df[i][1] in cats) and (".JPG" in df[i][2]):

            new_df = np.append(new_df, [df[i]], axis=0)

    for i in range(len(new_df)):

        # Add ids
        new_df[i][0] = i

        # Normalize the names
        new_df[i][1] = re.sub("[^A-Za-z0-9 *]+", "", new_df[i][1])
        new_df[i][1] = re.sub(USP_REGEX, "", new_df[i][1]).rstrip()
        new_df[i][1] = f"\"{re.sub('[ *]+', '_', new_df[i][1])}\"".lower()

        # Fix the urls
        new_df[i][2] = f'"https://data.lhncbc.nlm.nih.gov/public/Pills/{new_df[i][2]}"'

    # Label the new dataframe
    new_df = np.insert(new_df, 0, ['"Id"', '"Name"', '"Image"'], axis=0)

    return new_df


def main():

    # Put the desired categories into the variable
    with open(CATEGORIES_DIR, "r") as f:
        cats = f.read().split("\n")

    # Load the reference dataframe
    ref_df = pd.read_excel(".\\info\\directory_of_images.xlsx")

    # Prepare the new dataframe
    df = ref_df[["Part", "Name", "Image"]].to_numpy()
    df = prepare_for_csv(df, cats)

    # Save the dataframe as a *.csv file
    np.savetxt(".\\data\\data_list.csv", df, delimiter=",", fmt="%s")


if __name__ == "__main__":
    main()
