import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Upload = () => {
 
  const navigation = useNavigate();
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

 let { user } = useContext(AuthContext);
  let Currentuser = user.user_id;
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const Handlecancel = () => {
    setPreviewImage(null);
    setCaption(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);
    formData.append("user", Currentuser);

    try {
      const response = await axios.post("/Api/upload/", formData);

      console.log("Response from server:", response.data);

      setCaption("");
      setImageFile(null);
      navigation("/");
    } catch (error) {
      console.error("Error uploading post:", error.message); // Log the error message
    }
  };

  return (
    <div className="relative mt-20 left-0 w-full lg:w-[80%] lg:mt-1  lg:left-[15%] lg:top-0">
      <Sidebar></Sidebar>
      <form onSubmit={handleSubmit}>
        <div className=" h-screen  sm:px-8 md:px-16 sm:py-8">
          <main className="container mx-auto max-w-screen-lg h-full shadow-2xl ">
            <article
              aria-label="File Upload Modal"
              className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
            >
              <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                <label
                  for="helper-text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your File
                </label>

                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <label
                  for="helper-text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Caption
                </label>
                <input
                  type="text"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Caption in here..."
                  value={caption}
                  onChange={handleCaptionChange}
                />

                <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>
                <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                  >
                    {previewImage ? (
                      <div className="">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full  max-h-[24rem]  object-cover  hover:scale-[104%] duration-500 lg:max-h-[36rem]"
                        />
                      </div>
                    ) : (
                      <img
                        className="mx-auto w-32"
                        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                        alt="no data"
                      />
                    )}
                    <span className="text-small text-gray-500"></span>
                  </li>
                </ul>
              </section>
              {/* sticky footer */}
              <footer className="flex sticky justify-end px-8 pb-8 pt-4">
                <div className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                  <button type="submit">Upload now</button>
                </div>
                <button
                  id="cancel"
                  className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  onClick={Handlecancel}
                  type="reset"
                >
                  Cancel
                </button>
              </footer>
            </article>
          </main>
        </div>
      </form>
      <template id="file-template" />
      <template id="image-template" />
    </div>
  );
};

export default Upload;
