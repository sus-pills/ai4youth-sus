from pathlib import Path
import pandas as pd
import requests


"""  CONSTANT VARS  """
# 'images' folder
IMG_PATH = ".\\data\\images"
# Reserved folders; should be created/deleted manually
RESERVED = [Path(f"{IMG_PATH}\\.cropped"), Path(f"{IMG_PATH}\\.backup")]
# A checkpoint starting the download from the X-th image in case your internet connection failed
# Default is 0
CHECKPOINT = 0


def make_img_paths(name: str) -> Path:
    """
    Create an image path as a pathlib.Path object from a name.
    """
    return Path(f"{IMG_PATH}\\{name}")


def create_folders(df: pd.DataFrame):
    """
    Create folders for the downloading process.
    """

    # Convert names to paths
    cats = list(set(df["Name"]))
    cats = list(map(make_img_paths, cats))

    # Clear previous data
    # or create the 'images' folder if it does not exist
    if Path(IMG_PATH).is_dir():
        for dir in Path(IMG_PATH).iterdir():

            # Delete the file; dir should be a directory
            if dir.is_file():
                dir.unlink()
                continue

            # Delete the contents
            dir_len = len(list(dir.iterdir()))
            if (dir not in RESERVED) and (dir_len != 0):
                for obj in dir.iterdir():
                    obj.unlink(missing_ok=True)

            # Delete useless folders
            if (dir not in RESERVED) and (dir not in cats):
                print()
                dir.rmdir()
    else:
        Path(IMG_PATH).mkdir(parents=True)

    # Create folders for all categories
    for cat in cats:
        cat.mkdir(parents=True, exist_ok=True)


def download_imgs(df: pd.DataFrame):
    """
    Download images listed in the dataframe.
    """

    for i in range(CHECKPOINT, len(df)):

        # Set path and url variables
        path = f"{IMG_PATH}\\{df['Name'][i]}"
        url = df["Image"][i]

        if Path(path).is_dir():

            # Open a session and get the response
            with requests.Session() as sess:
                response = sess.get(url)

                # Download the image
                if response.status_code == 200:
                    with open(f"{path}\\{i}.jpg", "wb") as d_file:

                        d_file.write(response.content)
                        print(f"File {i}.jpg was saved in {path}.")


def main():

    # Extract data from the data_list.csv file
    df = pd.read_csv(".\\data\\data_list.csv")

    # Create folders for the downloading process
    if CHECKPOINT == 0:
        create_folders(df)

    # Download images to created folders
    download_imgs(df)


if __name__ == "__main__":
    main()
